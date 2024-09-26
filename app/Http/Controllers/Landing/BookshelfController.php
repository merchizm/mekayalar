<?php

namespace App\Http\Controllers\Landing;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookshelfController extends Controller
{
    public function index()
    {
        return view('landing.bookshelf.index');
    }
}
