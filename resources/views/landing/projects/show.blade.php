@extends('layouts.landing')

@section('content')
    <div class="mx-auto max-w-4xl">
        @if($project->image)
        <div class="overflow-hidden relative mb-8 w-full h-80 rounded-2xl md:h-96">
            <img src="{{ $project->image }}" alt="{{ $project->title }}" class="object-cover absolute inset-0 w-full h-full">
            <div class="absolute inset-0 bg-gradient-to-t to-transparent from-background-dark/80 via-background-dark/30"></div>
            <div class="absolute bottom-0 left-0 p-6 w-full md:p-8">
                <h1 class="mb-2 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">{{ $project->title }}</h1>
                @if($project->completed_at)
                <div class="flex items-center text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ $project->completed_at->format('d F Y') }}</span>
                </div>
                @endif
            </div>
        </div>
        @else
        <header class="mb-10 text-center">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-text dark:text-text-dark">{{ $project->title }}</h1>
            @if($project->completed_at)
            <div class="flex justify-center items-center text-light-text dark:text-light-text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ $project->completed_at->format('d F Y') }}</span>
            </div>
            @endif
        </header>
        @endif

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div class="lg:col-span-2">
                @if($project->content)
                    <div class="pb-8 max-w-none prose prose-lg project-content dark:prose-invert">
                        <div id="content" class="min-h-[100px]"></div>
                    </div>
                @else
                    <div class="max-w-none prose prose-lg dark:prose-invert">
                        <p>{{ $project->description }}</p>
                    </div>
                @endif
            </div>

            <aside class="lg:col-span-1">
                <div class="sticky top-24">
                    <div class="p-6 space-y-4 rounded-2xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
                        <h3 class="text-xl font-bold text-text dark:text-text-dark">Proje Linkleri</h3>
                        @if($project->url)
                        <a href="{{ $project->url }}" class="flex justify-center items-center px-5 py-3 w-full font-semibold text-center rounded-lg shadow-sm transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Projeyi Ziyaret Et</span>
                        </a>
                        @endif
                        @if($project->github_url)
                        <a href="{{ $project->github_url }}" class="flex justify-center items-center px-5 py-3 w-full font-semibold text-center text-gray-50 bg-gray-800 rounded-lg shadow-sm transition-colors hover:bg-gray-700" target="_blank">
                            <i class="mr-2 fab fa-github"></i>
                            <span>GitHub'da İncele</span>
                        </a>
                        @endif
                        <a href="{{ route('projects.index') }}" class="flex justify-center items-center px-5 py-3 w-full font-semibold text-center bg-transparent rounded-lg border transition-colors text-text dark:text-text-dark border-divider dark:border-divider-dark hover:bg-button-hover/50 dark:hover:bg-button-hover-dark/50">
                             <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Tüm Projeler</span>
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    </div>
@endsection

@section('scripts')
@if($project->content)
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="{{ asset('assets/js/purify.min.js') }}"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const content = document.getElementById('content');
        if (content) {
            const rawMarkdown = @json($project->content);
            const parsedContent = marked.parse(rawMarkdown || '');
            const sanitizedContent = DOMPurify.sanitize(parsedContent);
            content.innerHTML = sanitizedContent;
        }
    });
</script>
@endif
@endsection
