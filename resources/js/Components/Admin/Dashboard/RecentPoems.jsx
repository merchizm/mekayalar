import React from 'react';
import { Link } from '@inertiajs/react';

export default function RecentPoems({ poems }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Son Şiirler</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {poems && poems.map(poem => (
          <div className="p-4" key={poem.id}>
            <div className="flex items-center">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {poem.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(poem.wrote_at).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="ml-4">
                <Link href={route('admin.poems.edit', poem.id)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
