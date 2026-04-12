import '../css/app.css';

const applyIncognitoTheme = (isDarkMode) => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';

    if (document.body) {
        document.body.classList.toggle('dark', isDarkMode);
    }
};

const mediaQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

const syncAutomaticTheme = (eventOrQuery) => {
    const isDarkMode = 'matches' in eventOrQuery ? eventOrQuery.matches : false;
    applyIncognitoTheme(isDarkMode);
};

if (mediaQuery) {
    syncAutomaticTheme(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', syncAutomaticTheme);
    } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(syncAutomaticTheme);
    }
} else {
    applyIncognitoTheme(false);
}

document.addEventListener('DOMContentLoaded', () => {
    if (mediaQuery) {
        syncAutomaticTheme(mediaQuery);
    }

    const spinner = document.querySelector('.lyrics-spinner');
    const spinnerContainer = document.getElementById('spinner-container');
    const finalMessage = document.querySelector('.final-message');
    const song = document.getElementById('song');
    const dialogueSection = document.getElementById('dialogue-section');
    const replayOverlay = document.getElementById('replay-overlay');
    const lyricsSection = document.getElementById('lyrics-section');
    const startOverlay = document.getElementById('start-overlay');

    if (
        !spinner ||
        !spinnerContainer ||
        !finalMessage ||
        !song ||
        !dialogueSection ||
        !replayOverlay ||
        !lyricsSection ||
        !startOverlay
    ) {
        return;
    }

    const lyrics = Array.from(spinner.children);
    const dialogueLines = Array.from(dialogueSection.children);

    if (!lyrics.length) {
        return;
    }

    const lyricTimings = [2000, 2000, 2000, 2200, 1900, 1900, 1200, 2600, 1000];
    const dialogueTimings = [4000, 5000, 5000, 4000, 4000];

    const lyricStateClasses = {
        idle: [
            'opacity-0',
            'blur-[4px]',
            'scale-95',
            'text-muted-foreground',
            'dark:text-muted-foreground',
            'text-sm',
            'sm:text-lg',
        ],
        near: [
            'opacity-60',
            'blur-[2px]',
            'scale-100',
            'text-muted-foreground',
            'dark:text-muted-foreground',
            'text-sm',
            'sm:text-lg',
        ],
        active: [
            'opacity-100',
            'blur-0',
            'scale-100',
            'text-foreground',
            'dark:text-foreground',
            'text-2xl',
            'sm:text-4xl',
            'lg:text-5xl',
        ],
    };

    const lyricStatePool = [...new Set(Object.values(lyricStateClasses).flat())];
    const scheduledTimeouts = new Set();

    let currentIndex = 0;

    const schedule = (callback, delay) => {
        const timeoutId = window.setTimeout(() => {
            scheduledTimeouts.delete(timeoutId);
            callback();
        }, delay);

        scheduledTimeouts.add(timeoutId);

        return timeoutId;
    };

    const clearScheduledTimeouts = () => {
        scheduledTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
        scheduledTimeouts.clear();
    };

    const setStateClasses = (element, pool, nextClasses) => {
        element.classList.remove(...pool);
        element.classList.add(...nextClasses);
    };

    const setDialogueVisibility = (element, isVisible) => {
        element.classList.toggle('opacity-100', isVisible);
        element.classList.toggle('opacity-0', !isVisible);
    };

    const positionActiveLine = () => {
        const activeLine = lyrics[currentIndex];

        if (!activeLine) {
            return;
        }

        const offset = spinnerContainer.clientHeight / 2 - (activeLine.offsetTop + activeLine.clientHeight / 2);
        spinner.style.transform = `translateY(${offset}px)`;
    };

    const syncLyricStates = () => {
        lyrics.forEach((line, index) => {
            if (index === currentIndex) {
                setStateClasses(line, lyricStatePool, lyricStateClasses.active);
                return;
            }

            if (Math.abs(index - currentIndex) === 1) {
                setStateClasses(line, lyricStatePool, lyricStateClasses.near);
                return;
            }

            setStateClasses(line, lyricStatePool, lyricStateClasses.idle);
        });
    };

    const playDialogue = () => {
        let dialogueIndex = 0;

        const nextDialogue = () => {
            if (dialogueIndex >= dialogueLines.length) {
                return;
            }

            const currentLine = dialogueLines[dialogueIndex];
            const previousLine = dialogueIndex > 0 ? dialogueLines[dialogueIndex - 1] : null;

            if (previousLine) {
                setDialogueVisibility(previousLine, false);
            }

            schedule(() => setDialogueVisibility(currentLine, true), 400);

            const timeout = dialogueTimings[dialogueIndex];
            dialogueIndex += 1;
            schedule(nextDialogue, timeout);
        };

        nextDialogue();
    };

    const showDialogue = () => {
        finalMessage.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        finalMessage.classList.add('opacity-0', 'translate-y-5', 'pointer-events-none');

        schedule(() => {
            finalMessage.classList.add('hidden');
            dialogueSection.classList.remove('opacity-0');
            dialogueSection.classList.add('opacity-100');
            playDialogue();
        }, 1000);
    };

    const updateSpinner = () => {
        if (currentIndex >= lyrics.length) {
            spinnerContainer.classList.add('opacity-0');

            schedule(() => {
                spinnerContainer.classList.add('hidden');
                finalMessage.classList.remove('hidden', 'opacity-0', 'translate-y-5', 'pointer-events-none');
                finalMessage.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
                schedule(showDialogue, 30000);
            }, 800);

            return;
        }

        syncLyricStates();

        schedule(() => {
            positionActiveLine();

            const timeoutDuration = lyricTimings[currentIndex];
            currentIndex += 1;

            schedule(updateSpinner, timeoutDuration);
        }, 20);
    };

    const resetDialogue = () => {
        dialogueSection.classList.remove('opacity-100');
        dialogueSection.classList.add('opacity-0');

        dialogueLines.forEach((line) => setDialogueVisibility(line, false));
    };

    const resetExperience = () => {
        clearScheduledTimeouts();
        currentIndex = 0;

        lyricsSection.classList.remove('hidden');

        spinnerContainer.classList.remove('hidden', 'opacity-0');
        spinnerContainer.classList.add('flex', 'opacity-100');

        finalMessage.classList.remove('hidden', 'opacity-100', 'translate-y-0', 'pointer-events-auto');
        finalMessage.classList.add('opacity-0', 'translate-y-5', 'pointer-events-none');

        resetDialogue();
        syncLyricStates();

        window.requestAnimationFrame(positionActiveLine);
    };

    const playSong = () => {
        const playback = song.play();

        if (playback && typeof playback.catch === 'function') {
            playback.catch(() => {});
        }
    };

    const startPlayback = () => {
        song.currentTime = 0;
        playSong();
        schedule(updateSpinner, 500);
    };

    resetExperience();

    startOverlay.addEventListener(
        'click',
        () => {
            startOverlay.classList.add('opacity-0');
            schedule(() => startOverlay.remove(), 1000);
            startPlayback();
        },
        { once: true }
    );

    song.addEventListener('ended', () => {
        clearScheduledTimeouts();
        document.body.classList.add('opacity-0');

        schedule(() => {
            lyricsSection.classList.add('hidden');
            replayOverlay.classList.remove('hidden');
            replayOverlay.classList.add('flex');
            document.body.classList.remove('opacity-0');

            window.requestAnimationFrame(() => {
                replayOverlay.classList.remove('opacity-0');
            });
        }, 1000);
    });

    replayOverlay.addEventListener('click', () => {
        replayOverlay.classList.add('opacity-0');

        schedule(() => {
            replayOverlay.classList.add('hidden');
            replayOverlay.classList.remove('flex');
            resetExperience();
            startPlayback();
        }, 1000);
    });
});
