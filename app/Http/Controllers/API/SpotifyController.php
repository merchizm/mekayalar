<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\SpotifyService;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;

class SpotifyController extends Controller
{
    private SpotifyService $service;

    public function __construct()
    {
        $this->service = new SpotifyService();
    }

    public function authToSpotify(): Application|Redirector|\Illuminate\Contracts\Foundation\Application|RedirectResponse
    {
        return redirect($this->service->auth());
    }

    public function callback(Request $request): JsonResponse
    {
        $this->service->callback($request);

        return response()->json([
            'message' => 'Success',
        ]);
    }

    public function playing(): JsonResponse
    {
        return response()->json($this->service->currentPlaying());
    }

    public function playlists(Request $request): JsonResponse
    {
        return response()->json($this->service->userPlaylists($request->query('offset', 0)));
    }
}
