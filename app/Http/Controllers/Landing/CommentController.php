<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use LakM\Commenter\Data\GuestData;
use LakM\Commenter\Models\Comment;
use LakM\Commenter\Models\Guest;
use LakM\Commenter\Models\Reaction;
use LakM\Commenter\Models\Reply;
use Spatie\Honeypot\Exceptions\SpamException;
use Spatie\Honeypot\SpamProtection;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $action  = $request->input('action', 'comment');
        $isGuest = $request->user() === null;

        if ($action === 'like') {
            return $this->toggleLike($request, $post);
        }

        $this->assertNotBanned($request);
        $this->checkHoneypot($request);

        $rules = [
            'text' => ['required', 'string', 'max:2000'],
        ];

        if ($action === 'reply') {
            $rules['comment_id'] = ['required', 'integer', 'exists:comments,id'];
        }

        $this->validateGuestInputs($request, $rules, $isGuest);

        $validated = $request->validate($rules);

        if ($isGuest && !config('commenter.guest_mode.enabled')) {
            abort(403);
        }

        if ($isGuest) {
            $guest = Guest::query()->createOrUpdate(
                GuestData::fromArray([
                    'name'  => $validated['name'] ?? null,
                    'email' => $validated['email'] ?? null,
                ]),
            );
            $commenter = $guest;
        } else {
            $commenter = $request->user();
        }

        $approved = !$isGuest;

        if ($action === 'reply') {
            $parent = $this->findCommentForPost($post, (int) $validated['comment_id']);

            $reply = new Reply([
                'text'           => $validated['text'],
                'commenter_type' => $commenter->getMorphClass(),
                'commenter_id'   => $commenter->getKey(),
                'approved'       => $approved,
            ]);
            $reply->commentable()->associate($parent);
            $reply->save();
        } else {
            $comment = new Comment([
                'text'           => $validated['text'],
                'commenter_type' => $commenter->getMorphClass(),
                'commenter_id'   => $commenter->getKey(),
                'approved'       => $approved,
            ]);
            $comment->commentable()->associate($post);
            $comment->save();
        }

        return redirect()->back();
    }

    private function validateGuestInputs(Request $request, array &$rules, bool $isGuest): void
    {
        if (!$isGuest) {
            return;
        }

        $rules['name'] = ['required', 'string', 'max:80'];
        if (config('commenter.guest_mode.email_enabled')) {
            $rules['email'] = ['required', 'email', 'max:120'];
        } else {
            $rules['email'] = ['nullable', 'email', 'max:120'];
        }
    }

    private function toggleLike(Request $request, Post $post)
    {
        $request->validate([
            'comment_id' => ['required', 'integer', 'exists:comments,id'],
        ]);

        $this->assertNotBanned($request);

        $comment   = $this->findCommentForPost($post, (int) $request->input('comment_id'));
        $commenter = $this->resolveCommenterForReaction($request);

        $existing = Reaction::query()
            ->where('comment_id', $comment->id)
            ->where('owner_type', $commenter->getMorphClass())
            ->where('owner_id', $commenter->getKey())
            ->where('type', 'like')
            ->first();

        if ($existing) {
            $existing->delete();
        } else {
            Reaction::query()->create([
                'comment_id' => $comment->id,
                'type'       => 'like',
                'owner_type' => $commenter->getMorphClass(),
                'owner_id'   => $commenter->getKey(),
            ]);
        }

        return redirect()->back();
    }

    private function resolveCommenterForReaction(Request $request)
    {
        $user = $request->user();
        if ($user) {
            return $user;
        }

        if (!config('commenter.guest_mode.enabled')) {
            abort(403);
        }

        return Guest::query()->createOrUpdate(
            GuestData::fromArray([
                'name'  => $request->input('name'),
                'email' => $request->input('email'),
            ]),
        );
    }

    private function findCommentForPost(Post $post, int $commentId): Comment
    {
        $comment = Comment::query()->findOrFail($commentId);

        if ($comment->commentable_type === $post->getMorphClass() && (int) $comment->commentable_id === $post->id) {
            return $comment;
        }

        if ($comment->reply_id) {
            $parent = Comment::query()->find($comment->reply_id);
            if (
                $parent &&
                $parent->commentable_type === $post->getMorphClass() &&
                (int) $parent->commentable_id === $post->id
            ) {
                return $comment;
            }
        }

        abort(404);
    }

    private function assertNotBanned(Request $request): void
    {
        $bannedIps = $this->getBannedIps();
        if (in_array($request->ip(), $bannedIps, true)) {
            abort(403);
        }

        $blacklist = $this->getBlacklist();
        $content   = (string) $request->input('text', '');
        foreach ($blacklist as $word) {
            $word = trim((string) $word);
            if ($word === '') {
                continue;
            }
            if (Str::contains(mb_strtolower($content), mb_strtolower($word))) {
                abort(422, 'Yorum içeriği uygun değil.');
            }
        }
    }

    private function checkHoneypot(Request $request): void
    {
        try {
            app(SpamProtection::class)->check($request->all());
        } catch (SpamException) {
            throw ValidationException::withMessages([
                'text' => 'Yorum doğrulanamadı. Lütfen tekrar deneyin.',
            ]);
        }
    }

    private function getBlacklist(): array
    {
        $stored = kvoption('commenter_blacklist', null);
        if (is_array($stored)) {
            return $stored;
        }

        return config('commenter.moderation.blacklist', []);
    }

    private function getBannedIps(): array
    {
        $stored = kvoption('commenter_banned_ips', null);
        if (is_array($stored)) {
            return $stored;
        }

        return config('commenter.moderation.banned_ips', []);
    }
}
