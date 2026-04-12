import React, { useEffect, useRef, useState } from 'react';

const DayIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        className="sm:h-4 sm:w-4"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"></path>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z"
        ></path>
    </svg>
);

const NightIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        className="sm:h-4 sm:w-4"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z"></path>
        <path d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z"></path>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
    </svg>
);

export default function TimezoneThemeSwitcher({
    isDarkMode: _isDarkMode,
    setTimeBasedMode,
    hasManualOverride,
    resetToAutomatic,
}) {
    const hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2];
    const [actualHour, setActualHour] = useState(null);
    const [displayHour, setDisplayHour] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const ticksContainerRef = useRef(null);
    const markerRef = useRef(null);
    const hoverTimerRef = useRef(null);

    useEffect(() => {
        const currentHour = new Date().getHours();
        setActualHour(currentHour);
        setDisplayHour(currentHour);
    }, []);

    useEffect(() => {
        if (displayHour !== null && setTimeBasedMode) {
            setTimeBasedMode(displayHour);
        }
    }, [displayHour, setTimeBasedMode]);

    const handleContainerEnter = () => {
        hoverTimerRef.current = window.setTimeout(() => {
            setShowHint(true);
        }, 2000);
    };

    const handleContainerLeave = () => {
        if (hoverTimerRef.current) {
            window.clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
        setShowHint(false);
    };

    useEffect(() => {
        return () => {
            if (hoverTimerRef.current) {
                window.clearTimeout(hoverTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const positionMarker = () => {
            const container = ticksContainerRef.current;
            const marker = markerRef.current;
            if (!container || !marker || displayHour === null) {
                if (marker) marker.style.opacity = '0';
                return;
            }

            const currentTick = container.querySelector(`[data-hour='${displayHour}'] > div`);

            if (currentTick) {
                const containerHeight = container.offsetHeight;
                const tickHeight = currentTick.offsetHeight;
                const markerHeight = marker.offsetHeight;
                const tickWidth = currentTick.offsetWidth;
                const markerWidth = marker.offsetWidth;

                const newLeft = currentTick.offsetLeft - markerWidth / 2 + tickWidth / 2;
                const newTop = containerHeight - tickHeight - markerHeight;

                marker.style.left = `${newLeft}px`;
                marker.style.top = `${newTop}px`;
                marker.style.opacity = '1';
            } else {
                marker.style.opacity = '0';
            }
        };

        const timer = setTimeout(positionMarker, 100);

        window.addEventListener('resize', positionMarker);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', positionMarker);
        };
    }, [displayHour]);

    return (
        <div className="flex w-full flex-col items-center">
            <div
                className="relative rounded-xl border border-border bg-card p-2 shadow-sm"
                id="timezone-switcher-container"
                onMouseEnter={handleContainerEnter}
                onMouseLeave={handleContainerLeave}
            >
                {showHint && (
                    <div className="absolute left-0 top-0 z-20 w-full -translate-y-full pb-3">
                        <div className="relative w-full rounded-2xl border border-border bg-card p-4 text-sm text-foreground shadow-lg">
                            <p className="font-semibold">ne bu?</p>
                            <p className="mt-1 text-muted-foreground">
                                bu zamanlanmış, otomatik tema değişim sistemini temsil eden ve dilersen de günün bir
                                saatine ışınlanmanı sağlayan büyü
                            </p>
                            <div className="absolute left-6 top-full z-[-10] h-4 w-4 -translate-y-2 rotate-45 border border-border bg-card"></div>
                        </div>
                    </div>
                )}
                <div className="flex flex-wrap justify-center gap-2" ref={ticksContainerRef}>
                    {hours.map((hour) => {
                        const isTickNight = hour >= 21 || hour < 9;
                        const isCurrent = hour === displayHour;
                        const isActual = hour === actualHour;

                        const dayNightClasses = isCurrent ? 'dot-current' : isTickNight ? 'dot-night' : 'dot-day';

                        return (
                            <button
                                key={hour}
                                type="button"
                                data-hour={hour}
                                onClick={() => {
                                    if (hasManualOverride && resetToAutomatic) {
                                        resetToAutomatic();
                                    }
                                    setDisplayHour(hour);
                                }}
                                className={`time-toggle-button flex items-center justify-center rounded-lg border border-border bg-card text-[11px] font-semibold text-foreground shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:bg-accent hover:shadow-md ${
                                    isCurrent ? 'border-primary ring-2 ring-ring/30' : ''
                                } ${dayNightClasses}`}
                                title={isActual ? __('Şu anki saat') : __('Saat seç')}
                            >
                                {isTickNight ? <NightIcon /> : <DayIcon />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
