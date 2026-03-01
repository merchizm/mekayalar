import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

const statusLabels = {
    reading: 'Okunuyor',
    completed: 'Bitti',
    on_hold: 'Beklemede',
    dropped: 'Bırakıldı',
};

export default function Index({ auth, books = [] }) {
    const deleteBook = (book) => {
        if (!confirm(`'${book.title}' kitabini silmek istediginizden emin misiniz?`)) {
            return;
        }

        router.delete(route('admin.books.destroy', book.slug), {
            onSuccess: () => toast.success('Kitap silindi.'),
            onError: () => toast.error('Kitap silinirken hata oluştu.'),
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Kitaplar" />
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kitaplar</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Toplam {books.length} kitap</p>
                    </div>
                    <Link
                        href={route('admin.books.create')}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Yeni Kitap
                    </Link>
                </div>
                <div className="p-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Kitap</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Durum</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Puan</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {book.cover_image ? (
                                                    <img src={book.cover_image} alt={book.title} className="h-14 w-10 rounded object-cover" />
                                                ) : (
                                                    <div className="h-14 w-10 rounded bg-gray-200 dark:bg-gray-700" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{book.title}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{book.author}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{statusLabels[book.status] || book.status}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{book.rating || '-'}</td>
                                        <td className="px-4 py-4 text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <Link className="rounded bg-yellow-500 px-3 py-1 text-white" href={route('admin.books.edit', book.slug)}>
                                                    Düzenle
                                                </Link>
                                                <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => deleteBook(book)}>
                                                    Sil
                                                </button>
                                            </div>
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
