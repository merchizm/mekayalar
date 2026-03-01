<?php

namespace App\Http\Controllers\Landing;

use App\Enums\PostEnum;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use LakM\Commenter\Models\Comment;
use LakM\Commenter\Models\Guest;
use Spatie\Honeypot\Honeypot;

class BlogController extends Controller
{
    private function basePostQuery(): Builder
    {
        return Post::query()
            ->with(['books', 'albumItems', 'category'])
            ->where('post_status', PostEnum::PUBLISHED)
            ->orderBy('updated_at', 'desc');
    }

    public function index()
    {
        seo()
            ->title('Mekayalar.com — Gönderilerim')
            ->description('Çizimlerim, çektiğim fotoğraflar, alıntılarım, albümlerim ve blog yazılarım.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Blog/Index', [
            'posts'      => $this->basePostQuery()->paginate(6),
            'categories' => Category::all(),
        ]);
    }

    public function show($slug)
    {
        $post = $this->basePostQuery()->where('post_slug', $slug)->first();

        if (!$post) {
            abort(404);
        }

        return $this->renderPost($post, false);
    }

    public function preview(Post $post)
    {
        if (!request()->user()) {
            abort(403);
        }

        return $this->renderPost($post, true);
    }

    private function renderPost(Post $post, bool $isPreview)
    {
        $post->loadMissing(['books', 'albumItems']);

        seo()
            ->title('Mekayalar.com — '.$post->post_title)
            ->description($post->description ?? '')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        $order         = request()->get('order', 'latest');
        $commentsQuery = Comment::query()
            ->where('commentable_type', Post::class)
            ->where('commentable_id', $post->id)
            ->whereNull('reply_id')
            ->with(['commenter', 'reactions', 'replies.commenter', 'replies.reactions']);

        $commentsQuery->orderByDesc('is_pinned');
        if ($order === 'oldest') {
            $commentsQuery->oldest();
        } else {
            $commentsQuery->latest();
        }

        if (config('commenter.approval_required')) {
            $commentsQuery->where('approved', true);
        }

        /** @var \Illuminate\Database\Eloquent\Collection<int, Comment> $commentsCollection */
        $commentsCollection    = $commentsQuery->get();
        $user                  = request()->user();
        $guest                 = Guest::query()->where('ip_address', request()->ip())->first();
        $replyApprovalRequired = (bool) config('commenter.reply.approval_required');
        $comments              = $commentsCollection->map(function (Comment $comment) use ($user, $guest, $replyApprovalRequired) {
            $commenter = $comment->commenter;
            /** @var \Illuminate\Database\Eloquent\Collection<int, \LakM\Commenter\Models\Reaction> $reactions */
            $reactions  = $comment->reactions;
            $likesCount = $reactions->where('type', 'like')->count();
            $liked      = false;
            if ($user) {
                $liked = $reactions->contains(function ($reaction) use ($user) {
                    return $reaction->type === 'like'
                        && $reaction->owner_type === $user->getMorphClass()
                        && (int) $reaction->owner_id === (int) $user->getKey();
                });
            } elseif ($guest) {
                $liked = $reactions->contains(function ($reaction) use ($guest) {
                    return $reaction->type === 'like'
                        && $reaction->owner_type === $guest->getMorphClass()
                        && (int) $reaction->owner_id === (int) $guest->getKey();
                });
            }

            return [
                'id'          => $comment->getKey(),
                'text'        => (string) $comment->getAttribute('text'),
                'approved'    => (bool) $comment->getAttribute('approved'),
                'created_at'  => optional($comment->getAttribute('created_at'))->toIso8601String(),
                'likes_count' => $likesCount,
                'liked'       => $liked,
                'is_pinned'   => (bool) $comment->getAttribute('is_pinned'),
                'commenter'   => [
                    'name'     => $commenter?->name(),
                    'email'    => $commenter?->email(),
                    'photo'    => $commenter?->photoUrl(),
                    'type'     => $commenter?->getMorphClass(),
                    'is_admin' => $commenter instanceof User,
                ],
                'replies' => $comment->replies
                    ->filter(fn ($reply) => !$replyApprovalRequired || (bool) $reply->getAttribute('approved'))
                    ->sortBy('created_at')
                    ->values()
                    ->map(function ($reply) use ($user, $guest) {
                        /** @var \LakM\Commenter\Models\Reply $reply */
                        $replyCommenter = $reply->commenter;
                        /** @var \Illuminate\Database\Eloquent\Collection<int, \LakM\Commenter\Models\Reaction> $replyReactions */
                        $replyReactions = $reply->reactions;
                        $replyLikes     = $replyReactions->where('type', 'like')->count();
                        $replyLiked     = false;
                        if ($user) {
                            $replyLiked = $replyReactions->contains(function ($reaction) use ($user) {
                                return $reaction->type === 'like'
                                    && $reaction->owner_type === $user->getMorphClass()
                                    && (int) $reaction->owner_id === (int) $user->getKey();
                            });
                        } elseif ($guest) {
                            $replyLiked = $replyReactions->contains(function ($reaction) use ($guest) {
                                return $reaction->type === 'like'
                                    && $reaction->owner_type === $guest->getMorphClass()
                                    && (int) $reaction->owner_id === (int) $guest->getKey();
                            });
                        }

                        return [
                            'id'          => $reply->getKey(),
                            'text'        => (string) $reply->getAttribute('text'),
                            'approved'    => (bool) $reply->getAttribute('approved'),
                            'created_at'  => optional($reply->getAttribute('created_at'))->toIso8601String(),
                            'likes_count' => $replyLikes,
                            'liked'       => $replyLiked,
                            'commenter'   => [
                                'name'     => $replyCommenter?->name(),
                                'email'    => $replyCommenter?->email(),
                                'photo'    => $replyCommenter?->photoUrl(),
                                'type'     => $replyCommenter?->getMorphClass(),
                                'is_admin' => $replyCommenter instanceof User,
                            ],
                        ];
                    }),
            ];
        });

        return Inertia::render('Landing/Blog/Show', [
            'post'                     => $post,
            'comments'                 => $comments,
            'commentsCount'            => $commentsCollection->count(),
            'commentsApprovalRequired' => (bool) config('commenter.approval_required'),
            'commentsOrder'            => $order,
            'repliesEnabled'           => (bool) config('commenter.reply.enabled'),
            'honeypot'                 => app(Honeypot::class)->toArray(),
            'isPreview'                => $isPreview,
        ]);
    }

