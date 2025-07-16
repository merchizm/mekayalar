<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
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
            $query->where('post_title', 'like', '%' . $request->search . '%');
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
            'posts' => $posts,
            'filters' => $request->only(['search', 'type', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_title'        => 'required|string|max:255',
            'post_content'      => 'required_if:type,0|nullable|string',
            'post_category_id'  => 'required_if:type,0|nullable|integer|exists:categories,id',
            'post_status'       => 'required|in:published,draft',
            'post_image'        => 'required|string|max:255',
            'description'       => 'nullable|string|max:500',
            'type'              => 'required|string',
            'url'               => 'nullable|string|max:255',
            'post_tags'         => 'nullable|array',
            'post_tags.*.value' => 'required|string|max:50',
        ]);

        Post::create([
            'post_title'       => $validated['post_title'],
            'post_slug'        => Str::slug($validated['post_title']),
            'post_content'     => $validated['post_content'] ?? null,
            'post_category_id' => $validated['post_category_id'] ?? null,
            'post_status'      => $validated['post_status'],
            'post_image'       => $validated['post_image'],
            'description'      => $validated['description'] ?? null,
            'type'             => $validated['type'],
            'author'           => Auth::id(),
            'post_tags'        => !empty($validated['post_tags']) ? array_column($validated['post_tags'], 'value') : null,
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post'       => $post,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'post_title'        => 'required|string|max:255',
            'post_content'      => 'required_if:type,0|nullable|string',
            'post_category_id'  => 'required_if:type,0|nullable|integer|exists:categories,id',
            'post_status'       => 'required|in:published,draft',
            'post_image'        => 'nullable|string|max:255',
            'description'       => 'nullable|string|max:500',
            'type'              => 'required|string',
            'url'               => 'nullable|string|max:255',
            'post_tags'         => 'nullable|array',
            'post_tags.*.value' => 'required|string|max:50',
        ]);

        $updateData = [
            'post_title'       => $validated['post_title'],
            'post_slug'        => Str::slug($validated['post_title']),
            'post_content'     => $validated['post_content'] ?? null,
            'post_category_id' => $validated['post_category_id'] ?? null,
            'post_status'      => $validated['post_status'],
            'post_image'       => $validated['post_image'] ?? null,
            'description'      => $validated['description'] ?? null,
            'type'             => $validated['type'],
        ];

        if (array_key_exists('post_tags', $validated)) {
            $updateData['post_tags'] = !empty($validated['post_tags']) ? array_column($validated['post_tags'], 'value') : [];
        }

        $post->update($updateData);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
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
            ]
        );

        return response()->json(['success' => true, 'post_id' => $post->id]);
    }
}
