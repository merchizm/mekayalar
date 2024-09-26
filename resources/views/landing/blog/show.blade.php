@extends('layouts.landing')

@section('styles')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/an-old-hope.min.css">
@endsection

@section('content')
    <ul class="flex gap-1">
        <li>
            <time datetime="{{ $post->created_at }}">{{  $post->created_at->format('M d, Y') }}</time>
        </li>
        <li class='before:content-["•"] block'>
            {{ $post->readingTime }} Dakika
        </li>
    </ul>
    <h1 class="mt-2 text-[2em]">{{ $post->post_title }}</h1>
    <p class="mt-5 text-xl text-light-text dark:text-light-text-dark">
        {{ $post->description }}
    </p>
    <div class="my-5 image-container"><img
        src="{{ $post->post_image }}" alt="{{ $post->post_title }}"></div>
    <article>
        {!! $post->post_content !!}
    </article>
@endsection


@section('scripts')
    <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
@endsection