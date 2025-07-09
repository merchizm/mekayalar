import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import DarkModeToggle from '@/Components/Common/DarkModeToggle';
import LogoutButton from '@/Components/Common/LogoutButton';

import {
  HomeIcon as HomeOutline,
  UserCircleIcon as UserCircleOutline,
  Cog8ToothIcon as Cog8ToothOutline,
  ShareIcon as ShareOutline,
  ShieldCheckIcon as ShieldCheckOutline,
  BuildingStorefrontIcon as BuildingStorefrontOutline,
  CalendarDaysIcon as CalendarDaysOutline,
  DocumentTextIcon as DocumentTextOutline,
  UserGroupIcon as UserGroupOutline,
  InformationCircleIcon as InformationCircleOutline,
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeSolid,
  UserCircleIcon as UserCircleSolid,
  Cog8ToothIcon as Cog8ToothSolid,
  ShareIcon as ShareSolid,
  ShieldCheckIcon as ShieldCheckSolid,
  BuildingStorefrontIcon as BuildingStorefrontSolid,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Icon = ({ outline, solid, active }) => {
  const IconComponent = active ? solid : outline;
  const activeClasses = 'text-indigo-600 dark:text-indigo-400';
  const inactiveClasses = 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300';
  return <IconComponent className={classNames('flex-shrink-0 mr-3 w-6 h-6', active ? activeClasses : inactiveClasses)} aria-hidden="true" />;
};

const NavLink = ({ item }) => {
  return (
    <Link
      href={item.href}
      className={classNames(
        'group flex items-center px-4 py-2.5 text-sm font-medium rounded-md',
        item.current
          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
      )}
    >
      <Icon outline={item.icon.outline} solid={item.icon.solid} active={item.current} />
      {item.name}
    </Link>
  );
};

const Accordion = ({ item, currentUrl }) => {
  const isCurrent = item.children.some(child => child.current);
  const [isOpen, setIsOpen] = useState(isCurrent);

  return (
    <div className="space-y-1">
      <button
        type="button"
        className="flex items-center px-4 py-2.5 w-full text-sm font-medium text-left text-gray-600 rounded-md group hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon outline={item.icon.outline} solid={item.icon.solid} active={isCurrent} />
        <span className="flex-1">{item.name}</span>
        <ChevronDownIcon
          className={classNames('w-5 h-5 transition-transform duration-150 transform', isOpen ? 'rotate-180' : 'rotate-0')}
        />
      </button>
      {isOpen && (
        <div className="pt-1 pl-4 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.name}
              href={child.href}
              className={classNames(
                'group flex items-center w-full px-7 py-2.5 text-sm font-medium rounded-md',
                child.current
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              )}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const { url, props: { auth } } = usePage();
  const [spacesOpen, setSpacesOpen] = useState(true);
  const [favoritesOpen, setFavoritesOpen] = useState(true);

  const navigation = [
    { name: 'Genel Bakış', href: route('admin.dashboard'), icon: { outline: HomeOutline, solid: HomeSolid }, current: route().current('admin.dashboard') },
    {
      name: 'İçerik Yönetimi',
      icon: { outline: DocumentTextOutline, solid: DocumentTextOutline },
      children: [
        { name: 'Gönderiler', href: route('admin.posts.index'), current: route().current('admin.posts.*') },
        { name: 'Şiirler', href: route('admin.poems.index'), current: route().current('admin.poems.*') },
        { name: 'Projeler', href: route('admin.projects.index'), current: route().current('admin.projects.*') },
        { name: 'Dosyalar', href: route('admin.media.index'), current: route().current('admin.media.*') },
      ],
    },
    { name: 'Profilim', href: route('admin.profile.edit'), icon: { outline: UserCircleOutline, solid: UserCircleSolid }, current: route().current('admin.profile.edit') },
  ];

  const favorites = [
    { name: 'Yeni Yazı Ekle', href: route('admin.posts.create'), icon: { outline: PlusIcon, solid: PlusIcon }, current: route().current('admin.posts.create') },
    { name: 'Yeni Proje Ekle', href: route('admin.projects.create'), icon: { outline: PlusIcon, solid: PlusIcon }, current: route().current('admin.projects.create') },
  ];

  return (
    <div className="flex flex-col flex-shrink-0 bg-white border-r border-gray-200 w-[12vw] dark:bg-gray-900 dark:border-gray-700 pt-2">
      <div className="flex items-center gap-2.5 px-3.5 h-[70px]">
        <Link href={route('landing.index')} className="flex items-center">
          <ApplicationLogo className="w-[50px] fill-text dark:fill-text-dark" />
          <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">MBlog</span>
        </Link>
      </div>

      <div className="overflow-y-auto flex-1">
        <nav className="px-4 py-6 space-y-2">
          <div className="space-y-1">
            {navigation.map((item) =>
              item.children && item.children.length > 0 ? (
                <Accordion key={item.name} item={item} currentUrl={url} />
              ) : (
                <NavLink key={item.name} item={item} />
              )
            )}
          </div>

          <div className="mt-6">
            <div className="px-3">
              <button onClick={() => setFavoritesOpen(!favoritesOpen)} className="flex justify-between items-center mb-2 w-full">
                <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Hızlı Erişim</h3>
                {favoritesOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-400" /> : <ChevronDownIcon className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
            {favoritesOpen && (
              <div className="space-y-1">
                {favorites.map(item => <NavLink key={item.name} item={item} />)}
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="flex-shrink-0 p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          {auth && auth.user && (
            <Link href={route('admin.profile.edit')} className="block flex-shrink-0 group">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block w-8 h-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=random&color=fff`}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">{auth.user.name}</p>
                </div>
              </div>
            </Link>
          )}
          <div className="flex items-center space-x-2">
            <DarkModeToggle />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
} 
