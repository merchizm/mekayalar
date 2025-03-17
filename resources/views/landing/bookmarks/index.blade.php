@extends('layouts.landing')

@section('content')
    <header class="container mb-8 overflow-hidden">
        <div class="flex items-center gap-5">
            <div class="w-full">
                <h1 class="mb-3 text-4xl font-bold">Yer İmleri</h1>
                <p class="mb-5 text-lg text-light-text dark:text-light-text-dark">Size ve bana yararı olabileceğini düşündüğüm, bugün ve sonrası için kaydettiğim yararlı bağlantılar.</p>
            </div>
        </div>
    </header>

    @foreach (collect($bookmarks)->sortKeysDesc() as $date => $bookmarksForDate)
        <div class="mb-10">
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 flex items-center justify-center rounded-full bg-button dark:bg-button-dark text-text dark:text-text-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 class="ml-3 text-xl font-semibold text-text dark:text-text-dark">
                    {{ \Carbon\Carbon::parse($date)->locale('tr-TR')->isoFormat('LL') }}
                </h2>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
                @foreach ($bookmarksForDate as $bookmark)
                    <div x-data="{ title: '{{ $bookmark['title'] }}', link: '{{ $bookmark['link'] }}', domain: '{{ $bookmark['domain'] }}', created: '{{ $bookmark['created'] }}' }" class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                        <a :href="link" target="_blank" rel="noreferrer" class="block p-5">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h3 class="text-lg font-medium text-text dark:text-text-dark mb-2 hover:text-menu-active dark:hover:text-menu-active-dark transition-colors" x-text="title"></h3>
                                    <div class="flex items-center text-sm text-light-text dark:text-light-text-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                                        </svg>
                                        <span x-text="domain" class="font-medium"></span>
                                    </div>
                                </div>
                                <div class="ml-4 bg-button dark:bg-button-dark p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-text dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    @endforeach
    
    @if(collect($bookmarks)->isEmpty())
    <div class="py-16 my-5 text-center border shadow-sm bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Henüz yer imi bulunmuyor</h2>
        <p class="text-light-text dark:text-light-text-dark">Yakında burada faydalı bağlantılar görebileceksiniz.</p>
    </div>
    @endif
@endsection