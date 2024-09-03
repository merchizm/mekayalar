<?php

namespace App\Services;
use GuzzleHttp\Client;
use SoftinkLab\LaravelKeyvalueStorage\Facades\KVOption;

class GithubService
{

    function getRequest($url) {
        $client = new Client();
        $authHeader = [
            'Accept' => 'application/vnd.github.v3+json',
            'Authorization' => 'token ' . KVOption::get('github_access_token'),
        ];

        try {
            $response = $client->request('GET', $url, [
                'headers' => $authHeader,
            ]);

            $result = json_decode($response->getBody()->getContents(), true);

            if (isset($result['message']) && $response->getStatusCode() > 400) {
                throw new \Exception($response->getStatusCode() . ' ' . $response->getReasonPhrase() . "\n" . $result['message']);
            }

            return $result;
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * @throws \Exception
     */
    function getRepos() : array
    {
        $url = "https://api.github.com/user/repos?visibility=public&sort=pushed";
        $repos = $this->getRequest($url);

        $shorten = function ($data) {
            return array_map(function ($repo) {
                return [
                    'name' => $repo['name'],
                    'description' => $repo['description'],
                    'stargazers_count' => $repo['stargazers_count'],
                    'forks_count' => $repo['forks_count'],
                    'html_url' => $repo['html_url'],
                    'language' => $repo['language'],
                ];
            }, $data);
        };

        return $shorten($repos);
    }

    /**
     * @throws \Exception
     */
    function getGists() : array
    {
        $url = "https://api.github.com/gists";
        $gists = $this->getRequest($url);

        $shorten = function ($data) {
            return array_map(function ($gist) {
                return [
                    'description' => $gist['description'],
                    'created_at' => $gist['created_at'],
                    'comments' => $gist['comments'],
                    'html_url' => $gist['html_url'],
                ];
            }, $data);
        };

        return $shorten($gists);
    }

}
