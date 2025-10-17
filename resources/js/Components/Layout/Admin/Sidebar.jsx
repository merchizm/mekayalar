import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import DarkModeToggle from '@/Components/Common/DarkModeToggle';
import LogoutButton from '@/Components/Common/LogoutButton';
import { useThemeManager } from '@/hooks/useThemeManager';

import {
    HomeIcon as HomeOutline,
    UserCircleIcon as UserCircleOutline,
    DocumentTextIcon as DocumentTextOutline,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import {
    HomeIcon as HomeSolid,
    UserCircleIcon as UserCircleSolid,
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
    return (
        <IconComponent
            className={classNames(
                'h-6 w-6 flex-shrink-0',
                !noMargin && 'mr-3',
                active ? activeClasses : inactiveClasses
            )}
            aria-hidden="true"
        />
    );
};

const NavLink = ({ item, collapsed }) => {
    return (
        <Link
            href={item.href}
            className={classNames(
                'group flex items-center rounded-md px-4 py-2.5 text-sm font-medium transition-all',
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

const Accordion = ({ item, collapsed }) => {
    const isCurrent = item.children.some((child) => child.current);
    const [isOpen, setIsOpen] = useState(isCurrent);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [buttonHeight, setButtonHeight] = useState(40);
    const buttonRef = React.useRef(null);
    const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0 });

    const handleMouseEnter = () => {
        if (buttonRef.current && collapsed) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.top });
            setButtonHeight(buttonRef.current.offsetHeight);
        }
        setDropdownOpen(true);
    };

    if (collapsed) {
        return (
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={() => setDropdownOpen(false)}>
                <button
                    ref={buttonRef}
                    type="button"
                    className={classNames(
                        'flex w-full items-center justify-center rounded-md px-4 py-2.5 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
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
                                height: `${buttonHeight}px`,
                            }}
                        />
                        <div
                            className="fixed left-20 z-[60] w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                            style={{ top: `${dropdownPosition.top}px` }}
                        >
                            <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-700">
                                <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                                    {item.name}
                                </p>
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
                className="group flex w-full items-center rounded-md px-4 py-2.5 text-left text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Icon outline={item.icon.outline} solid={item.icon.solid} active={isCurrent} />
                <span className="flex-1">{item.name}</span>
                <ChevronDownIcon
                    className={classNames(
                        'h-5 w-5 transform transition-transform duration-150',
                        isOpen ? 'rotate-180' : 'rotate-0'
                    )}
                />
            </button>
            {isOpen && (
                <div className="space-y-1 pl-4 pt-1">
                    {item.children.map((child) => (
                        <Link
                            key={child.name}
                            href={child.href}
                            className={classNames(
                                'group flex w-full items-center rounded-md px-7 py-2.5 text-sm font-medium',
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
    const {
        url,
        props: { auth },
    } = usePage();
    const [favoritesOpen, setFavoritesOpen] = useState(true);
    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('admin-sidebar-collapsed') === 'true';
        }
        return false;
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { isDarkMode, hasManualOverride, toggleManualMode, resetToAutomatic } = useThemeManager();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin-sidebar-collapsed', collapsed);
        }
    }, [collapsed]);

    const toggleCollapse = () => setCollapsed(!collapsed);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const navigation = [
        {
            name: 'Genel Bakış',
            href: route('admin.dashboard'),
            icon: { outline: HomeOutline, solid: HomeSolid },
            current: route().current('admin.dashboard'),
        },
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
        {
            name: 'CV Yönetimi',
            href: route('admin.cv.index'),
            icon: { outline: UserCircleOutline, solid: UserCircleSolid },
            current: route().current('admin.cv.*'),
        },
        {
            name: 'Profilim',
            href: route('admin.profile.edit'),
            icon: { outline: UserCircleOutline, solid: UserCircleSolid },
            current: route().current('admin.profile.edit'),
        },
    ];

    const favorites = [
        {
            name: 'Yeni Gönderi Ekle',
            href: route('admin.posts.create'),
            icon: { outline: PlusIcon, solid: PlusIcon },
            current: route().current('admin.posts.create'),
        },
        {
            name: 'Yeni Proje Ekle',
            href: route('admin.projects.create'),
            icon: { outline: PlusIcon, solid: PlusIcon },
            current: route().current('admin.projects.create'),
        },
    ];

    return (
        <>
            {/* Mobile Header with Menu Toggle */}
            <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900 lg:hidden">
                <Link href={route('landing.index')} className="flex items-center">
                    <ApplicationLogo className="w-8 fill-text dark:fill-text-dark" />
                    <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">MBlog</span>
                </Link>
                <button
                    onClick={toggleMobileMenu}
                    className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <div
                className={classNames(
                    'hidden flex-shrink-0 flex-col border-r border-gray-200 bg-white pt-2 transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 lg:flex',
                    collapsed ? 'w-20' : 'w-64'
                )}
            >
                <div className="flex h-[70px] items-center justify-between gap-2.5 px-3.5">
                    <Link
                        href={route('landing.index')}
                        className={classNames('flex items-center', collapsed && 'w-full justify-center')}
                    >
                        <ApplicationLogo className="w-[50px] fill-text dark:fill-text-dark" />
                        {!collapsed && (
                            <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">MBlog</span>
                        )}
                    </Link>
                </div>

                {/* Collapse Toggle Button */}
                <button
                    onClick={toggleCollapse}
                    className="mx-2 mb-2 rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    title={collapsed ? 'Menüyü Genişlet' : 'Menüyü Daralt'}
                >
                    {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
                </button>

                <div className="flex-1 overflow-y-auto overflow-x-visible">
                    <nav className="space-y-2 px-4 py-6">
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
                                    <button
                                        onClick={() => setFavoritesOpen(!favoritesOpen)}
                                        className="mb-2 flex w-full items-center justify-between"
                                    >
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Hızlı Erişim
                                        </h3>
                                        {favoritesOpen ? (
                                            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {favoritesOpen && (
                                    <div className="space-y-1">
                                        {favorites.map((item) => (
                                            <NavLink key={item.name} item={item} collapsed={collapsed} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>

                <div className="mt-auto flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700">
                    <div
                        className={classNames(
                            'flex items-center',
                            collapsed ? 'flex-col space-y-2' : 'justify-between'
                        )}
                    >
                        {auth && auth.user && !collapsed && (
                            <Link href={route('admin.profile.edit')} className="group block flex-shrink-0">
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-8 w-8 rounded-full"
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=random&color=fff`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">
                                            {auth.user.name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )}
                        {auth && auth.user && collapsed && (
                            <Link
                                href={route('admin.profile.edit')}
                                className="group block flex-shrink-0"
                                title={auth.user.name}
                            >
                                <img
                                    className="inline-block h-8 w-8 rounded-full"
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=random&color=fff`}
                                    alt=""
                                />
                            </Link>
                        )}
                        <div
                            className={classNames('flex items-center', collapsed ? 'flex-col space-y-2' : 'space-x-2')}
                        >
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
            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:hidden">
                <nav className="flex h-16 items-center justify-around px-2">
                    {navigation.slice(0, 4).map((item) => {
                        if (item.children && item.children.length > 0) {
                            const isCurrent = item.children.some((child) => child.current);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.children[0].href}
                                    className={classNames(
                                        'flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs',
                                        isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                                    )}
                                >
                                    <Icon
                                        outline={item.icon.outline}
                                        solid={item.icon.solid}
                                        active={isCurrent}
                                        noMargin
                                    />
                                    <span>{item.name.split(' ')[0]}</span>
                                </Link>
                            );
                        }
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    'flex h-full flex-1 flex-col items-center justify-center gap-1 text-xs',
                                    item.current ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                                )}
                            >
                                <Icon
                                    outline={item.icon.outline}
                                    solid={item.icon.solid}
                                    active={item.current}
                                    noMargin
                                />
                                <span>{item.name.split(' ')[0]}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Mobile Slide-out Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
                    <div className="fixed inset-y-0 left-0 w-64 overflow-y-auto bg-white dark:bg-gray-900">
                        <div className="flex h-full flex-col pt-16">
                            <nav className="flex-1 space-y-2 px-4 py-6">
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
                                        <button
                                            onClick={() => setFavoritesOpen(!favoritesOpen)}
                                            className="mb-2 flex w-full items-center justify-between"
                                        >
                                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Hızlı Erişim
                                            </h3>
                                            {favoritesOpen ? (
                                                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {favoritesOpen && (
                                        <div className="space-y-1">
                                            {favorites.map((item) => (
                                                <NavLink key={item.name} item={item} collapsed={false} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </nav>
                            <div className="flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    {auth && auth.user && (
                                        <Link href={route('admin.profile.edit')} className="group block flex-shrink-0">
                                            <div className="flex items-center">
                                                <div>
                                                    <img
                                                        className="inline-block h-8 w-8 rounded-full"
                                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=random&color=fff`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">
                                                        {auth.user.name}
                                                    </p>
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
