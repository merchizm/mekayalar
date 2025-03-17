@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/styles/applause-button.css') }}">
@endsection

@section('content')
    <div class="container my-8">
        <nav aria-label="breadcrumb" class="mb-6">
            <ol class="flex text-sm text-light-text dark:text-light-text-dark">
                <li class="breadcrumb-item"><a href="{{ route('landing.index') }}" class="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Ana Sayfa</a></li>
                <li class="mx-2">/</li>
                <li class="breadcrumb-item"><a href="{{ route('poems.index') }}" class="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Şiirler</a></li>
                <li class="mx-2">/</li>
                <li class="font-medium text-text breadcrumb-item dark:text-text-dark" aria-current="page">{{ $poem->title }}</li>
            </ol>
        </nav>
        
        <div class="p-8 border shadow-md bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h1 class="mb-3 text-3xl font-bold lg:text-4xl">{{ $poem->title }}</h1>
                    <div class="flex items-center text-sm text-light-text dark:text-light-text-dark">
                        <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{{ $poem->wrote_at->format('d M Y') }}</span>
                        <span class="mx-2">•</span>
                        <span>{{ $poem->wrote_at->diffForHumans() }}</span>
                    </div>
                </div>
                <applause-button id="{{ $poem->id }}" type="poem" multiclap="true" color="#fff" class="w-[58px] h-[58px]"/>
            </div>
            
            <div class="p-6 text-lg leading-relaxed whitespace-pre-wrap rounded-lg shadow-sm bg-background dark:bg-background-dark">{{ $poem->content }}</div>
            
            <div class="mt-8">
                <a href="{{ route('poems.index') }}" class="inline-flex items-center px-4 py-2 transition-colors rounded-lg bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Tüm Şiirler</span>
                </a>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{ route('applause-button') }}"></script>
@endsection
