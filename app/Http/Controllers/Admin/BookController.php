<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Books/Index', [
            'books' => Book::query()->orderByDesc('finished_at')->orderBy('sort_order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Books/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'author'         => 'required|string|max:255',
            'cover_image'    => 'nullable|string|max:255',
            'publisher'      => 'nullable|string|max:255',
            'published_year' => 'nullable|integer|min:0|max:9999',
            'started_at'     => 'nullable|date',
            'finished_at'    => 'nullable|date',
            'rating'         => 'nullable|integer|min:1|max:10',
            'notes'          => 'nullable|string',
            'status'         => 'required|string|in:reading,completed,on_hold,dropped',
            'is_public'      => 'nullable|boolean',
            'sort_order'     => 'nullable|integer|min:0',
        ]);

        Book::create($validated);

        return redirect()->route('admin.books.index')->with('success', 'Kitap eklendi.');
    }

    public function edit(Book $book)
    {
        return Inertia::render('Admin/Books/Edit', [
            'book' => $book,
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'author'         => 'required|string|max:255',
            'cover_image'    => 'nullable|string|max:255',
            'publisher'      => 'nullable|string|max:255',
            'published_year' => 'nullable|integer|min:0|max:9999',
            'started_at'     => 'nullable|date',
            'finished_at'    => 'nullable|date',
            'rating'         => 'nullable|integer|min:1|max:10',
            'notes'          => 'nullable|string',
            'status'         => 'required|string|in:reading,completed,on_hold,dropped',
            'is_public'      => 'nullable|boolean',
            'sort_order'     => 'nullable|integer|min:0',
        ]);

        $book->update($validated);

        return redirect()->route('admin.books.index')->with('success', 'Kitap güncellendi.');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('admin.books.index')->with('success', 'Kitap silindi.');
    }
}
