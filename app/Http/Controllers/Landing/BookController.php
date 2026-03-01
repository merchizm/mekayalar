<?php

namespace App\Http\Controllers\Landing;

use App\Enums\PostEnum;
use App\Http\Controllers\Controller;
use App\Models\Book;
use Inertia\Inertia;

class BookController extends Controller
{
    public function show(Book $book)
    {
        abort_unless($book->is_public, 404);

        $quotePosts = $book->posts()
            ->where('post_status', PostEnum::PUBLISHED)
            ->where('type', '3')
            ->with(['books', 'albumItems'])
            ->latest('updated_at')
            ->get();

        seo()
            ->title('Mekayalar.com — '.$book->title)
            ->description($book->author.' kitabına ait notlar ve alıntılar.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Books/Show', [
            'book'       => $book,
            'quotePosts' => $quotePosts,
        ]);
    }
}
