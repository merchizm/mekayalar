import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Common/AdminPagination';
import toast from 'react-hot-toast';

const StatusBadge = ({ approved }) => {
    const label = approved ? 'Onaylı' : 'Beklemede';
    const classes = approved
        ? 'bg-green-100 text-success dark:bg-green-900 dark:text-success'
        : 'bg-yellow-100 text-warning-foreground dark:bg-yellow-900 dark:text-warning';

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
            }
        );
    };

    const togglePin = (comment) => {
        router.patch(
            route('admin.comments.update', comment.id),
            { is_pinned: !comment.is_pinned },
            {
                onSuccess: () => toast.success('Yorum sabitleme durumu güncellendi.'),
                onError: () => toast.error('Yorum güncellenirken hata oluştu.'),
            }
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

            <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4 dark:border-border">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Yorum Yönetimi</h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Toplam {comments?.total ?? commentItems.length} yorum
                        </p>
                    </div>
                    <Link
                        href={route('admin.comments.settings')}
                        className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary/70 dark:border-border dark:text-foreground dark:hover:bg-secondary"
                    >
                        Yorum Ayarları
                    </Link>
                </div>

                <form
                    onSubmit={submitFilters}
                    className="flex flex-wrap items-end gap-4 border-b border-border px-5 py-4 dark:border-border"
                >
                    <div className="flex-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                            Arama
                        </label>
                        <input
                            type="text"
                            value={data.search}
                            onChange={(event) => setData('search', event.target.value)}
                            placeholder="Yorum, gönderi veya yazar..."
                            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-card dark:text-foreground"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                            Durum
                        </label>
                        <select
                            value={data.status}
                            onChange={(event) => setData('status', event.target.value)}
                            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring dark:border-border dark:bg-card dark:text-foreground"
                        >
                            <option value="">Hepsi</option>
                            <option value="approved">Onaylı</option>
                            <option value="pending">Beklemede</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary"
                        >
                            Filtrele
                        </button>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary/70 dark:border-border dark:text-foreground dark:hover:bg-secondary"
                        >
                            Sıfırla
                        </button>
                    </div>
                </form>

                <div className="p-5">
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-secondary/70 dark:bg-secondary">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Yorum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Gönderi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Yazar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Durum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Sabit
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Tarih
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-card dark:divide-gray-700 dark:bg-card">
                                {commentItems.length > 0 ? (
                                    commentItems.map((comment) => (
                                        <tr key={comment.id} className="hover:bg-secondary/70 dark:hover:bg-secondary">
                                            <td className="max-w-sm px-6 py-4 text-sm text-foreground dark:text-foreground">
                                                <p className="line-clamp-3">{comment.text}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                                {comment.post ? (
                                                    <Link
                                                        href={route('blog.show', comment.post.slug)}
                                                        className="line-clamp-2 text-primary hover:underline dark:text-primary"
                                                    >
                                                        {comment.post.title}
                                                    </Link>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    {comment.commenter?.photo ? (
                                                        <img
                                                            src={comment.commenter.photo}
                                                            alt={comment.commenter?.name || 'Guest'}
                                                            className="h-8 w-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-muted-foreground dark:bg-secondary dark:text-foreground">
                                                            {(comment.commenter?.name || '?')[0]}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground dark:text-foreground">
                                                            {comment.commenter?.name || 'Ziyaretçi'}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                                                            {comment.commenter?.email || ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <StatusBadge approved={comment.approved} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                                {comment.is_pinned ? 'Evet' : 'Hayır'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
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
                                                    className="rounded-md bg-destructive px-3 py-1 text-sm font-medium text-white hover:bg-destructive"
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
                                            <div className="text-muted-foreground dark:text-muted-foreground">
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
                                    className="rounded-lg border border-border bg-card p-4 dark:border-border dark:bg-secondary"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground dark:text-foreground">
                                                {comment.commenter?.name || 'Ziyaretçi'}
                                            </p>
                                            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground dark:text-muted-foreground">
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
                                    <div className="text-xs text-muted-foreground dark:text-muted-foreground">
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
                                            className="flex-1 rounded-md bg-destructive px-3 py-2 text-xs font-medium text-white hover:bg-destructive"
                                            onClick={() => deleteComment(comment)}
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-muted-foreground dark:text-muted-foreground">
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
