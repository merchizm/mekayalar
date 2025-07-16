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

        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projelerim</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Tüm projelerini buradan yönetebilirsin.</p>
          </div>
          <Link href={route('admin.projects.create')} className="inline-flex justify-center items-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 -ml-1 w-5 h-5 icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            Yeni Proje Ekle
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
              <div className="border-b border-gray-200 shadow-sm dark:border-gray-700 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">Proje</th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">Durum</th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">Öne Çıkan</th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">Tamamlanma Tarihi</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Düzenle</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {projects.length > 0 ? (
                      projects.map(project => (
                        <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                {project.image ? (
                                  <img className="object-cover w-10 h-10 rounded-full" src={project.image} alt={project.title} />
                                ) : (
                                  <span className="flex justify-center items-center w-10 h-10 font-bold text-gray-600 bg-gray-300 rounded-full dark:bg-gray-600 dark:text-gray-300">{project.title.substring(0, 1)}</span>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{project.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{createExcerpt(project.description, 100)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_published ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                              {project.is_published ? 'Yayında' : 'Taslak'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_featured ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                              {project.is_featured ? 'Evet' : 'Hayır'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {project.completed_at ? new Date(project.completed_at).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <Menu as="div" className="inline-block relative text-left">
                              <div>
                                <Menu.Button className="flex items-center text-gray-400 bg-gray-100 rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white">
                                  <span className="sr-only">Open options</span>
                                  <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right dark:bg-gray-800 focus:outline-none">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link href={route('admin.projects.edit', project.slug)} className={classNames(active ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white' : 'text-gray-700 dark:text-gray-300', 'block px-4 py-2 text-sm')}>Düzenle</Link>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a href={route('projects.show', project.slug)} target="_blank" rel="noopener noreferrer" className={classNames(active ? 'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white' : 'text-gray-700 dark:text-gray-300', 'block px-4 py-2 text-sm')}>Görüntüle</a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button onClick={() => openDeleteModal(project)} className={classNames(active ? 'text-red-900 bg-red-100 dark:bg-red-600/20 dark:text-red-300' : 'text-red-700 dark:text-red-400', 'block px-4 py-2 w-full text-sm text-left')}>Sil</button>
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
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          Henüz hiç proje eklenmemiş.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
          "{projectToDelete?.title}" adlı projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </ConfirmationModal>
      </>
    </AdminLayout>
  );
} 
