<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Post;
use App\Models\PostAlbumItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('category')->latest();

        // Search filter
        if ($request->filled('search')) {
            $query->where('post_title', 'like', '%'.$request->search.'%');
        }

        // Type filter
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('post_status', $request->status);
        }

        $posts = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Posts/Index', [
            'posts'   => $posts,
            'filters' => $request->only(['search', 'type', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Create', [
            'categories' => Category::all(),
            'books'      => Book::query()->orderBy('title')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_title'               => 'required|string|max:255',
            'post_content'             => 'required_if:type,0|nullable|string',
            'post_category_id'         => 'required_if:type,0|nullable|integer|exists:categories,id',
            'post_status'              => 'required|in:published,draft',
            'post_image'               => 'nullable|string|max:255',
            'description'              => 'nullable|string|max:500',
            'type'                     => 'required|string|in:0,1,2,3,4',
            'url'                      => 'nullable|string|max:255',
            'post_tags'                => 'nullable|array',
            'post_tags.*.value'        => 'required|string|max:50',
            'quote_text'               => 'exclude_unless:type,3|required|string',
            'quote_page'               => 'exclude_unless:type,3|nullable|string|max:100',
            'quote_highlight_color'    => 'exclude_unless:type,3|nullable|string|max:50',
            'book_ids'                 => 'exclude_unless:type,3|required|array|min:1',
            'book_ids.*'               => 'exclude_unless:type,3|integer|exists:books,id',
            'primary_book_id'          => 'exclude_unless:type,3|required|integer|exists:books,id',
            'album_items'              => 'exclude_unless:type,4|required|array|min:1',
            'album_items.*.image_path' => 'exclude_unless:type,4|required|string|max:255',
            'album_items.*.caption'    => 'exclude_unless:type,4|nullable|string|max:255',
            'album_items.*.alt_text'   => 'exclude_unless:type,4|nullable|string|max:255',
        ]);

        $post = Post::create([
            'post_title'            => $validated['post_title'],
            'post_slug'             => Str::slug($validated['post_title']),
            'post_content'          => $validated['post_content'] ?? null,
            'post_category_id'      => $validated['post_category_id'] ?? null,
            'post_status'           => $validated['post_status'],
            'post_image'            => $validated['post_image'] ?? null,
            'description'           => $validated['description'] ?? null,
            'type'                  => $validated['type'],
            'author'                => Auth::id(),
            'post_tags'             => !empty($validated['post_tags']) ? array_column($validated['post_tags'], 'value') : null,
            'quote_text'            => $validated['quote_text'] ?? null,
            'quote_page'            => $validated['quote_page'] ?? null,
            'quote_highlight_color' => $validated['quote_highlight_color'] ?? null,
        ]);

        $this->syncBooks($post, $request);
        $this->syncAlbumItems($post, $validated['album_items'] ?? []);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post'       => $post->load(['books', 'albumItems']),
            'categories' => Category::all(),
            'books'      => Book::query()->orderBy('title')->get(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'post_title'               => 'required|string|max:255',
            'post_content'             => 'required_if:type,0|nullable|string',
            'post_category_id'         => 'required_if:type,0|nullable|integer|exists:categories,id',
            'post_status'              => 'required|in:published,draft',
            'post_image'               => 'nullable|string|max:255',
            'description'              => 'nullable|string|max:500',
            'type'                     => 'required|string|in:0,1,2,3,4',
            'url'                      => 'nullable|string|max:255',
            'post_tags'                => 'nullable|array',
            'post_tags.*.value'        => 'required|string|max:50',
            'quote_text'               => 'exclude_unless:type,3|required|string',
            'quote_page'               => 'exclude_unless:type,3|nullable|string|max:100',
            'quote_highlight_color'    => 'exclude_unless:type,3|nullable|string|max:50',
            'book_ids'                 => 'exclude_unless:type,3|required|array|min:1',
            'book_ids.*'               => 'exclude_unless:type,3|integer|exists:books,id',
            'primary_book_id'          => 'exclude_unless:type,3|required|integer|exists:books,id',
            'album_items'              => 'exclude_unless:type,4|required|array|min:1',
            'album_items.*.image_path' => 'exclude_unless:type,4|required|string|max:255',
            'album_items.*.caption'    => 'exclude_unless:type,4|nullable|string|max:255',
            'album_items.*.alt_text'   => 'exclude_unless:type,4|nullable|string|max:255',
        ]);

        $updateData = [
            'post_title'            => $validated['post_title'],
            'post_slug'             => Str::slug($validated['post_title']),
            'post_content'          => $validated['post_content'] ?? null,
            'post_category_id'      => $validated['post_category_id'] ?? null,
            'post_status'           => $validated['post_status'],
            'post_image'            => $validated['post_image'] ?? null,
            'description'           => $validated['description'] ?? null,
            'type'                  => $validated['type'],
            'quote_text'            => $validated['quote_text'] ?? null,
            'quote_page'            => $validated['quote_page'] ?? null,
            'quote_highlight_color' => $validated['quote_highlight_color'] ?? null,
        ];

        if (array_key_exists('post_tags', $validated)) {
            $updateData['post_tags'] = !empty($validated['post_tags'])
                ? array_column($validated['post_tags'], 'value')
                : [];
        }

        $post->update($updateData);
        $this->syncBooks($post, $request);
        $this->syncAlbumItems($post, $validated['album_items'] ?? []);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }

    public function saveDraft(Request $request)
    {
        $request->validate([
            'post_title' => 'required',
        ]);

        $post = Post::updateOrCreate(
            ['id' => $request->post_id],
            [
                'post_title'       => $request->post_title,
                'post_slug'        => $request->post_slug ?? Str::slug($request->post_title),
                'post_content'     => $request->post_content,
                'type'             => $request->type,
                'post_status'      => 'draft',
                'author'           => Auth::id(),
                'post_tags'        => json_decode($request->post_tags, true),
                'post_image'       => $request->post_image ?? null,
                'description'      => $request->description ?? null,
                'post_category_id' => $request->post_category_id ?? null,
            ],
        );

        return response()->json(['success' => true, 'post_id' => $post->id]);
    }

    private function syncBooks(Post $post, Request $request): void
    {
        if ((string) $post->type !== '3') {
            $post->books()->detach();

            return;
        }

        $bookIds = collect($request->input('book_ids', []))->filter()->map(fn ($id) => (int) $id)->unique()->values();

        if ($bookIds->isEmpty()) {
            $post->books()->detach();

            return;
        }

        $primaryBookId = (int) $request->input('primary_book_id', $bookIds->first());
        $syncData      = $bookIds
            ->mapWithKeys(
                fn ($bookId) => [
                    $bookId => ['is_primary' => $bookId === $primaryBookId],
                ],
            )
            ->all();

        $post->books()->sync($syncData);
    }

    private function syncAlbumItems(Post $post, array $items): void
    {
        $post->albumItems()->delete();

        if ((string) $post->type !== '4') {
            return;
        }

        foreach (array_values($items) as $index => $item) {
            if (empty($item['image_path'])) {
                continue;
            }

            PostAlbumItem::create([
                'post_id'    => $post->id,
                'image_path' => $item['image_path'],
                'caption'    => $item['caption'] ?? null,
                'alt_text'   => $item['alt_text'] ?? null,
                'sort_order' => $index,
            ]);
        }
    }
}
