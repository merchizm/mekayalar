<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.projects.index', [
            'projects' => Project::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.projects.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string|max:255',
            'content'      => 'nullable|string',
            'url'          => 'nullable|url|max:255',
            'github_url'   => 'nullable|url|max:255',
            'is_featured'  => 'nullable|sometimes',
            'is_published' => 'nullable|sometimes',
            'completed_at' => 'nullable|date',
            'image'        => 'required|url|max:255',
        ]);

        // Set boolean values
        $validated['is_featured']  = $request->has('is_featured');
        $validated['is_published'] = $request->has('is_published');

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return view('admin.projects.show', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return view('admin.projects.edit', compact('project'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string|max:255',
            'content'      => 'nullable|string',
            'url'          => 'nullable|url|max:255',
            'github_url'   => 'nullable|url|max:255',
            'is_featured'  => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
            'completed_at' => 'nullable|date',
            'image'        => 'nullable|url|max:255',
        ]);

        // Set boolean values
        $validated['is_featured']  = $request->has('is_featured');
        $validated['is_published'] = $request->has('is_published');

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Delete project image if exists
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully!');
    }
}
