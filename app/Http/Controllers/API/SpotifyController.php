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

    public function currentlyPlaying(SpotifyService $spotifyService): JsonResponse
    {
        try {
            $data = $spotifyService->currentPlaying();
            if ($data['is_playing']) {
                return response()->json([
                    'isPlaying' => true,
                    'musicName' => "{$data['name']} - {$data['artists']}",
                ]);
            }
        } catch (\Exception $e) {
            // Do nothing, return default response
        }

        return response()->json([
            'isPlaying' => false,
            'musicName' => null,
        ]);
    }
}
