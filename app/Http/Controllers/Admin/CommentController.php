<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use LakM\Commenter\Models\Comment;
use LakM\Commenter\Models\Guest;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $query = Comment::query()
            ->where('commentable_type', Post::class)
            ->whereNull('reply_id')
            ->with(['commentable', 'commenter'])
            ->latest();

        if ($request->filled('status')) {
            $query->where('approved', $request->status === 'approved');
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($subQuery) use ($search): void {
                $subQuery->where('text', 'like', "%{$search}%")
                    ->orWhereHas('commentable', function ($commentableQuery) use ($search): void {
                        $commentableQuery->where('post_title', 'like', "%{$search}%");
                    })
                    ->orWhereHasMorph('commenter', [User::class, Guest::class], function ($commenterQuery) use ($search): void {
                        $commenterQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        $comments = $query->paginate(12)->withQueryString();

        return Inertia::render('Admin/Comments/Index', [
            'comments' => $comments->through(function (Comment $comment) {
                $commenter = $comment->commenter;
                $post      = $comment->commentable instanceof Post ? $comment->commentable : null;

                return [
                    'id'         => $comment->id,
                    'text'       => $comment->text,
                    'approved'   => (bool) $comment->approved,
                    'is_pinned'  => (bool) $comment->is_pinned,
                    'created_at' => optional($comment->created_at)->toIso8601String(),
                    'commenter'  => [
                        'name'  => $commenter?->name(),
                        'email' => $commenter?->email(),
                        'photo' => $commenter?->photoUrl(),
                        'type'  => $commenter?->getMorphClass(),
                    ],
                    'post' => $post ? [
                        'id'    => $post->getKey(),
                        'title' => (string) $post->getAttribute('post_title'),
                        'slug'  => (string) $post->getAttribute('post_slug'),
                    ] : null,
                ];
            }),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'approved'  => ['sometimes', 'boolean'],
            'is_pinned' => ['sometimes', 'boolean'],
        ]);

        if (array_key_exists('approved', $validated)) {
            $comment->approved = $validated['approved'];
        }
        if (array_key_exists('is_pinned', $validated)) {
            $comment->is_pinned = $validated['is_pinned'];
        }
        $comment->save();

        return redirect()->back();
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->back();
    }
}
