<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Services\GithubService;
use App\Services\SpotifyService;
use Inertia\Inertia;

class BookshelfController extends Controller
{
    private $spotifyService;
    private $githubService;

    public function __construct()
    {
        $this->spotifyService = new SpotifyService();
        $this->githubService  = new GithubService();
    }

    public function index()
    {
        seo()
            ->title('Mekayalar.com — Kitaplık')
            ->description('Playlistlerim, okuduğum kitaplarım, github repolarım.')
            ->twitter()
            ->twitterCreator('merchizm')
            ->locale('tr_TR')
            ->withUrl();

        $perPage   = 13;
        $page      = max(1, (int) request()->query('page', 1));
        $offset    = ($page - 1) * $perPage;
        $playlists = $this->spotifyService->userPlaylists($offset, $perPage);

        return Inertia::render('Landing/Bookshelf/Index', [
            'playlists'          => $playlists,
            'playlistPagination' => [
                'page'    => $page,
                'perPage' => $perPage,
                'total'   => $playlists['total'] ?? 0,
                'hasPrev' => $page > 1,
                'hasNext' => isset($playlists['next']) && $playlists['next'],
            ],
            'repos' => $this->githubService->getRepos(),
            'gists' => $this->githubService->getGists(),
            'books' => Book::query()
                ->where('is_public', true)
                ->orderBy('sort_order')
                ->orderByDesc('finished_at')
                ->get(),
            'langColors' => $this->githubService->getLangColors(),
        ]);
    }
}
