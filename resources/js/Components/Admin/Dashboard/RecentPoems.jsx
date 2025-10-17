import React from 'react';
import { Link } from '@inertiajs/react';

export default function RecentPoems({ poems }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Son Şiirler</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {poems &&
                    poems.map((poem) => (
                        <div className="p-4" key={poem.id}>
                            <div className="flex items-center">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                        {poem.title}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(poem.wrote_at).toLocaleDateString('tr-TR')}
                                    </p>
                                </div>
                                <div className="ml-4">
                                    <Link
                                        href={route('admin.poems.index', { edit: poem.id })}
                                        className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
