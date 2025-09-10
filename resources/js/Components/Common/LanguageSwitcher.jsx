import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';

const languages = [
  { code: 'tr', label: 'Türkçe', flag: 'tr' },
  { code: 'en', label: 'English', flag: 'gb' },
];

export default function LanguageSwitcher() {
  const current = document.documentElement.lang.split('-')[0];

  const changeLanguage = (code) => {
    router.post(route('language.switch'), { locale: code });
  };

  const currentFlag = languages.find((l) => l.code === current)?.flag || 'gb';

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors hover:bg-button-hover dark:hover:bg-button-hover-dark" title="Change language">
        <span className={`flag flag-country-${currentFlag} w-5 h-5`}></span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-background dark:bg-repository-card-bg-dark border border-divider dark:border-label-border-dark shadow-lg focus:outline-none z-50">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`${active ? 'bg-button-hover dark:bg-button-hover-dark' : ''} flex items-center w-full px-2 py-2 text-sm rounded-md`}
                >
                  <span className={`flag flag-country-${lang.flag} w-5 h-5 mr-2`}></span>
                  {lang.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
