import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Common/AdminPagination';
import toast from 'react-hot-toast';

const StatusBadge = ({ approved }) => {
    const label = approved ? 'Onaylı' : 'Beklemede';
    const classes = approved
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';

    return <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${classes}`}>{label}</span>;
};

export default function Index({ auth, comments, filters = {} }) {
    const commentItems = Array.isArray(comments?.data) ? comments.data : [];
    const commentLinks = Array.isArray(comments?.links) ? comments.links : [];
    const { data, setData } = useForm({
        search: filters.search || '',
        status: filters.status || '',
    });

    const submitFilters = (event) => {
        event.preventDefault();
        router.get(route('admin.comments.index'), data, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setData({ search: '', status: '' });
        router.get(route('admin.comments.index'));
    };

    const toggleApproval = (comment) => {
        router.patch(
            route('admin.comments.update', comment.id),
            { approved: !comment.approved },
            {
                onSuccess: () => toast.success('Yorum durumu güncellendi.'),
                onError: () => toast.error('Yorum güncellenirken hata oluştu.'),
            },
        );
    };

    const togglePin = (comment) => {
        router.patch(
            route('admin.comments.update', comment.id),
            { is_pinned: !comment.is_pinned },
            {
                onSuccess: () => toast.success('Yorum sabitleme durumu güncellendi.'),
                onError: () => toast.error('Yorum güncellenirken hata oluştu.'),
            },
        );
    };

    const deleteComment = (comment) => {
        if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
            return;
        }
        router.delete(route('admin.comments.destroy', comment.id), {
            onSuccess: () => toast.success('Yorum silindi.'),
            onError: () => toast.error('Yorum silinirken hata oluştu.'),
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Yorum Yönetimi" />

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yorum Yönetimi</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Toplam {comments?.total ?? commentItems.length} yorum
                        </p>
                    </div>
                    <Link
                        href={route('admin.comments.settings')}
                        className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        Yorum Ayarları
                    </Link>
                </div>

                <form
                    onSubmit={submitFilters}
                    className="flex flex-wrap items-end gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-700"
                >
                    <div className="flex-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Arama
                        </label>
                        <input
                            type="text"
                            value={data.search}
                            onChange={(event) => setData('search', event.target.value)}
                            placeholder="Yorum, gönderi veya yazar..."
                            className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Durum
                        </label>
                        <select
                            value={data.status}
                            onChange={(event) => setData('status', event.target.value)}
                            className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                            <option value="">Hepsi</option>
                            <option value="approved">Onaylı</option>
                            <option value="pending">Beklemede</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Filtrele
                        </button>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Sıfırla
                        </button>
                    </div>
                </form>

                <div className="p-5">
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Yorum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Gönderi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Yazar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Durum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Sabit
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Tarih
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {commentItems.length > 0 ? (
                                    commentItems.map((comment) => (
                                        <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="max-w-sm px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                <p className="line-clamp-3">{comment.text}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {comment.post ? (
                                                    <Link
                                                        href={route('blog.show', comment.post.slug)}
                                                        className="line-clamp-2 text-blue-600 hover:underline dark:text-blue-300"
                                                    >
                                                        {comment.post.title}
                                                    </Link>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    {comment.commenter?.photo ? (
                                                        <img
                                                            src={comment.commenter.photo}
                                                            alt={comment.commenter?.name || 'Guest'}
                                                            className="h-8 w-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                                                            {(comment.commenter?.name || '?')[0]}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {comment.commenter?.name || 'Ziyaretçi'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {comment.commenter?.email || ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <StatusBadge approved={comment.approved} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {comment.is_pinned ? 'Evet' : 'Hayır'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {comment.created_at
                                                    ? new Date(comment.created_at).toLocaleDateString('tr-TR')
                                                    : '-'}
                                            </td>
                                            <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <button
                                                    className="rounded-md bg-slate-700 px-3 py-1 text-sm font-medium text-white hover:bg-slate-800"
                                                    onClick={() => togglePin(comment)}
                                                >
                                                    {comment.is_pinned ? 'Sabiti Kaldır' : 'Sabitle'}
                                                </button>
                                                <button
                                                    className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700"
                                                    onClick={() => toggleApproval(comment)}
                                                >
                                                    {comment.approved ? 'Kaldır' : 'Onayla'}
                                                </button>
                                                <button
                                                    className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
                                                    onClick={() => deleteComment(comment)}
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="text-gray-400 dark:text-gray-500">
                                                Yorum bulunamadı.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-4 md:hidden">
                        {commentItems.length > 0 ? (
                            commentItems.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {comment.commenter?.name || 'Ziyaretçi'}
                                            </p>
                                            <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                                                {comment.text}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <StatusBadge approved={comment.approved} />
                                            {comment.is_pinned && (
                                                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-white">
                                                    sabit
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {comment.post ? comment.post.title : 'Gönderi bulunamadı'}
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <button
                                            className="flex-1 rounded-md bg-slate-700 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
                                            onClick={() => togglePin(comment)}
                                        >
                                            {comment.is_pinned ? 'Sabiti Kaldır' : 'Sabitle'}
                                        </button>
                                        <button
                                            className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                            onClick={() => toggleApproval(comment)}
                                        >
                                            {comment.approved ? 'Kaldır' : 'Onayla'}
                                        </button>
                                        <button
                                            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                                            onClick={() => deleteComment(comment)}
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                                Yorum bulunamadı.
                            </div>
                        )}
                    </div>

                    {commentLinks.length > 0 && (
                        <div className="mt-6">
                            <Pagination links={commentLinks} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
