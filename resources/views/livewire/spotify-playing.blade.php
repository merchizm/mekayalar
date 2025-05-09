<div x-data="{ loading: @entangle('loading'), musicName: @entangle('musicName') }">
    <div x-show="loading === true" class="w-full bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] mt-8">
        <div class="flex items-center p-4 gap-3">
            <div class="flex-shrink-0">
                <svg viewBox="0 0 32 32" version="1.1" width="42" height="42" xmlns="http://www.w3.org/2000/svg"
                    class="text-[#1DB954]">
                    <g stroke-width="0"></g>
                    <g stroke-linecap="round" stroke-linejoin="round"></g>
                    <g>
                        <path fill="currentColor"
                            d="M24.849 14.35c-3.206-1.616-6.988-2.563-10.991-2.563-2.278 0-4.484 0.306-6.58 0.881l0.174-0.041c-0.123 0.040-0.265 0.063-0.412 0.063-0.76 0-1.377-0.616-1.377-1.377 0-0.613 0.401-1.132 0.954-1.311l0.010-0.003c5.323-1.575 14.096-1.275 19.646 2.026 0.426 0.258 0.706 0.719 0.706 1.245 0 0.259-0.068 0.502-0.186 0.712l0.004-0.007c-0.29 0.345-0.721 0.563-1.204 0.563-0.273 0-0.529-0.070-0.752-0.192l0.008 0.004zM24.699 18.549c-0.201 0.332-0.561 0.55-0.971 0.55-0.225 0-0.434-0.065-0.61-0.178l0.005 0.003c-2.739-1.567-6.021-2.49-9.518-2.49-1.925 0-3.784 0.28-5.539 0.801l0.137-0.035c-0.101 0.032-0.217 0.051-0.337 0.051-0.629 0-1.139-0.51-1.139-1.139 0-0.509 0.333-0.939 0.793-1.086l0.008-0.002c1.804-0.535 3.878-0.843 6.023-0.843 3.989 0 7.73 1.064 10.953 2.925l-0.106-0.056c0.297 0.191 0.491 0.52 0.491 0.894 0 0.227-0.071 0.437-0.192 0.609l0.002-0.003zM22.899 22.673c-0.157 0.272-0.446 0.452-0.777 0.452-0.186 0-0.359-0.057-0.502-0.154l0.003 0.002c-2.393-1.346-5.254-2.139-8.299-2.139-1.746 0-3.432 0.261-5.020 0.745l0.122-0.032c-0.067 0.017-0.145 0.028-0.224 0.028-0.512 0-0.927-0.415-0.927-0.927 0-0.432 0.296-0.795 0.696-0.898l0.006-0.001c1.581-0.47 3.397-0.74 5.276-0.74 3.402 0 6.596 0.886 9.366 2.44l-0.097-0.050c0.302 0.15 0.506 0.456 0.506 0.809 0 0.172-0.048 0.333-0.132 0.469l0.002-0.004zM16 1.004c0 0 0 0-0 0-8.282 0-14.996 6.714-14.996 14.996s6.714 14.996 14.996 14.996c8.282 0 14.996-6.714 14.996-14.996v0c-0.025-8.272-6.724-14.971-14.993-14.996h-0.002z"></path>
                    </g>
                </svg>
            </div>
            <div class="flex flex-col">
                <span class="text-xs text-light-text dark:text-light-text-dark">Şu an dinlediğim</span>
                <span class="font-medium text-sm md:text-base line-clamp-1 group-hover:text-menu-active dark:group-hover:text-menu-active-dark" x-text="musicName"></span>
                <div class="flex items-center mt-1">
                    <div class="flex space-x-1">
                        <span class="bg-[#1DB954] w-1 h-1 rounded-full animate-spotify-playing"></span>
                        <span class="bg-[#1DB954] w-1 h-1 rounded-full animate-spotify-playing animation-delay-100"></span>
                        <span class="bg-[#1DB954] w-1 h-1 rounded-full animate-spotify-playing animation-delay-200"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div x-show="loading === false" class="w-full bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark overflow-hidden transition-all duration-300 mt-8 p-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <svg viewBox="0 0 32 32" version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg"
                    class="text-light-text dark:text-light-text-dark opacity-50">
                    <g stroke-width="0"></g>
                    <g stroke-linecap="round" stroke-linejoin="round"></g>
                    <g>
                        <path fill="currentColor"
                            d="M16 1.004c-8.282 0-14.996 6.714-14.996 14.996s6.714 14.996 14.996 14.996c8.282 0 14.996-6.714 14.996-14.996-0.025-8.272-6.724-14.971-14.993-14.996h-0.002z"></path>
                    </g>
                </svg>
                <div class="flex flex-col">
                    <span class="text-xs text-light-text dark:text-light-text-dark">Şu an dinlenen müzik yok</span>
                </div>
            </div>
        </div>
    </div>
</div>

@script
<script>
    document.addEventListener('fetchDataInterval', function () {
        setInterval(() => {
            $wire.fetchData();
        }, 1000 * (60));
    });
</script>
@endscript
