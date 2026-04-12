import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Common/AdminPagination';
import toast from 'react-hot-toast';

export default function Index({ auth, entries, filters = {} }) {
    const entryItems = Array.isArray(entries?.data) ? entries.data : [];
    const entryLinks = Array.isArray(entries?.links) ? entries.links : [];
    const { data, setData } = useForm({
        search: filters.search || '',
        status: filters.status || '',
    });

    const submitFilters = (event) => {
        event.preventDefault();
        router.get(route('admin.guestbook.index'), data, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setData({ search: '', status: '' });
        router.get(route('admin.guestbook.index'));
    };

    const setApproval = (entry, approved) => {
        router.patch(
            route('admin.guestbook.update', entry.id),
            { approved },
            {
                onSuccess: () => toast.success(approved ? 'Kayıt onaylandı.' : 'Kayıt beklemeye alındı.'),
                onError: () => toast.error('Kayıt güncellenirken hata oluştu.'),
            }
        );
    };

    const removeEntry = (entry) => {
        if (!confirm('Bu kaydı silmek istediğinizden emin misiniz?')) {
            return;
        }

        router.delete(route('admin.guestbook.destroy', entry.id), {
            onSuccess: () => toast.success('Kayıt silindi.'),
            onError: () => toast.error('Kayıt silinirken hata oluştu.'),
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Ziyaretçi Defteri Moderasyon" />

            <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
                <div className="border-b border-border px-5 py-4 dark:border-border">
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
                        Ziyaretçi Defteri Moderasyon
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                        Toplam {entries?.total ?? entryItems.length} kayıt
                    </p>
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
                            placeholder="İsim veya mesaj..."
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
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Yazar
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Mesaj
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Detay
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        Durum
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-card dark:divide-gray-700 dark:bg-card">
                                {entryItems.length > 0 ? (
                                    entryItems.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-secondary/70 dark:hover:bg-secondary">
                                            <td className="px-4 py-4 text-sm font-medium text-foreground dark:text-foreground">
                                                {entry.name}
                                            </td>
                                            <td className="max-w-xl px-4 py-4 text-sm text-muted-foreground dark:text-foreground">
                                                <p className="line-clamp-3">{entry.message}</p>
                                            </td>
                                            <td className="px-4 py-4 text-xs text-muted-foreground dark:text-muted-foreground">
                                                <p>{entry.location || '-'}</p>
                                                <p>
                                                    {entry.created_at
                                                        ? new Date(entry.created_at).toLocaleDateString('tr-TR')
                                                        : '-'}
                                                </p>
                                                <p>
                                                    {entry.reactions_count} tepki · {entry.replies_count} yanıt
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        entry.approved
                                                            ? 'bg-green-100 text-success dark:bg-green-900 dark:text-success'
                                                            : 'bg-yellow-100 text-warning-foreground dark:bg-yellow-900 dark:text-warning'
                                                    }`}
                                                >
                                                    {entry.approved ? 'Onaylı' : 'Beklemede'}
                                                </span>
                                            </td>
                                            <td className="space-x-2 whitespace-nowrap px-4 py-4 text-right text-sm">
                                                {entry.approved ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setApproval(entry, false)}
                                                        className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                                    >
                                                        Beklemeye Al
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => setApproval(entry, true)}
                                                        className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                                                    >
                                                        Onayla
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeEntry(entry)}
                                                    className="rounded-md bg-destructive px-3 py-1.5 text-xs font-semibold text-white hover:bg-destructive"
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-4 py-10 text-center text-sm text-muted-foreground dark:text-muted-foreground"
                                        >
                                            Kayıt bulunamadı.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination links={entryLinks} meta={entries} />
            </div>
        </AdminLayout>
    );
}
