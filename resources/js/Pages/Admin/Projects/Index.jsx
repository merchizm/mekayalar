import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import ConfirmationModal from '@/Components/Common/ConfirmationModal';
import { createExcerpt } from '@/utils/blog';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Index({ auth, projects }) {
    const { delete: destroy } = useForm();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    // Helper function to extract localized content for display
    const getLocalizedText = (text) => {
        if (!text) return '';

        // Check if text has language markers
        if (text.includes('[tr:]') || text.includes('[en:]')) {
            // Extract Turkish content (default)
            const trMatch = text.match(/\[tr:\](.*?)\[:\]/s);
            if (trMatch) return trMatch[1];

            // Fallback to English if no Turkish
            const enMatch = text.match(/\[en:\](.*?)\[:\]/s);
            if (enMatch) return enMatch[1];
        }

        // Return as-is if no markers (backward compatibility)
        return text;
    };

    const openDeleteModal = (project) => {
        setProjectToDelete(project);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setProjectToDelete(null);
        setDeleteModalOpen(false);
    };

    const handleDelete = () => {
        if (!projectToDelete) return;

        destroy(route('admin.projects.destroy', projectToDelete.slug), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Proje başarıyla silindi!');
                closeDeleteModal();
            },
            onError: () => {
                toast.error('Proje silinirken bir hata oluştu.');
                closeDeleteModal();
            },
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <>
                <Head title="Projeler" />

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projelerim</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Tüm projelerini buradan yönetebilirsin.
                        </p>
                    </div>
                    <Link
                        href={route('admin.projects.create')}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon -ml-1 mr-2 h-5 w-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                        Yeni Proje Ekle
                    </Link>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {/* Desktop Table View */}
                    <div className="-mx-4 hidden sm:-mx-6 md:block lg:-mx-8">
                        <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                            <div className="border-b border-gray-200 shadow-sm dark:border-gray-700 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                                            >
                                                Proje
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                                            >
                                                Durum
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                                            >
                                                Öne Çıkan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                                            >
                                                Tamamlanma Tarihi
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Düzenle</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {projects.length > 0 ? (
                                            projects.map((project) => (
                                                <tr
                                                    key={project.id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                {project.image ? (
                                                                    <img
                                                                        className="h-10 w-10 rounded-full object-cover"
                                                                        src={project.image}
                                                                        alt={getLocalizedText(project.title)}
                                                                    />
                                                                ) : (
                                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                                                                        {getLocalizedText(project.title).substring(
                                                                            0,
                                                                            1
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    {getLocalizedText(project.title)}
                                                                </div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {createExcerpt(
                                                                        getLocalizedText(project.description),
                                                                        100
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${project.is_published ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}
                                                        >
                                                            {project.is_published ? 'Yayında' : 'Taslak'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${project.is_featured ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                                                        >
                                                            {project.is_featured ? 'Evet' : 'Hayır'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                        {project.completed_at
                                                            ? new Date(project.completed_at).toLocaleDateString('tr-TR')
                                                            : 'Belirtilmedi'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <Menu as="div" className="relative inline-block text-left">
                                                            <div>
                                                                <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white">
                                                                    <span className="sr-only">Open options</span>
                                                                    <EllipsisVerticalIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                </Menu.Button>
                                                            </div>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                                                                    <div className="py-1">
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <Link
                                                                                    href={route(
                                                                                        'admin.projects.edit',
                                                                                        project.slug
                                                                                    )}
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                                                                            : 'text-gray-700 dark:text-gray-300',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    Düzenle
                                                                                </Link>
                                                                            )}
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href={route(
                                                                                        'projects.show',
                                                                                        project.slug
                                                                                    )}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                                                                            : 'text-gray-700 dark:text-gray-300',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                >
                                                                                    Görüntüle
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        openDeleteModal(project)
                                                                                    }
                                                                                    className={classNames(
                                                                                        active
                                                                                            ? 'bg-red-100 text-red-900 dark:bg-red-600/20 dark:text-red-300'
                                                                                            : 'text-red-700 dark:text-red-400',
                                                                                        'block w-full px-4 py-2 text-left text-sm'
                                                                                    )}
                                                                                >
                                                                                    Sil
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                                >
                                                    Henüz hiç proje eklenmemiş.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="space-y-4 p-4 md:hidden">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700"
                                >
                                    <div className="mb-3 flex items-start gap-3">
                                        <div className="h-12 w-12 flex-shrink-0">
                                            {project.image ? (
                                                <img
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                    src={project.image}
                                                    alt={getLocalizedText(project.title)}
                                                />
                                            ) : (
                                                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-300 font-bold text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                                                    {getLocalizedText(project.title).substring(0, 1)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                                                {getLocalizedText(project.title)}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                                                {createExcerpt(getLocalizedText(project.description), 80)}
                                            </p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${project.is_published ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}
                                                >
                                                    {project.is_published ? 'Yayında' : 'Taslak'}
                                                </span>
                                                {project.is_featured && (
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                                        Öne Çıkan
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="block">
                                            {project.completed_at
                                                ? new Date(project.completed_at).toLocaleDateString('tr-TR')
                                                : 'Tamamlanma tarihi belirtilmemiş'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.projects.edit', project.slug)}
                                            className="flex-1 rounded-md bg-yellow-500 px-3 py-2 text-center text-xs font-medium text-white hover:bg-yellow-600"
                                        >
                                            Düzenle
                                        </Link>
                                        <a
                                            href={route('projects.show', project.slug)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 rounded-md bg-blue-500 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-600"
                                        >
                                            Görüntüle
                                        </a>
                                        <button
                                            onClick={() => openDeleteModal(project)}
                                            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                                <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                                    Proje bulunamadı
                                </p>
                                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                                    İlk projenizi oluşturmak için "Yeni Proje Ekle" butonuna tıklayın.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                    title="Projeyi Sil"
                    confirmButtonText="Sil"
                    confirmButtonColor="red"
                >
                    "{getLocalizedText(projectToDelete?.title)}" adlı projeyi silmek istediğinizden emin misiniz? Bu
                    işlem geri alınamaz.
                </ConfirmationModal>
            </>
        </AdminLayout>
    );
}
