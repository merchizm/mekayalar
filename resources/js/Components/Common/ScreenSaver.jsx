import React, { useState, useEffect, useRef } from 'react';

const byeArray = [
  'körişirbiz', 'görüşürüz', 'αντιο', 'ნახვამდის', 'довиждане', 'увидимся',
  'хayr', 'көрүшкөнчө', 'кездескенше', 'találkozunk', '또 봐요', 'tschüss',
  'goodbye', 'doei', 'au revoir', 'şalom', 'vale', 'namaste',
  'さようなら', 'vemo-nos', 'slán', 'hüvasti'
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
      setCurrentText(prevText => getRandomElement(prevText));
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
    <div className={`fixed text-[white] flex flex-col items-center justify-center z-[100] bg-background dark:bg-background-dark inset-0 transition-opacity duration-500 ${showScreenSaver ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <style>{animationStyles}</style>
      <span key={currentText} className="text-[14vmin] font-medium tracking-[2px] text-text dark:text-text-dark text-animate">{currentText}</span>
      <span className="absolute m-[5px] bottom-[6vmin] text-text dark:text-text-dark">Mesajınızı bekliyorum</span>
      <a className="text-light-text dark:text-light-text-dark font-medium no-underline bottom-[4vmin] absolute m-[5px]" href="mailto:merichrocks@gmail.com">merichrocks@gmail.com</a>
    </div>
  );
} 
