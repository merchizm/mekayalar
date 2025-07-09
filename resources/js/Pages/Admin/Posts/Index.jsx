import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

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

export default function Index({ auth, posts }) {
  const deletePost = (post) => {
    if (!confirm(`'${post.post_title}' başlıklı gönderiyi silmek istediğinizden emin misiniz?`)) {
      return;
    }
    router.delete(route('admin.posts.destroy', post.id), {
      onSuccess: () => toast.success('Gönderi başarıyla silindi!'),
      onError: () => toast.error('Gönderi silinirken bir hata oluştu.'),
    });
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Tüm Gönderiler" />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tüm Gönderiler</h3>
          <div>
            <Link href={route('admin.posts.create')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Yeni Gönderi
            </Link>
          </div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Başlık</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Oluşturulma Tarihi</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{post.post_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{post.category?.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={post.post_status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString('tr-TR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link href={route('admin.posts.edit', post.id)} className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Düzenle
                      </Link>
                      <button className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => deletePost(post)}>
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 
