<div class="w-full mt-[1em] p-2 sm:p-5" x-data="{ activeTab: 1 }">
    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 px-1 pt-1 pb-5">
        <button @click="activeTab = 1" 
                :class="{ 'active': activeTab === 1 }" 
                class="text-[0.9em] sm:text-[1.1em] font-semibold cursor-pointer p-2.5 rounded-[10px] border-[none] hover:bg-button-hover dark:hover:bg-button-hover-dark text-center">
            Kullandığım Teknolojiler
        </button>
        <button @click="activeTab = 2" 
                :class="{ 'active': activeTab === 2 }" 
                class="text-[0.9em] sm:text-[1.1em] font-semibold cursor-pointer p-2.5 rounded-[10px] border-[none] hover:bg-button-hover dark:hover:bg-button-hover-dark text-center">
            Öğrenme Sürecinde Olduğum Teknolojiler
        </button>
        <button @click="activeTab = 3" 
                :class="{ 'active': activeTab === 3 }" 
                class="text-[0.9em] sm:text-[1.1em] font-semibold cursor-pointer p-2.5 rounded-[10px] border-[none] hover:bg-button-hover dark:hover:bg-button-hover-dark text-center">
            Kullandığım Araçlar
        </button>
    </div>
    <div class="px-1 pt-5 pb-1">
        <template x-if="activeTab === 1">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full sm:w-full max-w-screen-xl mx-auto" 
                 x-transition:enter="transition-opacity ease-out duration-300"
                 x-transition:enter-start="opacity-0"
                 x-transition:enter-end="opacity-100"
                 x-transition:leave="transition-opacity ease-in duration-300"
                 x-transition:leave-start="opacity-100"
                 x-transition:leave-end="opacity-0">
                @foreach($techs[1] as $tech)
                    <div class="border-button dark:border-button-dark flex flex-col gap-[15px] items-center w-full px-[15px] sm:px-[25px] py-5 rounded-[10px] border-2 border-dashed hover:bg-button-hover hover:dark:bg-button-hover-dark">
                        <img src="{{ $this->getSvg($tech->icon_name, $tech->icon_type) }}" alt="{{ $tech->name }}" class="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                        <div class="flex flex-col items-center text-[1em] sm:text-[1.2em]">
                            {{ $tech->name }}
                        </div>
                        <span class="text-light-text dark:text-light-text-dark text-[0.6em] sm:text-[0.7em]">
                            {{ date('Y') - $tech->start_year }} yıllık deneyim
                        </span>
                    </div>
                @endforeach
            </div>
        </template>
        <template x-if="activeTab === 2">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full sm:w-full max-w-screen-xl mx-auto" 
                 x-transition:enter="transition-opacity ease-out duration-300"
                 x-transition:enter-start="opacity-0"
                 x-transition:enter-end="opacity-100"
                 x-transition:leave="transition-opacity ease-in duration-300"
                 x-transition:leave-start="opacity-100"
                 x-transition:leave-end="opacity-0">
                @foreach($techs[2] as $tech)
                    <div class="border-button dark:border-button-dark flex flex-col gap-[15px] items-center w-full px-[15px] sm:px-[25px] py-5 rounded-[10px] border-2 border-dashed hover:bg-button-hover hover:dark:bg-button-hover-dark">
                        <img src="{{ $this->getSvg($tech->icon_name, $tech->icon_type) }}" alt="{{ $tech->name }}" class="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                        <div class="flex flex-col items-center text-[1em] sm:text-[1.2em]">
                            {{ $tech->name }}
                        </div>
                        <span class="text-light-text dark:text-light-text-dark text-[0.6em] sm:text-[0.7em]">
                            {{ date('Y') - $tech->start_year }} yıllık deneyim
                        </span>
                    </div>
                @endforeach
            </div>
        </template>
        <template x-if="activeTab === 3">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full sm:w-full max-w-screen-xl mx-auto" 
                 x-transition:enter="transition-opacity ease-out duration-300"
                 x-transition:enter-start="opacity-0"
                 x-transition:enter-end="opacity-100"
                 x-transition:leave="transition-opacity ease-in duration-300"
                 x-transition:leave-start="opacity-100"
                 x-transition:leave-end="opacity-0">
                @foreach($techs[3] as $tech)
                    <div class="border-button dark:border-button-dark flex flex-col gap-[15px] items-center w-full px-[15px] sm:px-[25px] py-5 rounded-[10px] border-2 border-dashed hover:bg-button-hover hover:dark:bg-button-hover-dark">
                        <img src="{{ $this->getSvg($tech->icon_name, $tech->icon_type) }}" alt="{{ $tech->name }}" class="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                        <div class="flex flex-col items-center text-[1em] sm:text-[1.2em]">
                            {{ $tech->name }}
                        </div>
                        <span class="text-light-text dark:text-light-text-dark text-[0.6em] sm:text-[0.7em]">
                            {{ date('Y') - $tech->start_year }} yıllık deneyim
                        </span>
                    </div>
                @endforeach
            </div>
        </template>
    </div>
</div>
