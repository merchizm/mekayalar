import React from 'react';
import TimezoneThemeSwitcher from '@/Components/Common/TimezoneThemeSwitcher.jsx';

const Footer = ({ isDarkMode, setTimeBasedMode, hasManualOverride, resetToAutomatic }) => {
    return (
        <footer className="mt-24 w-full">
            <div className="mx-auto max-w-screen-xl px-4 py-8">
                <div className="mb-8">
                    <TimezoneThemeSwitcher
                        isDarkMode={isDarkMode}
                        setTimeBasedMode={setTimeBasedMode}
                        hasManualOverride={hasManualOverride}
                        resetToAutomatic={resetToAutomatic}
                    />
                </div>
                <div className="mx-auto mb-8 mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="group flex flex-col items-center rounded-lg border border-divider bg-background p-6 transition-all duration-300 hover:border-menu-active dark:border-divider-dark dark:bg-background-dark dark:hover:border-menu-active-dark">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 rounded-full bg-menu-active/5 blur-xl transition-all duration-300 group-hover:bg-menu-active/10 dark:bg-menu-active-dark/5 dark:group-hover:bg-menu-active-dark/10"></div>
                            <img
                                src="/assets/img/ataturk-32310.png"
                                className="relative mx-auto h-20 w-auto object-contain"
                                alt="Halaskâr Başöğretmenimiz Mareşal Mustafa Kemal Atatürk"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="mb-1 text-sm font-semibold text-text dark:text-text-dark">Halaskâr</h3>
                            <p className="text-xs text-light-text dark:text-light-text-dark">Mustafa Kemal Atatürk</p>
                        </div>
                    </div>

                    <div className="group flex flex-col items-center rounded-lg border border-divider bg-background p-6 transition-all duration-300 hover:border-menu-active dark:border-divider-dark dark:bg-background-dark dark:hover:border-menu-active-dark">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 rounded-full bg-menu-active/5 blur-xl transition-all duration-300 group-hover:bg-menu-active/10 dark:bg-menu-active-dark/5 dark:group-hover:bg-menu-active-dark/10"></div>
                            <img
                                src="/assets/img/turkiye_coat_of_army_fan_made.png"
                                className="relative mx-auto h-24 w-auto object-contain"
                                alt="Türkiye Coat Of Army (Unofficial)"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="mb-1 text-sm font-semibold text-text dark:text-text-dark">Türkiye</h3>
                            <p className="text-xs text-light-text dark:text-light-text-dark">Cumhuriyeti</p>
                        </div>
                    </div>

                    <div className="group flex flex-col items-center rounded-lg border border-divider bg-background p-6 transition-all duration-300 hover:border-menu-active dark:border-divider-dark dark:bg-background-dark dark:hover:border-menu-active-dark">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 rounded-full bg-menu-active/5 blur-xl transition-all duration-300 group-hover:bg-menu-active/10 dark:bg-menu-active-dark/5 dark:group-hover:bg-menu-active-dark/10"></div>
                            <img
                                src="/assets/img/tatarstan_coat_of_army.png"
                                className="relative mx-auto h-20 w-auto object-contain"
                                alt="Tatarstan Coat Of Army"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="mb-1 text-sm font-semibold text-text dark:text-text-dark">Tatarstan</h3>
                            <p className="text-xs text-light-text dark:text-light-text-dark">Respublikasy</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-light-text dark:text-light-text-dark">
                    <div className="flex items-center justify-center gap-2">
                        <span>© 2021-{new Date().getFullYear()}</span>
                        <div className="flex flex-row items-center justify-center gap-1">
                            <svg className="h-3 w-3 fill-text dark:fill-text-dark" viewBox="0 0 700.00001 700">
                                <g transform="translate(1252.3164,-304.67969)">
                                    <path
                                        style={{
                                            opacity: 1,
                                            fillOpacity: 1,
                                            stroke: 'none',
                                            strokeWidth: 1,
                                            strokeMiterlimit: 4,
                                            strokeDasharray: 'none',
                                            strokeOpacity: 0,
                                        }}
                                        d="m -902.3164,304.67969 -28.04007,302.41272 -115.18233,-95.63509 95.63512,115.1823 -302.41272,28.04007 302.41348,28.03931 -95.63588,115.1823 115.18233,-95.63433 28.04007,302.41273 28.03931,-302.41349 115.1823,95.63509 -95.63509,-115.1823 302.41348,-28.03931 -302.41272,-28.04007 95.63433,-115.1823 -115.1823,95.63586 -28.03931,-302.41349 z"
                                    />
                                </g>
                            </svg>
                            <span>Meriç Enes Kayalar</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
