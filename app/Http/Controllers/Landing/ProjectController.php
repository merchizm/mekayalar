<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        seo()
            ->title('Mekayalar.com — Projelerim')
            ->description('Geliştirdiğim ve üzerinde çalıştığım projeler.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return view('landing.projects.index', [
            'featuredProjects' => Project::where('is_published', true)
                                         ->where('is_featured', 1)
                                         ->orderBy('completed_at', 'desc')
                                         ->get(),
            'projects' => Project::where('is_published', true)
                                 ->where('is_featured', 0)
                                 ->orderBy('completed_at', 'desc')
                                 ->get()
        ]);
    }

    public function show(Project $project)
    {
        if (!$project->is_published) {
            abort(404);
        }

        seo()
            ->title('Mekayalar.com — ' . $project->title)
            ->description($project->description)
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return view('landing.projects.show', [
            'project' => $project
        ]);
    }
}
