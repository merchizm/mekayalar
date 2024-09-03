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
    <button @click="$wire.toggleMode()" class="flex justify-center cursor-pointer bg-button dark:bg-button-dark transition-[background-color] duration-[ease-in] delay-100 p-2 rounded-[5px] border-[none] hover:bg-button-hover hover:dark:bg-button-hover-dark">
        {!! $svg !!}
    </button>
</div>

