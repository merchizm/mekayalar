import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SpotifyPlaying from '@/Components/Common/SpotifyPlaying';
import DarkModeToggle from '@/Components/Common/DarkModeToggle';
import ScreenSaver from '@/Components/Common/ScreenSaver';
import Header from '@/Components/Layout/Landing/Header';
import Footer from '@/Components/Layout/Landing/Footer';
import { detectIncognito } from 'detectincognitojs';
import { useThemeManager } from '@/hooks/useThemeManager';
import LanguageSwitcher from '@/Components/Common/LanguageSwitcher';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';

const routeRanks = [
    ['/guestbook', 70],
    ['/bookmarks', 60],
    ['/bookshelf', 50],
    ['/projects', 40],
    ['/poems', 30],
    ['/posts', 20],
    ['/', 10],
];

const getRouteRank = (path) => {
    const matched = routeRanks.find(([prefix]) => prefix !== '/' && path.startsWith(prefix));
    if (matched) {
        return matched[1];
    }

    return 10;
};

function LandingLayout({ children }) {
    const { isDarkMode, hasManualOverride, toggleManualMode, setTimeBasedMode, resetToAutomatic } = useThemeManager();
    const { url } = usePage();

    const [transitionDirection, setTransitionDirection] = useState(1);
    const previousUrlRef = useRef(url);

    const heroTransition = {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
    };

    const pageMotion = useMemo(() => {
        const enterX = transitionDirection >= 0 ? 32 : -32;
        const exitX = transitionDirection >= 0 ? -26 : 26;

        return {
            initial: { opacity: 0, x: enterX, y: 8, filter: 'blur(6px)' },
            animate: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
            exit: { opacity: 0, x: exitX, y: -4, filter: 'blur(4px)' },
        };
    }, [transitionDirection]);

    useEffect(() => {
        const checkIncognito = async () => {
            const result = await detectIncognito();
            if (result.isPrivate) {
                window.location.href = route('incognito');
            }
        };
        checkIncognito();
    }, []);

    useEffect(() => {
        const onStart = (event) => {
            const nextUrl = new URL(event.detail.visit.url.href).pathname;
            const currentUrl = previousUrlRef.current;
            const nextRank = getRouteRank(nextUrl);
            const currentRank = getRouteRank(currentUrl);

            setTransitionDirection(nextRank >= currentRank ? 1 : -1);
        };

        const onFinish = () => {};

        const removeStartListener = router.on('start', onStart);
        const removeFinishListener = router.on('finish', onFinish);

        return () => {
            removeStartListener();
            removeFinishListener();
        };
    }, []);

    useEffect(() => {
        previousUrlRef.current = url;
    }, [url]);

    return (
        <>
            <ScreenSaver />

            <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
                <Header />

                <div className="mx-auto max-w-screen-xl px-4 pb-16 pt-28">
                    <motion.div
                        className="mb-16 flex flex-col items-center text-center"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.08,
                                    delayChildren: 0.06,
                                },
                            },
                        }}
                    >
                        <motion.div
                            className="mx-auto mb-4 w-full max-w-[300px]"
                            variants={{
                                hidden: { opacity: 0, y: 18 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={heroTransition}
                        >
                            <ApplicationLogo className="w-[300px] fill-foreground" />
                        </motion.div>
                        <motion.h1
                            className="text-5xl font-bold tracking-tighter lg:text-7xl"
                            variants={{
                                hidden: { opacity: 0, y: 18 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={heroTransition}
                        >
                            Meriç Enes Kayalar
                        </motion.h1>
                        <motion.p
                            className="mt-4 max-w-2xl text-xl text-muted-foreground"
                            variants={{
                                hidden: { opacity: 0, y: 18 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={heroTransition}
                        >
                            {__('Yazılımcı • Pixel Artist • Minimalist')}
                        </motion.p>
                    </motion.div>

                    <main className="mx-auto w-full max-w-4xl">
                        <div className="mb-4 flex items-center justify-end gap-2 px-0 py-2.5">
                            <SpotifyPlaying />
                            <div className="rounded-xl border border-border bg-card p-1 shadow-sm">
                                <a
                                    href="/cv.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent"
                                    title="Özgeçmişimi Görüntüle"
                                    aria-label="Özgeçmişimi Görüntüle"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 448 512"
                                        className="text-primary"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm98.88 133.234c19.636 0 37.082 6.789 49.929 16.971c11.88 9.452 17.444 18.907 22.298 27.393l-33.923 16.949c-2.427-5.565-5.347-11.387-12.846-17.682c-8.248-6.552-16.478-8.484-23.524-8.484c-27.626 0-42.17 25.693-42.17 54.287c0 37.573 19.161 56.22 42.17 56.22c22.3 0 31.278-15.51 37.08-25.435L219.6 302.66c-6.315 9.926-12.374 19.635-25.95 29.069c-7.262 5.09-23.977 15.037-47.736 15.037C100.586 346.766 64 313.81 64 255.87c0-50.636 34.415-90.637 82.88-90.637m75.483 5.328h45.565L303.31 292.24l35.125-121.678H384l-59.379 171.112H281.01z"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex items-center rounded-xl border border-border bg-card p-1 shadow-sm">
                                <LanguageSwitcher />
                            </div>
                            <div className="flex items-center rounded-xl border border-border bg-card p-1 shadow-sm">
                                <DarkModeToggle
                                    isDarkMode={isDarkMode}
                                    toggleMode={toggleManualMode}
                                    hasManualOverride={hasManualOverride}
                                    resetToAutomatic={resetToAutomatic}
                                />
                            </div>
                        </div>
                        <hr className="m-0 h-px w-full rounded-[10px] border-0 border-t-2 border-solid border-t-border" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={url}
                                id="container"
                                className="mt-[30px] text-base"
                                initial={pageMotion.initial}
                                animate={pageMotion.animate}
                                exit={pageMotion.exit}
                                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>

                <Footer
                    isDarkMode={isDarkMode}
                    setTimeBasedMode={setTimeBasedMode}
                    hasManualOverride={hasManualOverride}
                    resetToAutomatic={resetToAutomatic}
                />
            </div>
        </>
    );
}

LandingLayout.displayName = 'LandingLayout';

export default LandingLayout;
