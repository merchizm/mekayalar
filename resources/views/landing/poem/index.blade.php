@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/styles/applause-button.css') }}">
@endsection

@section('content')
    <h1 class="leading-[1.75] text-[1.7em] italic">Şiirlerim</h1>
    <p class="text-[1.3em] italic text-light-text dark:text-light-text-dark">Şiirleri sadece duygularımı ifade etmek için kullandığım bir gerçek, bu nedenle şairlere nazaran bir performans benden katiyen beklenmemeli ve öyle şiirleri okumalı.</p>
    <div class="flex flex-col flex-wrap bg-poem-container dark:bg-poem-container-dark relative mt-[2em] px-[15px] py-2.5 rounded-[10px]">
            @foreach($poems as $poem)
            <div class="overflow-hidden transition-all duration-[0.3s] ease-[ease] flex flex-col grow bg-background dark:bg-background-dark select-none m-2.5 pt-3.5 pb-5 px-5 rounded-[10px]">
                <a href="{{ route('poems.show', ['poem' => $poem->slug]) }}" class="no-underline">
                    <div class="flex justify-between">
                        <h3 class="cursor-pointer text-[1.4em] font-bold select-none mb-[0.8em]">{{ $poem->title }}</h3>
                        <applause-button id="{{ $poem->id }}" type="poem" multiclap="true" color="#fff"/>
                    </div>
                </a>
            </div>
            @endforeach
    </div>
@endsection

@section('scripts')
    <script src="{{ route('applause-button') }}"></script>
@endsection
