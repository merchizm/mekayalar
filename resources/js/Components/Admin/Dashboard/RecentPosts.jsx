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
  }
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorMap[status] || 'bg-gray-100 text-gray-800'}`}>
      {labelMap[status] || status}
    </span>
  );
};


export default function RecentPosts({ posts }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Son Gönderiler</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Başlık</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Durum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tarih</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {posts && posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{post.post_title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={post.post_status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString('tr-TR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={route('admin.posts.edit', post.id)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
