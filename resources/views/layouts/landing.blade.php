<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <x-seo::meta />

    @yield('styles')
    @livewireStyles
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://cdn.jsdelivr.net/gh/Joe12387/detectIncognito@main/dist/es5/detectIncognito.min.js"></script>
</head>
<body class="body dark">
<div class="relative min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark">
    <header class="flex fixed top-4 z-50 justify-center px-4 w-full transition-all duration-300">
        <div class="relative">
            <nav class="overflow-hidden rounded-full backdrop-blur-lg bg-background/80 dark:bg-background-dark/80">
                <div class="mobile-nav-container">
                    <ul class="flex gap-1 items-center p-2 whitespace-nowrap md:justify-center">
                        <li>
                            <a href="{{ route('landing.index') }}" class="px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 {{ request()->routeIs('landing.index') ? 'bg-menu-active text-white dark:text-text-dark' : 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark' }}">
                                Hakkımda
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('blog.index') }}" class="px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 {{ request()->routeIs('blog.index') || request()->routeIs('blog.*') ? 'bg-menu-active text-white dark:text-text-dark' : 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark' }}">
                                Gönderilerim
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('poems.index') }}" class="px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 {{ request()->routeIs('poems.index') || request()->routeIs('poems.*') ? 'bg-menu-active text-white dark:text-text-dark' : 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark' }}">
                                Şiirlerim
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('projects.index') }}" class="px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 {{ request()->routeIs('projects.index') ? 'bg-menu-active text-white dark:text-text-dark' : 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark' }}">
                                Projelerim
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('bookshelf.index') }}" class="px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 {{ request()->routeIs('bookshelf.index') ? 'bg-menu-active text-white dark:text-text-dark' : 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark' }}">
                                Kitaplık
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('bookmarks.index') }}" class="px-4 md:px-5 py-2.5 md:py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 {{ request()->routeIs('bookmarks.index') ? 'bg-menu-active text-white dark:text-text-dark' : 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark' }}">
                                Yer İmleri
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>

    <div class="px-4 pt-28 pb-40 mx-auto max-w-screen-xl">
        <div class="flex flex-col items-center mb-16 text-center">
            <div class="w-full max-w-[300px] mb-4 mx-auto">
                <x-logo/>
            </div>
            <h1 class="text-5xl font-bold tracking-tighter lg:text-7xl">Meriç Enes Kayalar</h1>
            <p class="mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">Yazılımcı • Pixel Artist • Herbokolok</p>
        </div>

        <main class="mx-auto w-full max-w-4xl">
            <div class="flex gap-2 justify-end items-center px-0 py-2.5 mb-4">
                <livewire:spotify-playing/>
                <div class="p-1 rounded-xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
                    <a href="#" class="flex justify-center items-center w-10 h-10 rounded-lg transition-colors hover:bg-button-hover dark:hover:bg-button-hover-dark" title="Özgeçmişimi Görüntüle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" class="text-menu-active dark:text-menu-active-dark">
                            <path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm98.88 133.234c19.636 0 37.082 6.789 49.929 16.971c11.88 9.452 17.444 18.907 22.298 27.393l-33.923 16.949c-2.427-5.565-5.347-11.387-12.846-17.682c-8.248-6.552-16.478-8.484-23.524-8.484c-27.626 0-42.17 25.693-42.17 54.287c0 37.573 19.161 56.22 42.17 56.22c22.3 0 31.278-15.51 37.08-25.435L219.6 302.66c-6.315 9.926-12.374 19.635-25.95 29.069c-7.262 5.09-23.977 15.037-47.736 15.037C100.586 346.766 64 313.81 64 255.87c0-50.636 34.415-90.637 82.88-90.637m75.483 5.328h45.565L303.31 292.24l35.125-121.678H384l-59.379 171.112H281.01z"/>
                        </svg>
                    </a>
                </div>
                <div class="flex items-center p-1 rounded-xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
                    <livewire:dark-mode-toggle/>
                </div>
            </div>
            <hr class="h-px w-full border-t-divider dark:border-t-divider-dark m-0 rounded-[10px] border-t-2 border-0 border-solid"/>
            <div class="text-base mt-[30px]" id="container">
                @yield('content')
            </div>

        </main>
    </div>
    <!---<livewire:screen-saver/>-->
    <footer class="mt-24 w-full">
        <div class="px-4 py-8 mx-auto max-w-screen-xl">
            <livewire:timezone-theme-switcher />

            <div class="flex gap-8 justify-center items-end mt-12 mb-8 lg:gap-12">
                <div class="text-center transition-transform hover:scale-105">
                    <img src="{{ asset('assets/img/ataturk-32310.png') }}" class="mx-auto mb-2 h-16" alt="Halaskâr Başöğretmenimiz Mareşal Mustafa Kemal Atatürk">
                    <span class="text-xs text-light-text dark:text-light-text-dark">
                        Halaskâr<br>Mustafa Kemal Atatürk
                    </span>
                </div>
                <div class="text-center transition-transform hover:scale-105">
                    <img src="{{ asset('assets/img/turkiye_coat_of_army_fan_made.png') }}" class="mx-auto mb-2 h-20" alt="Türkiye Coat Of Army (Unofficial)">
                    <span class="text-xs text-light-text dark:text-light-text-dark">
                        Türkiye<br>Cumhuriyeti
                    </span>
                </div>
                <div class="text-center transition-transform hover:scale-105">
                    <img src="{{ asset('assets/img/tatarstan_coat_of_army.png') }}" class="mx-auto mb-2 h-16" alt="Tatarstan Coat Of Army">
                    <span class="text-xs text-light-text dark:text-light-text-dark">
                        Tatarstan<br>Respublikasy
                    </span>
                </div>
            </div>

            <div class="mt-8 text-sm text-center text-light-text dark:text-light-text-dark">
                <div class="flex gap-2 justify-center items-center">
                    <span>© 2021-{{ date("Y") }}</span>
                    <div class="flex flex-row gap-1 justify-center items-center">
                        <svg class="w-3 h-3 fill-text dark:fill-text-dark" viewBox="0 0 700.00001 700">
                            <g transform="translate(1252.3164,-304.67969)">
                                <path style="opacity:1;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0" d="m -902.3164,304.67969 -28.04007,302.41272 -115.18233,-95.63509 95.63512,115.1823 -302.41272,28.04007 302.41348,28.03931 -95.63588,115.1823 115.18233,-95.63433 28.04007,302.41273 28.03931,-302.41349 115.1823,95.63509 -95.63509,-115.1823 302.41348,-28.03931 -302.41272,-28.04007 95.63433,-115.1823 -115.1823,95.63586 -28.03931,-302.41349 z" />
                            </g>
                        </svg>
                        <span>Meriç Enes Kayalar</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>
@yield('scripts')
<script>
    const header = document.querySelector('header');
    const nav = header.querySelector('nav');

    const handleNavAppearance = () => {
        if (window.scrollY > 20) {
            header.classList.add('top-2');
            header.classList.remove('top-4');
            nav.classList.add('ring-1', 'shadow-lg', 'ring-black/5');
        } else {
            header.classList.add('top-4');
            header.classList.remove('top-2');
            nav.classList.remove('ring-1', 'shadow-lg', 'ring-black/5');
        }
    };

    document.addEventListener('scroll', handleNavAppearance);
    handleNavAppearance();

    detectIncognito().then((result) => {
        if (result.isPrivate) {
            window.location.href = '{{ route('incognito') }}';
        }
    });
</script>
@livewireScripts
</body>
</html>
