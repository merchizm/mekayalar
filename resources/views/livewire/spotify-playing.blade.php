<div wire:poll.60s="fetchData" class="p-1 rounded-xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
    @if($loading)
        <div class="flex gap-2 items-center px-3 h-10 rounded-lg transition-colors hover:bg-button-hover dark:hover:bg-button-hover-dark" title="Spotify'da Dinliyorum: {{ $musicName }}">
            <div class="equalizer-container">
                <div class="equalizer-bar"></div>
                <div class="equalizer-bar"></div>
                <div class="equalizer-bar"></div>
                <div class="equalizer-bar"></div>
            </div>
            <span class="hidden text-xs font-medium text-text dark:text-text-dark sm:inline">{{ \Illuminate\Support\Str::limit($musicName, 40) }}</span>
        </div>
    @else
        <div class="flex justify-center items-center w-10 h-10 rounded-lg transition-colors" title="Spotify'da aktif değilim">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 27 27">
                <path d="M15,3C8.4,3,3,8.4,3,15s5.4,12,12,12s12-5.4,12-12S21.6,3,15,3z M19.731,21c-0.22,0-0.33-0.11-0.55-0.22 c-1.65-0.991-3.74-1.54-5.94-1.54c-1.21,0-2.53,0.22-3.63,0.44c-0.22,0-0.44,0.11-0.55,0.11c-0.44,0-0.77-0.33-0.77-0.77 s0.22-0.77,0.66-0.77c1.43-0.33,2.861-0.55,4.401-0.55c2.53,0,4.84,0.66,6.82,1.76c0.22,0.22,0.44,0.33,0.44,0.77 C20.39,20.78,20.06,21,19.731,21z M20.94,17.921c-0.22,0-0.44-0.11-0.66-0.22c-1.87-1.21-4.511-1.87-7.37-1.87 c-1.43,0-2.751,0.22-3.74,0.44c-0.22,0.11-0.33,0.11-0.55,0.11c-0.55,0-0.881-0.44-0.881-0.881c0-0.55,0.22-0.77,0.77-0.991 c1.32-0.33,2.641-0.66,4.511-0.66c3.08,0,5.94,0.77,8.361,2.2c0.33,0.22,0.55,0.55,0.55,0.881 C21.82,17.48,21.491,17.921,20.94,17.921z M22.37,14.4c-0.22,0-0.33-0.11-0.66-0.22c-2.2-1.21-5.39-1.98-8.47-1.98 c-1.54,0-3.19,0.22-4.621,0.55c-0.22,0-0.33,0.11-0.66,0.11c-0.66,0.111-1.1-0.44-1.1-1.099s0.33-0.991,0.77-1.1 C9.39,10.22,11.26,10,13.24,10c3.41,0,6.93,0.77,9.681,2.2c0.33,0.22,0.66,0.55,0.66,1.1C23.471,13.96,23.03,14.4,22.37,14.4z"></path>
            </svg>
        </div>
    @endif
</div>
