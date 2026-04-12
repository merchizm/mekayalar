import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiExternalLink } from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi2';

export default function SpotifyPlaying() {
    const [isLoading, setIsLoading] = useState(false);
    const [musicName, setMusicName] = useState(null);
    const [musicArtist, setMusicArtist] = useState(null);
    const [musicImage, setMusicImage] = useState(null);
    const [musicUrl, setMusicUrl] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const hideTooltipTimeout = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(hideTooltipTimeout.current);
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        hideTooltipTimeout.current = setTimeout(() => {
            setShowTooltip(false);
        }, 300);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/spotify/currently-playing');
            const { isPlaying, musicName, musicArtist, musicImage, musicUrl } = response.data;
            setIsLoading(isPlaying);
            setMusicName(musicName);
            setMusicArtist(musicArtist);
            setMusicImage(musicImage);
            setMusicUrl(musicUrl);
        } catch {
            setIsLoading(false);
            setMusicName(null);
            setMusicArtist(null);
            setMusicImage(null);
            setMusicUrl(null);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000);

        return () => clearInterval(interval);
    }, []);

    const limit = (text, limit) => {
        if (text && text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    return (
        <div
            className="relative rounded-xl border border-border bg-background p-1 shadow-sm dark:border-border dark:bg-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isLoading ? (
                <div
                    className="flex h-10 items-center gap-2 rounded-lg px-3 transition-colors hover:bg-accent dark:hover:bg-accent"
                    title={__("Spotify'da Dinliyorum") + `: ${musicName}`}
                >
                    <div className="equalizer-container">
                        <div className="equalizer-bar"></div>
                        <div className="equalizer-bar"></div>
                        <div className="equalizer-bar"></div>
                        <div className="equalizer-bar"></div>
                    </div>
                    <span className="hidden text-xs font-medium text-foreground dark:text-foreground sm:inline">
                        {limit(`${musicName}${musicArtist ? ` - ${musicArtist}` : ''}`, 40)}
                    </span>
                    {showTooltip && musicUrl && (
                        <div className="absolute bottom-full left-1/2 z-20 mb-3 w-80 max-w-[calc(100vw-2rem)] -translate-x-1/2">
                            <div className="overflow-visible rounded-[1.35rem] border border-border bg-background/95 shadow-[0_22px_56px_-30px_rgba(17,24,39,0.38)] backdrop-blur-xl dark:border-border dark:bg-card/95 dark:shadow-[0_22px_56px_-30px_rgba(0,0,0,0.48)]">
                                <div className="flex items-center gap-3 p-3.5">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-[0.95rem] bg-secondary shadow-sm dark:bg-secondary">
                                        {musicImage ? (
                                            <img
                                                src={musicImage}
                                                alt={musicName || 'Spotify cover'}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-lg">
                                                ♪
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1 pr-1">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground dark:text-muted-foreground">
                                            {__('Şu an çalıyor')}
                                        </p>
                                        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-foreground dark:text-foreground">
                                            {musicName}
                                        </p>
                                        {musicArtist && (
                                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground dark:text-muted-foreground">
                                                {musicArtist}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex w-9 flex-shrink-0 flex-col items-center gap-2 self-center">
                                        <a
                                            href={musicUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/spotify-action interactive-pill relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm transition hover:opacity-90 dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                                            aria-label={__('Müziği Aç')}
                                        >
                                            <FiExternalLink className="h-[18px] w-[18px]" />
                                            <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground opacity-0 shadow-sm transition-all duration-200 group-hover/spotify-action:-translate-y-0.5 group-hover/spotify-action:opacity-100 dark:border-border dark:bg-card dark:text-foreground">
                                                {__('Müziği Aç')}
                                            </span>
                                        </a>
                                        <a
                                            href="https://open.spotify.com/user/hkt7thwkuynqutz8jenb3x0wu?si=eb716f20515241b4"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/spotify-action interactive-pill relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground shadow-sm transition hover:bg-accent dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-accent"
                                            aria-label={__('Profili Aç')}
                                        >
                                            <HiOutlineUserCircle className="h-[19px] w-[19px]" />
                                            <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground opacity-0 shadow-sm transition-all duration-200 group-hover/spotify-action:-translate-y-0.5 group-hover/spotify-action:opacity-100 dark:border-border dark:bg-card dark:text-foreground">
                                                {__('Profili Aç')}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                    title={__("Spotify'da aktif değilim")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        className="h-5 w-5 text-muted-foreground"
                        fill="currentColor"
                        viewBox="0 0 27 27"
                    >
                        <path d="M15,3C8.4,3,3,8.4,3,15s5.4,12,12,12s12-5.4,12-12S21.6,3,15,3z M19.731,21c-0.22,0-0.33-0.11-0.55-0.22 c-1.65-0.991-3.74-1.54-5.94-1.54c-1.21,0-2.53,0.22-3.63,0.44c-0.22,0-0.44,0.11-0.55,0.11c-0.44,0-0.77-0.33-0.77-0.77 s0.22-0.77,0.66-0.77c1.43-0.33,2.861-0.55,4.401-0.55c2.53,0,4.84,0.66,6.82,1.76c0.22,0.22,0.44,0.33,0.44,0.77 C20.39,20.78,20.06,21,19.731,21z M20.94,17.921c-0.22,0-0.44-0.11-0.66-0.22c-1.87-1.21-4.511-1.87-7.37-1.87 c-1.43,0-2.751,0.22-3.74,0.44c-0.22,0.11-0.33,0.11-0.55,0.11c-0.55,0-0.881-0.44-0.881-0.881c0-0.55,0.22-0.77,0.77-0.991 c1.32-0.33,2.641-0.66,4.511-0.66c3.08,0,5.94,0.77,8.361,2.2c0.33,0.22,0.55,0.55,0.55,0.881 C21.82,17.48,21.491,17.921,20.94,17.921z M22.37,14.4c-0.22,0-0.33-0.11-0.66-0.22c-2.2-1.21-5.39-1.98-8.47-1.98 c-1.54,0-3.19,0.22-4.621,0.55c-0.22,0-0.33,0.11-0.66,0.11c-0.66,0.111-1.1-0.44-1.1-1.099s0.33-0.991,0.77-1.1 C9.39,10.22,11.26,10,13.24,10c3.41,0,6.93,0.77,9.681,2.2c0.33,0.22,0.66,0.55,0.66,1.1C23.471,13.96,23.03,14.4,22.37,14.4z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
}
