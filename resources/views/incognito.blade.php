<!DOCTYPE html>
<html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}">
        <link rel="manifest" href="{{ asset('site.webmanifest') }}">
        <title>Incognito | Mekayalar</title>
        <script>
            (() => {
                const isDarkMode =
                    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;

                document.documentElement.classList.toggle('dark', isDarkMode);
                document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
            })();
        </script>
        @vite('resources/js/incognito.js')
    </head>
    <body class="min-h-screen overflow-hidden bg-background text-foreground antialiased transition-[background-color,color,opacity] duration-1000 dark:bg-background dark:text-foreground">
        <div
            id="start-overlay"
            class="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-background px-6 transition-opacity duration-1000 dark:bg-background"
        >
            <p id="start-text" class="!text-center text-lg font-semibold tracking-tight text-foreground dark:text-foreground sm:text-xl">
                Başlamak için herhangi bir yere dokunun
            </p>
        </div>

        <main id="lyrics-section" class="relative flex min-h-screen items-center justify-center px-6 py-10">
            <div class="relative flex w-full max-w-6xl items-center justify-center">
                <div
                    id="spinner-container"
                    class="relative flex h-[24rem] w-full items-center justify-center overflow-hidden px-2 transition-opacity duration-700 sm:h-[26rem] sm:px-6"
                >
                    <div class="lyrics-spinner absolute inset-x-0 flex flex-col items-center gap-3 transition-transform duration-700 ease-out">
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            Excuse my ego
                        </p>
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            Can't go incognito
                        </p>
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            Every time you see me
                        </p>
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            It's like winning big in Reno
                        </p>
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            Don't fuck with me, hoe
                        </p>
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            Take you down like judo
                        </p>
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            Make it rain
                        </p>
                        <p class="lyric-line w-full px-2 !text-center font-semibold leading-tight tracking-tight break-all transition-all duration-700 ease-out sm:px-8">
                            Im taking names from London to Meguro
                        </p>
                    </div>
                </div>

                <div class="final-message absolute inset-x-0 mx-auto flex max-w-2xl translate-y-5 flex-col gap-4 px-6 text-center opacity-0 transition-all duration-700">
                    <p class="!text-center text-2xl font-semibold tracking-tight text-foreground dark:text-foreground sm:text-4xl">
                        Emin ol, benim siteme girdiğini hatırlamak isteyeceksin.
                    </p>
                    <p class="!text-center text-base text-muted-foreground dark:text-muted-foreground sm:text-lg">
                        Bu yüzden gizli moddan çıkmalısın.
                    </p>
                </div>

                <div id="dialogue-section" class="absolute inset-x-0 mx-auto min-h-[8rem] w-full max-w-3xl px-6 opacity-0 transition-opacity duration-1000 sm:min-h-[10rem]">
                    <p class="absolute inset-x-0 top-0 !text-center text-xl font-medium leading-relaxed opacity-0 transition-opacity duration-700 sm:text-3xl">
                        Evet, şarkıyı beğeneceğini tahmin etmiştim.
                    </p>
                    <p class="absolute inset-x-0 top-0 !text-center text-xl font-medium leading-relaxed opacity-0 transition-opacity duration-700 sm:text-3xl">
                        Bazı insanlar şarkıyı ciddiye alabiliyor, inanabiliyor musun?
                    </p>
                    <p class="absolute inset-x-0 top-0 !text-center text-xl font-medium leading-relaxed opacity-0 transition-opacity duration-700 sm:text-3xl">
                        Biliyorum çok saçma ama günümüzün hastalığı bu, herkes ben-merkeziyetçi.
                    </p>
                    <p class="absolute inset-x-0 top-0 !text-center text-xl font-medium leading-relaxed opacity-0 transition-opacity duration-700 sm:text-3xl">
                        Her neyse umarım, web siteme de uğrarsın.
                    </p>
                    <p class="absolute inset-x-0 top-0 !text-center text-xl font-medium leading-relaxed opacity-0 transition-opacity duration-700 sm:text-3xl">
                        Seni sevdim adamım, keyfine bak..
                    </p>
                </div>
            </div>
        </main>

        <div
            id="replay-overlay"
            class="fixed inset-0 z-[60] hidden cursor-pointer items-center justify-center bg-background px-6 opacity-0 transition-opacity duration-1000 dark:bg-background"
        >
            <p class="!text-center text-lg font-semibold tracking-tight text-foreground dark:text-foreground sm:text-xl">
                Tekrar dinlemek için dokunman yeterli.
            </p>
        </div>

        <audio id="song" src="{{ asset('assets/excuse_my_ego.mp3') }}"></audio>
    </body>
</html>
