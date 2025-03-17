@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/an-old-hope.min.css">
@endsection

@section('content')
<div class="container my-8">
    <div>
        <nav aria-label="breadcrumb" class="mb-6">
            <ol class="flex text-sm text-light-text dark:text-light-text-dark">
                <li class="breadcrumb-item"><a href="{{ route('landing.index') }}" class="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Ana Sayfa</a></li>
                <li class="mx-2">/</li>
                <li class="breadcrumb-item"><a href="{{ route('blog.index') }}" class="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Yazılar</a></li>
                <li class="mx-2">/</li>
                <li class="font-medium text-text breadcrumb-item dark:text-text-dark" aria-current="page">{{ $post->post_title }}</li>
            </ol>
        </nav>

        <div>
            <div class="mb-6">
                <div class="flex items-center mb-3 text-sm text-light-text dark:text-light-text-dark">
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time datetime="{{ $post->created_at }}">{{ $post->created_at->format('d M Y') }}</time>
                    </span>
                    <span class="mx-2">•</span>
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {{ $post->readingTime }} Dakika
                    </span>
                </div>
                
                <h1 class="mb-4 text-3xl font-bold md:text-4xl text-text dark:text-text-dark">{{ $post->post_title }}</h1>
                
                <p class="mb-8 text-xl text-light-text dark:text-light-text-dark">
                    {{ $post->description }}
                </p>
            </div>

            @if($post->post_image)
            <div class="relative w-full mb-8 overflow-hidden rounded-xl">
                <img src="{{ $post->post_image }}" alt="{{ $post->post_title }}" class="w-full h-auto rounded-xl">
            </div>
            @endif

            <article class="pb-8 prose prose-lg dark:prose-invert max-w-none">
                {!! $post->content !!}
            </article>
            
            <div class="pt-6 mt-10 border-t border-divider dark:border-label-border-dark">
                <a href="{{ route('blog.index') }}" class="inline-flex items-center px-4 py-2 transition-colors rounded-lg bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Tüm Yazılar</span>
                </a>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
@endsection
