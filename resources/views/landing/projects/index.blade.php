@extends('layouts.landing')

@section('content')
<header class="mb-12 text-center">
    <h1 class="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Projelerim</h1>
    <p class="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">Geliştirdiğim, katkıda bulunduğum ve gurur duyduğum çalışmalarım.</p>
</header>

<div class="container space-y-16">
    @if(count($featuredProjects) > 0)
    <section>
        <h2 class="mb-6 text-3xl font-bold text-center text-text dark:text-text-dark">Öne Çıkanlar</h2>
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
            @foreach($featuredProjects as $project)
            <a href="{{ route('projects.show', $project) }}" class="block overflow-hidden relative bg-transparent rounded-2xl border shadow-sm transition-all duration-300 transform group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
                @if($project->image)
                <div class="overflow-hidden h-64">
                    <img src="{{ $project->image }}" class="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105" alt="{{ $project->title }}">
                </div>
                @endif
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-text dark:text-text-dark">{{ $project->title }}</h3>
                    <p class="mt-2 text-light-text dark:text-light-text-dark">{{ $project->description }}</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="inline-flex items-center text-sm font-semibold text-menu-active dark:text-menu-active-dark">
                            Detayları İncele
                            <svg class="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        @if($project->completed_at)
                            <span class="text-sm text-light-text dark:text-dark-text-dark">{{ $project->completed_at->format('Y') }}</span>
                        @endif
                    </div>
                </div>
            </a>
            @endforeach
        </div>
    </section>
    @endif

    @if(count($projects) > 0)
    <section>
        <h2 class="mb-6 text-3xl font-bold text-center text-text dark:text-text-dark">{{ $featuredProjects->count() > 0 ? 'Diğer Projeler' : '' }}</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @foreach($projects as $project)
                <a href="{{ route('projects.show', $project) }}" class="flex flex-col p-6 h-full rounded-2xl border shadow-sm transition-all duration-300 bg-background dark:bg-repository-card-bg-dark group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1 hover:border-menu-active dark:hover:border-menu-active-dark">
                    <div class="flex-shrink-0 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-menu-active dark:text-menu-active-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                    </div>
                    <div class="flex flex-col flex-grow">
                        <h3 class="text-xl font-bold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{{ $project->title }}</h3>
                        <p class="flex-grow mt-3 text-sm text-light-text dark:text-light-text-dark">{{ Str::limit($project->description, 120) }}</p>
                        <div class="flex justify-between items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
                             <span class="text-sm font-semibold text-menu-active dark:text-menu-active-dark">
                                Detayları İncele
                            </span>
                             @if($project->completed_at)
                                <span class="text-sm text-light-text dark:text-dark-text-dark">{{ $project->completed_at->format('Y') }}</span>
                             @endif
                        </div>
                    </div>
                </a>
            @endforeach
        </div>
    </section>
    @endif

    @if(count($featuredProjects) === 0 && count($projects) === 0)
    <div class="py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h2 class="mb-3 text-3xl font-bold text-text dark:text-text-dark">Henüz Proje Eklenmemiş</h2>
        <p class="text-xl text-center text-light-text dark:text-light-text-dark">Yakında burada projelerimi görebileceksiniz.</p>
    </div>
    @endif
</div>
@endsection
