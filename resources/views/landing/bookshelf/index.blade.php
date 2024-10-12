@extends('layouts.landing')

@section('content')
<div class="grid w-full p-4">
    <div x-data="{ currentTab: 1}">
      <ul class="flex gap-3 align-content-strech">
        <li>
          <button @click="currentTab = 1"
                  class="px-5 py-3 rounded"
                  :class="currentTab === 1 ? 'transition-all duration-[ease-in] delay-100 border-text dark:border-text-dark bg-button dark:bg-button-dark hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark' : ' hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark'">Playlistlerim</button>    
        </li>
        <li>
          <button @click="currentTab = 2"
                  class="px-5 py-3 rounded"
                  :class="currentTab === 2 ? 'transition-all duration-[ease-in] delay-100 border-text dark:border-text-dark bg-button dark:bg-button-dark hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark' : ' hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark'">Repolarım</button>    
        </li>
        <li>
          <button @click="currentTab = 3"
                  class="px-5 py-3 rounded"
                  :class="currentTab === 3 ? 'transition-all duration-[ease-in] delay-100 border-text dark:border-text-dark bg-button dark:bg-button-dark hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark' : ' hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark'">Gistlerim</button>    
        </li>
        <li>
          <button @click="currentTab = 4"
                  class="px-5 py-3 rounded"
                  :class="currentTab === 4 ? 'transition-all duration-[ease-in] delay-100 border-text dark:border-text-dark bg-button dark:bg-button-dark hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark' : ' hover:bg-button hover:dark:bg-button-dark hover:border-button-hover hover:dark:border-button-hover-dark'">Okuduğum Kitaplar</button>    
        </li>
      </ul>
      <div x-show="currentTab === 1" class="w-full mt-4"
           >
            <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6">
            @foreach ($playlists['items'] as $playlist)
                @if ($playlist->public === true)
                    <div class="border-button dark:border-button-dark flex flex-col gap-[15px] items-center w-[220px] py-5 rounded-[10px] border-2 border-dashed hover:bg-button-hover hover:dark:bg-button-hover-dark">
                        <a href="{{ $playlist->external_urls->spotify }}" target="_blank">
                        <!-- Playlist Görseli -->
                        <img src="{{ $playlist->images[0]->url  }}" alt="{{ $playlist->name }}" class="object-cover w-full h-48 rounded-t-lg">
                        <!-- Kart İçeriği -->
                        <div class="p-4">
                            <h3 class="mb-2 text-xl font-bold text-white">{{ $playlist->name }}</h3>
                        </div>
                        </a>
                    </div>
                @endif
            @endforeach
  </div>
           </div>
      <div x-show="currentTab === 2" class="w-full mt-4">
        <ul class="grid gap-3">
        @foreach ($repos as $repo)
            <li class="max-w-[53vw] p-4 bg-button dark:bg-button-dark hover:bg-button-hover dark:hover:bg-button-hover-dark rounded-lg md:max-w-[90vw]">
                <div class="mb-2 title">
                    <a href={{ $repo['html_url'] }} class="flex items-center text-lg font-bold text-color">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="fill-text dark:fill-text-dark">
                            <path d="M6.375 21.3q-.7 0-1.2-.5t-.5-1.2V4.4q0-.7.5-1.2t1.2-.5h11.25q.7 0 1.2.5t.5 1.2v15.2q0 .7-.5 1.2t-1.2.5Zm.025-1.4h11.2q.125 0 .225-.1t.1-.2V4.4q0-.1-.1-.2t-.225-.1h-1.575v6.375l-2.2-1.3-2.175 1.3V4.1H6.4q-.125 0-.225.1t-.1.2v15.2q0 .1.1.2t.225.1Zm-.325 0V4.1 19.9Zm5.575-9.425 2.175-1.3 2.2 1.3-2.2-1.3-2.175 1.3Z"/>
                        </svg>
                        <span class="ml-2">{{  $repo['name'] }}</span>
                    </a>
                </div>
                <p class="py-1 overflow-hidden text-ellipsis whitespace-nowrap">{{ $repo['description'] ?? '' }}</p>
                <div class="flex items-center gap-4 mt-2 text-base">
                    <span class="flex items-center">
                        <div
                            class="w-3 h-3 mr-2 rounded-full"
                            style="background-color:{{ $repo['language'] !== null
                                ? $langColors[$repo['language']]['color']
                                : $langColors['Markdown']['color'] }}"
                        ></div>
                        {{  $repo['language'] ?? 'Markdown' }}
                    </span>
                    <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="fill-text dark:fill-text-dark">
                            <path d="M7.271 14.979 10 13.354l2.75 1.625-.729-3.062 2.375-2.042-3.146-.271L10 6.688 8.75 9.604l-3.146.271L8 11.896ZM5.75 17.042l1.146-4.75-3.771-3.209 4.937-.416L10 4.167l1.938 4.521 4.937.395-3.771 3.209 1.146 4.75L10 14.521Zm4.25-6Z"/>
                        </svg>
                        <span class="ml-1">{{ $repo['stargazers_count'] }}</span>
                    </span>
                    <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="fill-text dark:fill-text-dark">
                            <path d="M7.75 16.75V5.292L6.333 6.688l-.708-.709L8.25 3.354l2.625 2.625-.708.709L8.75 5.292v6.729q.708-.792 1.573-1.229.865-.438 1.802-.438.354 0 .781.052.427.052.844.115l-1.438-1.438.709-.708L15.646 11l-2.625 2.625-.709-.708 1.396-1.396q-.375-.083-.75-.125-.375-.042-.729-.042-1.187 0-2.135.698-.948.698-1.344 1.906v2.792Z"/>
                        </svg>
                        <span class="ml-1">{{ $repo['forks_count'] }}</span>
                    </span>
                </div>
            </li>
        @endforeach
        </ul>       

      </div>
      <div x-show="currentTab === 3" class="w-full mt-4">
        <ul class="grid gap-3">
            @foreach ($gists as $gist)
                <li class="max-w-[53vw] p-4 bg-button dark:bg-button-dark hover:bg-button-hover dark:hover:bg-button-hover-dark rounded-lg md:max-w-[90vw]">
                    <div class="mb-2 title">
                        <a href={{ $gist['html_url'] }} class="flex items-center text-lg font-bold text-color">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="fill-text dark:fill-text-dark">
                            <path d="M5.812 17.417q-.52 0-.885-.365-.365-.364-.365-.885V3.833q0-.521.365-.885.365-.365.906-.365h6.375l3.23 3.209v10.375q0 .521-.365.885-.365.365-.906.365Zm5.646-10.875V3.583H5.833q-.104 0-.187.084-.084.083-.084.166v12.334q0 .083.084.166.083.084.187.084h8.334q.104 0 .187-.084.084-.083.084-.166V6.542ZM5.562 3.583v3.396-3.396 12.834V3.583Z"/>
                        </svg>
                            <span class="ml-2">{{  $gist['description'] }}</span>
                        </a>
                    </div>
                    <div class="flex items-center gap-4 mt-2 text-base">
                        <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" class="fill-text dark:fill-text-dark">
                                <path d="M5.312 11.354h9.376v-1.25H5.312Zm0-2.416h9.376v-1.25H5.312Zm0-2.438h9.376V5.25H5.312ZM17.75 17.271l-2.854-2.833H3.75q-.625 0-1.062-.438-.438-.438-.438-1.062V3.729q0-.625.438-1.062.437-.438 1.062-.438h12.5q.625 0 1.062.438.438.437.438 1.083ZM3.5 3.75v9.438h11.938L16.5 14.25V3.75q0-.125-.073-.198-.073-.073-.177-.073H3.75q-.104 0-.177.073T3.5 3.75Zm0 0v10.5V3.479v.271Z"/>
                            </svg>
                            <span class="ml-1">{{ $gist['comments'] }}</span>
                        </span>
                    </div>
                </li>
            @endforeach
        </ul>
      </div>
      <div x-show="currentTab === 4" class="w-full mt-4"
           ><p class="leading-normal">burası çok yakında.</p></div>
    </div>
  </div>
@endsection