<?php

namespace App\Livewire;

use Livewire\Component;

class TimezoneThemeSwitcher extends Component
{
    public array $hours = [];
    public ?int $currentHour = null;
    public string $themeMode = 'day';

    public function mount()
    {
        // Night-Day-Night order
        $this->hours = [
            // Late Night (6 hours)
            21, 22, 23, 0, 1, 2,
            // Day (12 hours)
            9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            // Early Morning (6 hours)
            3, 4, 5, 6, 7, 8
        ];
    }

    private function updateThemeMode(): void
    {
        if ($this->currentHour === null) {
            $this->themeMode = 'day';
            return;
        }

        $isNight = $this->currentHour >= 21 || $this->currentHour < 9;
        $this->themeMode = $isNight ? 'night' : 'day';
    }

    public function setTimezone(string $timezone): void
    {
        try {
            $this->currentHour = now($timezone)->hour;
        } catch (\Exception $e) {
            $this->currentHour = now()->hour;
        }
        $this->updateThemeMode();
    }

    public function selectHour(int $hour): void
    {
        if ($this->currentHour === $hour) {
            return;
        }

        $this->currentHour = $hour;
        $this->updateThemeMode();
    }

    public function render()
    {
        return view('livewire.timezone-theme-switcher');
    }
} 
