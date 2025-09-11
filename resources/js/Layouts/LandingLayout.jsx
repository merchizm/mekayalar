import React, { useEffect } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SpotifyPlaying from '@/Components/Common/SpotifyPlaying';
import DarkModeToggle from '@/Components/Common/DarkModeToggle';
import ScreenSaver from '@/Components/Common/ScreenSaver';
import Header from '@/Components/Layout/Landing/Header';
import Footer from '@/Components/Layout/Landing/Footer';
import { detectIncognito } from "detectincognitojs";
import TimezoneThemeSwitcher from '@/Components/Common/TimezoneThemeSwitcher';
import { useThemeManager } from '@/hooks/useThemeManager';
import LanguageSwitcher from '@/Components/Common/LanguageSwitcher';

function LandingLayout({ children, seo }) {
  const {
    isDarkMode,
    hasManualOverride,
    toggleManualMode,
    setTimeBasedMode,
    resetToAutomatic
  } = useThemeManager();

  useEffect(() => {
    const checkIncognito = async () => {
      const result = await detectIncognito();
      if (result.isPrivate) {
        window.location.href = route('incognito');
      }
    };
    checkIncognito();
  }, []);

  return (
    <>

      <ScreenSaver />

      <div className="relative min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark">
        <Header />

        <div className="px-4 pt-28 pb-16 mx-auto max-w-screen-xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="w-full max-w-[300px] mb-4 mx-auto">
              <ApplicationLogo className="w-[300px] fill-text dark:fill-text-dark" />
            </div>
            <h1 className="text-5xl font-bold tracking-tighter lg:text-7xl">Meriç Enes Kayalar</h1>
            <p className="mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">{__('Yazılımcı • Pixel Artist • Minimalist')}</p>
          </div>

          <main className="mx-auto w-full max-w-4xl">
            <div className="flex gap-2 justify-end items-center px-0 py-2.5 mb-4">
              <SpotifyPlaying />
              <div className="p-1 rounded-xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
                <a href="#" className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors hover:bg-button-hover dark:hover:bg-button-hover-dark" title="Özgeçmişimi Görüntüle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" className="text-menu-active dark:text-menu-active-dark">
                    <path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm98.88 133.234c19.636 0 37.082 6.789 49.929 16.971c11.88 9.452 17.444 18.907 22.298 27.393l-33.923 16.949c-2.427-5.565-5.347-11.387-12.846-17.682c-8.248-6.552-16.478-8.484-23.524-8.484c-27.626 0-42.17 25.693-42.17 54.287c0 37.573 19.161 56.22 42.17 56.22c22.3 0 31.278-15.51 37.08-25.435L219.6 302.66c-6.315 9.926-12.374 19.635-25.95 29.069c-7.262 5.09-23.977 15.037-47.736 15.037C100.586 346.766 64 313.81 64 255.87c0-50.636 34.415-90.637 82.88-90.637m75.483 5.328h45.565L303.31 292.24l35.125-121.678H384l-59.379 171.112H281.01z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center p-1 rounded-xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
                <LanguageSwitcher />
              </div>
              <div className="flex items-center p-1 rounded-xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
                <DarkModeToggle
                  isDarkMode={isDarkMode}
                  toggleMode={toggleManualMode}
                  hasManualOverride={hasManualOverride}
                  resetToAutomatic={resetToAutomatic}
                />
              </div>
            </div>
            <hr className="h-px w-full border-t-divider dark:border-t-divider-dark m-0 rounded-[10px] border-t-2 border-0 border-solid" />
            <div className="text-base mt-[30px]" id="container">
              {children}
            </div>
          </main>
        </div>

        <Footer
          isDarkMode={isDarkMode}
          setTimeBasedMode={setTimeBasedMode}
          hasManualOverride={hasManualOverride}
          resetToAutomatic={resetToAutomatic}
        />
      </div>
    </>
  );
}

LandingLayout.displayName = 'LandingLayout';

export default LandingLayout;
