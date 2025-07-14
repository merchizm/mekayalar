<?php

namespace App\Http\Controllers\Landing;

use App\Enums\PostEnum;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Inertia\Inertia;

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

        return Inertia::render('Landing/Blog/Index', [
            'posts'      => Post::where('post_status', PostEnum::PUBLISHED)->orderBy('updated_at', 'desc')->paginate(6),
            'categories' => Category::all(),
        ]);
    }

    public function show($slug)
    {
        $post = Post::where('post_status', PostEnum::PUBLISHED)->where('post_slug', $slug)->first();

        if (!$post) {
            abort(404);
        }

        seo()
            ->title('Mekayalar.com — '.$post->post_title)
            ->description($post->description ?? '')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Blog/Show', [
            'post' => $post,
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
            'posts' => Post::where('post_status', PostEnum::PUBLISHED)
                ->where('post_category_id', $category->id)
                ->orderBy('updated_at', 'desc')
                ->paginate(6),
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

        return Inertia::render('Landing/Blog/Type', [
            'posts' => Post::where('post_status', PostEnum::PUBLISHED)
                ->where('type', $type === 'photo' ? '1' : '2')
                ->orderBy('updated_at', 'desc')
                ->paginate(6),
            'categories'  => Category::all(),
            'currentType' => $type,
            'typeLabel'   => $typeLabel,
        ]);
    }
}
