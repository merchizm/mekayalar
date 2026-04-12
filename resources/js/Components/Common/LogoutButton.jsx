import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LogoutButton() {
    return (
        <Link
            href={route('logout')}
            method="post"
            as="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:text-foreground hover:shadow-md dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:text-foreground"
            title="Çıkış Yap"
        >
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
        </Link>
    );
}
