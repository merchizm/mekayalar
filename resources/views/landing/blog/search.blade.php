@extends('layouts.landing')

@section('content')
    <header class="container mb-8 overflow-hidden">
        <div class="flex items-center gap-5">
            <div class="w-full">
                <h1 class="mb-3 text-4xl font-bold">"{{ $query }}" Araması</h1>
                <p class="mb-5 text-lg text-light-text dark:text-light-text-dark">Arama sonuçları aşağıda listelenmektedir.</p>
            </div>
        </div>
    </header>
    
    <div class="mb-8">
        <form action="{{ route('blog.search') }}" method="GET" class="relative">
            <input type="text" name="q" value="{{ $query }}" class="w-full py-3 pl-4 pr-12 text-base rounded-lg bg-button dark:bg-button-dark text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-menu-active dark:focus:ring-menu-active-dark" placeholder="Yazılarımda ara...">
            <button type="submit" class="absolute transform -translate-y-1/2 right-4 top-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-light-text dark:text-light-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </form>
    </div>

    <div class="flex flex-wrap justify-between gap-3 mb-8">
        <div class="flex flex-wrap gap-2">
            <a href="{{ route('blog.type', ['type' => 'photo']) }}" class="inline-flex items-center px-3 py-2 transition-colors rounded-lg bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                <span class="mr-2 text-lg">📸</span>
                <span>Fotoğraflar</span>
            </a>
            <a href="{{ route('blog.type', ['type' => 'drawing']) }}" class="inline-flex items-center px-3 py-2 transition-colors rounded-lg bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                <span class="mr-2 text-lg">👾</span>
                <span>Çizimler</span>
            </a>
        </div>
        <div class="flex flex-wrap gap-2">
            <a class="inline-flex items-center px-3 py-2 transition-colors rounded-lg bg-social-bg dark:bg-social-bg-dark text-text dark:text-text-dark hover:bg-social-bg-hover dark:hover:bg-social-bg-hover-dark" href="{{ route('blog.index') }}">
                Tümü
            </a>
            @foreach ($categories as $category)
            <a class="inline-flex items-center px-3 py-2 transition-colors rounded-lg bg-social-bg dark:bg-social-bg-dark text-text dark:text-text-dark hover:bg-social-bg-hover dark:hover:bg-social-bg-hover-dark" href="{{ route('blog.category', ['slug' => $category->slug]) }}">
                {{ $category->name }}
            </a>
            @endforeach
        </div>
    </div>

    <div class="grid grid-cols-1 gap-8">
        @foreach ($posts as $post)
            @if ($post->type == '0')
            <a href="{{ route('blog.show', ['slug' => $post->post_slug]) }}" class="group block bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-divider dark:border-label-border-dark">
                <div class="flex flex-col md:flex-row">
                    @if($post->post_image)
                    <div class="relative w-full overflow-hidden md:w-1/3 h-60 md:h-auto">
                        <img src="{{ $post->post_image }}" alt="{{ $post->post_title }}" class="absolute inset-0 object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105">
                    </div>
                    @endif
                    <div class="p-6 md:w-2/3">
                        <h2 class="mb-3 text-2xl font-bold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{{ $post->post_title }}</h2>
                        
                        <div class="flex items-center mb-4 text-sm text-light-text dark:text-light-text-dark">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {{ $post->created_at->format('d M Y') }}
                            </span>
                            <span class="mx-2">•</span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {{ $post->readingTime }} Dakika
                            </span>
                        </div>
                        
                        <p class="text-light-text dark:text-dark-text-dark line-clamp-3">
                            {{ trim(preg_replace("/(\s*[\r\n]+\s*|\s+)/", ' ', Str::limit(strip_tags($post->content), 250, '...'))) }}
                        </p>
                        
                        <div class="mt-4">
                            <span class="inline-flex items-center text-sm font-medium text-menu-active dark:text-menu-active-dark group-hover:underline">
                                Devamını Oku
                                <svg class="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </a>
            @else
            <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-lg overflow-hidden border border-divider dark:border-label-border-dark p-5 relative">
                <div class="absolute top-4 left-4 bg-button dark:bg-button-dark px-3 py-1.5 rounded-lg border border-outline-color dark:border-outline-color-dark text-text dark:text-text-dark z-10">
                    {{ ($post->type !== 'photo' ? '👾 Çizim' : '📷 Fotoğraf') }}
                </div>
                <div class="flex justify-center">
                    <div class="relative h-80 w-full overflow-hidden rounded-lg">
                        <img src="{{ $post->post_image }}" alt="{{ $post->post_title }}" class="absolute inset-0 object-contain object-center w-full h-full">
                    </div>
                </div>
            </div>
            @endif
        @endforeach
    </div>
    
    @if($posts->isEmpty())
    <div class="py-16 my-5 text-center border shadow-sm bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">"{{ $query }}" için sonuç bulunamadı</h2>
        <p class="text-light-text dark:text-light-text-dark">Farklı bir arama terimi deneyin veya diğer gönderilere göz atın.</p>
    </div>
    @endif
@endsection 