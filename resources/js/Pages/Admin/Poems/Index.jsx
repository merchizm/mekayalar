import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
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
  }
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorMap[status] || 'bg-gray-100 text-gray-800'}`}>
      {labelMap[status] || status}
    </span>
  );
};

export default function Index({ auth, poems }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const poemIdToEdit = urlParams.get('edit');
    if (poemIdToEdit) {
      const poemToEdit = poems.find(p => p.id.toString() === poemIdToEdit);
      if (poemToEdit) {
        openEditModal(poemToEdit);
      }
    }
  }, [poems]);

  const openEditModal = (poem) => {
    setSelectedPoem(poem);
    setShowEditModal(true);
  };

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
  }

  return (
    <AdminLayout user={auth.user}>
      <Head title="Şiirler" />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tüm Şiirler</h3>
          <div>
            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={() => setShowAddModal(true)}>
              Yeni Şiir
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Başlık</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Yazılış Tarihi</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {poems.map((poem) => (
                  <tr key={poem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{poem.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{poem.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={poem.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(poem.wrote_at).toLocaleDateString('tr-TR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" onClick={() => openEditModal(poem)}>
                        Düzenle
                      </button>
                      <button className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => deletePoem(poem)}>
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddPoemModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />
      <EditPoemModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        poem={selectedPoem}
        onSuccess={handleSuccess}
      />
    </AdminLayout>
  );
} 
