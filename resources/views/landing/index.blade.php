@extends('layouts.landing')

@section('content')
    <div class="flex items-center p-5 mb-8 rounded-xl border bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
        <div class="flex-shrink-0 mr-4 text-menu-active dark:text-menu-active-dark">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
        <div>
            <p class="text-base text-text dark:text-text-dark">Web siteyi hala geliştirme aşamasındayım. Bu sebeple bazı hatalarla karşılaşabilirsiniz.</p>
        </div>
    </div>

    <div class="leading-relaxed">
        <h1 class="flex items-center mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            hey, Ben Meriç <span class="ml-3 wave">👋</span>
        </h1>
        
        <div class="p-6 mb-8 rounded-xl border bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
            <p class="mb-4 text-base sm:text-lg text-text dark:text-text-dark">
                Merhaba, ben bir full-stack geliştiriciyim, aynı zamanda <span class="label"><span><svg
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
        
        <div class="p-6 mb-8 rounded-xl border bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
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
                    Çocukluğumdan beri içerik üretmeyi ve içerik tüketmeyi bir hayli seviyorum.
                </p>
            </div>
        </div>
        
        <div class="mb-12">
            <h2 class="mb-6 text-2xl font-bold text-text dark:text-text-dark">Bağlantılar</h2>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <a href="https://github.com/merchizm" target="_blank" class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <svg class="mb-2 w-10 h-10 text-text dark:text-text-dark" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"></path></svg>
                    <span class="font-medium text-text dark:text-text-dark">Github</span>
                </a>
                <a href="https://www.linkedin.com/in/enes-kayalar-88b3851b6/" target="_blank" class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <svg class="mb-2 w-10 h-10 text-text dark:text-text-dark" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m21.06 48.73h18.11v58.27h-18.11zm9.06-29a10.5 10.5 0 1 1 -10.5 10.49 10.5 10.5 0 0 1 10.5-10.49" class="svelte-wnharz"></path><path d="m50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41 18.34-.04 21.74 12.03 21.74 27.68v32h-18.11v-28.35c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15v28.79h-18.08z"></path></svg>
                    <span class="font-medium text-text dark:text-text-dark">LinkedIn</span>
                </a>
                <a href="mailto:merichrocks@gmail.com" class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <svg class="mb-2 w-10 h-10 text-text dark:text-text-dark" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m250 186c-46 0-69 35-69 74 0 44 29 72 68 72 43 0 73-32 73-75 0-44-34-71-72-71zm-1-37c30 0 57 13 77 33 0-22 35-22 35 1v150c-1 10 10 16 16 9 25-25 54-128-14-187-64-56-149-47-195-15-48 33-79 107-49 175 33 76 126 99 182 76 28-12 41 26 12 39-45 19-168 17-225-82-38-68-36-185 67-248 78-46 182-33 244 32 66 69 62 197-2 246-28 23-71 1-71-32v-11c-20 20-47 32-77 32-57 0-108-51-108-108 0-58 51-110 108-110z"></path></svg>
                    <span class="font-medium text-text dark:text-text-dark">Email</span>
                </a>
                <button id="twitter-modal-trigger" data-url="https://x.com/merchizm" class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <svg class="mb-2 w-10 h-10 text-text dark:text-text-dark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="currentColor" viewBox="0 0 50 50">
                        <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                    </svg>
                    <span class="font-medium text-text dark:text-text-dark">Twitter/X</span>
                </button>
            </div>
        </div>
        
        <!-- Work Experience -->
        <div class="mb-12">
            <h2 class="mb-6 text-2xl font-bold text-text dark:text-text-dark">İş Deneyimi</h2>
            <div class="space-y-4" id="work-experience-accordion">
                <!-- Alfatek -->
                <div class="rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark">
                    <button class="flex gap-4 justify-between items-center p-4 w-full text-left accordion-header">
                        <div class="flex flex-grow gap-4 items-start">
                            <div class="flex-shrink-0">
                                <img class="object-cover w-12 h-12 rounded-full" src="{{ asset('assets/img/alfatek.png') }}" alt="Alfatek Logo">
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-lg font-semibold text-text dark:text-text-dark">Alfatek - Full-stack Developer / Dev Team Lead</h3>
                                <p class="text-sm text-light-text dark:text-light-text-dark">Aralık 2023 - Kasım 2024</p>
                            </div>
                        </div>
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5 transition-transform duration-300 transform text-text dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>
                    <div class="overflow-hidden max-h-0 duration-500 ease-in-out accordion-content transition-max-height">
                        <div class="p-4 pt-0">
                            <p class="mb-3 text-base text-text dark:text-text-dark">
                                Eğer buraya hiç bir veri girmediysem beni uyarın.
                            </p>
                        </div>
                    </div>
                </div>
                 <!-- Itemsatis -->
                <div class="p-4 rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark">
                    <div class="flex gap-4 items-start">
                        <div class="flex-shrink-0">
                            <img class="object-cover w-12 h-12 rounded-full" src="{{ asset('assets/img/itemsatis.png') }}" alt="Itemsatis Logo">
                        </div>
                        <div class="flex-grow">
                            <h3 class="text-lg font-semibold text-text dark:text-text-dark">Itemsatis - Full-stack Developer</h3>
                            <p class="text-sm text-light-text dark:text-light-text-dark">Aralık 2023 - Kasım 2024</p>
                        </div>
                    </div>
                </div>
                 <!-- Bionluk -->
                <div class="rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark">
                    <button class="flex gap-4 justify-between items-center p-4 w-full text-left accordion-header">
                        <div class="flex flex-grow gap-4 items-start">
                            <div class="flex-shrink-0">
                                <img class="object-cover w-12 h-12 rounded-full" src="{{ asset('assets/img/bionluk_logo.jpg') }}" alt="Bionluk Logo">
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-lg font-semibold text-text dark:text-text-dark">Bionluk - Freelance Web Developer</h3>
                                <p class="text-sm text-light-text dark:text-light-text-dark">2020 - 2022</p>
                            </div>
                        </div>
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5 transition-transform duration-300 transform text-text dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>
                    <div class="overflow-hidden max-h-0 duration-500 ease-in-out accordion-content transition-max-height">
                        <div class="p-4 pt-0">
                            <p class="mb-3 text-base text-text dark:text-text-dark">
                                PHP üzerinde Kendi View-Controller-Model Yapısını kurma şansım oldu. ReflectionClass ile Controller yapısını gerçekleştirdim. View için ise Twig ve OOP'den yararlandım, Sınıfları genellikle composer ile otomatik olarak yükledim. Bazı zamanlar PHP üzerine eklemeler yapmam gerekti, IMAP, REDIS gibi eklentileri kurdum. Zaten pekte uzak olmadığım SOLID, KISS prensiplerini kullandım. Kodların okunabilirliği ve geriye dönük düzenlemeler için PHPDoc'tan vazgeçmedim. Çoğu zaman işin kısalığından dolayı manuel olarak kod kontrolü gerçekleştirsemde PHPUnit Test kütüphanesini genel olarak öğrendim ve bir kaç işimde ve projelerde kullandım.
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Akgida -->
                <div class="rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark">
                    <button class="flex gap-4 justify-between items-center p-4 w-full text-left accordion-header">
                        <div class="flex flex-grow gap-4 items-start">
                            <div class="flex-shrink-0">
                                <img class="object-cover w-12 h-12 rounded-full" src="{{ asset('assets/img/akgida.jpg') }}" alt="Akgida Logo">
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-lg font-semibold text-text dark:text-text-dark">Akgida - Intern</h3>
                                <p class="text-sm text-light-text dark:text-light-text-dark">2019 - 2020</p>
                            </div>
                        </div>
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5 transition-transform duration-300 transform text-text dark:text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>
                    <div class="overflow-hidden max-h-0 duration-500 ease-in-out accordion-content transition-max-height">
                        <div class="p-4 pt-0">
                            <p class="mb-3 text-base text-text dark:text-text-dark">
                                Bir şirketin tam olarak nasıl sorunsuz bir şekilde işlemesi için gereken donanımları, çalışanların isimleriyle LDAP ağına nasıl bağlı olduklarını ve bu ağa nasıl giriş yaptıklarını, kayıtlarını nasıl oluşturduğumuzu tecrübe ettim. Bunun yanı sıra Bilgisayar Donanımlarıyla ilişkimi kuvvetlendirerek cihazların yanıtlarına göre hangi donanımın sıkıntılı olduğunu çözebilecek konuma geldim. Bir IT Çalışanının rutin olarak neleri kontrol ettiğini ve problemleri hangi prensipler ile çözdüklerini, görev yönetimini nasıl gerçekleştirdiklerini ve gelişimi nasıl takip ettiklerini öğrendim.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Skills -->
        <div class="mb-12">
            <h2 class="mb-6 text-2xl font-bold text-text dark:text-text-dark">Öne Çıkan Yetenekler</h2>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <!-- PHP -->
                <div class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <svg class="mb-3 w-12 h-12 text-text dark:text-text-dark" fill="currentColor" viewBox="0 0 194.44 97.7"><path d="M430.16,483.7H459q12.7.11,18.4,7.32t3.77,19.69a37.77,37.77,0,0,1-3.34,11.19,33.26,33.26,0,0,1-6.89,9.9,24,24,0,0,1-11.51,7.1,53,53,0,0,1-12.7,1.51H433.82l-4.09,20.44h-15l15.39-77.15h0M442.75,496l-6.46,32.28a7.92,7.92,0,0,0,1.29.11h1.51a56.58,56.58,0,0,0,17.22-2q6.89-2.26,9.25-15.71,1.94-11.3-3.87-13A48.28,48.28,0,0,0,447.38,496q-1.29.11-2.47.11h-2.26l.11-.11" transform="translate(-414.78 -463.15)"/><path d="M498.2,463.15h14.85l-4.2,20.55H522.2q11,.22,16.36,4.52t3.23,16.36l-7.21,35.83H519.51l6.89-34.22q1.07-5.38-.65-7.64t-7.42-2.26l-11.94-.11-8.82,44.22H482.71l15.49-77.26h0" transform="translate(-414.78 -463.15)"/><path d="M557.73,483.7h28.84q12.7.11,18.4,7.32t3.77,19.69a37.77,37.77,0,0,1-3.34,11.19,33.27,33.27,0,0,1-6.89,9.9A24,24,0,0,1,587,538.9a53,53,0,0,1-12.7,1.51H561.39l-4.09,20.44h-15l15.39-77.15h0M570.32,496l-6.46,32.28a7.92,7.92,0,0,0,1.29.11h1.51a56.58,56.58,0,0,0,17.22-2q6.89-2.26,9.25-15.71,1.94-11.3-3.87-13A48.28,48.28,0,0,0,574.94,496q-1.29.11-2.47.11h-2.26l.11-.11" transform="translate(-414.78 -463.15)"/></svg>
                    <span class="font-semibold text-text dark:text-text-dark">PHP</span>
                </div>
                <!-- Node.js -->
                <div class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <img src="{{ asset('assets/icons/light/NodeJS.svg') }}" class="mb-3 w-12 h-12" alt="Node.js">
                    <span class="font-semibold text-text dark:text-text-dark">Node.js</span>
                </div>
                <!-- TypeScript -->
                <div class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <img src="{{ asset('assets/icons/solids/TypeScript.svg') }}" class="mb-3 w-12 h-12" alt="TypeScript">
                    <span class="font-semibold text-text dark:text-text-dark">TypeScript</span>
                </div>
                <!-- Laravel -->
                <div class="flex flex-col justify-center items-center p-6 text-center rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-md hover:-translate-y-1">
                    <svg class="mb-3 w-12 h-12" fill="#ff2d20" viewBox="0 0 201.56 207.5"><path d="M612.67,455.19a3.28,3.28,0,0,1,.11.85v44.54a3.25,3.25,0,0,1-1.63,2.82l-37.38,21.52v42.66a3.26,3.26,0,0,1-1.62,2.82l-78,44.92a3.49,3.49,0,0,1-.57.24c-.07,0-.14.07-.22.09a3.27,3.27,0,0,1-1.66,0c-.09,0-.17-.07-.26-.11a3.38,3.38,0,0,1-.54-.22l-78-44.92a3.25,3.25,0,0,1-1.63-2.82V434a3.32,3.32,0,0,1,.11-.85c0-.09.08-.18.11-.27a3.2,3.2,0,0,1,.21-.5,3,3,0,0,1,.22-.29,3.31,3.31,0,0,1,.29-.38,3.17,3.17,0,0,1,.32-.24,2.65,2.65,0,0,1,.36-.28h0l39-22.46a3.26,3.26,0,0,1,3.25,0l39,22.46h0a4,4,0,0,1,.36.28,3.84,3.84,0,0,1,.32.24,3.8,3.8,0,0,1,.29.38,3,3,0,0,1,.22.29,3.39,3.39,0,0,1,.21.5c0,.09.09.18.11.28a3.28,3.28,0,0,1,.11.85v83.46l32.51-18.72V456a3.28,3.28,0,0,1,.11-.84c0-.1.08-.18.11-.28a3.66,3.66,0,0,1,.21-.5c.06-.11.15-.19.22-.29a3.34,3.34,0,0,1,.29-.38,3.12,3.12,0,0,1,.32-.24,3.28,3.28,0,0,1,.36-.28h0l39-22.46a3.25,3.25,0,0,1,3.25,0l39,22.46a3.59,3.59,0,0,1,.37.28c.1.08.22.15.31.24a3.8,3.8,0,0,1,.29.38,2.45,2.45,0,0,1,.22.29,3.22,3.22,0,0,1,.21.5A2.32,2.32,0,0,1,612.67,455.19Zm-6.39,43.51v-37l-13.65,7.86-18.86,10.86v37l32.52-18.72Zm-39,67V528.64l-18.55,10.59-53,30.23v37.41ZM417.72,439.58V565.7l71.52,41.17v-37.4l-37.36-21.15h0a151.92,151.92,0,0,0-.66-.5h0a3.09,3.09,0,0,1-.27-.34,3.47,3.47,0,0,1-.24-.32h0a2.59,2.59,0,0,1-.17-.41,2.4,2.4,0,0,1-.15-.37h0a3.11,3.11,0,0,1-.06-.47,2.82,2.82,0,0,1,0-.37h0V458.3l-18.86-10.86-13.65-7.85Zm35.76-24.33L421,434l32.5,18.71L486,434l-32.5-18.71ZM470.39,532l18.86-10.85V439.58l-13.65,7.86L456.73,458.3v81.58Zm100.13-94.68L538,456l32.5,18.71L603,456Zm-3.25,43-18.86-10.86-13.65-7.86v37l18.86,10.85,13.66,7.86Zm-74.78,83.46,47.67-27.21L564,523l-32.47-18.7-37.39,21.53L460,545.48Z" transform="translate(-411.22 -408.25)"/></svg>
                    <span class="font-semibold text-text dark:text-text-dark">Laravel</span>
                </div>
            </div>
        </div>

        <!-- Projects -->
        <div class="mb-8">
            <h2 class="mb-6 text-2xl font-bold text-text dark:text-text-dark">Projelerim</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Project Card 1 -->
                <div class="flex overflow-hidden flex-col rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-lg hover:-translate-y-1">
                    <div class="h-48 bg-center bg-cover" style="background-image: url('{{ asset('assets/img/card-bg-1.svg') }}')"></div>
                    <div class="flex flex-col flex-grow p-6">
                        <h3 class="text-xl font-semibold text-text dark:text-text-dark">Kişisel Web Sitesi</h3>
                        <p class="flex-grow mt-2 text-base text-text dark:text-text-dark">
                            Şu an gezindiğiniz bu web sitesi, en son çalışmalarımı ve yazılarımı sergilemek için tasarlandı. Laravel ve Tailwind CSS ile geliştirildi.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-4">
                            <span class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">Laravel</span>
                            <span class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">Tailwind CSS</span>
                            <span class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">Alpine.js</span>
                        </div>
                        <div class="flex gap-4 items-center mt-6">
                            <a href="#" class="flex items-center text-sm font-medium text-light-text dark:text-light-text-dark hover:text-menu-active dark:hover:text-menu-active-dark">
                                <svg class="mr-2 w-4 h-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"></path></svg>
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Project Card 2 -->
                 <div class="flex overflow-hidden flex-col rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark hover:shadow-lg hover:-translate-y-1">
                    <div class="h-48 bg-center bg-cover" style="background-image: url('{{ asset('assets/img/card-bg-2.svg') }}')"></div>
                    <div class="flex flex-col flex-grow p-6">
                        <h3 class="text-xl font-semibold text-text dark:text-text-dark">Proje Yönetim Aracı</h3>
                        <p class="flex-grow mt-2 text-base text-text dark:text-text-dark">
                            Takımlar için görev yönetimi, ilerleme takibi ve iş birliği özelliklerine sahip bir web uygulaması.
                        </p>
                        <div class="flex flex-wrap gap-2 mt-4">
                            <span class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">PHP</span>
                            <span class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">React</span>
                            <span class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">Socket.io</span>
                        </div>
                        <div class="flex gap-4 items-center mt-6">
                            <a href="#" class="flex items-center text-sm font-medium text-light-text dark:text-light-text-dark hover:text-menu-active dark:hover:text-menu-active-dark">
                                <svg class="mr-2 w-4 h-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"></path></svg>
                                GitHub
                            </a>
                            <a href="#" class="flex items-center text-sm font-medium text-light-text dark:text-light-text-dark hover:text-menu-active dark:hover:text-menu-active-dark">
                               <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                Canlı Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Twitter/X Modal -->
    <div id="twitter-modal" class="flex hidden fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
        <div class="p-6 mx-4 w-full max-w-sm rounded-lg border shadow-lg bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
            <h3 class="mb-4 text-xl font-semibold text-text dark:text-text-dark">Uyarı</h3>
            <p class="mb-6 text-text dark:text-text-dark">
                Bu Twitter hesabı profesyonellikten uzaktır ve tamamen kafamı dağıtmak için kullandığım bir alandır. Yine de devam etmek istiyor musunuz?
            </p>
            <div class="flex gap-4 justify-end">
                <button id="modal-cancel" class="px-4 py-2 font-medium rounded-md border transition-colors border-divider dark:border-label-border-dark text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700">Vazgeç</button>
                <button id="modal-proceed" class="px-4 py-2 font-medium text-white rounded-md transition-colors bg-menu-active hover:bg-opacity-90">Devam Et</button>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Accordion script
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('svg');
                const isActive = content.style.maxHeight;

                // Close all accordions first
                accordionHeaders.forEach(otherHeader => {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector('svg');
                    if (otherHeader !== header) {
                        otherContent.style.maxHeight = null;
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle the clicked one
                if (isActive) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });

        // Twitter/X Modal script
        const modal = document.getElementById('twitter-modal');
        const trigger = document.getElementById('twitter-modal-trigger');
        const cancelBtn = document.getElementById('modal-cancel');
        const proceedBtn = document.getElementById('modal-proceed');

        let twitterUrl = '';

        if (trigger) {
            trigger.addEventListener('click', () => {
                twitterUrl = trigger.getAttribute('data-url');
                modal.classList.remove('hidden');
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }

        if (proceedBtn) {
            proceedBtn.addEventListener('click', () => {
                window.open(twitterUrl, '_blank');
                modal.classList.add('hidden');
            });
        }
        
        // Close modal on outside click
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.classList.add('hidden');
            }
        });
    });
</script>
@endsection
