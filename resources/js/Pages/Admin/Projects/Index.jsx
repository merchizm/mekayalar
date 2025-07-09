import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Index({ auth, projects }) {

  const { delete: destroy } = useForm();

  const handleDelete = (project) => {
    if (confirm(`"${project.title}" adlı projeyi silmek istediğinizden emin misiniz?`)) {
      destroy(route('admin.projects.destroy', project.id), {
        preserveScroll: true,
        onSuccess: () => toast.success('Proje başarıyla silindi!'),
        onError: () => toast.error('Proje silinirken bir hata oluştu.'),
      });
    }
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Projeler" />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projelerim</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tüm projelerimi buradan yönetebilirsiniz.</p>
        </div>
        <Link href={route('admin.projects.create')} className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon -ml-1 mr-2 h-5 w-5" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
          Yeni Proje Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Proje</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Durum</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Özellikli</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tamamlanma Tarihi</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Düzenle</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {projects.length > 0 ? (
                projects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {project.image ? (
                            <img className="h-10 w-10 rounded-full object-cover" src={`/storage/${project.image}`} alt={project.title} />
                          ) : (
                            <span className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">{project.title.substring(0, 1)}</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{project.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {project.is_published ? 'Yayında' : 'Taslak'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {project.is_featured ? 'Evet' : 'Hayır'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {project.completed_at ? new Date(project.completed_at).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href={route('admin.projects.edit', project.id)} className={classNames(active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300', 'block px-4 py-2 text-sm')}>Düzenle</Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a href={route('projects.show', project.id)} target="_blank" rel="noopener noreferrer" className={classNames(active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300', 'block px-4 py-2 text-sm')}>Görüntüle</a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button onClick={() => handleDelete(project)} className={classNames(active ? 'bg-red-100 dark:bg-red-600/20 text-red-900 dark:text-red-300' : 'text-red-700 dark:text-red-400', 'block w-full px-4 py-2 text-left text-sm')}>Sil</button>
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
                  <td colSpan="5" className="text-center">Henüz hiç proje eklenmemiş.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
} 
