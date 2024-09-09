@extends('layouts.landing')

@section('content')
        @foreach (collect($bookmarks)->sortKeysDesc() as $date => $bookmarksForDate)
            <div class="my-[1em]">
                <h2 class="text-[1.2em] brightness-[70%] mb-[0.60em]">
                    {{ \Carbon\Carbon::parse($date)->locale('tr-TR')->isoFormat('LL') }}
                </h2>
                <div id="day">
                    @foreach ($bookmarksForDate as $bookmark)
                        <div x-data="{ title: '{{ $bookmark['title'] }}', link: '{{ $bookmark['link'] }}', domain: '{{ $bookmark['domain'] }}', created: '{{ $bookmark['created'] }}' }">
                            <div class="px-5 py-2.5 rounded-[10px] hover:bg-button dark:hover:bg-button-dark hover:cursor-pointer">
                                <p class="text-[1.3em] pt-[0.2em] pb-[0.1em]"><a :href="link" target="_blank" rel="noreferrer" x-text="title" class="no-underline hover:text-[color:var(--light-color)] hover:brightness-[70%] visited:brightness-[50%]"></a></p>
                                <span class="text-[1em] brightness-[95%] font-bold" x-text="domain"></span>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach
@endsection