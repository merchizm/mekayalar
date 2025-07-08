<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
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

        return Inertia::render('Landing/Bookshelf/Index', [
            'playlists'  => $this->spotifyService->userPlaylists(),
            'repos'      => $this->githubService->getRepos(),
            'gists'      => $this->githubService->getGists(),
            'langColors' => $this->githubService->getLangColors(),
        ]);
    }
}
