<?php

namespace App\Http\Controllers\Landing;

use App\Enums\PostEnum;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

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
            'posts'      => Post::where('post_status', PostEnum::PUBLISHED)->orderBy('updated_at', 'desc')->get(),
            'categories' => Category::all(),
        ]);
    }

    public function show($slug)
    {
        $post = Post::where('post_status', PostEnum::PUBLISHED)->where('post_slug', $slug)->first();
        seo()
            ->title('Mekayalar.com — '.$post->post_title)
            ->description($post->description)
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return view('landing.blog.show', [
            'post' => $post,
        ]);
    }

    public function category($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        seo()
            ->title('Mekayalar.com — '.$category->name.' Kategorisi')
            ->description($category->description)
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return view('landing.blog.category', [
            'posts' => Post::where('post_status', PostEnum::PUBLISHED)
                ->where('post_category_id', $category->id)
                ->orderBy('updated_at', 'desc')
                ->get(),
            'categories'      => Category::all(),
            'currentCategory' => $category,
        ]);
    }

    public function type($type)
    {
        $typeLabel = ($type === 'photo') ? 'Fotoğraf' : 'Çizim';

        seo()
            ->title('Mekayalar.com — '.$typeLabel.' Gönderileri')
            ->description($typeLabel.' türündeki gönderilerim.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return view('landing.blog.type', [
            'posts' => Post::where('post_status', PostEnum::PUBLISHED)
                ->where('type', $type === 'photo' ? '1' : '2')
                ->orderBy('updated_at', 'desc')
                ->get(),
            'categories'  => Category::all(),
            'currentType' => $type,
            'typeLabel'   => $typeLabel,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        seo()
            ->title('Mekayalar.com — "'.$query.'" Araması')
            ->description('"'.$query.'" için arama sonuçları')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        $posts = Post::where('post_status', PostEnum::PUBLISHED)
            ->where(function ($q) use ($query): void {
                $q->where('post_title', 'like', '%'.$query.'%')
                    ->orWhere('post_content', 'like', '%'.$query.'%');
            })
            ->orderBy('updated_at', 'desc')
            ->get();

        return view('landing.blog.search', [
            'posts'      => $posts,
            'categories' => Category::all(),
            'query'      => $query,
        ]);
    }
}
