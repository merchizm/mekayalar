import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Pagination from '@/Components/Common/AdminPagination';
import PostFilters from '@/Components/Admin/Posts/PostFilters';
import PostTypeBadge from '@/Components/Admin/Posts/PostTypeBadge';

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

export default function Index({ auth, posts, filters = {} }) {
    const postItems = Array.isArray(posts?.data) ? posts.data : [];
    const totalPosts = typeof posts?.total === 'number' ? posts.total : postItems.length;
    const postLinks = Array.isArray(posts?.links) ? posts.links : [];
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

            <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4 dark:border-border">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Tüm Gönderiler</h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Toplam {totalPosts} gönderi
                        </p>
                    </div>
                    <div>
                        <Link
                            href={route('admin.posts.create')}
                            className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            Yeni Gönderi
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <PostFilters filters={filters} />
                <div className="p-5">
                    {/* Desktop Table View */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-secondary/70 dark:bg-secondary">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Başlık
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Tür
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Durum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Oluşturulma Tarihi
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-card dark:divide-gray-700 dark:bg-card">
                                {postItems.length > 0 ? (
                                    postItems.map((post) => (
                                        <tr key={post.id} className="hover:bg-secondary/70 dark:hover:bg-secondary">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground dark:text-foreground">
                                                {post.post_title}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <PostTypeBadge type={post.type} />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                                {post.category?.name || '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <StatusBadge status={post.post_status} />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                                {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                            </td>
                                            <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <Link
                                                    href={route('admin.posts.edit', post.id)}
                                                    className="rounded-md bg-warning px-3 py-1 text-sm font-medium text-white hover:bg-warning focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                >
                                                    Düzenle
                                                </Link>
                                                <button
                                                    className="rounded-md bg-destructive px-3 py-1 text-sm font-medium text-white hover:bg-destructive focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                    onClick={() => deletePost(post)}
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="text-muted-foreground dark:text-muted-foreground">
                                                <svg
                                                    className="mx-auto mb-4 h-12 w-12"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                <p className="text-lg font-medium text-muted-foreground dark:text-muted-foreground">
                                                    Gönderi bulunamadı
                                                </p>
                                                <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                                                    {Object.keys(filters).some((key) => filters[key])
                                                        ? 'Filtreleri temizleyerek tekrar deneyin.'
                                                        : 'İlk gönderinizi oluşturmak için "Yeni Gönderi" butonuna tıklayın.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="space-y-4 md:hidden">
                        {postItems.length > 0 ? (
                            postItems.map((post) => (
                                <div
                                    key={post.id}
                                    className="rounded-lg border border-border bg-card p-4 dark:border-border dark:bg-secondary"
                                >
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="line-clamp-2 text-sm font-medium text-foreground dark:text-foreground">
                                                {post.post_title}
                                            </h3>
                                            <div className="mt-2 flex items-center gap-2">
                                                <PostTypeBadge type={post.type} />
                                                <StatusBadge status={post.post_status} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 text-xs text-muted-foreground dark:text-muted-foreground">
                                        <span className="block">{post.category?.name || 'Kategori yok'}</span>
                                        <span className="mt-1 block">
                                            {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.posts.edit', post.id)}
                                            className="flex-1 rounded-md bg-warning px-3 py-2 text-center text-xs font-medium text-white hover:bg-warning"
                                        >
                                            Düzenle
                                        </Link>
                                        <button
                                            className="flex-1 rounded-md bg-destructive px-3 py-2 text-xs font-medium text-white hover:bg-destructive"
                                            onClick={() => deletePost(post)}
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-muted-foreground dark:text-muted-foreground">
                                <svg
                                    className="mx-auto mb-4 h-12 w-12"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <p className="text-base font-medium text-muted-foreground dark:text-muted-foreground">
                                    Gönderi bulunamadı
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                                    {Object.keys(filters).some((key) => filters[key])
                                        ? 'Filtreleri temizleyerek tekrar deneyin.'
                                        : 'İlk gönderinizi oluşturmak için "Yeni Gönderi" butonuna tıklayın.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                <Pagination links={postLinks} meta={posts} />
            </div>
        </AdminLayout>
    );
}
