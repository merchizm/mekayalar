<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Excuse My Ego</title>
    <style>
      p {
        margin: 0;
      }

        :root {
            --bg-color-light: #ffffff;
            --text-color-light: #000000;
            --text-color-inactive-light: rgba(0, 0, 0, 0.3);

            --bg-color-dark: #121212;
            --text-color-dark: #ffffff;
            --text-color-inactive-dark: rgba(255, 255, 255, 0.3);
        }
        
        body {
            background-color: var(--bg-color-light);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
            overflow: hidden;
            transition: background-color 0.5s ease;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background-color: var(--bg-color-dark);
            }
        }

        #lyrics-section {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 400px;
        }
        
        #spinner-container {
            height: 300px;
            width: 80%;
            max-width: 800px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.8s ease-in-out;
        }

        .lyrics-spinner {
            position: absolute;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.8s ease-in-out;
        }

        .lyric-line {
            font-size: 1.2rem;
            font-weight: bold;
            line-height: 1.3;
            padding: 10px 0;
            white-space: nowrap;
            color: var(--text-color-inactive-light);
            transition: font-size 0.8s ease-in-out,
                        opacity 0.8s ease-in-out,
                        filter 0.8s ease-in-out,
                        color 0.8s ease-in-out;
            opacity: 0;
            filter: blur(4px);
        }

        .lyric-line.active {
            font-size: 2.5rem;
            opacity: 1;
            filter: blur(0);
            color: var(--text-color-light);
        }
        
        .lyric-line.near {
            font-size: 1.2rem;
            opacity: 0.5;
            filter: blur(2px);
        }

        @media (prefers-color-scheme: dark) {
            .lyric-line {
                color: var(--text-color-inactive-dark);
            }
            .lyric-line.active {
                color: var(--text-color-dark);
            }
        }
        
        .final-message {
            font-size: 1.75rem;
            font-weight: bold;
            line-height: 1.6;
            padding: 20px;
            color: var(--text-color-light);
            opacity: 0;
            position: absolute;
            transform: translateY(20px);
            pointer-events: none;
            transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
        }
        
        @media (prefers-color-scheme: dark) {
            .final-message {
                color: var(--text-color-dark);
            }
            .final-message p:last-child {
                color: var(--text-color-inactive-dark);
            }
        }

        .final-message.visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        #start-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--bg-color-light);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
            transition: opacity 1s ease-in-out;
        }
        
        @media (prefers-color-scheme: dark) {
            #start-overlay {
                background-color: var(--bg-color-dark);
            }
        }

        #start-text {
            color: var(--text-color-light);
            font-size: 1.2rem;
            font-weight: 500;
            letter-spacing: 0.5px;
            opacity: 0.7;
        }

        @media (prefers-color-scheme: dark) {
            #start-text {
                color: var(--text-color-dark);
            }
        }
        
        #dialogue-section {
            position: absolute;
            width: 80%;
            max-width: 800px;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }

        #dialogue-section p {
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1.6;
            margin: 0;
            color: var(--text-color-light);
            transition: opacity 0.8s ease-in-out;
            position: absolute;
            width: 100%;
            left: 0;
            opacity: 0;
        }

        @media (prefers-color-scheme: dark) {
            #dialogue-section p {
                color: var(--text-color-dark);
            }
        }
        
        #replay-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--bg-color-light);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1001;
            cursor: pointer;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
        
        @media (prefers-color-scheme: dark) {
            #replay-overlay {
                background-color: var(--bg-color-dark);
            }
        }
    </style>
</head>
<body>

    <div id="start-overlay">
        <p id="start-text">Başlamak için herhangi bir yere dokunun</p>
    </div>

<main id="lyrics-section">
    <div id="spinner-container">
        <div class="lyrics-spinner">
            <p class="lyric-line">Excuse my ego</p>
            <p class="lyric-line">Can't go incognito</p>
            <p class="lyric-line">Every time you see me</p>
            <p class="lyric-line">It's like winning big in Reno</p>
            <p class="lyric-line">Don't fuck with me, hoe</p>
            <p class="lyric-line">Take you down like judo</p>
            <p class="lyric-line">Make it rain</p>
            <p class="lyric-line">Im taking names from London to Meguro</p>
        </div>
    </div>
    
    <div class="final-message">
        <p>Emin ol, benim siteme girdiğini hatırlamak isteyeceksin.</p>
        <p style="opacity: 0.6;">Bu yüzden gizli moddan çıkmalısın.</p>
    </div>
    
    <div id="dialogue-section">
        <p>Evet, şarkıyı beğeneceğini tahmin etmiştim.</p>
        <p>Bazı insanlar şarkıyı ciddili üstüne alınabiliyor, inanabiliyor musun?</p>
        <p>Biliyorum çok saçma ama günümüzün hastalığı bu, herkes ben-merkeziyetçi.</p>
        <p>Her neyse umarım, web siteme de uğrarsın.</p>
        <p>Seni sevdim adamım, keyfine bak..</p>
    </div>
</main>

