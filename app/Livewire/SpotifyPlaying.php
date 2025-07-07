<?php

namespace App\Livewire;

use App\Services\SpotifyService;
use Livewire\Component;

class SpotifyPlaying extends Component
{
    public $loading = false;
    public $musicName = null;


    public function mount(): void
    {
        $this->fetchData();
    }

    public function fetchData(): void
    {
        try {
            $data = (new SpotifyService())->currentPlaying();
            if ($data['is_playing']) {
                $this->musicName = "{$data['name']} - {$data['artists']}";
                $this->loading = true;
            } else {
                $this->musicName = null;
                $this->loading = false;
            }
        } catch (\Exception $e) {
            $this->loading = false;
            $this->musicName = null;
        }
    }

    public function render()
    {
        return view('livewire.spotify-playing');
    }
}
