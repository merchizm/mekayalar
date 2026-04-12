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

const ChevronLeftIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

export default function Pagination({ links, meta }) {
    if (!links || links.length <= 3) return null;
    const normalizedLinks = links.map((link) => ({
        ...link,
        url: normalizePaginationUrl(link.url),
    }));

    return (
        <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3 dark:border-border dark:bg-card sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {normalizedLinks[0].url ? (
                    <Link
                        href={normalizedLinks[0].url}
                        className="relative inline-flex items-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/70 dark:border-border dark:bg-secondary dark:text-muted-foreground dark:hover:bg-accent"
                    >
                        Önceki
                    </Link>
                ) : (
                    <span className="relative inline-flex cursor-not-allowed items-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-muted-foreground dark:border-border dark:bg-secondary dark:text-muted-foreground">
                        Önceki
                    </span>
                )}
                {normalizedLinks[normalizedLinks.length - 1].url ? (
                    <Link
                        href={normalizedLinks[normalizedLinks.length - 1].url}
                        className="relative ml-3 inline-flex items-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/70 dark:border-border dark:bg-secondary dark:text-muted-foreground dark:hover:bg-accent"
                    >
                        Sonraki
                    </Link>
                ) : (
                    <span className="relative ml-3 inline-flex cursor-not-allowed items-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-muted-foreground dark:border-border dark:bg-secondary dark:text-muted-foreground">
                        Sonraki
                    </span>
                )}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                        <span className="font-medium">{meta.from || 0}</span> -{' '}
                        <span className="font-medium">{meta.to || 0}</span> arası,{' '}
                        <span className="font-medium">{meta.total}</span> sonuçtan
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {/* Previous button */}
                        {normalizedLinks[0].url ? (
                            <Link
                                href={normalizedLinks[0].url}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-secondary/70 focus:z-20 focus:outline-offset-0 dark:ring-border dark:hover:bg-secondary"
                            >
                                <span className="sr-only">Önceki</span>
                                <ChevronLeftIcon className="h-5 w-5" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex cursor-not-allowed items-center rounded-l-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border dark:text-muted-foreground dark:ring-border">
                                <span className="sr-only">Önceki</span>
                                <ChevronLeftIcon className="h-5 w-5" />
                            </span>
                        )}

                        {/* Page numbers */}
                        {normalizedLinks.slice(1, -1).map((link, index) => {
                            if (link.url === null) {
                                return (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-muted-foreground ring-1 ring-inset ring-border focus:outline-offset-0 dark:text-muted-foreground dark:ring-border"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-border focus:outline-offset-0 dark:ring-border ${
                                        link.active
                                            ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                            : 'text-foreground hover:bg-secondary/70 focus:z-20 dark:text-muted-foreground dark:hover:bg-secondary'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}

                        {/* Next button */}
                        {normalizedLinks[normalizedLinks.length - 1].url ? (
                            <Link
                                href={normalizedLinks[normalizedLinks.length - 1].url}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border hover:bg-secondary/70 focus:z-20 focus:outline-offset-0 dark:ring-border dark:hover:bg-secondary"
                            >
                                <span className="sr-only">Sonraki</span>
                                <ChevronRightIcon className="h-5 w-5" />
                            </Link>
                        ) : (
                            <span className="relative inline-flex cursor-not-allowed items-center rounded-r-md px-2 py-2 text-muted-foreground ring-1 ring-inset ring-border dark:text-muted-foreground dark:ring-border">
                                <span className="sr-only">Sonraki</span>
                                <ChevronRightIcon className="h-5 w-5" />
                            </span>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}
