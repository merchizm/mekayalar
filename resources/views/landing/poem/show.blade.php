@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/styles/applause-button.css') }}">
@endsection

@section('content')
<div class="mx-auto max-w-3xl">
    <nav aria-label="breadcrumb" class="mb-8">
        <ol class="flex text-sm text-light-text dark:text-light-text-dark">
            <li class="breadcrumb-item"><a href="{{ route('landing.index') }}" class="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Ana Sayfa</a></li>
            <li class="mx-2">/</li>
            <li class="breadcrumb-item"><a href="{{ route('poems.index') }}" class="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Şiirler</a></li>
            <li class="mx-2">/</li>
            <li class="font-medium text-text breadcrumb-item dark:text-text-dark" aria-current="page">{{ $poem->title }}</li>
        </ol>
    </nav>
    
    <article>
        <header class="mb-8 text-center">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl text-text dark:text-text-dark">{{ $poem->title }}</h1>
            <div class="flex justify-center items-center text-sm text-light-text dark:text-light-text-dark">
                <svg class="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ $poem->wrote_at->format('d F Y') }} tarihinde yazıldı.</span>
            </div>
        </header>
        
        <div class="px-6 py-8 font-serif text-xl leading-loose whitespace-pre-wrap rounded-lg shadow-sm bg-poem-container dark:bg-poem-container-dark/50 sm:px-10 sm:py-12">{{ $poem->content }}</div>
        
        <footer class="flex flex-col items-center mt-12 text-center">
            <p class="mb-4 text-lg text-light-text dark:text-light-text-dark">Bu şiiri okurken keyif aldınız mı?</p>
            <applause-button id="{{ $poem->id }}" type="poem" multiclap="true" class="w-[70px] h-[70px]"/>
            
            <div class="mt-12">
                <a href="{{ route('poems.index') }}" class="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-lg transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Tüm Şiirler</span>
                </a>
            </div>
        </footer>
    </article>
</div>
@endsection

@section('scripts')
    <script src="{{ route('applause-button') }}"></script>
@endsection
