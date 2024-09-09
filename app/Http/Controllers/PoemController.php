<?php

namespace App\Http\Controllers;

use App\Models\Poem;
use Illuminate\Http\Request;

class PoemController extends Controller
{
    public function index()
    {
        return view('landing.poem.index', [
            'poems' => Poem::orderBy('wrote_at', 'desc')->get()
        ]);
    }


    public function show($slug)
    {
        $poem = Poem::where('slug', $slug);

        if ($poem->exists()) {
            return view('landing.poem.show', [
                'poem' => $poem->first()
            ]);
        }else{
            abort(404);
        }
    }
}
