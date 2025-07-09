<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Poem;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $stats = [
            'posts' => [
                'total' => Post::count(),
                'recent' => Post::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
            ],
            'poems' => [
                'total' => Poem::count(),
                'recent' => Poem::where('created_at', '>=', Carbon::now()->subDays(7))->count(),
            ],
            'media' => [
                'total' => count(glob(storage_path('app/public/uploads/*'))),
            ],
            'users' => [
                'total' => User::count(),
            ],
        ];

        $recentPosts = Post::latest()->take(5)->get(['id', 'post_title', 'post_status', 'created_at']);
        $recentPoems = Poem::latest()->take(5)->get(['id', 'title', 'wrote_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
            'recentPoems' => $recentPoems,
        ]);
    }
} 
