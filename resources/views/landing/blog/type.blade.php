@extends('layouts.landing')

@section('content')
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold tracking-tight text-text dark:text-text-dark">{{ $typeLabel }} Gönderileri</h1>
        <p class="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">{{ $typeLabel }} türündeki tüm gönderilerim.</p>
    </header>

    <div class="flex flex-wrap gap-4 justify-center items-center mb-10">
        <a href="{{ route('blog.index') }}" class="px-4 py-2 text-sm font-semibold rounded-full transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
            Tüm Gönderiler
        </a>
        <a href="{{ route('blog.type', ['type' => 'photo']) }}" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors border rounded-full {{ $currentType == 'photo' ? 'bg-menu-active text-white dark:text-text-dark' : 'bg-button dark:bg-button-dark text-text dark:text-text-dark' }} border-divider dark:border-divider-dark hover:bg-button-hover dark:hover:bg-button-hover-dark hover:border-menu-active/50">
            <span class="text-lg">📸</span>
            <span>Fotoğraflar</span>
        </a>
        <a href="{{ route('blog.type', ['type' => 'drawing']) }}" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors border rounded-full {{ $currentType == 'drawing' ? 'bg-menu-active text-white dark:text-text-dark' : 'bg-button dark:bg-button-dark text-text dark:text-text-dark' }} border-divider dark:border-divider-dark hover:bg-button-hover dark:hover:bg-button-hover-dark hover:border-menu-active/50">
            <span class="text-lg">👾</span>
            <span>Çizimler</span>
        </a>
        <div class="mx-2 w-px h-6 bg-divider dark:bg-divider-dark"></div>
        @foreach ($categories as $category)
        <a class="px-4 py-2 text-sm font-semibold rounded-full transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark" href="{{ route('blog.category', ['slug' => $category->slug]) }}">
            {{ $category->name }}
        </a>
        @endforeach
    </div>

    <div class="space-y-12">
        @forelse ($posts as $post)
            @if ($post->type == '0')
                <a href="{{ route('blog.show', ['slug' => $post->post_slug]) }}" class="block mx-auto w-full max-w-4xl group">
                    <div class="grid grid-cols-1 gap-8 items-center md:grid-cols-5">
                        @if($post->post_image)
                        <div class="overflow-hidden h-60 rounded-2xl md:col-span-2">
                            <img src="{{ $post->post_image }}" alt="{{ $post->post_title }}" class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105">
                        </div>
                        @endif
                        <div class="md:col-span-3">
                            <h2 class="mb-2 text-3xl font-bold text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{{ $post->post_title }}</h2>
                            <div class="flex items-center mb-4 text-sm text-light-text dark:text-light-text-dark">
                                <span>{{ $post->created_at->format('d F Y') }}</span>
                                <span class="mx-2">•</span>
                                <span>{{ $post->readingTime }} dakikalık okuma</span>
                            </div>
                            <p class="leading-relaxed text-light-text dark:text-dark-text-dark line-clamp-3">
                                {{ trim(preg_replace("/(\s*[\r\n]+\s*|\s+)/", ' ', Str::limit(strip_tags($post->content), 250, '...'))) }}
                            </p>
                        </div>
                    </div>
                </a>
            @else
                <div class="mx-auto max-w-2xl text-center">
                    <a href="{{ $post->post_image }}" data-fslightbox="gallery-{{ $currentType }}" class="block group">
                        <div class="overflow-hidden relative rounded-2xl border shadow-lg border-divider dark:border-divider-dark">
                             <div class="absolute top-4 left-4 z-10 px-3 py-1.5 text-sm font-semibold rounded-lg backdrop-blur-sm bg-background/80 dark:bg-background-dark/80 text-text dark:text-text-dark">
                                {{ ($post->type !== 'photo' ? '👾 Çizim' : '📷 Fotoğraf') }}
                            </div>
                            <img src="{{ $post->post_image }}" alt="{{ $post->post_title }}" class="object-contain w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105">
                        </div>
                    </a>
                </div>
            @endif
        @empty
            <div class="py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h2 class="mb-3 text-3xl font-bold text-text dark:text-text-dark">Bu Türde Henüz Gönderi Yok</h2>
                <p class="text-xl text-center text-light-text dark:text-light-text-dark">Bu alanda paylaşım yaptığımda tekrar kontrol edin.</p>
            </div>
        @endforelse
    </div>
@endsection

@section('scripts')
<script src="{{ asset('assets/libs/fslightbox/index.js') }}"></script>
@endsection
