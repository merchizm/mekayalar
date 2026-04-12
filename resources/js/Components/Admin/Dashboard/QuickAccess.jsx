import React from 'react';
import { Link } from '@inertiajs/react';

const colorVariants = {
    primary: 'bg-primary hover:bg-primary focus:ring-ring',
    blue: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
    yellow: 'bg-warning hover:bg-warning focus:ring-ring',
    red: 'bg-destructive hover:bg-destructive focus:ring-ring',
};

const QuickAccessButton = ({ href, color, icon, label }) => (
    <Link
        href={href}
        className={`flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${colorVariants[color]} focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
        {React.cloneElement(icon, { className: 'w-5 h-5 mr-2' })}
        {label}
    </Link>
);

const PlusIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
    </svg>
);

const PhotoIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 8h.01" />
        <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
        <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
        <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
    </svg>
);

const SettingsIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </svg>
);

export default function QuickAccess() {
    const buttons = [
        { href: route('admin.posts.create'), color: 'primary', icon: <PlusIcon />, label: 'Yeni Gönderi' },
        { href: route('admin.poems.create'), color: 'blue', icon: <PlusIcon />, label: 'Yeni Şiir' },
        { href: route('admin.media.index'), color: 'yellow', icon: <PhotoIcon />, label: 'Medya Yöneticisi' },
        { href: route('profile.edit'), color: 'red', icon: <SettingsIcon />, label: 'Profil Ayarları' },
    ];

    return (
        <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
            <div className="border-b border-border px-5 py-4 dark:border-border">
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Hızlı Erişim</h3>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {buttons.map((btn, index) => (
                        <QuickAccessButton key={index} {...btn} />
                    ))}
                </div>
            </div>
        </div>
    );
}
