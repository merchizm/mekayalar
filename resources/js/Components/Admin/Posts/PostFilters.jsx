import React from 'react';
import { router } from '@inertiajs/react';

const SearchIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const XIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function PostFilters({ filters }) {
    const postTypes = [
        { value: '', label: 'Tüm Türler' },
        { value: '0', label: 'Yazı' },
        { value: '1', label: 'Resim' },
        { value: '2', label: 'Çizim' },
        { value: '3', label: 'Alıntı' },
        { value: '4', label: 'Albüm' },
    ];

    const postStatuses = [
        { value: '', label: 'Tüm Durumlar' },
        { value: 'published', label: 'Yayınlandı' },
        { value: 'draft', label: 'Taslak' },
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };

        // Remove empty filters
        Object.keys(newFilters).forEach((k) => {
            if (newFilters[k] === '' || newFilters[k] === null) {
                delete newFilters[k];
            }
        });

        // Reset to page 1 when filters change
        delete newFilters.page;

        router.get(route('admin.posts.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get(
            route('admin.posts.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const hasActiveFilters = Object.keys(filters).some(
        (key) => key !== 'page' && filters[key] !== '' && filters[key] !== null
    );

    return (
        <div className="border-b border-border bg-secondary/70 px-5 py-4 dark:border-border dark:bg-secondary">
            <div className="flex flex-col gap-4 sm:flex-row">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            placeholder="Gönderi başlığında ara..."
                            className="block w-full rounded-md border border-input bg-card py-2 pl-10 pr-3 leading-5 text-foreground placeholder-gray-500 focus:border-ring focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-card dark:text-foreground dark:placeholder-gray-400 sm:text-sm"
                            value={filters.search || ''}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                </div>

                {/* Post Type Filter */}
                <div className="sm:w-48">
                    <select
                        className="block w-full rounded-md border border-input bg-card px-3 py-2 text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-card dark:text-foreground sm:text-sm"
                        value={filters.type || ''}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        {postTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div className="sm:w-48">
                    <select
                        className="block w-full rounded-md border border-input bg-card px-3 py-2 text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-card dark:text-foreground sm:text-sm"
                        value={filters.status || ''}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        {postStatuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center rounded-md border border-input bg-card px-3 py-2 text-sm font-medium leading-4 text-muted-foreground shadow-sm hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:bg-secondary"
                    >
                        <XIcon className="mr-2 h-4 w-4" />
                        Temizle
                    </button>
                )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {filters.search && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-blue-900 dark:text-primary">
                            Arama: "{filters.search}"
                            <button
                                onClick={() => handleFilterChange('search', '')}
                                className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-primary focus:outline-none"
                            >
                                <XIcon className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                    {filters.type && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-success dark:bg-green-900 dark:text-success">
                            Tip: {postTypes.find((t) => t.value === filters.type)?.label}
                            <button
                                onClick={() => handleFilterChange('type', '')}
                                className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-green-400 hover:bg-green-200 hover:text-success focus:outline-none"
                            >
                                <XIcon className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                    {filters.status && (
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            Durum: {postStatuses.find((s) => s.value === filters.status)?.label}
                            <button
                                onClick={() => handleFilterChange('status', '')}
                                className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600 focus:outline-none"
                            >
                                <XIcon className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
