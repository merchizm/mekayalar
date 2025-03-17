<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <x-seo::meta />

    @yield('styles')
    @livewireStyles
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="body dark">
<div class="relative min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark">
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-[6vw] pt-0 pb-40 px-4 lg:px-[100px]">

        <header class="lg:h-[83vh] w-full lg:w-[15%] relative flex flex-col gap-2.5 mt-[75px]">

            <div class="w-full h-[200px] flex justify-items-center justify-center items-center mb-[5px] p-2.5 rounded-[10px] hover:bg-menu-hover hover:dark:bg-menu-hover-dark hover:rounded-[20px] transition-all duration-[ease-in] delay-200">
                <x-logo/>
            </div>
            <div class="flex flex-col gap-2.5 items-center mb-5">
            <span class="text-[2rem] block font-semibold">
                Meriç Enes Kayalar
            </span>
                <p class="block">
                    Yazılımcı • Pixel Artist • Herbokolok
                </p>
            </div>
            <div class="relative mb-[15px] hidden lg:block">
                <form action="{{ route('blog.search') }}" method="GET">
                <input class="bg-button-hover dark:bg-button-hover-dark text-[1em] border border-social-bg dark:border-social-bg-dark w-full p-[0.7em] rounded-lg border-solid focus:outline focus:outline-key-border focus:dark:outline-key-border-dark"
                    type="text"
                        name="q"
                        aria-label="Gönderilerde Ara"
                        placeholder="Gönderilerde Ara"
                />
                    <button type="submit" class="flex items-center justify-center absolute place-content-center rounded w-[1.3rem] h-[1.3rem] border border-key-border dark:border-key-border-dark text-[0.8rem] leading-4 font-medium bg-key-preview dark:bg-key-preview-dark transition-colors ease-in-out duration-200 border-solid right-[0.4vw] top-[0.6vw]">/</button>
                </form>
            </div>
            <ul class="w-full p-0">
                <li class="w-full items-center transition-all duration-[ease-in] delay-100 cursor-pointer px-[0.7rem] py-2 rounded-lg hover:bg-menu-hover hover:dark:bg-menu-hover-dark {{ request()->routeIs('landing.index') ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : '' }}">
                    <a href="{{ route('landing.index') }}" class="flex justify-between no-underline">
                    <span class="text-[1.2rem] flex items-center gap-2">
                       <svg class="dark:invert-[96%] dark:sepia-[6%] dark:saturate-[105%] dark:hue-rotate-[201deg] dark:brightness-[90%] dark:contrast-[92%]" viewBox="0 0 24 24" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><g
                               id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
                                                                              stroke-linecap="round"
                                                                              stroke-linejoin="round"></g><g
                               id="SVGRepo_iconCarrier"> <path
                                   d="M8.03339 3.65784C8.37932 2.78072 9.62068 2.78072 9.96661 3.65785L11.0386 6.37599C11.1442 6.64378 11.3562 6.85576 11.624 6.96137L14.3422 8.03339C15.2193 8.37932 15.2193 9.62068 14.3422 9.96661L11.624 11.0386C11.3562 11.1442 11.1442 11.3562 11.0386 11.624L9.96661 14.3422C9.62067 15.2193 8.37932 15.2193 8.03339 14.3422L6.96137 11.624C6.85575 11.3562 6.64378 11.1442 6.37599 11.0386L3.65784 9.96661C2.78072 9.62067 2.78072 8.37932 3.65785 8.03339L6.37599 6.96137C6.64378 6.85575 6.85576 6.64378 6.96137 6.37599L8.03339 3.65784Z"
                                   stroke="#1C274C" stroke-width="1.5"></path> <path
                                   d="M16.4885 13.3481C16.6715 12.884 17.3285 12.884 17.5115 13.3481L18.3121 15.3781C18.368 15.5198 18.4802 15.632 18.6219 15.6879L20.6519 16.4885C21.116 16.6715 21.116 17.3285 20.6519 17.5115L18.6219 18.3121C18.4802 18.368 18.368 18.4802 18.3121 18.6219L17.5115 20.6519C17.3285 21.116 16.6715 21.116 16.4885 20.6519L15.6879 18.6219C15.632 18.4802 15.5198 18.368 15.3781 18.3121L13.3481 17.5115C12.884 17.3285 12.884 16.6715 13.3481 16.4885L15.3781 15.6879C15.5198 15.632 15.632 15.5198 15.6879 15.3781L16.4885 13.3481Z"
                                   stroke="#1C274C" stroke-width="1.5"></path> </g></svg>
                        <span class="font-medium">
                            Hakkımda
                        </span>
                    </span>
                    </a>
                </li>
                <li class="w-full items-center transition-all duration-[ease-in] delay-100 cursor-pointer px-[0.7rem] py-2 rounded-lg hover:bg-menu-hover hover:dark:bg-menu-hover-dark {{ request()->routeIs('blog.index') || request()->routeIs('blog.*') ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : '' }}">
                    <a href="{{ route('blog.index') }}" class="flex justify-between no-underline">
                   <span class="text-[1.2rem] flex items-center gap-2">
                   <svg class="dark:invert-[96%] dark:sepia-[6%] dark:saturate-[105%] dark:hue-rotate-[201deg] dark:brightness-[90%] dark:contrast-[92%]" viewBox="0 0 24 24" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><g
                           id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                                          stroke-linejoin="round"></g><g
                           id="SVGRepo_iconCarrier"> <path
                               d="M16.5568 6.02182L16.52 5.27273L16.5568 6.02182ZM14.7 6.27091L14.4997 5.54816V5.54816L14.7 6.27091ZM12.5219 7.27054L12.1463 6.62137V6.62137L12.5219 7.27054ZM7.48717 6.06103L7.4324 6.80903L7.48717 6.06103ZM9 6.27091L8.82199 6.99948L9 6.27091ZM11.4646 7.2933L11.116 7.95738L11.4646 7.2933ZM12.5074 15.7224L12.857 16.3859L12.5074 15.7224ZM15 14.6853L14.822 13.9567L15 14.6853ZM16.4901 14.4771L16.5459 15.225H16.5459L16.4901 14.4771ZM11.4926 15.7224L11.143 16.3859L11.4926 15.7224ZM9 14.6853L9.17801 13.9567L9 14.6853ZM7.50991 14.4771L7.45414 15.225H7.45414L7.50991 14.4771ZM6.75 12.9109V7.49661H5.25V12.9109H6.75ZM18.75 12.9109V7.45166H17.25V12.9109H18.75ZM16.52 5.27273C15.8904 5.30365 15.1227 5.37547 14.4997 5.54816L14.9003 6.99366C15.3582 6.86675 15.9907 6.80053 16.5935 6.77092L16.52 5.27273ZM14.4997 5.54816C13.6675 5.77885 12.7018 6.29996 12.1463 6.62137L12.8975 7.91971C13.4487 7.60082 14.2696 7.16851 14.9003 6.99366L14.4997 5.54816ZM7.4324 6.80903C7.9319 6.8456 8.43898 6.9059 8.82199 6.99948L9.17801 5.54234C8.67286 5.41892 8.06744 5.35151 7.54194 5.31303L7.4324 6.80903ZM8.82199 6.99948C9.54804 7.17688 10.5035 7.63586 11.116 7.95738L11.8132 6.62922C11.1985 6.30658 10.0998 5.76756 9.17801 5.54234L8.82199 6.99948ZM12.857 16.3859C13.4666 16.0648 14.4402 15.5941 15.178 15.4139L14.822 13.9567C13.8867 14.1853 12.7683 14.7372 12.1578 15.0589L12.857 16.3859ZM15.178 15.4139C15.5551 15.3217 16.0529 15.2618 16.5459 15.225L16.4343 13.7292C15.9149 13.7679 15.3199 13.8351 14.822 13.9567L15.178 15.4139ZM11.8422 15.0589C11.2317 14.7372 10.1133 14.1853 9.17801 13.9567L8.82199 15.4139C9.55979 15.5941 10.5334 16.0648 11.143 16.3859L11.8422 15.0589ZM9.17801 13.9567C8.68009 13.8351 8.08508 13.7679 7.56568 13.7292L7.45414 15.225C7.94707 15.2618 8.44487 15.3217 8.82199 15.4139L9.17801 13.9567ZM17.25 12.9109C17.25 13.3159 16.9097 13.6937 16.4343 13.7292L16.5459 15.225C17.7316 15.1366 18.75 14.1718 18.75 12.9109H17.25ZM18.75 7.45166C18.75 6.25707 17.7923 5.21023 16.52 5.27273L16.5935 6.77092C16.9314 6.75432 17.25 7.03403 17.25 7.45166H18.75ZM5.25 12.9109C5.25 14.1718 6.26836 15.1366 7.45414 15.225L7.56568 13.7292C7.09031 13.6937 6.75 13.3159 6.75 12.9109H5.25ZM12.1578 15.0589C12.0598 15.1105 11.9402 15.1105 11.8422 15.0589L11.143 16.3859C11.6786 16.6682 12.3214 16.6682 12.857 16.3859L12.1578 15.0589ZM12.1463 6.62137C12.0434 6.6809 11.9157 6.68302 11.8132 6.62922L11.116 7.95738C11.6772 8.25192 12.3517 8.23554 12.8975 7.91971L12.1463 6.62137ZM6.75 7.49661C6.75 7.06987 7.08277 6.78343 7.4324 6.80903L7.54194 5.31303C6.248 5.21829 5.25 6.2754 5.25 7.49661H6.75Z"
                               fill="#1C274D"></path> <path d="M12 7.58545V15.9998" stroke="#1C274D" stroke-width="1.5"></path> <path
                               d="M2 9C2 5.22876 2 3.34315 3.17157 2.17157C4.34315 1 6.22876 1 10 1H14C17.7712 1 19.6569 1 20.8284 2.17157C22 3.34315 22 5.22876 22 9V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V9Z"
                               stroke="#1C274D" stroke-width="1.5"></path> </g></svg>
                   <span class="font-medium">
                        Gönderilerim
                    </span>
                </span>
                    </a>
                </li>
                <li class="w-full items-center transition-all duration-[ease-in] delay-100 cursor-pointer px-[0.7rem] py-2 rounded-lg hover:bg-menu-hover hover:dark:bg-menu-hover-dark {{ request()->routeIs('poems.index') || request()->routeIs('poems.*') ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : '' }}">
                    <a href="{{  route('poems.index') }}" class="flex justify-between no-underline">
                      <span class="text-[1.2rem] flex items-center gap-2">
                    <svg class="dark:invert-[96%] dark:sepia-[6%] dark:saturate-[105%] dark:hue-rotate-[201deg] dark:brightness-[90%] dark:contrast-[92%]" viewBox="0 0 24 24" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><g
                            id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                                           stroke-linejoin="round"></g><g
                            id="SVGRepo_iconCarrier"> <path
                                d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z"
                                stroke="#1C274D" stroke-width="1.5"></path> <path
                                d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235"
                                stroke="#1C274D" stroke-width="1.5"></path> <path d="M8 7H16" stroke="#1C274D" stroke-width="1.5"
                                                                                  stroke-linecap="round"></path> <path
                                d="M8 10.5H13" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> <path
                                d="M19.5 19H8" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                 <span class="font-medium">
                        Şiirlerim
                    </span>
                </span>
                    </a>
                </li>
                <li class="w-full items-center transition-all duration-[ease-in] delay-100 cursor-pointer px-[0.7rem] py-2 rounded-lg hover:bg-menu-hover hover:dark:bg-menu-hover-dark {{ request()->routeIs('bookshelf.index') ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : '' }}">
                    <a href="{{  route('bookshelf.index') }}" class="flex justify-between no-underline">
                            <span class="text-[1.2rem] flex items-center gap-2">
                           <svg class="dark:invert-[96%] dark:sepia-[6%] dark:saturate-[105%] dark:hue-rotate-[201deg] dark:brightness-[90%] dark:contrast-[92%]" viewBox="0 0 24 24" width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><g
                                   id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                                                  stroke-linejoin="round"></g><g
                                   id="SVGRepo_iconCarrier"> <path
                                       d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                       stroke="#1C274D" stroke-width="1.5"></path> <path
                                       d="M17 2V8.8076C17 9.78253 17 10.27 16.8709 10.5607C16.5766 11.2233 15.8506 11.5805 15.1461 11.4095C14.8369 11.3344 14.4507 11.037 13.6782 10.4422C13.2421 10.1064 13.024 9.9385 12.797 9.83985C12.2886 9.61899 11.7114 9.61899 11.203 9.83985C10.976 9.9385 10.7579 10.1064 10.3218 10.4422C9.5493 11.037 9.16307 11.3344 8.85391 11.4095C8.14942 11.5805 7.42342 11.2233 7.12914 10.5607C7 10.27 7 9.78253 7 8.8076V2"
                                       stroke="#1C274D" stroke-width="1.5"></path> </g></svg>
                                <span class="font-medium">
                                    Kitaplık
                                </span>
                            </span>
                    </a>
                </li>
                <li class="w-full items-center transition-all duration-[ease-in] delay-100 cursor-pointer px-[0.7rem] py-2 rounded-lg hover:bg-menu-hover hover:dark:bg-menu-hover-dark {{ request()->routeIs('bookmarks.index') ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : '' }}">
                    <a href="{{  route('bookmarks.index') }}" class="flex justify-between no-underline">
                      <span class="text-[1.2rem] flex items-center gap-2">
                   <svg class="dark:invert-[96%] dark:sepia-[6%] dark:saturate-[105%] dark:hue-rotate-[201deg] dark:brightness-[90%] dark:contrast-[92%]" viewBox="0 0 24 24" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><g
                           id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                                          stroke-linejoin="round"></g><g
                           id="SVGRepo_iconCarrier"> <path
                               d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
                               stroke="#1C274D" stroke-width="1.5"></path> <path d="M15 6H9" stroke="#1C274D" stroke-width="1.5"
                                                                                 stroke-linecap="round"></path> </g></svg>
                  <span class="font-medium">
                        Yer İmleri
                    </span>
                </span>
                    </a>
                </li>
                <li class="w-full items-center transition-all duration-[ease-in] delay-100 cursor-pointer px-[0.7rem] py-2 rounded-lg hover:bg-menu-hover hover:dark:bg-menu-hover-dark {{ request()->routeIs('projects.index') ? 'bg-menu-active dark:bg-menu-hover-dark text-text-dark dark:text-text-dark' : '' }}">
                    <a href="{{  route('projects.index') }}" class="flex justify-between no-underline">
                      <span class="text-[1.2rem] flex items-center gap-2">
                        <svg class="dark:invert-[96%] dark:sepia-[6%] dark:saturate-[105%] dark:hue-rotate-[201deg] dark:brightness-[90%] dark:contrast-[92%]" viewBox="0 0 24 24" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M4 7H20" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 3V7" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 3V7" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 7L6.5 16H17.5L19 7" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 16L10 19H14L16 16" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                        <span class="font-medium">
                          Projelerim
                        </span>
                      </span>
                    </a>
                </li>
            </ul>

            <livewire:spotify-playing/>

            <a href="#" class="w-full block bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-md border border-divider dark:border-label-border-dark overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] mt-4">
                <div class="flex items-center gap-4 p-4">
                    <div class="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 448 512" class="text-menu-active dark:text-menu-active-dark">
                            <path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm98.88 133.234c19.636 0 37.082 6.789 49.929 16.971c11.88 9.452 17.444 18.907 22.298 27.393l-33.923 16.949c-2.427-5.565-5.347-11.387-12.846-17.682c-8.248-6.552-16.478-8.484-23.524-8.484c-27.626 0-42.17 25.693-42.17 54.287c0 37.573 19.161 56.22 42.17 56.22c22.3 0 31.278-15.51 37.08-25.435L219.6 302.66c-6.315 9.926-12.374 19.635-25.95 29.069c-7.262 5.09-23.977 15.037-47.736 15.037C100.586 346.766 64 313.81 64 255.87c0-50.636 34.415-90.637 82.88-90.637m75.483 5.328h45.565L303.31 292.24l35.125-121.678H384l-59.379 171.112H281.01z"/>
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-base font-semibold md:text-lg">Curriculum Vitae</span>
                        <span class="text-xs text-light-text dark:text-light-text-dark">Özgeçmişimi görüntüleyin</span>
                    </div>
                    <div class="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-light-text dark:text-light-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
            </div>
            </a>
        </header>

        <main class="w-full lg:w-[55vw] ml-0 lg:ml-[15px] mt-[75px]">
            <div class="flex justify-between items-center px-0 py-2.5">
                <div class="p-1 border shadow-sm bg-background dark:bg-repository-card-bg-dark rounded-xl border-divider dark:border-label-border-dark">
                    <livewire:dark-mode-toggle/>
                </div>

                <div class="p-1 border shadow-sm bg-background dark:bg-repository-card-bg-dark rounded-xl border-divider dark:border-label-border-dark">
                    <livewire:font-adjustment/>
                </div>
            </div>
            <hr class="h-px w-full border-t-divider dark:border-t-divider-dark m-0 rounded-[10px] border-t-2 border-0 border-solid"/>
            <div class="text-base mt-[30px]" id="container">
                @yield('content')
            </div>
        </main>
        <livewire:screen-saver/>
    </div>
    <footer class="absolute w-full flex flex-col lg:flex-row justify-between items-center pt-[0.4em] pb-16 lg:pb-4 px-4 lg:px-[100px] bottom-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div class="mb-4 text-center copyright lg:text-left lg:mb-0">
            <div class="text-sm lg:text-base">
                © sitedeki içeriklerin tüm hakları saklıdır<br>
                2021 ═ {{ date("Y") }}
            </div>
            <div class="flex flex-row items-center justify-center gap-1 mt-1 lg:justify-start">
                <svg
                    class="w-3 h-3 fill-text dark:fill-text-dark"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                    width="197.55556mm"
                    height="197.55556mm"
                    viewBox="0 0 700.00001 700"
                    id="svg2"
                    version="1.1"
                    inkscape:version="0.91 r13725"
                    sodipodi:docname="Star.svg">
                    <defs
                        id="defs4" />
                    <sodipodi:namedview
                        id="base"
                        pagecolor="#ffffff"
                        bordercolor="#666666"
                        borderopacity="1.0"
                        inkscape:pageopacity="0.0"
                        inkscape:pageshadow="2"
                        inkscape:zoom="0.95714285"
                        inkscape:cx="350"
                        inkscape:cy="350"
                        inkscape:document-units="px"
                        inkscape:current-layer="layer1"
                        showgrid="false"
                        fit-margin-top="0"
                        fit-margin-left="0"
                        fit-margin-right="0"
                        fit-margin-bottom="0"
                        inkscape:window-width="1600"
                        inkscape:window-height="837"
                        inkscape:window-x="-8"
                        inkscape:window-y="-8"
                        inkscape:window-maximized="1" />
                    <g
                        inkscape:label="Layer 1"
                        inkscape:groupmode="layer"
                        id="layer1"
                        transform="translate(1252.3164,-304.67969)">
                        <path
                            style="opacity:1;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0"
                            d="m -902.3164,304.67969 -28.04007,302.41272 -115.18233,-95.63509 95.63512,115.1823 -302.41272,28.04007 302.41348,28.03931 -95.63588,115.1823 115.18233,-95.63433 28.04007,302.41273 28.03931,-302.41349 115.1823,95.63509 -95.63509,-115.1823 302.41348,-28.03931 -302.41272,-28.04007 95.63433,-115.1823 -115.1823,95.63586 -28.03931,-302.41349 z"
                            id="path4140"
                            inkscape:connector-curvature="0" />
                    </g>
                </svg> Meriç
            </div>
        </div>
        <div class="flex flex-wrap justify-center gap-2 lg:gap-4 flags lg:justify-end">
            <div class="scale-75 flag lg:scale-100">
                <img src="{{ asset('assets/img/ataturk-32310.png') }}"  class="aspect-[602/568]"
                     alt="Halaskâr Başöğretmenimiz Mareşal Mustafa Kemal Atatürk">
                <span class="text-xs lg:text-base">
                    Halaskâr<br>Mustafa Kemal Atatürk
                </span>
            </div>
            <div class="scale-75 flag lg:scale-100">
                <img src="{{ asset('assets/img/turkiye_coat_of_army_fan_made.png') }}"
                     alt="Türkiye Coat Of Army (Unofficial)">
                <span class="text-xs lg:text-base">
                    Türkiye<br>Cumhurİyetİ
                </span>
            </div>
            <div class="scale-75 flag lg:scale-100">
                <img src="{{ asset('assets/img/tatarstan_coat_of_army.png') }}"
                     alt="Tatarstan Coat Of Army">
                <span class="text-xs lg:text-base">
                    Tatarstan<br>Respublİkasy
                </span>
            </div>
        </div>
    </footer>
</div>
@yield('scripts')
@livewireScripts
</body>
</html>
