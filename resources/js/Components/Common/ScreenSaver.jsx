import React, { useState, useEffect, useRef } from 'react';

const byeArray = [
    'körişirbiz',
    'görüşürüz',
    'αντιο',
    'ნახვამდის',
    'довиждане',
    'увидимся',
    'хayr',
    'көрүшкөнчө',
    'кездескенше',
    'találkozunk',
    '또 봐요',
    'tschüss',
    'goodbye',
    'doei',
    'au revoir',
    'şalom',
    'vale',
    'namaste',
    'さようなら',
    'vemo-nos',
    'slán',
    'hüvasti',
];

function getRandomElement(excludeElement) {
    let randElement = excludeElement;
    while (randElement === excludeElement) {
        const randIndex = Math.floor(Math.random() * byeArray.length);
        randElement = byeArray[randIndex];
    }
    return randElement;
}

export default function ScreenSaver() {
    const [showScreenSaver, setShowScreenSaver] = useState(false);
    const [currentText, setCurrentText] = useState('görüşürüz');
    const textIntervalId = useRef(null);
    const showTimeoutId = useRef(null);

    const startTextUpdate = () => {
        if (textIntervalId.current) {
            clearInterval(textIntervalId.current);
        }
        return setInterval(() => {
            setCurrentText((prevText) => getRandomElement(prevText));
        }, 1500);
    };

    const handleMouseLeave = () => {
        if (showTimeoutId.current) return;
        showTimeoutId.current = setTimeout(() => {
            setShowScreenSaver(true);
            textIntervalId.current = startTextUpdate();
        }, 1600);
    };

    const handleMouseMove = () => {
        if (showTimeoutId.current) {
            clearTimeout(showTimeoutId.current);
            showTimeoutId.current = null;
        }
        if (textIntervalId.current) {
            clearInterval(textIntervalId.current);
            textIntervalId.current = null;
        }
        setShowScreenSaver(false);
    };

    useEffect(() => {
        // Development modunda screensaver'ı devre dışı bırak
        if (import.meta.env.DEV) {
            return;
        }

        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mousemove', handleMouseMove);
            if (textIntervalId.current) {
                clearInterval(textIntervalId.current);
            }
            if (showTimeoutId.current) {
                clearTimeout(showTimeoutId.current);
            }
        };
    }, []);

    const animationStyles = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }

    .text-animate {
        animation: fadeInOut 1.5s ease-in-out forwards;
    }
  `;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-[white] transition-opacity duration-500 dark:bg-background-dark ${showScreenSaver ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
            <style>{animationStyles}</style>
            <span
                key={currentText}
                className="text-animate text-[14vmin] font-medium tracking-[2px] text-text dark:text-text-dark"
            >
                {currentText}
            </span>
            <span className="absolute bottom-[6vmin] m-[5px] text-text dark:text-text-dark">
                {__('Mesajınızı bekliyorum')}
            </span>
            <a
                className="absolute bottom-[4vmin] m-[5px] font-medium text-light-text no-underline dark:text-light-text-dark"
                href="mailto:merichrocks@gmail.com"
            >
                merichrocks@gmail.com
            </a>
        </div>
    );
}
