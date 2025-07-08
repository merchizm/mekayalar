<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Poem;
use Inertia\Inertia;

class PoemController extends Controller
{
    public function index()
    {
        seo()
            ->title('Mekayalar.com — Şiirlerim')
            ->description('Şiirleri sadece duygularımı ifade etmek için kullandığım bir gerçek, bu nedenle şairlere nazaran bir performans benden katiyen beklenmemeli ve öyle şiirleri okumalı.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Poem/Index', [
            'poems' => Poem::orderBy('wrote_at', 'desc')->get(),
        ]);
    }

    public function show($slug)
    {
        $poem = Poem::where('slug', $slug)->first();

        if ($poem->exists()) {
            seo()
                ->title('Mekayalar.com — '.$poem->title)
                ->twitter()
                ->twitterCreator('merchizm')
                ->locale('tr_TR')
                ->withUrl();

            return Inertia::render('Landing/Poem/Show', [
                'poem' => $poem,
            ]);
        } else {
            abort(404);
        }
    }
}