<div id="replay-overlay">
    <p id="start-text">Tekrar dinlemek için dokunman yeterli.</p>
</div>

<audio id="song" src="{{ asset('assets/excuse_my_ego.mp3') }}"></audio>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const spinner = document.querySelector('.lyrics-spinner');
        const lyrics = Array.from(spinner.children);
        const spinnerContainer = document.getElementById('spinner-container');
        const finalMessage = document.querySelector('.final-message');
        const song = document.getElementById('song');
        const dialogueSection = document.getElementById('dialogue-section');
        const dialogueLines = Array.from(dialogueSection.children);
        const replayOverlay = document.getElementById('replay-overlay');
        const lyricsSection = document.getElementById('lyrics-section');
        let dialogueTimer;

        if (!lyrics.length) return;
        
        const lyricTimings = [
            2000, // Excuse my ego (Süre Düzeltildi)
            2000, // Can't go incognito
            2000, // Every time you see me
            2200, // It's like winning big in Reno
            1900, // Don't fuck with me, hoe
            1900, // Take you down like judo
            1200, // Make it rain
            2600, // Im taking names from London to Meguro
            1000 
        ];

        let currentIndex = 0;

        function playDialogue() {
            let dialogueIndex = 0;
            const dialogueTimings = [4000, 5000, 5000, 4000, 4000];

            function nextDialogue() {
                if (dialogueIndex >= dialogueLines.length) return;

                const currentLine = dialogueLines[dialogueIndex];
                const prevLine = dialogueIndex > 0 ? dialogueLines[dialogueIndex - 1] : null;

                if (prevLine) {
                    prevLine.style.opacity = '0';
                }
                
                setTimeout(() => {
                    currentLine.style.opacity = '1';
                }, 400);

                const timeout = dialogueTimings[dialogueIndex];
                dialogueIndex++;
                setTimeout(nextDialogue, timeout);
            }
            nextDialogue();
        }

        function showDialogue() {
            finalMessage.style.opacity = '0';
            setTimeout(() => {
                finalMessage.style.display = 'none';
                dialogueSection.style.opacity = '1';
                playDialogue();
            }, 1000);
        }

        function updateSpinner() {
            if (currentIndex >= lyrics.length) {
                spinnerContainer.style.opacity = '0';
                setTimeout(() => {
                    spinnerContainer.style.display = 'none';
                    finalMessage.classList.add('visible');
                    dialogueTimer = setTimeout(showDialogue, 30000);
                }, 800);
                return;
            }
            
            lyrics.forEach((line, index) => {
                line.classList.remove('active', 'near');
                if (index === currentIndex) {
                    line.classList.add('active');
                } else if (Math.abs(index - currentIndex) === 1) {
                    line.classList.add('near');
                }
            });

            // Let the browser apply the new classes and font sizes before we measure.
            setTimeout(() => {
                const activeLine = lyrics[currentIndex];
                if (!activeLine) return;

                const offset = (spinnerContainer.clientHeight / 2) - (activeLine.offsetTop + activeLine.clientHeight / 2);
                spinner.style.transform = `translateY(${offset}px)`;

                const timeoutDuration = lyricTimings[currentIndex];
                currentIndex++;
                
                setTimeout(updateSpinner, timeoutDuration);
            }, 20); // A small delay for rendering
        }

        // Set initial state without delay for the first paint
        lyrics.forEach((line, index) => {
            if (index === 0) line.classList.add('active');
            else if (index === 1) line.classList.add('near');
        });
        const initialActiveLine = lyrics[0];
        const initialOffset = (spinnerContainer.clientHeight / 2) - (initialActiveLine.offsetTop + initialActiveLine.clientHeight / 2);
        spinner.style.transform = `translateY(${initialOffset}px)`;


        const startOverlay = document.getElementById('start-overlay');
        
        startOverlay.addEventListener('click', () => {
            startOverlay.style.opacity = '0';
            setTimeout(() => startOverlay.remove(), 1000);
            
            song.play();
            
            setTimeout(() => {
                currentIndex = 0;
                updateSpinner();
            }, 500);

        }, { once: true });

        song.addEventListener('ended', () => {
            clearTimeout(dialogueTimer);
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '0';

            setTimeout(() => {
                lyricsSection.style.display = 'none';
                replayOverlay.style.display = 'flex';
                document.body.style.opacity = '1';
                setTimeout(() => replayOverlay.style.opacity = '1', 50);
            }, 1000);
        });

        replayOverlay.addEventListener('click', () => {
            replayOverlay.style.opacity = '0';
            setTimeout(() => {
                replayOverlay.style.display = 'none';
                // Reset state
                currentIndex = 0;
                dialogueLines.forEach(p => p.style.opacity = '0');
                dialogueSection.style.opacity = '0';
                finalMessage.classList.remove('visible');
                
                lyricsSection.style.display = 'flex';
                spinnerContainer.style.display = 'flex';
                spinnerContainer.style.opacity = '1';

                // Restart
                song.currentTime = 0;
                song.play();
                updateSpinner();
            }, 1000);
        });
    });
</script>

</body>
</html>
