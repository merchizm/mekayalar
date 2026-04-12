import React from 'react';
import { Link } from '@inertiajs/react';

export default function RecentPoems({ poems }) {
    return (
        <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
            <div className="border-b border-border px-5 py-4 dark:border-border">
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Son Şiirler</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {poems &&
                    poems.map((poem) => (
                        <div className="p-4" key={poem.id}>
                            <div className="flex items-center">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-foreground dark:text-foreground">
                                        {poem.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                        {new Date(poem.wrote_at).toLocaleDateString('tr-TR')}
                                    </p>
                                </div>
                                <div className="ml-4">
                                    <Link
                                        href={route('admin.poems.index', { edit: poem.id })}
                                        className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        Düzenle
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
