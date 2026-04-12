import React from 'react';
import { Link } from '@inertiajs/react';

const StatusBadge = ({ status }) => {
    const colorMap = {
        published: 'bg-green-100 text-success dark:bg-green-900 dark:text-success',
        draft: 'bg-yellow-100 text-warning-foreground dark:bg-yellow-900 dark:text-warning',
        trash: 'bg-red-100 text-destructive dark:bg-red-900 dark:text-destructive',
    };
    const labelMap = {
        published: 'Yayınlandı',
        draft: 'Taslak',
        trash: 'Çöp',
    };
    return (
        <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${colorMap[status] || 'bg-secondary text-foreground'}`}
        >
            {labelMap[status] || status}
        </span>
    );
};

export default function RecentPosts({ posts }) {
    return (
        <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
            <div className="border-b border-border px-5 py-4 dark:border-border">
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Son Gönderiler</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-secondary/70 dark:bg-secondary">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                Başlık
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                Durum
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                Tarih
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-card dark:divide-gray-700 dark:bg-card">
                        {posts &&
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-secondary/70 dark:hover:bg-secondary">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground dark:text-foreground">
                                        {post.post_title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <StatusBadge status={post.post_status} />
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                        <Link
                                            href={route('admin.posts.edit', post.id)}
                                            className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
