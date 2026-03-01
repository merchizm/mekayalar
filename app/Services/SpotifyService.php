<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use SoftinkLab\LaravelKeyvalueStorage\Facades\KVOption;
use SpotifyWebAPI;
use SpotifyWebAPI\SpotifyWebAPIAuthException;
use SpotifyWebAPI\SpotifyWebAPIException;

class SpotifyService
{
    /** @var SpotifyWebAPI\Session */
    private SpotifyWebAPI\Session $session;

    /** @var string[][] */
    private array $options;

    /** @var SpotifyWebAPI\SpotifyWebAPI */
    private SpotifyWebAPI\SpotifyWebAPI $api;

    /** @var mixed */
    private mixed $json_data;

    public function __construct()
    {
        // initialize spotify API
        $this->session = new SpotifyWebAPI\Session(
            config('external.spotify_client_id'),
            config('external.spotify_client_secret'),
            config('external.spotify_callback_url'),
        );

        $this->options = [
            'scope' => ['user-read-currently-playing', 'playlist-read-private'],
        ];

        $this->api = new SpotifyWebAPI\SpotifyWebAPI(session: $this->session);
    }

    public function auth(): string
    {
        return $this->session->getAuthorizeUrl($this->options);
    }

    /**
     * refresh the access token.
     *
     * @return void
     */
    private function refreshToken(): void
    {
        $this->session->refreshAccessToken(KVOption::get('spotify_refresh_token'));
        KVOption::set('spotify_access_token', $this->session->getAccessToken());
        KVOption::set('spotify_refresh_token', $this->session->getRefreshToken());
    }

    /**
     * get current playing song.
     *
     * @return array
     */
    public function currentPlaying(): array
    {
        $cp = function () {
            $this->setAccessToken();
            $result = (array) $this->api->getMyCurrentTrack();
            if (empty($result)) {
                return ['is_playing' => false];
            }
            $artists = [];
            foreach ($result['item']->artists as $artist) {
                $artists[] = $artist->name;
            }

            return [
                'name'       => $result['item']->name,
                'artists'    => implode(', ', $artists),
                'is_playing' => $result['is_playing'],
                'url'        => $result['item']->external_urls->spotify,
            ];
        };
        try {
            // check result is valid
            $result = $cp();

            $last_response = $this->api->getLastResponse();
            if (
                $result['is_playing'] === false ||
                $last_response['status'] == !200 ||
                $last_response['status'] == !204
            ) {
                // @see https://developer.spotify.com/documentation/web-api/
                $this->refreshToken();

                return $result;
            } else {
                return $result;
            }
        } catch (SpotifyWebAPIAuthException $ex) {
            return ['error' => 'The access token could not be refreshed.', 'is_playing' => false];
        } catch (SpotifyWebAPIException $ex) {
            // if access token is expired, renew with refresh token and try again
            $this->refreshToken();

            return $cp();
        }
    }

    public function setAccessToken(): void
    {
        $this->session->setAccessToken(KVOption::get('spotify_access_token'));
        $this->api->setAccessToken(KVOption::get('spotify_access_token'));
    }

    /**
     * get all user playlists.
     */
    public function userPlaylists(int $offset = 0, int $limit = 12): array
    {
        return Cache::remember(
            "spotify.user_playlists.{$offset}.{$limit}",
            now()->addHours(12),
            function () use ($offset, $limit) {
                $this->setAccessToken();
                $userId = null;

                try {
                    $me     = $this->api->me();
                    $userId = $me->id ?? null;
                } catch (SpotifyWebAPIException) {
                    $userId = null;
                }

                if ($userId) {
                    return (array) $this->api->getUserPlaylists($userId, [
                        'limit'  => $limit,
                        'offset' => $offset,
                    ]);
                }

                return (array) $this->api->getMyPlaylists([
                    'limit'  => $limit,
                    'offset' => $offset,
                ]);
            }
        );
    }

    public function playlistPreview(string $playlistId, int $limit = 6): array
    {
        return Cache::remember(
            "spotify.playlist_preview.{$playlistId}.{$limit}",
            now()->addMonth(),
            function () use ($playlistId, $limit) {
                $this->setAccessToken();

                $tracks = $this->api->getPlaylistTracks($playlistId, [
                    'limit' => $limit,
                ]);

                $items = [];
                foreach ($tracks->items ?? [] as $item) {
                    $track = $item->track ?? null;
                    if (!$track) {
                        continue;
                    }

                    $artists = [];
                    foreach ($track->artists ?? [] as $artist) {
                        $artists[] = $artist->name;
                    }

                    $image = null;
                    if (!empty($track->album->images)) {
                        $image = $track->album->images[0]->url ?? null;
                    }

                    $items[] = [
                        'id'      => $track->id ?? null,
                        'name'    => $track->name ?? '',
                        'artists' => implode(', ', $artists),
                        'image'   => $image,
                    ];
                }

                return [
                    'tracks' => $items,
                ];
            }
        );
    }

    public function callback(Request $request): void
    {
        if ($request->has('code')) {
            $this->session->requestAccessToken($_GET['code']);
            $this->api->setAccessToken($this->session->getAccessToken());
            KVOption::set('spotify_access_token', $this->session->getAccessToken());
            KVOption::set('spotify_refresh_token', $this->session->getRefreshToken());
        }
    }
}
