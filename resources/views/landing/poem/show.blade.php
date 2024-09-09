@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="{{ asset('assets/styles/applause-button.css') }}">
@endsection

@section('content')
    <div class="flex justify-between">
        <h3 class="cursor-pointer text-[1.4em] bold font-bold select-none mb-[0.8em]">{{ $poem->title }}</h3>
        <applause-button id="{{ $poem->id }}" type="poem" multiclap="true" color="#fff" class="w-[58px] h-[58px] mt-5"/>
    </div>
    <span class="text-[1em] text-light-text dark:text-light-text-dark mb-[1em]">{{ $poem->wrote_at->diffForHumans() }} — {{ $poem->wrote_at->format('d.m.Y') }}</span>
    <pre class="poem-container" >{{ $poem->content }}</pre>
@endsection

@section('scripts')
    <script src="{{ route('applause-button') }}"></script>
@endsection
