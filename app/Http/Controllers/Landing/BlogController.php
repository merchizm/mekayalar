<?php

namespace App\Http\Controllers\Landing;

use App\Models\Post;
use App\Enums\PostEnum;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class BlogController extends Controller
{
    public function index()
    {
        seo()
            ->title('Mekayalar.com — Gönderilerim')
            ->description('Çizimlerim, çektiğim fotoğraflar ve blog yazılarım.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return view('landing.blog.index', [
            'posts' => Post::where('post_status', PostEnum::PUBLISHED)->orderBy('updated_at', 'desc')->get(),
            'categories' => Category::all(),
        ]);
    }

    public function show($slug)
    {
        $post = Post::where('post_status', PostEnum::PUBLISHED)->where('post_slug', $slug)->first();
        seo()
            ->title('Mekayalar.com — '. $post->post_title)
            ->description($post->description)
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return view('landing.blog.show', [
            'post' => $post
        ]);
    }
}
