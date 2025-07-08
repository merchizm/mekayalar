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
  const intervalId = useRef(null);
  const lastText = useRef('');

  const startTextUpdate = () => {
    return setInterval(() => {
      const newText = getRandomElement(lastText.current);
      setCurrentText(newText);
      lastText.current = newText;
    }, 1000);
  };

  const handleMouseLeave = () => {
    setShowScreenSaver(true);
    intervalId.current = startTextUpdate();
  };

  const handleMouseMove = () => {
    setShowScreenSaver(false);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mousemove', handleMouseMove);
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  if (!showScreenSaver) {
    return null;
  }

  return (
    <div className="fixed text-[white] flex flex-col items-center justify-center z-[100] bg-background dark:bg-background-dark inset-0">
      <span className="text-[14vmin] font-medium tracking-[2px] text-text dark:text-text-dark">{currentText}</span>
      <span className="absolute m-[5px] bottom-[6vmin] text-text dark:text-text-dark">Mesajınızı bekliyorum</span>
      <a className="text-light-text dark:text-light-text-dark font-medium no-underline bottom-[4vmin] absolute m-[5px]" href="mailto:merichrocks@gmail.com">merichrocks@gmail.com</a>
    </div>
  );
} 
