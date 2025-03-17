@extends('layouts.landing')

@section('content')
<header class="container my-5 overflow-hidden">
    <div class="flex items-center gap-5">
        <div class="w-full">
            <h1 class="mb-3 text-4xl font-bold">Projelerim</h1>
            <p class="mb-5 text-lg">Geliştirdiğim ve üzerinde çalıştığım projeler.</p>
        </div>
    </div>
</header>

<div class="container">
    @if(count($featuredProjects) > 0)
    <section class="mb-10">
        <h2 class="mb-6 text-3xl font-semibold">Öne Çıkan Projeler</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @foreach($featuredProjects as $project)
            <div class="group bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-divider dark:border-label-border-dark">
                @if($project->image)
                <div class="relative h-56 overflow-hidden">
                    <img src="{{ asset('storage/' . $project->image) }}" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" alt="{{ $project->title }}">
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                @endif
                <div class="p-5">
                    <h3 class="text-2xl font-bold mb-3 text-text dark:text-text-dark">{{ $project->title }}</h3>
                    <p class="text-light-text dark:text-light-text-dark mb-4">{{ $project->description }}</p>
                    <div class="flex flex-wrap gap-3 mt-4">
                        <a href="{{ route('projects.show', $project) }}" class="inline-flex items-center px-4 py-2 bg-button dark:bg-button-dark text-text dark:text-text-dark rounded-lg hover:bg-button-hover dark:hover:bg-button-hover-dark transition-colors">
                            <span>Detaylar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        @if($project->url)
                        <a href="{{ $project->url }}" class="inline-flex items-center px-4 py-2 bg-social-bg dark:bg-social-bg-dark text-text dark:text-text-dark rounded-lg hover:bg-social-bg-hover dark:hover:bg-social-bg-hover-dark transition-colors" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Ziyaret Et</span>
                        </a>
                        @endif
                        @if($project->github_url)
                        <a href="{{ $project->github_url }}" class="inline-flex items-center px-4 py-2 bg-repository-card-bg dark:bg-menu-hover-dark text-text dark:text-text-dark rounded-lg hover:bg-repository-card-bg-hover dark:hover:bg-hover-anchor-dark transition-colors" target="_blank">
                            <i class="fab fa-github mr-2"></i>
                            <span>GitHub</span>
                        </a>
                        @endif
                    </div>
                </div>
                @if($project->completed_at)
                <div class="px-5 py-3 border-t border-divider dark:border-label-border-dark">
                    <span class="text-sm text-light-text dark:text-dark-text-dark flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Tamamlanma: {{ $project->completed_at->format('d.m.Y') }}
                    </span>
                </div>
                @endif
            </div>
            @endforeach
        </div>
    </section>
    @endif

    @if(count($projects) > 0)
    <section class="mb-10">
        <h2 class="mb-6 text-3xl font-semibold">Tüm Projeler</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @foreach($projects as $project)
            <div class="group bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-divider dark:border-label-border-dark">
                @if($project->image)
                <div class="relative h-48 overflow-hidden">
                    <img src="{{ asset('storage/' . $project->image) }}" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" alt="{{ $project->title }}">
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                @endif
                <div class="p-5">
                    <h3 class="text-xl font-bold mb-2 text-text dark:text-text-dark">{{ $project->title }}</h3>
                    <p class="text-light-text dark:text-light-text-dark text-sm mb-4">{{ Str::limit($project->description, 100) }}</p>
                    <div class="flex flex-wrap gap-2 mt-auto">
                        <a href="{{ route('projects.show', $project) }}" class="inline-flex items-center px-3 py-1.5 bg-button dark:bg-button-dark text-text dark:text-text-dark text-sm rounded-lg hover:bg-button-hover dark:hover:bg-button-hover-dark transition-colors">
                            <span>Detaylar</span>
                        </a>
                        @if($project->url)
                        <a href="{{ $project->url }}" class="inline-flex items-center px-3 py-1.5 bg-social-bg dark:bg-social-bg-dark text-text dark:text-text-dark text-sm rounded-lg hover:bg-social-bg-hover dark:hover:bg-social-bg-hover-dark transition-colors" target="_blank">
                            <span>Ziyaret Et</span>
                        </a>
                        @endif
                    </div>
                </div>
                @if($project->completed_at)
                <div class="px-5 py-2 border-t border-divider dark:border-label-border-dark">
                    <span class="text-xs text-light-text dark:text-dark-text-dark flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Tamamlanma: {{ $project->completed_at->format('d.m.Y') }}
                    </span>
                </div>
                @endif
            </div>
            @endforeach
        </div>
    </section>
    @endif

    @if(count($featuredProjects) === 0 && count($projects) === 0)
    <div class="py-16 my-5 text-center bg-poem-container dark:bg-poem-container-dark rounded-xl shadow-sm border border-divider dark:border-label-border-dark">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-light-text dark:text-dark-text-dark mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h2 class="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Henüz proje eklenmemiş</h2>
        <p class="text-light-text dark:text-light-text-dark">Yakında burada projelerimi görebileceksiniz.</p>
    </div>
    @endif
</div>
@endsection
