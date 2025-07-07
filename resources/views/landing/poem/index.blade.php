@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/styles/applause-button.css') }}">
@endsection

@section('content')
    <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Kalemimden Dökülenler</h1>
        <p class="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">Duygularımı ve düşüncelerimi mısralara döktüğüm kişisel köşem. Küçük bir uyarı, şiirlerin hiç birini bir estetik kaygısı ile yazmadım.</p>
    </header>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        @foreach($poems as $poem)
            <a href="{{ route('poems.show', ['poem' => $poem->slug]) }}" class="flex overflow-hidden relative flex-col p-8 h-full bg-transparent rounded-2xl border shadow-sm transition-all duration-300 group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
                <div class="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
                <div class="flex relative z-10 flex-col flex-grow">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-2xl font-bold text-text dark:text-text-dark">{{ $poem->title }}</h3>
                        <applause-button id="{{ $poem->id }}" type="poem" multiclap="true" class="w-[58px] h-[58px] flex-shrink-0"/>
                    </div>
                    
                    <div class="flex justify-between items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
                        <span class="text-sm text-light-text dark:text-light-text-dark">{{ $poem->wrote_at->format('d M Y')}}</span>
                        <span class="inline-flex items-center text-sm font-semibold text-text dark:text-text-dark group-hover:underline">
                            Devamını Oku
                            <svg class="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </a>
        @endforeach
    </div>
    
    @if($poems->isEmpty())
    <div class="py-16 my-5 text-center rounded-xl border shadow-sm bg-poem-container dark:bg-poem-container-dark border-divider dark:border-label-border-dark">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 w-16 h-16 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
