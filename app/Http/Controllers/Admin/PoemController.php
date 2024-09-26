<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Poem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PoemController extends Controller
{
    public function index()
    {
        $poems = Poem::orderBy('id', 'desc')->get();
        return view('admin.poems', compact('poems'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'status' => 'required|in:published,draft,trash',
            'wrote_at' => 'required|date',
        ]);

        $slug = Str::slug($request->title);

        Poem::create(array_merge($request->all(), ['slug' => $slug]));

        return response()->json(['message' => 'Poem created successfully!'], 200);
    }

    public function show(Poem $poem)
    {
        return response()->json($poem);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'status' => 'required|in:published,draft,trash',
            'wrote_at' => 'required|date',
        ]);

        $poem = Poem::findOrFail($id);
        $slug = Str::slug($request->title);
        $poem->update(array_merge($request->all(), ['slug' => $slug]));

        return response()->json(['message' => 'Poem updated successfully!'], 200);
    }

    public function destroy($id)
    {
        $poem = Poem::findOrFail($id);
        $poem->delete();

        return response()->json(['message' => 'Poem deleted successfully!'], 200);
    }
}
