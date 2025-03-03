@extends('layouts.landing')

@section('content')
    <div class="flex flex-col mb-[2em]">
        <h1 class="text-[2.5em] font-bold mb-2">{{ $currentCategory->name }}</h1>
        <p class="text-[1.2em] text-dark-text dark:text-dark-text-dark">{{ $currentCategory->description }}</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-[0.5em] items-start sm:items-center justify-between mt-[0.4em] mb-[2em]">
        <div class="flex gap-[0.5em] mb-2 sm:mb-0">
            <a href="{{ route('blog.type', ['type' => 'photo']) }}" class="flex bg-button-hover dark:bg-button-hover-dark cursor-pointer px-[1em] py-[0.3em] rounded-md hover:bg-button dark:hover:bg-button-dark">
                📸
            </a>
            <a href="{{ route('blog.type', ['type' => 'drawing']) }}" class="flex bg-button-hover dark:bg-button-hover-dark cursor-pointer px-[1em] py-[0.3em] rounded-md hover:bg-button dark:hover:bg-button-dark">
                👾
            </a>
        </div>
        <div class="flex flex-wrap gap-[0.5em]">
            <a class="flex bg-button-hover dark:bg-button-hover-dark cursor-pointer px-[1em] py-[0.3em] rounded-md hover:bg-button dark:hover:bg-button-dark" href="{{ route('blog.index') }}">
                Tümü
            </a>
            @foreach ($categories as $category)
            <a class="flex {{ $currentCategory->id == $category->id ? 'bg-button dark:bg-button-dark' : 'bg-button-hover dark:bg-button-hover-dark' }} cursor-pointer px-[1em] py-[0.3em] rounded-md hover:bg-button dark:hover:bg-button-dark" href="{{ route('blog.category', ['slug' => $category->slug]) }}">
                {{ $category->name }}
            </a>
            @endforeach
        </div>
    </div>

    @if($posts->isEmpty())
    <div class="flex flex-col items-center justify-center py-[5em]">
        <h2 class="text-[1.8em] font-semibold mb-2">Bu kategoride henüz gönderi bulunmuyor</h2>
        <p class="text-[1.2em] text-dark-text dark:text-dark-text-dark">Daha sonra tekrar kontrol edin.</p>
    </div>
    @else
    @foreach ($posts as $post)
        @if ($post->type == '0')
        <a class="flex flex-col sm:flex-row gap-[1em] sm:gap-[2em] transition-[outline-color] duration-[ease] delay-150 mb-[1em] p-[5px] rounded-[10px] outline outline-1 outline-transparent hover:outline-outline-color dark:hover:outline-outline-color-dark" href="{{  route('blog.show', ['slug' => $post->post_slug]) }}">
            <picture>
                <source media="(max-width: 799px)" srcset="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                <source media="(min-width: 800px)" srcset="{{ $post->post_image }}" />
                <img class="w-full sm:w-auto sm:h-[300px] transition-[outline-color] duration-[ease] delay-500 rounded-[5px] outline-[hsla(0,0%,100%,0.18)] hover:outline-[hsla(0,0%,100%,0.35)]"/>
            </picture>
            <div class="flex flex-col gap-[1em] w-full sm:w-[45vw]">
                <div class="flex flex-row justify-between">
                    <h4 class="text-[1.8em] sm:text-[2.2em] leading-[1.2] sm:leading-[2em]">{{ $post->post_title }}</h4>
                </div>
                <div class="flex flex-wrap gap-2">
                    <svg class="inline-block fill-light-text dark:fill-light-text-dark" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                    <span class="created_at">{{ $post->created_at->format('d M \'y') }}</span>
                    <svg class="inline-block fill-light-text dark:fill-light-text-dark" xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22"><path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 97q-14 0-26.5-3.5T430-194q-39-23-82-34.5T260-240q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-45 0-88 11.5T530-194q-11 6-23.5 9.5T480-181ZM280-494Zm280-115q0-9 6.5-18.5T581-640q29-10 58-15t61-5q20 0 39.5 2.5T778-651q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-600q-26 0-51 5t-48 13q-18 7-29.5-1T560-609Zm0 220q0-9 6.5-18.5T581-420q29-10 58-15t61-5q20 0 39.5 2.5T778-431q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-380q-26 0-51 4.5T601-363q-18 7-29.5-.5T560-389Zm0-110q0-9 6.5-18.5T581-530q29-10 58-15t61-5q20 0 39.5 2.5T778-541q9 2 15.5 10t6.5 18q0 17-11 25t-28 4q-14-3-29.5-4.5T700-490q-26 0-51 5t-48 13q-18 7-29.5-1T560-499Z"/></svg>
                    <span class="reading_time"> {{ $post->readingTime }} Dakika </span>
                </div>
                <p class="text-[1em] sm:text-[1.2em] leading-[1.4] sm:leading-[1em] text-dark-text dark:text-dark-text-dark whitespace-pre-wrap overflow-hidden"><span>{{ trim(preg_replace("/(\s*[\r\n]+\s*|\s+)/", ' ', Str::limit(strip_tags($post->content), 400, '...'))) }}</span></p>
            </div>
        </a>
        @else
        <div class="relative flex flex-col sm:flex-row gap-[1em] sm:gap-[2em] dark:bg-[rgba(17,17,19,0.5)] bg-button-hover justify-center transition-all duration-[ease-in-out] delay-[600ms] mb-[1em] p-3 sm:p-5 rounded-[20px] outline-1 outline outline-outline-color dark:outline-outline-color my-3">
            <div class="absolute bg-button dark:bg-button-dark border-outline-color dark:border-outline-color-dark px-2.5 py-1 rounded-[10px] border-solid border-[1px] left-2.5 top-2.5">{{  ($post->type !== 'photo' ? '👾' : '📷') }}</div>
            <picture>
                <source media="(max-width: 799px)" srcset="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                <source media="(min-width: 800px)" srcset="{{ $post->post_image }}" />
                <img class="w-full sm:w-auto sm:h-[400px] transition-[outline-color] duration-[ease] delay-500 rounded-[10px] outline outline-1 outline-[hsla(0,0%,100%,0.18)] hover:outline-[hsla(0,0%,100%,0.35)]"/>
            </picture>
        </div>
        @endif
    @endforeach
    @endif
@endsection
