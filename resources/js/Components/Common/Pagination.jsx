import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="mt-12 flex items-center justify-center space-x-1">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${link.active ? 'bg-primary/20 dark:bg-primary-dark/20 text-primary dark:text-primary-dark' : 'bg-button dark:bg-button-dark'} ${!link.url ? 'cursor-not-allowed text-gray-400 dark:text-gray-600' : 'text-text hover:bg-button-hover dark:text-text-dark dark:hover:bg-button-hover-dark'} `}
                    as="button"
                    disabled={!link.url}
                />
            ))}
        </nav>
    );
}
