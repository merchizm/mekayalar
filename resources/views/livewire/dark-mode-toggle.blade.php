<div x-data="{ darkMode: @entangle('isDarkMode') }"
     x-init="
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        $watch('darkMode', value => {
            if (value) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        });
     ">
    <button @click="$wire.toggleMode()" class="w-10 h-10 flex items-center justify-center rounded-lg border border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
        {!! $svg !!}
    </button>
</div>

