import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';

const languages = [
  {
    code: 'tr',
    label: 'Türkçe',
    flag: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 356.18"><g fill-rule="nonzero"><path fill="#E30A17" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z"/><path fill="#fff" d="M253.365 130.516c-15.783-24.923-43.598-41.473-75.281-41.473-49.179 0-89.047 39.868-89.047 89.047 0 49.179 39.868 89.047 89.047 89.047 31.684 0 59.498-16.55 75.282-41.475-13.042 14.526-31.963 23.665-53.021 23.665-39.342 0-71.237-31.893-71.237-71.237 0-39.344 31.895-71.237 71.237-71.237 21.058 0 39.978 9.138 53.02 23.663zm-4.785 47.574l80.543 26.169-49.778-68.514v84.688l49.778-68.514-80.543 26.171z"/></g></svg>
    )
  },
  {
    code: 'en',
    label: 'English',
    flag: (
      <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-sm">
        <rect width="20" height="14" fill="#012169"/>
        <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="2"/>
        <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1"/>
        <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="3"/>
        <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2"/>
      </svg>
    )
  },
];

export default function LanguageSwitcher() {
  const current = document.documentElement.lang.split('-')[0];

  const changeLanguage = (code) => {
    router.post(route('language.switch'), { locale: code });
  };

  const currentFlag = languages.find((l) => l.code === current)?.flag || languages[1].flag;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="w-10 h-10 flex items-center justify-center rounded-lg border border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300" title="Change language">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text dark:text-text-dark">
          <path d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z" fill="currentColor"/>
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-background/80 dark:bg-repository-card-bg-dark/80 backdrop-blur-md border border-divider dark:border-label-border-dark shadow-lg focus:outline-none z-50 overflow-hidden p-1">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`${active ? 'bg-button-hover/50 dark:bg-button-hover-dark/50' : ''} flex items-center w-full px-3 py-3 text-sm transition-all duration-200 rounded-lg hover:bg-button-hover/30 dark:hover:bg-button-hover-dark/30`}
                >
                  <div className="mr-3">
                    {lang.flag}
                  </div>
                  <span className="font-medium">{lang.label}</span>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
