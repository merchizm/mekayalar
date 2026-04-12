import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function Index({ auth, books = [] }) {
    const statusLabels = {
        reading: __('Okunuyor'),
        completed: __('Bitti'),
        on_hold: __('Beklemede'),
        dropped: __('Bırakıldı'),
    };

    const deleteBook = (book) => {
        if (
            !confirm(
                __('Kitap silme onayı: ":title" kitabını silmek istediğinizden emin misiniz?', { title: book.title })
            )
        ) {
            return;
        }

        router.delete(route('admin.books.destroy', book.slug), {
            onSuccess: () => toast.success(__('Kitap silindi.')),
            onError: () => toast.error(__('Kitap silinirken hata oluştu.')),
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={__('Kitaplar')} />
            <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4 dark:border-border">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">{__('Kitaplar')}</h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            {__('Toplam :count kitap', { count: books.length })}
                        </p>
                    </div>
                    <Link
                        href={route('admin.books.create')}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary"
                    >
                        {__('Yeni Kitap')}
                    </Link>
                </div>
                <div className="p-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-secondary/70 dark:bg-secondary">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        {__('Kitap')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        {__('Durum')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        {__('Puan')}
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                                        {__('İşlemler')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {book.cover_image ? (
                                                    <img
                                                        src={book.cover_image}
                                                        alt={book.title}
                                                        className="h-14 w-10 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-14 w-10 rounded bg-accent dark:bg-secondary" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-foreground dark:text-foreground">
                                                        {book.title}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                        {book.author}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                            {statusLabels[book.status] || book.status}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                            {book.rating || '-'}
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    className="rounded bg-warning px-3 py-1 text-white"
                                                    href={route('admin.books.edit', book.slug)}
                                                >
                                                    {__('Düzenle')}
                                                </Link>
                                                <button
                                                    className="rounded bg-destructive px-3 py-1 text-white"
                                                    onClick={() => deleteBook(book)}
                                                >
                                                    {__('Sil')}
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
