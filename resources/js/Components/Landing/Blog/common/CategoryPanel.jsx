import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';

export default function CategoryPanel({ categories = [], currentCategory = null }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) {
            return categories;
        }
        return categories.filter((category) => category.name.toLowerCase().includes(normalized));
    }, [categories, query]);

    return (
        <div className="relative w-full max-w-lg">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="interactive-pill flex w-full items-center justify-between rounded-2xl border border-divider bg-button px-4 py-3 text-left text-sm font-semibold text-text shadow-sm transition hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
            >
                <span>{__('Kategoriler')}</span>
                <span className="text-xs">{open ? '▲' : '▼'}</span>
            </button>
            {open && (
                <div className="absolute left-0 top-full z-20 mt-3 w-full rounded-2xl border border-divider bg-button p-4 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-divider-dark dark:bg-button-dark">
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={__('Kategori ara...')}
                        className="w-full rounded-xl border border-divider bg-button-hover px-3 py-2 text-sm text-text focus:border-menu-active focus:outline-none focus:ring-1 focus:ring-menu-active dark:border-divider-dark dark:bg-button-hover-dark dark:text-text-dark"
                    />
                    <div className="mt-3 max-h-64 overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map((category) => {
                                const isActive = currentCategory?.id === category.id;
                                return (
                                    <Link
                                        key={category.id}
                                        href={route('blog.category', { slug: category.slug })}
                                        className={`interactive-pill block rounded-lg px-3 py-2 text-sm ${
                                            isActive
                                                ? 'bg-menu-active text-white dark:text-text-dark'
                                                : 'text-text hover:bg-button-hover dark:text-text-dark dark:hover:bg-button-hover-dark'
                                        }`}
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })
                        ) : (
                            <p className="px-3 py-4 text-sm text-light-text dark:text-light-text-dark">
                                {__('Sonuç bulunamadı')}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
