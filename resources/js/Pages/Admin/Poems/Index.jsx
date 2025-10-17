import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import AddPoemModal from '@/Components/Admin/Poems/AddPoemModal';
import EditPoemModal from '@/Components/Admin/Poems/EditPoemModal';

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
    };
    return (
        <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${colorMap[status] || 'bg-gray-100 text-gray-800'}`}
        >
            {labelMap[status] || status}
        </span>
    );
};

export default function Index({ auth, poems }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPoem, setSelectedPoem] = useState(null);

    const openEditModal = useCallback((poem) => {
        setSelectedPoem(poem);
        setShowEditModal(true);
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const poemIdToEdit = urlParams.get('edit');
        if (poemIdToEdit) {
            const poemToEdit = poems.find((p) => p.id.toString() === poemIdToEdit);
            if (poemToEdit) {
                openEditModal(poemToEdit);
            }
        }
    }, [poems, openEditModal]);

    const deletePoem = (poem) => {
        if (!confirm('Bu şiiri silmek istediğinizden emin misiniz?')) {
            return;
        }
        router.delete(route('admin.poems.destroy', poem.id), {
            onSuccess: () => toast.success('Şiir başarıyla silindi!'),
            onError: () => toast.error('Şiir silinirken bir hata oluştu.'),
        });
    };

    const handleSuccess = () => {
        toast.success('İşlem başarıyla tamamlandı!');
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Şiirler" />

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tüm Şiirler</h3>
                    <div>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => setShowAddModal(true)}
                        >
                            Yeni Şiir
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    {/* Desktop Table View */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Başlık
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Slug
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Durum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        Yazılış Tarihi
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {poems.map((poem) => (
                                    <tr key={poem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                            {poem.title}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {poem.slug}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <StatusBadge status={poem.status} />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(poem.wrote_at).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                className="rounded-md bg-yellow-500 px-3 py-1 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                                onClick={() => openEditModal(poem)}
                                            >
                                                Düzenle
                                            </button>
                                            <button
                                                className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                onClick={() => deletePoem(poem)}
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="space-y-4 md:hidden">
                        {poems.length > 0 ? (
                            poems.map((poem) => (
                                <div
                                    key={poem.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700"
                                >
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                                                {poem.title}
                                            </h3>
                                            <div className="mt-2 flex items-center gap-2">
                                                <StatusBadge status={poem.status} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="block">
                                            {new Date(poem.wrote_at).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="flex-1 rounded-md bg-yellow-500 px-3 py-2 text-center text-xs font-medium text-white hover:bg-yellow-600"
                                            onClick={() => openEditModal(poem)}
                                        >
                                            Düzenle
                                        </button>
                                        <button
                                            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                                            onClick={() => deletePoem(poem)}
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                                    Şiir bulunamadı
                                </p>
                                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                                    İlk şiirinizi oluşturmak için "Yeni Şiir" butonuna tıklayın.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AddPoemModal show={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={handleSuccess} />
            <EditPoemModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                poem={selectedPoem}
                onSuccess={handleSuccess}
            />
        </AdminLayout>
    );
}
