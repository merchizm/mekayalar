@extends('layouts.landing')

@section('content')
        <div>
            @if($project->image)
            <div class="relative w-full mb-8 overflow-hidden h-72 md:h-96 rounded-xl">
                <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}" class="absolute inset-0 object-cover object-center w-full h-full">
                <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/20 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-6 md:p-8">
                    <h1 class="mb-2 text-3xl font-bold text-white md:text-4xl">{{ $project->title }}</h1>
                    @if($project->completed_at)
                    <div class="flex items-center text-light-text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Tamamlanma Tarihi: {{ $project->completed_at->format('d.m.Y') }}</span>
                    </div>
                    @endif
                </div>
            </div>
            @else
            <div class="mb-8">
                <h1 class="mb-4 text-3xl font-bold text-text dark:text-text-dark md:text-4xl">{{ $project->title }}</h1>
                @if($project->completed_at)
                <div class="flex items-center mb-6 text-light-text dark:text-light-text-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Tamamlanma Tarihi: {{ $project->completed_at->format('d.m.Y') }}</span>
                </div>
                @endif
            </div>
            @endif

            <div class="mb-8">
                <div class="prose prose-lg dark:prose-invert max-w-none">
                    <p class="text-lg text-text dark:text-text-dark">{{ $project->description }}</p>
                </div>
            </div>

            <div class="flex flex-wrap gap-3 mb-8">
                @if($project->url)
                <a href="{{ $project->url }}" class="inline-flex items-center px-5 py-2.5 bg-button dark:bg-button-dark text-text dark:text-text-dark rounded-lg hover:bg-button-hover dark:hover:bg-button-hover-dark transition-colors shadow-sm" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Projeyi Ziyaret Et</span>
                </a>
                @endif
                
                @if($project->github_url)
                <a href="{{ $project->github_url }}" class="inline-flex items-center px-5 py-2.5 bg-repository-card-bg dark:bg-menu-hover-dark text-text dark:text-text-dark rounded-lg hover:bg-repository-card-bg-hover dark:hover:bg-hover-anchor-dark transition-colors shadow-sm" target="_blank">
                    <i class="mr-2 fab fa-github"></i>
                    <span>GitHub'da İncele</span>
                </a>
                @endif
            </div>

            @if($project->content)
            <div class="pb-8 prose prose-lg project-content dark:prose-invert max-w-none">
                <div id="content" class="min-h-[200px]"></div>
            </div>
            @endif
        </div>
@endsection

@section('scripts')
@if($project->content)
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const content = document.getElementById('content');
        const rawMarkdown = @json($project->content);
        
        // Parse the markdown content
        const parsedContent = marked.parse(rawMarkdown);
        
        // Sanitize the HTML content
        const sanitizedContent = DOMPurify.sanitize(parsedContent);
        
        // Set the content
        content.innerHTML = sanitizedContent;
    });
</script>
@endif
@endsection
