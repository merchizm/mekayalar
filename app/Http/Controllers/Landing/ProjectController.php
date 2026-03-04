<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $locale = app()->getLocale();

        seo()
            ->title('Mekayalar.com — Projelerim')
            ->description('Geliştirdiğim ve üzerinde çalıştığım projeler.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        // Cache localized projects for 1 hour per locale
        $cacheKey = "projects.localized.{$locale}";

        $featuredProjects = Cache::remember("{$cacheKey}.featured", 3600, function () use ($locale) {
            return Project::where('is_published', true)
                ->where('is_featured', 1)
                ->orderBy('completed_at', 'desc')
                ->get()
                ->filter(function ($project) use ($locale) {
                    // Only show projects that have content in the current locale
                    return $project->hasLocale($locale);
                })
                ->map(function ($project) use ($locale) {
                    return $this->localizeProject($project, $locale);
                })
                ->values();
        });

        $regularProjects = Cache::remember("{$cacheKey}.regular", 3600, function () use ($locale) {
            return Project::where('is_published', true)
                ->where('is_featured', 0)
                ->orderBy('completed_at', 'desc')
                ->get()
                ->filter(function ($project) use ($locale) {
                    // Only show projects that have content in the current locale
                    return $project->hasLocale($locale);
                })
                ->map(function ($project) use ($locale) {
                    return $this->localizeProject($project, $locale);
                })
                ->values();
        });

        return Inertia::render('Landing/Projects/Index', [
            'featuredProjects' => $featuredProjects,
            'projects'         => $regularProjects,
        ]);
    }

    private function localizeProject(Project $project, string $locale): array
    {
        return [
            'id'           => $project->id,
            'slug'         => $project->slug,
            'title'        => $project->getLocalized('title', $locale),
            'description'  => $project->getLocalized('description', $locale),
            'content'      => $project->getLocalized('content', $locale),
            'image'        => $project->image,
            'url'          => $project->url,
            'github_url'   => $project->github_url,
            'is_featured'  => $project->is_featured,
            'is_published' => $project->is_published,
            'completed_at' => $project->completed_at,
            'tags'         => $project->getLocalizedTags($locale),
            'created_at'   => $project->created_at,
            'updated_at'   => $project->updated_at,
        ];
    }

    public function show(Project $project)
    {
        if (!$project->is_published) {
            abort(404);
        }

        $locale = app()->getLocale();

        // Check if project has content in current locale
        if (!$project->hasLocale($locale)) {
            abort(404);
        }

        $localizedTitle       = $project->getLocalized('title', $locale);
        $localizedDescription = $project->getLocalized('description', $locale);

        seo()
            ->title('Mekayalar.com — '.$localizedTitle)
            ->description($localizedDescription)
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        return Inertia::render('Landing/Projects/Show', [
            'project' => $this->localizeProject($project, $locale),
        ]);
    }
}
