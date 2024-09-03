<div x-data="{ showScreenSaver: @entangle('showScreenSaver') }"
     x-init="
        document.body.addEventListener('mousemove', () => {
            showScreenSaver = false;
            intervalId = null;
        });
        document.addEventListener('mouseleave', () => {
            showScreenSaver = true;
            intervalId = startTextUpdate();
        });

         function getRandomElement(array, excludeElement) {
            let randElement = excludeElement;
            while (randElement === excludeElement) {
                const randIndex = Math.floor(Math.random() * array.length);
                randElement = array[randIndex];
            }
            return randElement;
        }

        function startTextUpdate() {
            let lastText = '';
            const byeArray = [
                'körişirbiz', 'görüşürüz', 'αντιο', 'ნახვამდის', 'довиждане', 'увидимся',
                'хayr', 'көрүшкөнчө', 'кездескенше', 'találkozunk', '또 봐요', 'tschüss',
                'goodbye', 'doei', 'au revoir', 'şalom', 'vale', 'namaste',
                'さようなら', 'vemo-nos', 'slán', 'hüvasti'
            ];
            return setInterval(() => {
                const newText = getRandomElement(byeArray, lastText);
                document.getElementById('currentText').innerText = newText;
                lastText = newText;
            }, 1000); // 10000 milliseconds = 10 seconds
        }

        let intervalId = null;
     ">
        <template x-if="showScreenSaver">
            <div class="fixed text-[white] flex flex-col items-center justify-center z-[100] bg-background dark:bg-background-dark inset-0">
                <span class="text-[14vmin] font-medium tracking-[2px] text-text dark:text-text-dark" id="currentText">görüşürüz</span>
                <span class="absolute m-[5px] bottom-[6vmin] text-text dark:text-text-dark">Mesajınızı bekliyorum</span>
                <a class="text-light-text dark:text-light-text-dark font-medium no-underline bottom-[4vmin] absolute m-[5px]" href="mailto:merich@duck.com">merich@duck.com</a>
            </div>
        </template>
</div>
