@extends('layouts.landing')

@section('content')
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Yer İmlerim</h1>
        <p class="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">İlham veren, yol gösteren ve ufkumu genişleten dijital duraklarım. Burada seninde hoşuna gidecek şeyler bulabilirsin.</p>
    </header>

    <div class="mx-auto max-w-3xl">
        @forelse (collect($bookmarks)->sortKeysDesc() as $date => $bookmarksForDate)
            <div class="relative pl-8 mb-12 last:mb-0">
                <div class="absolute left-0 h-full border-l-2 border-dashed border-divider dark:border-divider-dark"></div>
                <div class="absolute left-[-11px] top-1.5 w-6 h-6 bg-menu-active dark:bg-menu-active-dark rounded-full border-4 border-background dark:border-background-dark"></div>
                <h2 class="mb-4 text-2xl font-bold text-text dark:text-text-dark">
                    {{ \Carbon\Carbon::parse($date)->locale('tr-TR')->isoFormat('LL') }}
                </h2>
                <div class="space-y-4">
                    @foreach ($bookmarksForDate as $bookmark)
                        <a href="{{ $bookmark['link'] }}" target="_blank" rel="noreferrer" class="block p-6 rounded-2xl border shadow-sm transition-all duration-300 bg-background group dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark hover:shadow-lg hover:-translate-y-1 hover:border-menu-active/50 dark:hover:border-menu-active-dark/50">
                            <div class="flex justify-between items-center">
                                <div class="flex flex-1 items-center min-w-0">
                                    <img src="https://www.google.com/s2/favicons?domain={{ $bookmark['domain'] }}&sz=32" alt="{{ $bookmark['domain'] }} favicon" class="flex-shrink-0 mr-4 w-8 h-8 rounded-md">
                                    <div class="min-w-0">
                                        <h3 class="mb-1 text-lg font-semibold truncate transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{{ $bookmark['title'] }}</h3>
                                        <p class="text-sm truncate text-light-text dark:text-light-text-dark">{{ $bookmark['domain'] }}</p>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-300 text-light-text dark:text-light-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        @empty
            <div class="py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <h2 class="mb-3 text-3xl font-bold text-text dark:text-text-dark">Henüz Yer İmi Eklenmemiş</h2>
                <p class="text-xl text-light-text dark:text-light-text-dark">Keşfettiğim faydalı bağlantıları burada paylaşacağım.</p>
            </div>
        @endforelse
    </div>
@endsection
