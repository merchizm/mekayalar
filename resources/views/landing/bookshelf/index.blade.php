@extends('layouts.landing')

@section('content')
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Dijital Kitaplığım</h1>
        <p class="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">Müzik zevkim, kod dünyam ve okuma notlarım. Hepsi bir arada. Umarım hoşuna gidecek şeyler bulabilirsin.</p>
    </header>

    <div x-data="{ currentTab: 'playlists' }" class="container">
        <div class="flex justify-center mb-8 border-b border-divider dark:border-divider-dark">
            <nav class="flex flex-wrap justify-center -mb-px space-x-2 sm:space-x-6">
                <button @click="currentTab = 'playlists'"
                        :class="{
                            'border-menu-active dark:border-menu-active-dark text-menu-active dark:text-menu-active-dark': currentTab === 'playlists',
                            'border-transparent text-light-text dark:text-light-text-dark hover:text-text dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-700': currentTab !== 'playlists'
                        }"
                        class="inline-flex gap-2 items-center px-1 py-3 text-base font-semibold leading-5 border-b-2 transition-colors duration-150 ease-in-out sm:text-lg focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    Playlistler
                </button>
                <button @click="currentTab = 'repos'"
                        :class="{
                            'border-menu-active dark:border-menu-active-dark text-menu-active dark:text-menu-active-dark': currentTab === 'repos',
                            'border-transparent text-light-text dark:text-light-text-dark hover:text-text dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-700': currentTab !== 'repos'
                        }"
                        class="inline-flex gap-2 items-center px-1 py-3 text-base font-semibold leading-5 border-b-2 transition-colors duration-150 ease-in-out sm:text-lg focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Repolar
                </button>
                <button @click="currentTab = 'gists'"
                        :class="{
                            'border-menu-active dark:border-menu-active-dark text-menu-active dark:text-menu-active-dark': currentTab === 'gists',
                            'border-transparent text-light-text dark:text-light-text-dark hover:text-text dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-700': currentTab !== 'gists'
                        }"
                        class="inline-flex gap-2 items-center px-1 py-3 text-base font-semibold leading-5 border-b-2 transition-colors duration-150 ease-in-out sm:text-lg focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    Gistler
                </button>
                <button @click="currentTab = 'books'"
                        :class="{
                            'border-menu-active dark:border-menu-active-dark text-menu-active dark:text-menu-active-dark': currentTab === 'books',
                            'border-transparent text-light-text dark:text-light-text-dark hover:text-text dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-700': currentTab !== 'books'
                        }"
                        class="inline-flex gap-2 items-center px-1 py-3 text-base font-semibold leading-5 border-b-2 transition-colors duration-150 ease-in-out sm:text-lg focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Kitaplar
                </button>
            </nav>
        </div>

        <!-- Playlist Tab -->
        <div x-show="currentTab === 'playlists'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" style="display: none;">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                @forelse ($playlists['items'] as $playlist)
                    @if ($playlist->public === true)
                        <a href="{{ $playlist->external_urls->spotify }}" target="_blank" class="block group">
                            <div class="overflow-hidden rounded-xl border shadow-md transition-all duration-300 transform bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark hover:shadow-xl hover:-translate-y-1">
                                <div class="overflow-hidden w-full h-48">
                                    <img src="{{ $playlist->images[0]->url }}" alt="{{ $playlist->name }}" class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">
                                </div>
                                <div class="p-5">
                                    <h3 class="text-lg font-bold text-text dark:text-text-dark line-clamp-1">{{ $playlist->name }}</h3>
                                    <div class="flex justify-between items-center mt-3">
                                        <span class="text-sm text-light-text dark:text-light-text-dark">{{ $playlist->tracks->total }} Şarkı</span>
                                        <span class="inline-flex items-center text-sm font-semibold text-menu-active dark:text-menu-active-dark">
                                            Dinle
                                            <svg class="ml-1.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    @endif
                @empty
                    <div class="col-span-full py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <h2 class="mb-3 text-3xl font-bold text-text dark:text-text-dark">Playlist Bulunamadı</h2>
                        <p class="text-xl text-light-text dark:text-light-text-dark">Henüz herkese açık bir Spotify playlist'im bulunmuyor.</p>
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Repos Tab -->
        <div x-show="currentTab === 'repos'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" style="display: none;">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                @forelse ($repos as $repo)
                    <div class="flex overflow-hidden relative flex-col p-8 h-full bg-transparent rounded-2xl border shadow-sm transition-all duration-300 group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
                        <div class="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
                        <div class="flex relative z-10 flex-col flex-grow">
                            <a href="{{ $repo['html_url'] }}" target="_blank" class="flex-grow">
                                <h3 class="mb-2 text-xl font-bold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{{ $repo['name'] }}</h3>
                                @if ($repo['description'])
                                    <p class="mb-4 text-light-text dark:text-light-text-dark">{{ $repo['description'] }}</p>
                                @endif
                            </a>
                            <div class="flex flex-wrap gap-y-2 gap-x-6 items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
                                @if ($repo['language'])
                                    <span class="flex items-center text-sm">
                                        <div class="mr-2 w-3 h-3 rounded-full" style="background-color:{{ $langColors[$repo['language']]['color'] ?? '#cccccc' }}"></div>
                                        {{ $repo['language'] }}
                                    </span>
                                @endif
                                <span class="flex items-center text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" class="mr-1 fill-text dark:fill-text-dark"><path d="M7.271 14.979 10 13.354l2.75 1.625-.729-3.062 2.375-2.042-3.146-.271L10 6.688 8.75 9.604l-3.146.271L8 11.896Z"/></svg>
                                    {{ $repo['stargazers_count'] }}
                                </span>
                                <span class="flex items-center text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 16 16" class="mr-1 fill-text dark:fill-text-dark"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zM10.5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/></svg>
                                    {{ $repo['forks_count'] }}
                                </span>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="py-24 my-5 text-center rounded-2xl border-2 border-dashed lg:col-span-2 bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <h2 class="mb-3 text-3xl font-bold text-text dark:text-text-dark">Repo Bulunamadı</h2>
                        <p class="text-xl text-light-text dark:text-light-text-dark">Henüz herkese açık bir repom bulunmuyor.</p>
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Gists Tab -->
        <div x-show="currentTab === 'gists'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" style="display: none;">
             <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                @forelse ($gists as $gist)
                    <div class="flex overflow-hidden relative flex-col p-8 h-full bg-transparent rounded-2xl border shadow-sm transition-all duration-300 group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
                        <div class="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
                        <div class="flex relative z-10 flex-col flex-grow">
                             <a href="{{ $gist['html_url'] }}" target="_blank" class="flex-grow">
                                <h3 class="mb-2 text-xl font-bold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{{ $gist['description'] ?: 'İsimsiz Gist' }}</h3>
                             </a>
                            <div class="flex flex-wrap gap-y-2 gap-x-6 items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
                                @if (isset($gist['files']) && count($gist['files']) > 0)
                                    <span class="flex items-center text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                        {{ count($gist['files']) }} Dosya
                                    </span>
                                @endif
                                <span class="flex items-center text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    {{ $gist['comments'] }} Yorum
                                </span>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="py-24 my-5 text-center rounded-2xl border-2 border-dashed lg:col-span-2 bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 class="mb-3 text-3xl font-bold text-text dark:text-text-dark">Gist Bulunamadı</h2>
                        <p class="text-xl text-light-text dark:text-light-text-dark">Henüz herkese açık bir gist'im bulunmuyor.</p>
                    </div>
                @endforelse
             </div>
        </div>

        <!-- Books Tab -->
        <div x-show="currentTab === 'books'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" style="display: none;">
            <div class="py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h2 class="mb-3 text-3xl font-bold text-text dark:text-text-dark">Çok Yakında</h2>
                <p class="text-xl text-center text-light-text dark:text-light-text-dark">Okuduğum kitapları burada sergilemek için sabırsızlanıyorum.</p>
            </div>
        </div>
    </div>
@endsection
