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
      <Menu.Button className="flex justify-center items-center w-10 h-10 rounded-lg transition-all duration-200 ease-in-out hover:bg-button-hover dark:hover:bg-button-hover-dark hover:scale-105 active:scale-95" title="Change language">
        <span className={`flag flag-country-${currentFlag} w-5 h-5 transition-transform duration-200 ease-in-out`}></span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95 translate-y-[-10px]"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 translate-y-[-10px]"
      >
        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-lg bg-background dark:bg-repository-card-bg-dark border border-divider dark:border-label-border-dark shadow-xl backdrop-blur-sm focus:outline-none z-50 py-1">
          {languages.map((lang) => (
            <Menu.Item key={lang.code}>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className={`${active ? 'bg-button-hover dark:bg-button-hover-dark' : ''} flex items-center w-full px-4 py-3 text-sm transition-all duration-150 ease-in-out hover:translate-x-1 first:rounded-t-lg last:rounded-b-lg`}
                >
                  <span className={`flag flag-country-${lang.flag} w-5 h-5 mr-3 transition-transform duration-150 ${active ? 'scale-110' : ''}`}></span>
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
