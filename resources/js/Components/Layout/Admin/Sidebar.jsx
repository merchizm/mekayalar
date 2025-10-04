import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import DarkModeToggle from '@/Components/Common/DarkModeToggle';
import LogoutButton from '@/Components/Common/LogoutButton';
import { useThemeManager } from '@/hooks/useThemeManager';

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
  Bars3Icon,
  XMarkIcon,
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
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Icon = ({ outline, solid, active, noMargin }) => {
  const IconComponent = active ? solid : outline;
  const activeClasses = 'text-indigo-600 dark:text-indigo-400';
  const inactiveClasses = 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300';
  return <IconComponent className={classNames('flex-shrink-0 w-6 h-6', !noMargin && 'mr-3', active ? activeClasses : inactiveClasses)} aria-hidden="true" />;
};

const NavLink = ({ item, collapsed }) => {
  return (
    <Link
      href={item.href}
      className={classNames(
        'group flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all',
        item.current
          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
        collapsed && 'justify-center'
      )}
      title={collapsed ? item.name : undefined}
    >
      <Icon outline={item.icon.outline} solid={item.icon.solid} active={item.current} />
      {!collapsed && item.name}
    </Link>
  );
};

const Accordion = ({ item, currentUrl, collapsed }) => {
  const isCurrent = item.children.some(child => child.current);
  const [isOpen, setIsOpen] = useState(isCurrent);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = React.useRef(null);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0 });

  const handleMouseEnter = () => {
    if (buttonRef.current && collapsed) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.top });
    }
    setDropdownOpen(true);
  };

  if (collapsed) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button
          ref={buttonRef}
          type="button"
          className={classNames(
            'flex items-center justify-center px-4 py-2.5 w-full text-sm font-medium text-left text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none',
            isCurrent && 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
          )}
        >
          <Icon outline={item.icon.outline} solid={item.icon.solid} active={isCurrent} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <>
            {/* Invisible bridge to prevent gap */}
            <div
              className="fixed left-12 h-full"
              style={{
                top: `${dropdownPosition.top}px`,
                width: '36px',
                height: `${buttonRef.current?.offsetHeight || 40}px`
              }}
            />
            <div
              className="fixed left-20 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-[60]"
              style={{ top: `${dropdownPosition.top}px` }}
            >
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{item.name}</p>
              </div>
              <div className="py-1">
                {item.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className={classNames(
                      'block px-4 py-2 text-sm',
                      child.current
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    )}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

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
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-sidebar-collapsed') === 'true';
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    isDarkMode,
    hasManualOverride,
    toggleManualMode,
    resetToAutomatic
  } = useThemeManager();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-sidebar-collapsed', collapsed);
    }
  }, [collapsed]);

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
    { name: 'CV Yönetimi', href: route('admin.cv.index'), icon: { outline: UserCircleOutline, solid: UserCircleSolid }, current: route().current('admin.cv.*') },
    { name: 'Profilim', href: route('admin.profile.edit'), icon: { outline: UserCircleOutline, solid: UserCircleSolid }, current: route().current('admin.profile.edit') },
  ];

  const favorites = [
    { name: 'Yeni Gönderi Ekle', href: route('admin.posts.create'), icon: { outline: PlusIcon, solid: PlusIcon }, current: route().current('admin.posts.create') },
    { name: 'Yeni Proje Ekle', href: route('admin.projects.create'), icon: { outline: PlusIcon, solid: PlusIcon }, current: route().current('admin.projects.create') },
  ];

  return (
    <>
      {/* Mobile Header with Menu Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <Link href={route('landing.index')} className="flex items-center">
          <ApplicationLogo className="w-8 fill-text dark:fill-text-dark" />
          <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">MBlog</span>
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        >
          {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className={classNames(
        "hidden lg:flex flex-col flex-shrink-0 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 pt-2 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}>
        <div className="flex items-center justify-between gap-2.5 px-3.5 h-[70px]">
          <Link href={route('landing.index')} className={classNames("flex items-center", collapsed && "justify-center w-full")}>
            <ApplicationLogo className="w-[50px] fill-text dark:fill-text-dark" />
            {!collapsed && <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">MBlog</span>}
          </Link>
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={toggleCollapse}
          className="mx-2 mb-2 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title={collapsed ? "Menüyü Genişlet" : "Menüyü Daralt"}
        >
          {collapsed ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
        </button>

        <div className="overflow-y-auto overflow-x-visible flex-1">
          <nav className="px-4 py-6 space-y-2">
            <div className="space-y-1 overflow-visible">
              {navigation.map((item) =>
                item.children && item.children.length > 0 ? (
                  <Accordion key={item.name} item={item} currentUrl={url} collapsed={collapsed} />
                ) : (
                  <NavLink key={item.name} item={item} collapsed={collapsed} />
                )
              )}
            </div>

            {!collapsed && (
              <div className="mt-6">
                <div className="px-3">
                  <button onClick={() => setFavoritesOpen(!favoritesOpen)} className="flex justify-between items-center mb-2 w-full">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Hızlı Erişim</h3>
                    {favoritesOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-400" /> : <ChevronDownIcon className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
                {favoritesOpen && (
                  <div className="space-y-1">
                    {favorites.map(item => <NavLink key={item.name} item={item} collapsed={collapsed} />)}
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        <div className="flex-shrink-0 p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <div className={classNames("flex items-center", collapsed ? "flex-col space-y-2" : "justify-between")}>
            {auth && auth.user && !collapsed && (
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
            {auth && auth.user && collapsed && (
              <Link href={route('admin.profile.edit')} className="block flex-shrink-0 group" title={auth.user.name}>
                <img
                  className="inline-block w-8 h-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=random&color=fff`}
                  alt=""
                />
              </Link>
            )}
            <div className={classNames("flex items-center", collapsed ? "flex-col space-y-2" : "space-x-2")}>
              <DarkModeToggle
                isDarkMode={isDarkMode}
                toggleMode={toggleManualMode}
                hasManualOverride={hasManualOverride}
                resetToAutomatic={resetToAutomatic}
              />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <nav className="flex justify-around items-center h-16 px-2">
          {navigation.slice(0, 4).map((item) => {
            if (item.children && item.children.length > 0) {
              const isCurrent = item.children.some(child => child.current);
              return (
                <Link
                  key={item.name}
                  href={item.children[0].href}
                  className={classNames(
                    "flex flex-col items-center justify-center flex-1 h-full text-xs gap-1",
                    isCurrent
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  <Icon outline={item.icon.outline} solid={item.icon.solid} active={isCurrent} noMargin />
                  <span>{item.name.split(' ')[0]}</span>
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  "flex flex-col items-center justify-center flex-1 h-full text-xs gap-1",
                  item.current
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                <Icon outline={item.icon.outline} solid={item.icon.solid} active={item.current} noMargin />
                <span>{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="flex flex-col h-full pt-16">
              <nav className="flex-1 px-4 py-6 space-y-2">
                <div className="space-y-1">
                  {navigation.map((item) =>
                    item.children && item.children.length > 0 ? (
                      <Accordion key={item.name} item={item} currentUrl={url} collapsed={false} />
                    ) : (
                      <NavLink key={item.name} item={item} collapsed={false} />
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
                      {favorites.map(item => <NavLink key={item.name} item={item} collapsed={false} />)}
                    </div>
                  )}
                </div>
              </nav>
              <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
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
                    <DarkModeToggle
                      isDarkMode={isDarkMode}
                      toggleMode={toggleManualMode}
                      hasManualOverride={hasManualOverride}
                      resetToAutomatic={resetToAutomatic}
                    />
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
