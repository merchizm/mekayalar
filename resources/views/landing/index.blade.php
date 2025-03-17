@extends('layouts.landing')

@section('content')
    <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark p-5 mb-8 flex items-center">
        <div class="flex-shrink-0 mr-4 text-menu-active dark:text-menu-active-dark">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
        <div>
            <p class="text-base text-text dark:text-text-dark">Web siteyi hala geliştirme aşamasındayım. Bu yüzden bazı hatalarla karşılaşabilirsiniz. Umarım web sitemi beğenirsiniz :)</p>
        </div>
    </div>

    <div class="leading-relaxed">
        <h1 class="text-3xl sm:text-4xl font-bold mb-6 tracking-tight flex items-center">
            hey, Ben Meriç <span class="wave ml-2">👋</span>
        </h1>
        
        <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark p-6 mb-8">
            <p class="text-base sm:text-lg text-text dark:text-text-dark mb-4">
                Merhaba, ben bir full-stack geliştiriciyim ve aynı zamanda uzman <span class="label"><span><svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.44 97.7"><title>PHP logo</title><path
                                d="M430.16,483.7H459q12.7.11,18.4,7.32t3.77,19.69a37.77,37.77,0,0,1-3.34,11.19,33.26,33.26,0,0,1-6.89,9.9,24,24,0,0,1-11.51,7.1,53,53,0,0,1-12.7,1.51H433.82l-4.09,20.44h-15l15.39-77.15h0M442.75,496l-6.46,32.28a7.92,7.92,0,0,0,1.29.11h1.51a56.58,56.58,0,0,0,17.22-2q6.89-2.26,9.25-15.71,1.94-11.3-3.87-13A48.28,48.28,0,0,0,447.38,496q-1.29.11-2.47.11h-2.26l.11-.11"
                                transform="translate(-414.78 -463.15)"/><path
                                d="M498.2,463.15h14.85l-4.2,20.55H522.2q11,.22,16.36,4.52t3.23,16.36l-7.21,35.83H519.51l6.89-34.22q1.07-5.38-.65-7.64t-7.42-2.26l-11.94-.11-8.82,44.22H482.71l15.49-77.26h0"
                                transform="translate(-414.78 -463.15)"/><path
                                d="M557.73,483.7h28.84q12.7.11,18.4,7.32t3.77,19.69a37.77,37.77,0,0,1-3.34,11.19,33.27,33.27,0,0,1-6.89,9.9A24,24,0,0,1,587,538.9a53,53,0,0,1-12.7,1.51H561.39l-4.09,20.44h-15l15.39-77.15h0M570.32,496l-6.46,32.28a7.92,7.92,0,0,0,1.29.11h1.51a56.58,56.58,0,0,0,17.22-2q6.89-2.26,9.25-15.71,1.94-11.3-3.87-13A48.28,48.28,0,0,0,574.94,496q-1.29.11-2.47.11h-2.26l.11-.11"
                                transform="translate(-414.78 -463.15)"/></svg></span>PHP</span> geliştiricisi ve <span
                    class="label"><span><svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 201.56 207.5"><title>Laravel logo</title><path
                                d="M612.67,455.19a3.28,3.28,0,0,1,.11.85v44.54a3.25,3.25,0,0,1-1.63,2.82l-37.38,21.52v42.66a3.26,3.26,0,0,1-1.62,2.82l-78,44.92a3.49,3.49,0,0,1-.57.24c-.07,0-.14.07-.22.09a3.27,3.27,0,0,1-1.66,0c-.09,0-.17-.07-.26-.11a3.38,3.38,0,0,1-.54-.22l-78-44.92a3.25,3.25,0,0,1-1.63-2.82V434a3.32,3.32,0,0,1,.11-.85c0-.09.08-.18.11-.27a3.2,3.2,0,0,1,.21-.5,3,3,0,0,1,.22-.29,3.31,3.31,0,0,1,.29-.38,3.17,3.17,0,0,1,.32-.24,2.65,2.65,0,0,1,.36-.28h0l39-22.46a3.26,3.26,0,0,1,3.25,0l39,22.46h0a4,4,0,0,1,.36.28,3.84,3.84,0,0,1,.32.24,3.8,3.8,0,0,1,.29.38,3,3,0,0,1,.22.29,3.39,3.39,0,0,1,.21.5c0,.09.09.18.11.28a3.28,3.28,0,0,1,.11.85v83.46l32.51-18.72V456a3.28,3.28,0,0,1,.11-.84c0-.1.08-.18.11-.28a3.66,3.66,0,0,1,.21-.5c.06-.11.15-.19.22-.29a3.34,3.34,0,0,1,.29-.38,3.12,3.12,0,0,1,.32-.24,3.28,3.28,0,0,1,.36-.28h0l39-22.46a3.25,3.25,0,0,1,3.25,0l39,22.46a3.59,3.59,0,0,1,.37.28c.1.08.22.15.31.24a3.8,3.8,0,0,1,.29.38,2.45,2.45,0,0,1,.22.29,3.22,3.22,0,0,1,.21.5A2.32,2.32,0,0,1,612.67,455.19Zm-6.39,43.51v-37l-13.65,7.86-18.86,10.86v37l32.52-18.72Zm-39,67V528.64l-18.55,10.59-53,30.23v37.41ZM417.72,439.58V565.7l71.52,41.17v-37.4l-37.36-21.15h0a151.92,151.92,0,0,0-.66-.5h0a3.09,3.09,0,0,1-.27-.34,3.47,3.47,0,0,1-.24-.32h0a2.59,2.59,0,0,1-.17-.41,2.4,2.4,0,0,1-.15-.37h0a3.11,3.11,0,0,1-.06-.47,2.82,2.82,0,0,1,0-.37h0V458.3l-18.86-10.86-13.65-7.85Zm35.76-24.33L421,434l32.5,18.71L486,434l-32.5-18.71ZM470.39,532l18.86-10.85V439.58l-13.65,7.86L456.73,458.3v81.58Zm100.13-94.68L538,456l32.5,18.71L603,456Zm-3.25,43-18.86-10.86-13.65-7.86v37l18.86,10.85,13.66,7.86Zm-74.78,83.46,47.67-27.21L564,523l-32.47-18.7-37.39,21.53L460,545.48Z"
                                transform="translate(-411.22 -408.25)" style="fill:#ff2d20"/></svg></span>Laravel</span> uzmanıyım. Pixel
                arta olan ilgim ve şiirle olan tutkumun yanı sıra felsefi düşüncelere de büyük bir ilgi duyuyorum. Geçmişte full-stack geliştirici ve takım lideri olarak rol aldım.
            </p>
        </div>
        
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4 text-text dark:text-text-dark">Fotoğraflarım</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                <div class="group overflow-hidden rounded-xl border border-divider dark:border-label-border-dark shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                    <img src="{{ asset('assets/img/me/me_1.JPG') }}" alt="Ben" class="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="group overflow-hidden rounded-xl border border-divider dark:border-label-border-dark shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                    <img src="{{ asset('assets/img/me/me_2.JPG') }}" alt="Yine ben" class="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="group overflow-hidden rounded-xl border border-divider dark:border-label-border-dark shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                    <img src="{{ asset('assets/img/me/me_3.JPG') }}" alt="Evet, ben" class="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="group overflow-hidden rounded-xl border border-divider dark:border-label-border-dark shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                    <img src="{{ asset('assets/img/me/me_4.JPG') }}" alt="Buyrun, ben" class="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="group overflow-hidden rounded-xl border border-divider dark:border-label-border-dark shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                    <img src="{{ asset('assets/img/me/me_5.JPG') }}" alt="Ihım ben" class="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="group overflow-hidden rounded-xl border border-divider dark:border-label-border-dark shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                    <img src="{{ asset('assets/img/me/me_6.JPG') }}" alt="Diğer ben" class="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="group overflow-hidden rounded-xl border border-divider dark:border-label-border-dark shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                    <img src="{{ asset('assets/img/me/me_7.JPG') }}" alt="Bir diğer ben" class="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
            </div>
        </div>
        
        <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark p-6 mb-8">
            <div class="flex flex-col gap-4 text-base">
                <p class="text-text dark:text-text-dark">
                    Göç etmeyi görev edinmiş bir ailenin ferdiyim. İçimdeki asabiyet, bilgiye olan açlığımı kodlamayla
                    giderme yolunda ilerlememe sebep oldu. İlk başlarda zoraki kitap okuma çabalarını hayatımın merkezine
                    alıp uzun süreli bir ilişkiye dönüştürdüm. Bu ilişki, benim için keşfetmenin, üretmenin ve kendimi ifade etmenin
                    bir aracı haline geldi.
                </p>
                <p class="text-text dark:text-text-dark">
                    Kitaplarla geçen zamanın ardından, hayal gücümü beslemek ve enerjimi yönlendirmek adına bilgisayar
                    başına geçtim. İnternetin sunduğu oyunlarla tanıştım ve bir süre sonra yazılım dünyasına adım attım.
                    Başlangıçta oyun hileleriyle uğraşırken, hedeflerimi daha büyük düşünmeye başladım. Web geliştirme ve ardından yazılım
                    dilleriyle tanıştım.
                </p>
                <p class="text-text dark:text-text-dark">
                    Şu an, felsefe, edebiyat ve yazılım dünyasında kendimi geliştiriyorum. En büyük amacım,
                    hayattan zevk alırken üretkenliğimi kullanarak başarıya ulaşmak. Günlerim genellikle pixel art ve
                    yazılım çalışmalarıyla geçiyor. Ayrıca, sürekli öğrenme ve kendimi geliştirme amacıyla çeşitli teknolojilere ve
                    çatılara yöneliyorum. Öğrenmek ve pratiğe dökmek benim hayatımın hiç kopamayacak bir parçası.
                </p>
                <p class="text-text dark:text-text-dark">
                    Çocukluğumdan beri içerik üretmeyi ve içerik tüketmeyi bir hayli seviyorum. Bu içeriklere erişmek için
                    menüyü kullanabilirsin. Sosyal medya hesaplarım ise şöyle,
                </p>
            </div>
        </div>
        
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4 text-text dark:text-text-dark">Bağlantılar</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <a href="#" class="flex items-center gap-3 p-4 bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-sm border border-divider dark:border-label-border-dark transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-button dark:bg-button-dark group-hover:bg-menu-active group-hover:dark:bg-menu-active-dark transition-colors">
                        <svg class="w-5 h-5 text-text dark:text-text-dark group-hover:text-white transition-colors" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"></path>
                        </svg>
                    </div>
                    <div>
                        <span class="text-text dark:text-text-dark font-medium group-hover:text-menu-active dark:group-hover:text-menu-active-dark transition-colors">Github</span>
                    </div>
                </a>
                
                <a href="#" class="flex items-center gap-3 p-4 bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-sm border border-divider dark:border-label-border-dark transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-button dark:bg-button-dark group-hover:bg-menu-active group-hover:dark:bg-menu-active-dark transition-colors">
                        <svg class="w-5 h-5 text-text dark:text-text-dark group-hover:text-white transition-colors" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="m21.06 48.73h18.11v58.27h-18.11zm9.06-29a10.5 10.5 0 1 1 -10.5 10.49 10.5 10.5 0 0 1 10.5-10.49" class="svelte-wnharz"></path>
                            <path d="m50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41 18.34-.04 21.74 12.03 21.74 27.68v32h-18.11v-28.35c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15v28.79h-18.08z"></path>
                        </svg>
                    </div>
                    <div>
                        <span class="text-text dark:text-text-dark font-medium group-hover:text-menu-active dark:group-hover:text-menu-active-dark transition-colors">LinkedIn</span>
                    </div>
                </a>
                
                <a href="#" class="flex items-center gap-3 p-4 bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-sm border border-divider dark:border-label-border-dark transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-button dark:bg-button-dark group-hover:bg-menu-active group-hover:dark:bg-menu-active-dark transition-colors">
                        <svg class="w-5 h-5 text-text dark:text-text-dark group-hover:text-white transition-colors" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="m250 186c-46 0-69 35-69 74 0 44 29 72 68 72 43 0 73-32 73-75 0-44-34-71-72-71zm-1-37c30 0 57 13 77 33 0-22 35-22 35 1v150c-1 10 10 16 16 9 25-25 54-128-14-187-64-56-149-47-195-15-48 33-79 107-49 175 33 76 126 99 182 76 28-12 41 26 12 39-45 19-168 17-225-82-38-68-36-185 67-248 78-46 182-33 244 32 66 69 62 197-2 246-28 23-71 1-71-32v-11c-20 20-47 32-77 32-57 0-108-51-108-108 0-58 51-110 108-110"></path>
                        </svg>
                    </div>
                    <div>
                        <span class="text-text dark:text-text-dark font-medium group-hover:text-menu-active dark:group-hover:text-menu-active-dark transition-colors">Email</span>
                    </div>
                </a>
                
                <a href="" class="flex items-center gap-3 p-4 bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-sm border border-divider dark:border-label-border-dark transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] group">
                    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-button dark:bg-button-dark group-hover:bg-menu-active group-hover:dark:bg-menu-active-dark transition-colors">
                        <svg class="w-5 h-5 text-text dark:text-text-dark group-hover:text-white transition-colors" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1668.56 1221.19" fill="currentColor">
                            <g id="layer1" transform="translate(52.390088,-25.058597)">
                                <path id="path1009" d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"/>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <span class="text-text dark:text-text-dark font-medium group-hover:text-menu-active dark:group-hover:text-menu-active-dark transition-colors">Twitter</span>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark p-6">
            <h2 class="text-xl font-semibold mb-4 text-text dark:text-text-dark">Yazılım Hakkında</h2>
            <p class="text-light-text dark:text-light-text-dark text-lg mb-4">
                Öte yandan yazılımdaki durumum için aşağıdaki kısmı inceleyebilirsiniz. Eğer ki okuduğum kitapları veya
                dinlediğim müzikleri merak ediyorsanız, kitaplığa uğrayabilirisiniz.
            </p>
            <livewire:software-tabs/>
        </div>
    </div>
@endsection
