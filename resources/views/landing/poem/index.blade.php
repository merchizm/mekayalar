@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/styles/applause-button.css') }}">
@endsection

@section('content')
    <header class="container mb-8 overflow-hidden">
        <div class="flex items-center gap-5">
            <div class="w-full">
                <h1 class="mb-3 text-4xl font-bold">Şiirlerim</h1>
                <p class="mb-5 text-lg text-light-text dark:text-light-text-dark">Şiirleri sadece duygularımı ifade etmek için kullandığım bir gerçek, bu nedenle şairlere nazaran bir performans benden katiyen beklenmemeli ve öyle şiirleri okumalı.</p>
            </div>
        </div>
    </header>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @foreach($poems as $poem)
        <a href="{{ route('poems.show', ['poem' => $poem->slug]) }}" class="block group">
            <div class="h-full bg-poem-container dark:bg-poem-container-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] flex flex-col">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="text-2xl font-semibold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{{ $poem->title }}</h3>
                    <applause-button id="{{ $poem->id }}" type="poem" multiclap="true" color="#fff"/>
                </div>
                
                <div class="flex items-center justify-between pt-4 mt-auto border-t border-divider dark:border-label-border-dark">
                    <span class="text-sm text-light-text dark:text-light-text-dark">{{ $poem->wrote_at->format('d M Y')}}</span>
                    <span class="inline-flex items-center text-sm font-medium text-menu-active dark:text-menu-active-dark group-hover:underline">
                        Oku
                        <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </a>
        @endforeach
    </div>
    
    @if($poems->isEmpty())
    <div class="py-16 my-5 text-center border shadow-sm bg-poem-container dark:bg-poem-container-dark rounded-xl border-divider dark:border-label-border-dark">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Henüz şiir bulunmuyor</h2>
        <p class="text-light-text dark:text-light-text-dark">Yakında burada şiirlerimi görebileceksiniz.</p>
    </div>
    @endif
@endsection

@section('scripts')
    <script src="{{ route('applause-button') }}"></script>
@endsection