    public function category($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category) {
            abort(404);
        }

        seo()
            ->title('Mekayalar.com — '.$category->name.' Kategorisi')
            ->description($category->description)
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Blog/Category', [
            'posts' => $this->basePostQuery()
                ->where('post_category_id', $category->id)
                ->paginate(6),
            'categories'      => Category::all(),
            'currentCategory' => $category,
        ]);
    }

    public function type($type)
    {
        $typeMap = [
            'photo'   => ['value' => '1', 'label' => 'Fotoğraf'],
            'drawing' => ['value' => '2', 'label' => 'Çizim'],
            'quote'   => ['value' => '3', 'label' => 'Alıntı'],
            'album'   => ['value' => '4', 'label' => 'Albüm'],
        ];
        abort_unless(isset($typeMap[$type]), 404);
        $typeLabel = $typeMap[$type]['label'];

        seo()
            ->title('Mekayalar.com — '.$typeLabel.' Gönderileri')
            ->description($typeLabel.' türündeki gönderilerim.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Blog/Type', [
            'posts' => $this->basePostQuery()
                ->where('type', $typeMap[$type]['value'])
                ->paginate(6),
            'categories'  => Category::all(),
            'currentType' => $type,
            'typeLabel'   => $typeLabel,
        ]);
    }
}
