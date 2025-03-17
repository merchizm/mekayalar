@extends('layouts.landing')

@section('content')
    <header class="container mb-8 overflow-hidden">
        <div class="flex items-center gap-5">
            <div class="w-full">
                <h1 class="mb-3 text-4xl font-bold">Kitaplık</h1>
                <p class="mb-5 text-lg text-light-text dark:text-light-text-dark">Playlistlerim, okuduğum kitaplarım, GitHub repolarım ve gistlerim.</p>
            </div>
        </div>
    </header>

    <div x-data="{ currentTab: 1 }" class="container">
        <div class="flex flex-wrap gap-3 mb-6">
            <button @click="currentTab = 1"
                    class="px-4 py-2 transition-colors rounded-lg"
                    :class="currentTab === 1 ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : 'bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark'">
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    Playlistlerim
                </span>
            </button>
            <button @click="currentTab = 2"
                    class="px-4 py-2 transition-colors rounded-lg"
                    :class="currentTab === 2 ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : 'bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark'">
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Repolarım
                </span>
            </button>
            <button @click="currentTab = 3"
                    class="px-4 py-2 transition-colors rounded-lg"
                    :class="currentTab === 3 ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : 'bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark'">
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    Gistlerim
                </span>
            </button>
            <button @click="currentTab = 4"
                    class="px-4 py-2 transition-colors rounded-lg"
                    :class="currentTab === 4 ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : 'bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark'">
                <span class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Okuduğum Kitaplar
                </span>
            </button>
        </div>

        <!-- Playlist Tab -->
        <div x-show="currentTab === 1" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                @forelse ($playlists['items'] as $playlist)
                    @if ($playlist->public === true)
                        <a href="{{ $playlist->external_urls->spotify }}" target="_blank" class="block group">
                            <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                                <div class="w-full h-48 overflow-hidden aspect-w-1 aspect-h-1">
                                    <img src="{{ $playlist->images[0]->url }}" alt="{{ $playlist->name }}" class="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105">
                                </div>
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark line-clamp-1">{{ $playlist->name }}</h3>
                                    <div class="flex items-center justify-between mt-2">
                                        <span class="text-sm text-light-text dark:text-light-text-dark">{{ $playlist->tracks->total }} Şarkı</span>
                                        <span class="inline-flex items-center text-sm font-medium text-menu-active dark:text-menu-active-dark group-hover:underline">
                                            Spotify'da Aç
                                            <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    @endif
                @empty
                    <div class="py-16 my-5 text-center border shadow-sm col-span-full bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Henüz playlist bulunmuyor</h2>
                        <p class="text-light-text dark:text-light-text-dark">Yakında burada Spotify playlistlerimi görebileceksiniz.</p>
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Repos Tab -->
        <div x-show="currentTab === 2" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100">
            <div class="grid grid-cols-1 gap-4">
                @forelse ($repos as $repo)
                    <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark p-5 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                        <div class="flex items-start justify-between">
                            <div>
                                <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark">
                                    <a href="{{ $repo['html_url'] }}" target="_blank" class="flex items-center transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="mr-2 fill-text dark:fill-text-dark">
                                            <path d="M6.375 21.3q-.7 0-1.2-.5t-.5-1.2V4.4q0-.7.5-1.2t1.2-.5h11.25q.7 0 1.2.5t.5 1.2v15.2q0 .7-.5 1.2t-1.2.5Z"/>
                                        </svg>
                                        {{ $repo['name'] }}
                                    </a>
                                </h3>
                                @if ($repo['description'])
                                    <p class="mb-4 text-light-text dark:text-light-text-dark">{{ $repo['description'] }}</p>
                                @endif
                            </div>
                            <a href="{{ $repo['html_url'] }}" target="_blank" class="p-2 transition-colors rounded-lg bg-button dark:bg-button-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-text dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex flex-wrap items-center gap-4 mt-4">
                            @if ($repo['language'])
                                <span class="flex items-center text-sm">
                                    <div class="w-3 h-3 mr-2 rounded-full" style="background-color:{{ $langColors[$repo['language']]['color'] }}"></div>
                                    {{ $repo['language'] }}
                                </span>
                            @endif
                            <span class="flex items-center text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" class="mr-1 fill-text dark:fill-text-dark">
                                    <path d="M7.271 14.979 10 13.354l2.75 1.625-.729-3.062 2.375-2.042-3.146-.271L10 6.688 8.75 9.604l-3.146.271L8 11.896Z"/>
                                </svg>
                                {{ $repo['stargazers_count'] }} Yıldız
                            </span>
                            <span class="flex items-center text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" class="mr-1 fill-text dark:fill-text-dark">
                                    <path d="M7.75 16.75V5.292L6.333 6.688l-.708-.709L8.25 3.354l2.625 2.625-.708.709L8.75 5.292v6.729Z"/>
                                </svg>
                                {{ $repo['forks_count'] }} Fork
                            </span>
                            @if (isset($repo['updated_at']) && $repo['updated_at'])
                                <span class="flex items-center text-sm text-light-text dark:text-light-text-dark">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {{ \Carbon\Carbon::parse($repo['updated_at'])->locale('tr-TR')->diffForHumans() }} güncellendi
                                </span>
                            @endif
                        </div>
                    </div>
                @empty
                    <div class="py-16 my-5 text-center border shadow-sm bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Henüz repo bulunmuyor</h2>
                        <p class="text-light-text dark:text-light-text-dark">Yakında burada GitHub repolarımı görebileceksiniz.</p>
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Gists Tab -->
        <div x-show="currentTab === 3" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100">
            <div class="grid grid-cols-1 gap-4">
                @forelse ($gists as $gist)
                    <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark p-5 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                        <div class="flex items-start justify-between">
                            <div>
                                <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark">
                                    <a href="{{ $gist['html_url'] }}" target="_blank" class="flex items-center transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="mr-2 fill-text dark:fill-text-dark">
                                            <path d="M5.812 17.417q-.52 0-.885-.365-.365-.364-.365-.885V3.833q0-.521.365-.885.365-.365.906-.365h6.375l3.23 3.209v10.375q0 .521-.365.885-.365.365-.906.365Z"/>
                                        </svg>
                                        {{ $gist['description'] ?: 'Adsız Gist' }}
                                    </a>
                                </h3>
                            </div>
                            <a href="{{ $gist['html_url'] }}" target="_blank" class="p-2 transition-colors rounded-lg bg-button dark:bg-button-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-text dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex flex-wrap items-center gap-4 mt-4">
                            @if (isset($gist['files']) && count($gist['files']) > 0)
                                <span class="flex items-center text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {{ count($gist['files']) }} Dosya
                                </span>
                            @endif
                            <span class="flex items-center text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" class="mr-1 fill-text dark:fill-text-dark">
                                    <path d="M5.312 11.354h9.376v-1.25H5.312Z"/>
                                </svg>
                                {{ $gist['comments'] }} Yorum
                            </span>
                            @if (isset($gist['created_at']) && $gist['created_at'])
                                <span class="flex items-center text-sm text-light-text dark:text-light-text-dark">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {{ \Carbon\Carbon::parse($gist['created_at'])->locale('tr-TR')->diffForHumans() }} oluşturuldu
                                </span>
                            @endif
                        </div>
                    </div>
                @empty
                    <div class="py-16 my-5 text-center border shadow-sm bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Henüz gist bulunmuyor</h2>
                        <p class="text-light-text dark:text-light-text-dark">Yakında burada GitHub gistlerimi görebileceksiniz.</p>
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Books Tab -->
        <div x-show="currentTab === 4" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100">
            <div class="py-16 my-5 text-center border shadow-sm bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Çok yakında!</h2>
                <p class="text-light-text dark:text-light-text-dark">Okuduğum kitaplar yakında burada listelenecek.</p>
            </div>
        </div>
    </div>
@endsection