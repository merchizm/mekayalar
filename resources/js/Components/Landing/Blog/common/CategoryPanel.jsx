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
                className="interactive-pill flex w-full items-center justify-between rounded-2xl border border-border bg-secondary px-4 py-3 text-left text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/50 hover:bg-accent dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
            >
                <span>{__('Kategoriler')}</span>
                <span className="text-xs">{open ? '▲' : '▼'}</span>
            </button>
            {open && (
                <div className="absolute left-0 top-full z-20 mt-3 w-full rounded-2xl border border-border bg-secondary p-4 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-border dark:bg-secondary">
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={__('Kategori ara...')}
                        className="w-full rounded-xl border border-border bg-accent px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-accent dark:text-foreground"
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
                                                ? 'bg-primary text-white dark:text-foreground'
                                                : 'text-foreground hover:bg-accent dark:text-foreground dark:hover:bg-accent'
                                        }`}
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })
                        ) : (
                            <p className="px-3 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                {__('Sonuç bulunamadı')}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
