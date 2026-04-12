import React from 'react';
import { Link } from '@inertiajs/react';

function normalizePaginationUrl(url) {
    if (!url) return null;
    if (typeof window === 'undefined') return url;

    try {
        const parsed = new URL(url, window.location.origin);
        if (parsed.host === window.location.host) {
            return `${parsed.pathname}${parsed.search}${parsed.hash}`;
        }
    } catch {
        // Keep original url when parsing fails.
    }

    return url;
}

export default function Pagination({ links }) {
    return (
        <nav className="mt-12 flex items-center justify-center space-x-1">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={normalizePaginationUrl(link.url) || '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                        link.active ? 'bg-primary/15 text-primary' : 'bg-secondary'
                    } ${!link.url ? 'cursor-not-allowed text-muted-foreground/60' : 'text-foreground hover:bg-accent'} `}
                    as="button"
                    disabled={!link.url}
                />
            ))}
        </nav>
    );
}
