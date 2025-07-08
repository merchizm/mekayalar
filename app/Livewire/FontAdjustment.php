<?php

namespace App\Livewire;

use Livewire\Component;

class FontAdjustment extends Component
{
    public array $fontSizes        = ['12px', '14px', '', '18px', '20px', '22px', '23px'];
    public string $currentFontSize = '';
    public bool $fontSizeModified  = false;

    public function decreaseFont(): void
    {
        $index = array_search($this->currentFontSize, $this->fontSizes);
        if ($index > 0) {
            $this->currentFontSize  = $this->fontSizes[$index - 1];
            $this->fontSizeModified = true;
        }
    }

    public function increaseFont(): void
    {
        $index = array_search($this->currentFontSize, $this->fontSizes);
        if ($index !== false && $index < count($this->fontSizes) - 1) {
            $this->currentFontSize  = $this->fontSizes[$index + 1];
            $this->fontSizeModified = true;
        }
    }

    public function normalizeFont(): void
    {
        $this->currentFontSize  = $this->fontSizes[2];
        $this->fontSizeModified = false;
    }

    public function render()
    {
        return view('livewire.font-adjustment');
    }
}
