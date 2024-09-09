<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Enums\PostEnum;
use App\Models\Category;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return view('landing.blog.index', [
            'posts' => Post::where('post_status', PostEnum::PUBLISHED)->orderBy('updated_at', 'desc')->get(),
            'categories' => Category::all(),
        ]);
    }

    public function show($slug)
    {
        return view('landing.blog.show', [
            'post' => Post::where('post_status', PostEnum::PUBLISHED)->where('post_slug', $slug)->first()
        ]);
    }
}
