<div class="flex items-center gap-2"
     x-data="{ fontSizeModified: @entangle('fontSizeModified'), currentFontSize: @entangle('currentFontSize')}"
     x-init="$watch('currentFontSize', value => {
             document.getElementById('container').style.fontSize = value;
        });">
    <button @click="$wire.normalizeFont()" x-show="fontSizeModified" class="w-10 h-10 flex items-center justify-center rounded-lg border border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300" title="Yazı boyutunu sıfırla">
        <svg class="fill-text dark:fill-text-dark" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M318.077-220.001q-12.769 0-21.384-8.616-8.615-8.615-8.615-21.384t8.615-21.384Q305.308-280 318.077-280h257.078q62.615 0 107.769-41.346 45.154-41.347 45.154-102.116t-45.154-101.923q-45.154-41.154-107.769-41.154H294.306l90.232 90.232q8.692 8.692 8.692 21.076 0 12.385-8.692 21.077-8.692 8.692-21.269 8.5-12.576-.193-20.884-8.5L205.309-571.231q-5.615-5.615-7.923-11.846-2.308-6.23-2.308-13.461T197.386-610q2.308-6.23 7.923-11.846l137.076-137.076q8.693-8.692 21.077-8.692 12.384 0 21.076 8.692t8.5 21.269q-.192 12.576-8.5 20.884l-90.232 90.232h280.849q87.768 0 150.345 58.576 62.576 58.577 62.576 144.499 0 85.923-62.576 144.692-62.577 58.769-150.345 58.769H318.077Z"/></svg>
    </button>
    <button @click="$wire.decreaseFont()" class="w-10 h-10 flex items-center justify-center rounded-lg border border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300" title="Yazı boyutunu küçült">
        <svg class="fill-text dark:fill-text-dark" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M637.692-450.001q-12.75 0-21.374-8.628-8.625-8.629-8.625-21.384 0-12.756 8.625-21.371 8.624-8.615 21.374-8.615h240q12.75 0 21.375 8.628 8.624 8.629 8.624 21.384 0 12.756-8.624 21.371-8.625 8.615-21.375 8.615h-240Zm-460.308 95.846-46.77 122.847q-3.846 10.154-11.769 15.73-7.923 5.577-18.43 5.577-17.261 0-27.107-14.307t-3.77-30.538L255.54-729.231q3.461-9.384 11.696-15.076 8.234-5.692 17.841-5.692h25.14q10.474 0 18.32 5.692t11.308 15.076l186.231 473.847q6.077 16.615-4.015 30.999-10.093 14.384-27.287 14.384-10.466 0-19.442-5.948-8.976-5.949-12.716-16.359l-46.154-121.847H177.384Zm21.692-59.844H394.77l-95.203-252.002h-4.644l-95.847 252.002Z"/></svg>
    </button>
    <button @click="$wire.increaseFont()" class="w-10 h-10 flex items-center justify-center rounded-lg border border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300" title="Yazı boyutunu büyült">
        <svg class="fill-text dark:fill-text-dark" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m177.384-354.155-46.77 122.847q-3.846 10.154-11.769 15.73-7.923 5.577-18.43 5.577-17.261 0-27.107-14.307t-3.77-30.538L255.54-729.231q3.461-9.384 11.696-15.076 8.234-5.692 17.841-5.692h25.14q10.474 0 18.32 5.692t11.308 15.076l186.231 473.847q6.077 16.615-4.015 30.999-10.093 14.384-27.287 14.384-10.466 0-19.442-5.948-8.976-5.949-12.716-16.359l-46.154-121.847H177.384Zm21.692-59.844H394.77l-95.203-252.002h-4.644l-95.847 252.002Zm528.617-36.002h-90.001q-12.75 0-21.374-8.628-8.625-8.629-8.625-21.384 0-12.756 8.625-21.371 8.624-8.615 21.374-8.615h90.001V-600q0-12.75 8.629-21.375 8.628-8.624 21.384-8.624 12.755 0 21.37 8.624 8.615 8.625 8.615 21.375v90.001h90.001q12.75 0 21.375 8.628 8.624 8.629 8.624 21.384 0 12.756-8.624 21.371-8.625 8.615-21.375 8.615h-90.001V-360q0 12.75-8.628 21.374-8.629 8.625-21.384 8.625-12.756 0-21.371-8.625-8.615-8.624-8.615-21.374v-90.001Z"/></svg>
    </button>
</div>
