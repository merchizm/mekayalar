<?php

namespace App\Http\Controllers\Landing;

use Illuminate\Http\Request;
use App\Services\GithubService;
use App\Services\SpotifyService;
use App\Http\Controllers\Controller;

class BookshelfController extends Controller
{
    private $spotifyService;
    private $githubService;

    public function __construct()
    {
        $this->spotifyService = new SpotifyService();
        $this->githubService = new GithubService();
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

        return view('landing.bookshelf.index', [
            'playlists' => $this->spotifyService->userPlaylists(),
            'repos' => $this->githubService->getRepos(),
            'gists' => $this->githubService->getGists(),
            'langColors' => $this->githubService->getLangColors(),
        ]);
    }
}
