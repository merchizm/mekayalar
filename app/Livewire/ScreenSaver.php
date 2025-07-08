<?php

namespace App\Livewire;

use Livewire\Component;

class ScreenSaver extends Component
{
    public $showScreenSaver = false;
    protected $listeners    = ['mouseMoved', 'mouseLeft'];

    public function mouseMoved(): void
    {
        $this->showScreenSaver = false;
    }

    public function mouseLeft(): void
    {
        if (!$this->showScreenSaver) {
            $this->showScreenSaver = true;
        }
    }

    public function render()
    {
        return view('livewire.screen-saver');
    }
}
