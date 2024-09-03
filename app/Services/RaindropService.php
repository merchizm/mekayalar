<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use SoftinkLab\LaravelKeyvalueStorage\Facades\KVOption;

class RaindropService
{

    /**
     * @throws GuzzleException
     * @throws Exception
     */
    function getBookmarks($page = 0, $items = []): array
    {
       try{
           $client = new Client();
           $collectionId = '28611701';
           $perPage = 50;
           $created = '2021-01-01';
           $endPoint = "https://api.raindrop.io/rest/v1/raindrops/{$collectionId}?perpage={$perPage}&page={$page}&search=created:>{$created}&sort=-created";

           $response = $client->request('GET', $endPoint, [
               'headers' => [
                   'Authorization' => 'Bearer ' . KVOption::get('raindrop_access_token'),
               ]
           ]);

           $data = json_decode($response->getBody()->getContents(), true);

           if ($data['count'] === $perPage) {
               return $this->getBookmarks($page + 1, array_merge($items, $data['items']));
           } else {
               return array_merge($items, $data['items']);
           }
       }catch(GuzzleException){
           $res = $this->refreshToken();
           if(isset($res['error']))
               throw new Exception($res['message']);
           else
               return $this->getBookmarks($page, $items);
       }
    }

    function shorten_data($data) : Collection
    {
        return collect($data)->map(function ($bookmark) {
            return [
                'title' => $bookmark['title'],
                'link' => $bookmark['link'],
                'created' => $bookmark['created'],
                'domain' => $bookmark['domain']
            ];
        })->sortByDesc(function ($bookmark) {
            return new Carbon($bookmark['created']);
        })->values()->all();
    }

    /**
     * @throws GuzzleException
     */
    function getBookmarksGroupByWeek(): Collection
    {
        $bookmarks = $this->shorten_data($this->getBookmarks());
        return collect($bookmarks)->groupBy(function ($bookmark) {
            $date = Carbon::parse($bookmark['created']);
            $week = $date->weekOfYear;
            $month = $date->month;
            if ($month === 1 && in_array($week, [52, 53])) {
                return 0;
            }
            return $week;
        });
    }

    /**
     * @throws GuzzleException
     */
    function getBookmarksGroupByDay(): Collection
    {
        $bookmarks = $this->getBookmarks();
        return collect($bookmarks)->groupBy(function ($bookmark) {
            return explode('T', $bookmark['created'])[0];
        });
    }


    function refreshToken(): array
    {
        $client = new Client();
        $url = 'https://raindrop.io/oauth/access_token';

        try {
            $response = $client->post($url, [
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'client_id' => config('external.raindrop_client_id'),
                    'client_secret' => config('external.raindrop_client_secret'),
                    'grant_type' => 'refresh_token',
                    'refresh_token' =>  KVOption::get('raindrop_refresh_token'),
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            KVOption::set('raindrop_access_token', $body['access_token']);
            KVOption::set('raindrop_refresh_token', $body['refresh_token']);
            KVOption::set('raindrop_dead_time', Carbon::now()->timestamp + (int) $body['expires_in']);

            // Handle the response as needed, for example, return or store the new tokens
            return [
                'access_token' => $body['access_token'],
                'refresh_token' => $body['refresh_token'],
                'expires_in' => $body['expires_in'], // You can calculate the exact expiry time by adding this value to the current time
                'token_type' => $body['token_type'],
            ];
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            // Handle error, possibly return or log
            return [
                'error' => true,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function authorize(): string
    {
        return "https://raindrop.io/oauth/authorize?client_id=".config('external.raindrop_client_id')."&redirect_uri=".config('external.raindrop_callback_url');
    }

    public function callback(Request $request)
    {
        if($request->has('code'))
        {
            $client = new Client();
            $response = $client->post('https://raindrop.io/oauth/access_token', [
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'code' => $request->query('code'),
                    'client_id' => config('external.raindrop_client_id'),
                    'redirect_uri' => config('external.raindrop_callback_url'),
                    'client_secret' => config('external.raindrop_client_secret'),
                    'grant_type' => 'authorization_code'
                ]
            ]);

            $body = json_decode($response->getBody(), true);

            if($response->getStatusCode() === 200)
            {
                KVOption::set('raindrop_dead_time', Carbon::now()->timestamp + (int) $body['expires_in']);
                KVOption::set('raindrop_access_token', $body['access_token']);
                KVOption::set('raindrop_refresh_token', $body['refresh_token']);

                return [
                    'access_token' => $body['access_token'],
                    'refresh_token' => $body['refresh_token'],
                    'expires_in' => $body['expires_in'], // You can calculate the exact expiry time by adding this value to the current time
                    'token_type' => $body['token_type'],
                ];
            }else{
                return [
                    'error' => 'true',
                    'message' => 'params invalid',
                    'response' => $body
                ];
            }
        }else{
            return [
                'error' => 'true',
                'message' => 'params invalid'
            ];
        }
    }
}
