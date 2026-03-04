import React, { useState, useEffect, useRef } from 'react';

const byeArray = [
    'görüşürüz',      // Turkish
    'körişirbiz',
    'көрүшкөнчө',     // Kyrgyz
    'кездескенше',    // Kazakh
    'görüşərik',      // Azerbaijani
    'körüşkönçö',     // Kyrgyz latinized
    'kedeskenşe',     // Kazakh latinized
    'körüşkence',     // Alt spelling variants exist
    'көрүшкүчө',      // Kyrgyz variant
    'hayr',           // Turkic/Arabic loan, you already have xayr
    'xayr',           // Azerbaijani-ish spelling
    'hajr',           // variant
    'sau',            // Tatar/Bashkir colloq “bye”

    // Major living languages (single word where possible)
    'goodbye',        // English
    'tschüss',        // German
    'doei',           // Dutch
    'ciao',           // Italian (also used elsewhere)
    'addio',          // Italian
    'au revoir',      // (two words) -> excluded by your rule, so not included
    'adiós',          // Spanish (single token)
    'chao',           // Spanish/LatAm
    'tchau',          // Portuguese
    'adeus',          // Portuguese
    'pa',             // Romanian “bye”
    'hej',            // Swedish/Danish hello/bye vibe
    'hejdå',          // Swedish (single token with diacritic)
    'farvel',         // Danish/Norwegian
    'adjö',           // Swedish “adieu”
    'moro',           // Finnish bye (colloq)
    'heippa',         // Finnish bye
    'näkemiin',       // Finnish formal-ish but single token
    'tsau',           // Estonian/Russian colloq sometimes
    'nägemist',       // Estonian
    'viso',           // Lithuanian “bye”
    'sudie',          // Lithuanian “farewell”
    'ate',            // Latvian “bye” (also TR/BR internet “até”)
    'uzredzēšanos',   // Latvian “see you” concept, single token
    'zbogom',         // Croatian/Serbian/Bosnian
    'bog',            // Croatian colloq “bye”
    'ćao',            // Serbian/Croatian (single token)
    'doviđenja',      // Serbian/Croatian (single token)
    'пока-пока',      // Russian “bye”
    'дофиждане',      // Bulgarian-ish (you have довиждане)
    'чао',            // Bulgarian/Slavic via Italian
    'salaam',         // Arabic loan used as greeting/bye
    'maasalaama',     // Arabic “ma’a salama” as one token translit
    'وداعا',          // Arabic “farewell” (wada’an) single token
    'sayonara',       // Japanese romanized
    'さようなら',      // Japanese
    'じゃあね',        // Japanese casual (jaa-ne) technically 2 kana chunks but single token
    'jaane',          // Japanese casual romanized
    'annyeong',       // Korean (can be hello/bye)
    '안녕',           // Korean
    '잘가',           // Korean “go well” (jalga) single token
    '再见',           // Chinese “zaijian”
    'zaijian',        // Chinese romanized
    '拜拜',           // Chinese “bye-bye”
    'bàibài',         // alt
    'laa',            // Thai colloq particle-ish (iffy)
    'ลาก่อน',         // Thai “goodbye” (laa-gon) single token in Thai script
    'laagon',         // Thai romanized one-token
    'selamat',        // Malay/Indo (often needs more words but used alone)
    'dadah',          // Malay/Indo colloq bye
    'bye-bye',        // used widely
    'paalam',         // Tagalog “farewell”
    'alam',           // variant-ish
    'namaste',        // Hindi/Nepali (also greeting/bye)
    'नमस्ते',         // Devanagari
    'alvida',         // Hindi/Urdu “farewell”
    'خداحافظ',        // Urdu/Persian script often written together
    'khodahafez',     // Persian
    'بدرود',          // Persian “farewell” (bedrud)
    'khair',          // Arabic/Persian/Turkic loan
    'hüvasti',        // Estonian-ish
    'hvast',          // variant
    'slán',           // Irish
    'slánabhaile',    // Irish “safe home” concept, single token
    'hwyl',           // Welsh “bye” (short for “hwyl fawr”)
    'agur',           // Basque
    'ade',            // Indonesian slang
    'vale',           // Spanish/Italian “ok/bye-ish” (you have vale)

    // Caucasus / neighbors
    'αντίο',          // Greek (you have αντιο without accent)
    'ნახვამდის',      // Georgian (you have)
    'ցտեսություն',     // Armenian “goodbye”
    'ctesutyun',      // Armenian romanized one-token

    // Africa / world languages (single token approximations)
    'kwaheri',        // Swahili
    'tutaonana',      // Swahili “see you” concept, single token
    'salama',         // Swahili-ish (peace) used in partings
    'salaam',         // Arabic loan in East Africa
    'odabo',          // Yoruba “bye”
    'kaabo',          // (welcome) not bye -> excluded usually
    'dovi',           // informal placeholder; skip? kept out normally
    'adios',          // w/o accent fallback

    // Constructed / “dead-ish” / historical (working theory forms)
    'vale',           // Latin “farewell” (classic)
    'χαῖρε',          // Ancient Greek “rejoice/farewell” (chaire)
    'χαίρε',          // Ancient Greek
    'svasti',         // Sanskrit “well-being” (used as blessing/parting)
    'स्वस्ति',        // Sanskrit
    'farewell',       // English formal single token
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
