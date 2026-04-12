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
                        <h2 className="text-2xl font-bold text-foreground dark:text-foreground">Projelerim</h2>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Tüm projelerini buradan yönetebilirsin.
                        </p>
                    </div>
                    <Link
                        href={route('admin.projects.create')}
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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

                <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
                    {/* Desktop Table View */}
                    <div className="-mx-4 hidden sm:-mx-6 md:block lg:-mx-8">
                        <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                            <div className="border-b border-border shadow-sm dark:border-border sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-secondary/70 dark:bg-secondary">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground"
                                            >
                                                Proje
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground"
                                            >
                                                Durum
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground"
                                            >
                                                Öne Çıkan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground"
                                            >
                                                Tamamlanma Tarihi
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Düzenle</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-card dark:divide-gray-700 dark:bg-card">
                                        {projects.length > 0 ? (
                                            projects.map((project) => (
                                                <tr
                                                    key={project.id}
                                                    className="hover:bg-secondary/70 dark:hover:bg-secondary"
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
                                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-bold text-muted-foreground dark:bg-accent dark:text-muted-foreground">
                                                                        {getLocalizedText(project.title).substring(
                                                                            0,
                                                                            1
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-foreground dark:text-foreground">
                                                                    {getLocalizedText(project.title)}
                                                                </div>
                                                                <div className="text-sm text-muted-foreground dark:text-muted-foreground">
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
                                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${project.is_published ? 'bg-green-100 text-success dark:bg-green-900/50 dark:text-success' : 'bg-red-100 text-destructive dark:bg-red-900/50 dark:text-destructive'}`}
                                                        >
                                                            {project.is_published ? 'Yayında' : 'Taslak'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${project.is_featured ? 'bg-blue-100 text-primary dark:bg-blue-900/50 dark:text-primary' : 'bg-secondary text-foreground dark:bg-secondary dark:text-muted-foreground'}`}
                                                        >
                                                            {project.is_featured ? 'Evet' : 'Hayır'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground dark:text-muted-foreground">
                                                        {project.completed_at
                                                            ? new Date(project.completed_at).toLocaleDateString('tr-TR')
                                                            : 'Belirtilmedi'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <Menu as="div" className="relative inline-block text-left">
                                                            <div>
                                                                <Menu.Button className="flex items-center rounded-full bg-secondary text-muted-foreground hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-secondary dark:text-muted-foreground dark:hover:text-white">
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
                                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-card">
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
                                                                                            ? 'bg-secondary text-foreground dark:bg-secondary dark:text-foreground'
                                                                                            : 'text-muted-foreground dark:text-muted-foreground',
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
                                                                                            ? 'bg-secondary text-foreground dark:bg-secondary dark:text-foreground'
                                                                                            : 'text-muted-foreground dark:text-muted-foreground',
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
                                                                                            ? 'bg-red-100 text-destructive dark:bg-destructive/20 dark:text-destructive'
                                                                                            : 'text-destructive dark:text-destructive',
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
                                                    className="px-6 py-12 text-center text-muted-foreground dark:text-muted-foreground"
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
                                    className="rounded-lg border border-border bg-card p-4 dark:border-border dark:bg-secondary"
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
                                                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent font-bold text-muted-foreground dark:bg-accent dark:text-muted-foreground">
                                                    {getLocalizedText(project.title).substring(0, 1)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="line-clamp-2 text-sm font-medium text-foreground dark:text-foreground">
                                                {getLocalizedText(project.title)}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground dark:text-muted-foreground">
                                                {createExcerpt(getLocalizedText(project.description), 80)}
                                            </p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span
                                                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${project.is_published ? 'bg-green-100 text-success dark:bg-green-900/50 dark:text-success' : 'bg-red-100 text-destructive dark:bg-red-900/50 dark:text-destructive'}`}
                                                >
                                                    {project.is_published ? 'Yayında' : 'Taslak'}
                                                </span>
                                                {project.is_featured && (
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-primary dark:bg-blue-900/50 dark:text-primary">
                                                        Öne Çıkan
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 text-xs text-muted-foreground dark:text-muted-foreground">
                                        <span className="block">
                                            {project.completed_at
                                                ? new Date(project.completed_at).toLocaleDateString('tr-TR')
                                                : 'Tamamlanma tarihi belirtilmemiş'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.projects.edit', project.slug)}
                                            className="flex-1 rounded-md bg-warning px-3 py-2 text-center text-xs font-medium text-white hover:bg-warning"
                                        >
                                            Düzenle
                                        </Link>
                                        <a
                                            href={route('projects.show', project.slug)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-xs font-medium text-white hover:bg-primary"
                                        >
                                            Görüntüle
                                        </a>
                                        <button
                                            onClick={() => openDeleteModal(project)}
                                            className="flex-1 rounded-md bg-destructive px-3 py-2 text-xs font-medium text-white hover:bg-destructive"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-muted-foreground dark:text-muted-foreground">
                                <p className="text-base font-medium text-muted-foreground dark:text-muted-foreground">
                                    Proje bulunamadı
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
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
