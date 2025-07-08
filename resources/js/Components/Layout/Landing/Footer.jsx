import React from 'react';
import TimezoneThemeSwitcher from '@/Components/Common/TimezoneThemeSwitcher.jsx';

const Footer = () => {
  return (
    <footer className="mt-24 w-full">
      <div className="px-4 py-8 mx-auto max-w-screen-xl">
        <TimezoneThemeSwitcher />

        <div className="flex gap-8 justify-center items-end mt-12 mb-8 lg:gap-12">
          <div className="text-center transition-transform hover:scale-105">
            <img src="/assets/img/ataturk-32310.png" className="mx-auto mb-2 h-16" alt="Halaskâr Başöğretmenimiz Mareşal Mustafa Kemal Atatürk" />
            <span className="text-xs text-light-text dark:text-light-text-dark">
              Halaskâr<br />Mustafa Kemal Atatürk
            </span>
          </div>
          <div className="text-center transition-transform hover:scale-105">
            <img src="/assets/img/turkiye_coat_of_army_fan_made.png" className="mx-auto mb-2 h-20" alt="Türkiye Coat Of Army (Unofficial)" />
            <span className="text-xs text-light-text dark:text-light-text-dark">
              Türkiye<br />Cumhuriyeti
            </span>
          </div>
          <div className="text-center transition-transform hover:scale-105">
            <img src="/assets/img/tatarstan_coat_of_army.png" className="mx-auto mb-2 h-16" alt="Tatarstan Coat Of Army" />
            <span className="text-xs text-light-text dark:text-light-text-dark">
              Tatarstan<br />Respublikasy
            </span>
          </div>
        </div>

        <div className="mt-8 text-sm text-center text-light-text dark:text-light-text-dark">
          <div className="flex gap-2 justify-center items-center">
            <span>© 2021-{new Date().getFullYear()}</span>
            <div className="flex flex-row gap-1 justify-center items-center">
              <svg className="w-3 h-3 fill-text dark:fill-text-dark" viewBox="0 0 700.00001 700">
                <g transform="translate(1252.3164,-304.67969)">
                  <path style={{ opacity: 1, fillOpacity: 1, stroke: 'none', strokeWidth: 1, strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity: 0 }} d="m -902.3164,304.67969 -28.04007,302.41272 -115.18233,-95.63509 95.63512,115.1823 -302.41272,28.04007 302.41348,28.03931 -95.63588,115.1823 115.18233,-95.63433 28.04007,302.41273 28.03931,-302.41349 115.1823,95.63509 -95.63509,-115.1823 302.41348,-28.03931 -302.41272,-28.04007 95.63433,-115.1823 -115.1823,95.63586 -28.03931,-302.41349 z" />
                </g>
              </svg>
              <span>Meriç Enes Kayalar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
