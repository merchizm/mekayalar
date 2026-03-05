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

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ziyaretçi Defteri Moderasyon</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Toplam {entries?.total ?? entryItems.length} kayıt
                    </p>
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
                            placeholder="İsim veya mesaj..."
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
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Yazar
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Mesaj
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Detay
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Durum
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {entryItems.length > 0 ? (
                                    entryItems.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {entry.name}
                                            </td>
                                            <td className="max-w-xl px-4 py-4 text-sm text-gray-700 dark:text-gray-200">
                                                <p className="line-clamp-3">{entry.message}</p>
                                            </td>
                                            <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400">
                                                <p>{entry.location || '-'}</p>
                                                <p>{entry.created_at ? new Date(entry.created_at).toLocaleDateString('tr-TR') : '-'}</p>
                                                <p>
                                                    {entry.reactions_count} tepki · {entry.replies_count} yanıt
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        entry.approved
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
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
                                                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
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
