import React from 'react';
import { Link } from '@inertiajs/react';

const StatusBadge = ({ status }) => {
    const colorMap = {
        published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        trash: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    const labelMap = {
        published: 'Yayınlandı',
        draft: 'Taslak',
        trash: 'Çöp',
    };
    return (
        <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${colorMap[status] || 'bg-gray-100 text-gray-800'}`}
        >
            {labelMap[status] || status}
        </span>
    );
};

export default function RecentPosts({ posts }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Son Gönderiler</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                Başlık
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                Durum
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                Tarih
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {posts &&
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                        {post.post_title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <StatusBadge status={post.post_status} />
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <Link
                                            href={route('admin.posts.edit', post.id)}
                                            className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Düzenle
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
