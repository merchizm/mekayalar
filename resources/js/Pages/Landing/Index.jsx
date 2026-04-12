import React, { useEffect, useRef, useState } from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import AccordionItem from '@/Components/Landing/Index/AccordionItem';
import TwitterModal from '@/Components/Landing/Index/TwitterModal';
import { Link } from '@inertiajs/react';
import Php from '@/Components/Landing/Svg/Php';
import Laravel from '@/Components/Landing/Svg/Laravel';
import Trans from '@/Components/Common/Trans';
import RevealSection from '@/Components/Common/RevealSection';
import { AnimatePresence, motion } from 'framer-motion';
import { annotate } from 'rough-notation';

function MericHoverName() {
    const [isNameHovered, setIsNameHovered] = useState(false);
    const [showNamePointers, setShowNamePointers] = useState(true);
    const nameRef = useRef(null);
    const nameAnnotationRef = useRef(null);

    const namePolaroids = [
        {
            id: 'memory-01',
            tilt: '-rotate-6',
            hoverTilt: 'group-hover:-rotate-12',
            offset: '-left-8 top-3',
            hoverOffset: 'group-hover:-left-12 group-hover:-top-1',
            z: 'z-10',
            image: '/assets/img/1.jpg',
        },
        {
            id: 'memory-02',
            tilt: 'rotate-2',
            hoverTilt: 'group-hover:rotate-3',
            offset: 'left-10 -top-2',
            hoverOffset: 'group-hover:left-14 group-hover:-top-5',
            z: 'z-30',
            image: '/assets/img/2.jpg',
        },
        {
            id: 'memory-03',
            tilt: 'rotate-[7deg]',
            hoverTilt: 'group-hover:rotate-[12deg]',
            offset: 'left-36 top-4',
            hoverOffset: 'group-hover:left-40 group-hover:top-0',
            z: 'z-20',
            image: '/assets/img/3.jpg',
        },
    ];

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setShowNamePointers(false);
        }, 20000);

        return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!nameRef.current || typeof window === 'undefined') {
            return;
        }

        if (!nameAnnotationRef.current) {
            const bodyStyles = window.getComputedStyle(document.body);
            const primaryColor = bodyStyles.getPropertyValue('--primary').trim();
            const annotationColor = primaryColor ? `hsl(${primaryColor})` : null;

            nameAnnotationRef.current = annotate(nameRef.current, {
                type: 'underline',
                color: annotationColor || '#111111',
                strokeWidth: 2.5,
                padding: [0, 2, 6, 2],
                animate: true,
                animationDuration: 650,
                iterations: 1,
                multiline: false,
            });
        }

        if (isNameHovered) {
            nameAnnotationRef.current.show();
        } else {
            nameAnnotationRef.current.hide();
        }
    }, [isNameHovered]);

    useEffect(() => {
        return () => {
            nameAnnotationRef.current?.remove();
            nameAnnotationRef.current = null;
        };
    }, []);

    return (
        <span
            className="group relative ml-3 inline-flex items-center"
            onMouseEnter={() => setIsNameHovered(true)}
            onMouseLeave={() => setIsNameHovered(false)}
            onFocus={() => setIsNameHovered(true)}
            onBlur={() => setIsNameHovered(false)}
        >
            <button
                type="button"
                className="relative inline-flex items-center rounded-full px-1.5 py-0.5 text-inherit focus:outline-none"
                aria-label="Meriç"
            >
                {!isNameHovered && showNamePointers && (
                    <>
                        <span className="pointer-events-none absolute left-3 top-[18px] z-20 hidden select-none text-xl motion-safe:animate-[name-pointer-float_2.4s_ease-in-out_infinite] md:block">
                            👆
                        </span>
                        <span className="pointer-events-none absolute left-12 top-[30px] z-30 hidden select-none text-lg opacity-90 motion-safe:animate-[name-pointer-float_2.8s_ease-in-out_infinite_0.35s] md:block">
                            👆
                        </span>
                    </>
                )}
                <span
                    ref={nameRef}
                    className={`relative transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isNameHovered
                            ? 'scale-[1.03] tracking-[0.01em] text-primary dark:text-primary'
                            : 'text-foreground dark:text-foreground'
                    }`}
                >
                    Meriç
                </span>
            </button>

            <AnimatePresence mode="wait">
                {isNameHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute left-1/2 top-full z-30 mt-6 hidden h-56 w-[22rem] -translate-x-1/2 md:block"
                    >
                        <div className="absolute inset-0">
                            {namePolaroids.map((card) => (
                                <div
                                    key={card.id}
                                    className={`absolute ${card.offset} ${card.hoverOffset} ${card.z} ${card.tilt} ${card.hoverTilt} transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
                                >
                                    <div className="w-36 rounded-[1.25rem] border border-black/10 bg-card p-3 shadow-[0_18px_45px_-22px_rgba(17,24,39,0.38)] dark:border-white/10 dark:bg-[#f3f1eb]">
                                        <div className="aspect-square overflow-hidden rounded-[0.9rem] border border-black/5 bg-[#f5f1e8]">
                                            <img
                                                src={card.image}
                                                alt="Meriç arşiv fotoğrafı"
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
}

function Index({ featuredProjects }) {
    const [isTwitterModalOpen, setTwitterModalOpen] = useState(false);
    const [twitterUrl, setTwitterUrl] = useState('');

    const handleTwitterClick = (e) => {
        e.preventDefault();
        setTwitterUrl(e.currentTarget.getAttribute('data-url'));
        setTwitterModalOpen(true);
    };

    const handleModalCancel = () => {
        setTwitterModalOpen(false);
    };

    const handleModalProceed = (url) => {
        window.open(url, '_blank');
        setTwitterModalOpen(false);
    };

    return (
        <>
            <RevealSection className="mb-8 flex items-center rounded-xl border border-border bg-background p-5 dark:border-border dark:bg-card">
                <div className="mr-4 flex-shrink-0 text-primary dark:text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
                <div>
                    <p className="text-base text-foreground dark:text-foreground">
                        {__('Web siteyi hala geliştirme aşamasındayım. Bu sebeple bazı hatalarla karşılaşabilirsiniz.')}
                    </p>
                </div>
            </RevealSection>

            <div className="leading-relaxed">
                <RevealSection
                    as="h1"
                    className="mb-8 flex flex-wrap items-center text-4xl font-bold tracking-tight sm:text-5xl"
                >
                    <span>{__('hey, Ben')}</span>
                    <MericHoverName />
                    <span className="wave ml-3">👋</span>
                </RevealSection>

                <RevealSection className="mb-8 rounded-xl border border-border bg-background p-6 dark:border-border dark:bg-card">
                    <p className="mb-4 text-base text-foreground dark:text-foreground sm:text-lg">
                        <Trans
                            i18nKey="Merhaba, ben bir full-stack geliştiriciyim, aynı zamanda :php geliştiricisi ve :laravel uzmanıyım. Pixel arta olan ilgim ve şiirle olan tutkumun yanı sıra felsefi düşüncelere de büyük bir ilgi duyuyorum. Geçmişte full-stack geliştirici ve takım lideri olarak rol aldım."
                            components={{
                                php: (
                                    <span className="label">
                                        <span>
                                            <Php />
                                        </span>
                                        PHP
                                    </span>
                                ),
                                laravel: (
                                    <span className="label">
                                        <span>
                                            <Laravel />
                                        </span>
                                        Laravel
                                    </span>
                                ),
                            }}
                        />
                    </p>
                </RevealSection>

                <RevealSection
                    className="mb-8 rounded-xl border border-border bg-background p-6 dark:border-border dark:bg-card"
                    delay={0.03}
                >
                    <div className="flex flex-col gap-4 text-base">
                        <p className="text-foreground dark:text-foreground">
                            {__(
                                'Göç etmeyi görev edinmiş bir ailenin ferdiyim. İçimdeki asabiyet, bilgiye olan açlığımı kodlamayla giderme yolunda ilerlememe sebep oldu. İlk başlarda zoraki kitap okuma çabalarını hayatımın merkezine alıp uzun süreli bir ilişkiye dönüştürdüm. Bu ilişki, benim için keşfetmenin, üretmenin ve kendimi ifade etmenin bir aracı haline geldi.'
                            )}
                        </p>
                        <p className="text-foreground dark:text-foreground">
                            {__(
                                'Kitaplarla geçen zamanın ardından, hayal gücümü beslemek ve enerjimi yönlendirmek adına bilgisayar başına geçtim. İnternetin sunduğu oyunlarla tanıştım ve bir süre sonra yazılım dünyasına adım attım. Başlangıçta oyun hileleriyle uğraşırken, hedeflerimi daha büyük düşünmeye başladım. Web geliştirme ve ardından yazılım dilleriyle tanıştım.'
                            )}
                        </p>
                        <p className="text-foreground dark:text-foreground">
                            {__(
                                'Şu an, felsefe, edebiyat ve yazılım dünyasında kendimi geliştiriyorum. En büyük amacım, hayattan zevk alırken üretkenliğimi kullanarak başarıya ulaşmak. Günlerim genellikle pixel art ve yazılım çalışmalarıyla geçiyor. Ayrıca, sürekli öğrenme ve kendimi geliştirme amacıyla çeşitli teknolojilere ve çatılara yöneliyorum. Öğrenmek ve pratiğe dökmek benim hayatımın hiç kopamayacak bir parçası.'
                            )}
                        </p>
                        <p className="text-foreground dark:text-foreground">
                            {__('Çocukluğumdan beri içerik üretmeyi ve içerik tüketmeyi bir hayli seviyorum.')}
                        </p>
                    </div>
                </RevealSection>

                <RevealSection className="mb-12" delay={0.05}>
                    <h2 className="mb-6 text-2xl font-bold text-foreground dark:text-foreground">
                        {__('Bağlantılar')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <a
                            href="https://github.com/merchizm"
                            target="_blank"
                            className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card"
                            rel="noreferrer"
                        >
                            <svg
                                className="mb-2 h-10 w-10 text-foreground dark:text-foreground"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"></path>
                            </svg>
                            <span className="font-medium text-foreground dark:text-foreground">Github</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/enes-kayalar-88b3851b6/"
                            target="_blank"
                            className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card"
                            rel="noreferrer"
                        >
                            <svg
                                className="mb-2 h-10 w-10 text-foreground dark:text-foreground"
                                viewBox="0 0 128 128"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="m21.06 48.73h18.11v58.27h-18.11zm9.06-29a10.5 10.5 0 1 1 -10.5 10.49 10.5 10.5 0 0 1 10.5-10.49"></path>
                                <path d="m50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41 18.34-.04 21.74 12.03 21.74 27.68v32h-18.11v-28.35c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15v28.79h-18.08z"></path>
                            </svg>
                            <span className="font-medium text-foreground dark:text-foreground">LinkedIn</span>
                        </a>
                        <a
                            href="mailto:merichrocks@gmail.com"
                            className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card"
                        >
                            <svg
                                className="mb-2 h-10 w-10 text-foreground dark:text-foreground"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="m250 186c-46 0-69 35-69 74 0 44 29 72 68 72 43 0 73-32 73-75 0-44-34-71-72-71zm-1-37c30 0 57 13 77 33 0-22 35-22 35 1v150c-1 10 10 16 16 9 25-25 54-128-14-187-64-56-149-47-195-15-48 33-79 107-49 175 33 76 126 99 182 76 28-12 41 26 12 39-45 19-168 17-225-82-38-68-36-185 67-248 78-46 182-33 244 32 66 69 62 197-2 246-28 23-71 1-71-32v-11c-20 20-47 32-77 32-57 0-108-51-108-108 0-58 51-110 108-110z"></path>
                            </svg>
                            <span className="font-medium text-foreground dark:text-foreground">Email</span>
                        </a>
                        <button
                            onClick={handleTwitterClick}
                            data-url="https://x.com/merchizm"
                            className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card"
                        >
                            <svg
                                className="mb-2 h-10 w-10 text-foreground dark:text-foreground"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                fill="currentColor"
                                viewBox="0 0 50 50"
                            >
                                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                            </svg>
                            <span className="font-medium text-foreground dark:text-foreground">Twitter/X</span>
                        </button>
                    </div>
                </RevealSection>

                <RevealSection className="mb-12" delay={0.07}>
                    <h2 className="mb-6 text-2xl font-bold text-foreground dark:text-foreground">
                        {__('İş Deneyimi')}
                    </h2>
                    <div className="space-y-4">
                        <AccordionItem
                            title="Beesoft - Full-stack Developer"
                            date={__('Mayıs 2025')}
                            logo="/assets/img/beesoft.png"
                        >
                            {__('experience.beesoft.summary')}
                        </AccordionItem>

                        <AccordionItem
                            title="Alfatek - Full-stack Developer / Dev Team Lead"
                            date={__('Aralık 2023 - Kasım 2024')}
                            logo="/assets/img/alfatek.png"
                        >
                            {__(
                                "Bu pozisyonda Laravel framework'ü üzerinde kapsamlı tema sistemleri geliştirdim ve Tailwind CSS ile Livewire teknolojilerini entegre ederek modern, dinamik web uygulamaları oluşturdum. Proje yönetimi süreçlerinde product manager ile yakın işbirliği içinde çalışarak, geliştirici ekibinin teknik liderliğini üstlendim."
                            )}
                        </AccordionItem>

                        <div className="rounded-lg border border-border bg-background p-4 transition-all duration-300 dark:border-border dark:bg-card">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-12 w-12 rounded-full object-cover"
                                        src="/assets/img/itemsatis.png"
                                        alt="Itemsatis Logo"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                                        Itemsatis - Full-stack Developer
                                    </h3>
                                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                        {__('Aralık 2023 - Kasım 2024')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <AccordionItem
                            title="Bionluk - Freelance Web Developer"
                            date="2020 - 2022"
                            logo="/assets/img/bionluk_logo.jpg"
                        >
                            {__(
                                "PHP üzerinde Kendi View-Controller-Model Yapısını kurma şansım oldu. ReflectionClass ile Controller yapısını gerçekleştirdim. View için ise Twig ve OOP'den yararlandım, Sınıfları genellikle composer ile otomatik olarak yükledim. Bazı zamanlar PHP üzerine eklemeler yapmam gerekti, IMAP, REDIS gibi eklentileri kurdum. Zaten pekte uzak olmadığım SOLID, KISS prensiplerini kullandım. Kodların okunabilirliği ve geriye dönük düzenlemeler için PHPDoc'tan vazgeçmedim. Çoğu zaman işin kısalığından dolayı manuel olarak kod kontrolü gerçekleştirsemde PHPUnit Test kütüphanesini genel olarak öğrendim ve bir kaç işimde ve projelerde kullandım."
                            )}
                        </AccordionItem>

                        <AccordionItem title="Akgida - Intern" date="2019 - 2020" logo="/assets/img/akgida.jpg">
                            {__(
                                'Bir şirketin tam olarak nasıl sorunsuz bir şekilde işlemesi için gereken donanımları, çalışanların isimleriyle LDAP ağına nasıl bağlı olduklarını ve bu ağa nasıl giriş yaptıklarını, kayıtlarını nasıl oluşturduğumuzu tecrübe ettim. Bunun yanı sıra Bilgisayar Donanımlarıyla ilişkimi kuvvetlendirerek cihazların yanıtlarına göre hangi donanımın sıkıntılı olduğunu çözebilecek konuma geldim. Bir IT Çalışanının rutin olarak neleri kontrol ettiğini ve problemleri hangi prensipler ile çözdüklerini, görev yönetimini nasıl gerçekleştirdiklerini ve gelişimi nasıl takip ettiklerini öğrendim.'
                            )}
                        </AccordionItem>
                    </div>
                </RevealSection>

                <RevealSection className="mb-12" delay={0.09}>
                    <h2 className="mb-6 text-2xl font-bold text-foreground dark:text-foreground">
                        {__('Öne Çıkan Yetenekler')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card">
                            <svg
                                className="mb-3 h-12 w-12 text-foreground dark:text-foreground"
                                fill="currentColor"
                                viewBox="0 0 194.44 97.7"
                            >
                                <path
                                    d="M430.16,483.7H459q12.7.11,18.4,7.32t3.77,19.69a37.77,37.77,0,0,1-3.34,11.19,33.26,33.26,0,0,1-6.89,9.9,24,24,0,0,1-11.51,7.1,53,53,0,0,1-12.7,1.51H433.82l-4.09,20.44h-15l15.39-77.15h0M442.75,496l-6.46,32.28a7.92,7.92,0,0,0,1.29.11h1.51a56.58,56.58,0,0,0,17.22-2q6.89-2.26,9.25-15.71,1.94-11.3-3.87-13A48.28,48.28,0,0,0,447.38,496q-1.29.11-2.47.11h-2.26l.11-.11"
                                    transform="translate(-414.78 -463.15)"
                                />
                                <path
                                    d="M498.2,463.15h14.85l-4.2,20.55H522.2q11,.22,16.36,4.52t3.23,16.36l-7.21,35.83H519.51l6.89-34.22q1.07-5.38-.65-7.64t-7.42-2.26l-11.94-.11-8.82,44.22H482.71l15.49-77.26h0"
                                    transform="translate(-414.78 -463.15)"
                                />
                                <path
                                    d="M557.73,483.7h28.84q12.7.11,18.4,7.32t3.77,19.69a37.77,37.77,0,0,1-3.34,11.19,33.27,33.27,0,0,1-6.89,9.9A24,24,0,0,1,587,538.9a53,53,0,0,1-12.7,1.51H561.39l-4.09,20.44h-15l15.39-77.15h0M570.32,496l-6.46,32.28a7.92,7.92,0,0,0,1.29.11h1.51a56.58,56.58,0,0,0,17.22-2q6.89-2.26,9.25-15.71,1.94-11.3-3.87-13A48.28,48.28,0,0,0,574.94,496q-1.29.11-2.47.11h-2.26l.11-.11"
                                    transform="translate(-414.78 -463.15)"
                                />
                            </svg>
                            <span className="font-semibold text-foreground dark:text-foreground">PHP</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card">
                            <img src="/assets/icons/light/NodeJS.svg" className="mb-3 h-12 w-12" alt="Node.js" />
                            <span className="font-semibold text-foreground dark:text-foreground">Node.js</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card">
                            <img
                                src="/assets/icons/solids/TypeScript.svg"
                                className="mb-3 h-12 w-12"
                                alt="TypeScript"
                            />
                            <span className="font-semibold text-foreground dark:text-foreground">TypeScript</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border dark:bg-card">
                            <svg className="mb-3 h-12 w-12" fill="#ff2d20" viewBox="0 0 201.56 207.5">
                                <path
                                    d="M612.67,455.19a3.28,3.28,0,0,1,.11.85v44.54a3.25,3.25,0,0,1-1.63,2.82l-37.38,21.52v42.66a3.26,3.26,0,0,1-1.62,2.82l-78,44.92a3.49,3.49,0,0,1-.57.24c-.07,0-.14.07-.22.09a3.27,3.27,0,0,1-1.66,0c-.09,0-.17-.07-.26-.11a3.38,3.38,0,0,1-.54-.22l-78-44.92a3.25,3.25,0,0,1-1.63-2.82V434a3.32,3.32,0,0,1,.11-.85c0-.09.08-.18.11-.27a3.2,3.2,0,0,1,.21-.5,3,3,0,0,1,.22-.29,3.31,3.31,0,0,1,.29-.38,3.17,3.17,0,0,1,.32-.24,2.65,2.65,0,0,1,.36-.28h0l39-22.46a3.26,3.26,0,0,1,3.25,0l39,22.46h0a4,4,0,0,1,.36.28,3.84,3.84,0,0,1,.32.24,3.8,3.8,0,0,1,.29.38,3,3,0,0,1,.22.29,3.39,3.39,0,0,1,.21.5c0,.09.09.18.11.28a3.28,3.28,0,0,1,.11.85v83.46l32.51-18.72V456a3.28,3.28,0,0,1,.11-.84c0-.1.08-.18.11-.28a3.66,3.66,0,0,1,.21-.5c.06-.11.15-.19.22-.29a3.34,3.34,0,0,1,.29-.38,3.12,3.12,0,0,1,.32-.24,3.28,3.28,0,0,1,.36-.28h0l39-22.46a3.25,3.25,0,0,1,3.25,0l39,22.46a3.59,3.59,0,0,1,.37.28c.1.08.22.15.31.24a3.8,3.8,0,0,1,.29.38,2.45,2.45,0,0,1,.22.29,3.22,3.22,0,0,1,.21.5A2.32,2.32,0,0,1,612.67,455.19Zm-6.39,43.51v-37l-13.65,7.86-18.86,10.86v37l32.52-18.72Zm-39,67V528.64l-18.55,10.59-53,30.23v37.41ZM417.72,439.58V565.7l71.52,41.17v-37.4l-37.36-21.15h0a151.92,151.92,0,0,0-.66-.5h0a3.09,3.09,0,0,1-.27-.34,3.47,3.47,0,0,1-.24-.32h0a2.59,2.59,0,0,1-.17-.41,2.4,2.4,0,0,1-.15-.37h0a3.11,3.11,0,0,1-.06-.47,2.82,2.82,0,0,1,0-.37h0V458.3l-18.86-10.86-13.65-7.85Zm35.76-24.33L421,434l32.5,18.71L486,434l-32.5-18.71ZM470.39,532l18.86-10.85V439.58l-13.65,7.86L456.73,458.3v81.58Zm100.13-94.68L538,456l32.5,18.71L603,456Zm-3.25,43-18.86-10.86-13.65-7.86v37l18.86,10.85,13.66,7.86Zm-74.78,83.46,47.67-27.21L564,523l-32.47-18.7-37.39,21.53L460,545.48Z"
                                    transform="translate(-411.22 -408.25)"
                                />
                            </svg>
                            <span className="font-semibold text-foreground dark:text-foreground">Laravel</span>
                        </div>
                    </div>
                </RevealSection>

                {featuredProjects && featuredProjects.length > 0 && (
                    <RevealSection className="mb-8" delay={0.12}>
                        <h2 className="mb-6 text-2xl font-bold text-foreground dark:text-foreground">
                            {__('Öne Çıkan Projeler')}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {featuredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-border dark:bg-card"
                                >
                                    <Link
                                        href={route('projects.show', project.slug)}
                                        className="block h-48 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${project.image})` }}
                                    >
                                        <span className="sr-only">{project.title}</span>
                                    </Link>
                                    <div className="flex flex-grow flex-col p-6">
                                        <h3 className="text-xl font-semibold text-foreground dark:text-foreground">
                                            <Link href={route('projects.show', project.slug)}>{project.title}</Link>
                                        </h3>
                                        <p className="mt-2 flex-grow text-base text-foreground dark:text-foreground">
                                            {project.description}
                                        </p>
                                        {project.tags && project.tags.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-foreground dark:bg-secondary dark:text-foreground"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="mt-6 flex items-center gap-4">
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary"
                                                >
                                                    <svg
                                                        className="mr-2 h-4 w-4"
                                                        viewBox="0 0 512 512"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                    >
                                                        <path d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"></path>
                                                    </svg>
                                                    GitHub
                                                </a>
                                            )}
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary"
                                                >
                                                    <svg
                                                        className="mr-2 h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        ></path>
                                                    </svg>
                                                    {__('Canlı Demo')}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </RevealSection>
                )}
            </div>

            <TwitterModal
                isOpen={isTwitterModalOpen}
                onCancel={handleModalCancel}
                onProceed={handleModalProceed}
                url={twitterUrl}
            />
        </>
    );
}

Index.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Index;
