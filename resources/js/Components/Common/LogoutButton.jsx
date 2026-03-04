import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LogoutButton() {
    return (
        <Link
            href={route('logout')}
            method="post"
            as="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-divider bg-background text-light-text shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:text-text hover:shadow-md dark:border-label-border-dark dark:bg-repository-card-bg-dark dark:text-light-text-dark dark:hover:text-text-dark"
            title="Çıkış Yap"
        >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
        </Link>
    );
}
