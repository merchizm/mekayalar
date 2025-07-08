<?php

namespace App\Livewire;

use App\Models\TechStack;
use Illuminate\Support\Facades\Cookie;
use Livewire\Component;

class SoftwareTabs extends Component
{
    public $isDarkMode = false;

    public function mount(): void
    {
        $this->isDarkMode = Cookie::get('dark_mode', false);
    }

    public function getSvg($svgName, $svgType)
    {
        if ($svgType === 'withoutdm') {
            return url('assets/icons/solids/'.$svgName.'.svg');
        } else {
            if ($this->isDarkMode !== false) {
                return url('assets/icons/dark/'.$svgName.'.svg');
            } else {
                return url('assets/icons/light'.$svgName.'.svg');
            }
        }
    }

    public function render()
    {
        return view('livewire.software-tabs',[
            'techs' => TechStack::all()->groupBy('status'),
        ]);
    }
}
