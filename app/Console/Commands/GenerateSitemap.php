<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\Poem;
use App\Models\Project;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating sitemap...');
        
        // Create a new sitemap
        $sitemap = Sitemap::create();

        // Add static pages
        $sitemap->add(Url::create('/')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            ->setPriority(1.0));
        
        $sitemap->add(Url::create('/blog')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            ->setPriority(0.8));
        
        $sitemap->add(Url::create('/poems')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            ->setPriority(0.8));
            
        $sitemap->add(Url::create('/projects')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            ->setPriority(0.8));
            
        $sitemap->add(Url::create('/bookshelf')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
            ->setPriority(0.7));
            
        $sitemap->add(Url::create('/bookmarks')
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
            ->setPriority(0.7));

        // Add blog posts
        $posts = Post::where('is_published', true)->get();
        foreach ($posts as $post) {
            $sitemap->add(
                Url::create("/blog/{$post->slug}")
                    ->setLastModificationDate($post->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.7)
            );
        }

        // Add poems
        $poems = Poem::where('is_published', true)->get();
        foreach ($poems as $poem) {
            $sitemap->add(
                Url::create("/poems/{$poem->slug}")
                    ->setLastModificationDate($poem->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.7)
            );
        }
        
        // Add projects
        $projects = Project::where('is_published', true)->get();
        foreach ($projects as $project) {
            $sitemap->add(
                Url::create("/projects/{$project->slug}")
                    ->setLastModificationDate($project->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.7)
            );
        }

        // Ensure the storage directory exists
        $sitemapPath = public_path('sitemap.xml');
        
        // Write the sitemap to disk
        $sitemap->writeToFile($sitemapPath);
        
        $this->info('Sitemap generated at: ' . $sitemapPath);
    }
}
