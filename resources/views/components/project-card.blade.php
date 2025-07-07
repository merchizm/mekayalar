@props([
    'category',
    'title',
    'image',
    'bgColor' => 'bg-gray-100',
    'href' => '#'
])

<a href="{{ $href }}" class="block overflow-hidden rounded-2xl transition-transform duration-300 ease-in-out group hover:-translate-y-1">
    <div class="aspect-video {{ $bgColor }} flex items-center justify-center">
        <img src="{{ $image }}" alt="{{ $title }}" class="object-cover w-full h-full">
    </div>
    <div class="p-5 bg-white dark:bg-gray-800">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $category }}</p>
        <h3 class="mt-1 text-lg font-bold text-gray-900 dark:text-white">{{ $title }}</h3>
    </div>
</a> 
