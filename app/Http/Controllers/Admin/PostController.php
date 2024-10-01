<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('admin.posts.index', compact('posts'));
    }

    public function create()
    {
        $categories = Category::all();
        return view('admin.posts.create', compact('categories'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'post_title' => 'required',
            'post_status' => 'required',
            'post_image' => 'required',
            'type' => 'required'
        ]);

        if ($request->post_id) {
            $post = Post::find($request->post_id);

            if ($post) {
                $post->update([
                    'post_title' => $request->post_title,
                    'post_slug' => $request->post_slug ?? Str::slug($request->post_title),
                    'post_content' => $request->post_content,
                    'post_status' => $request->post_status ?? 'draft',
                    'author' => auth()->user()->id,
                    'post_tags' => json_decode($request->post_tags, true),
                    'url' => $request->url ?? null,
                    'description' => $request->description ?? null,
                    'post_category_id' => $request->post_category_id ?? null,
                ]);

                return redirect()->route('posts.index')->with('success', 'Post created successfully.');
            }
        }

        $post = Post::create([
            'post_title' => $request->post_title,
            'post_slug' => $request->post_slug ?? Str::slug($request->post_title),
            'post_content' => $request->post_content,
            'post_status' => $request->post_status ?? 'draft',
            'author' => auth()->user()->id,
            'post_tags' => json_decode($request->post_tags, true),
            'url' => $request->url ?? null,
            'description' => $request->description ?? null,
            'post_category_id' => $request->post_category_id ?? null,
        ]);

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');

    }



    public function edit(Post $post)
    {
        $categories = Category::all();
        return view('admin.posts.edit', compact('post', 'categories'));
    }


    public function update(Request $request, Post $post)
    {
        $request->validate([
            'post_title' => 'required',
            'post_status' => 'required',
            'post_image' => 'required',
            'type' => 'required'
        ]);

        $post->update($request->all());

        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
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
                'post_title' => $request->post_title,
                'post_slug' => $request->post_slug ?? Str::slug($request->post_title),
                'post_content' => $request->post_content,
                'type' => $request->type,
                'post_status' => 'draft',
                'author' => auth()->user()->id,
                'post_tags' => json_decode($request->post_tags, true),
                'post_image' => $request->post_image ?? null,
                'description' => $request->description ?? null,
                'post_category_id' => $request->post_category_id ?? null,
            ]
        );

        return response()->json(['success' => true, 'post_id' => $post->id]);
    }

}
