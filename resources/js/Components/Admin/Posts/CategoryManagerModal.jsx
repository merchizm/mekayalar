import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CategoryManagerModal({ isOpen, onClose, categories: initialCategories, onUpdate }) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [editingCategoryDescription, setEditingCategoryDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";
  const formLabelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

  const handleCreate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(route('admin.categories.store'), {
      name: newCategoryName,
      description: newCategoryDescription,
    })
      .then(response => {
        const updatedCategories = [...categories, response.data].sort((a, b) => a.name.localeCompare(b.name));
        setCategories(updatedCategories);
        onUpdate(updatedCategories);
        setNewCategoryName('');
        setNewCategoryDescription('');
        toast.success('Kategori oluşturuldu.');
      })
      .catch(err => toast.error(err.response?.data?.errors?.name[0] || 'Bir hata oluştu.'))
      .finally(() => setIsLoading(false));
  };

  const handleUpdate = (id) => {
    setIsLoading(true);
    axios.put(route('admin.categories.update', id), {
      name: editingCategoryName,
      description: editingCategoryDescription,
    })
      .then(response => {
        const updatedCategories = categories.map(c => c.id === id ? response.data : c).sort((a, b) => a.name.localeCompare(b.name));
        setCategories(updatedCategories);
        onUpdate(updatedCategories);
        setEditingCategoryId(null);
        toast.success('Kategori güncellendi.');
      })
      .catch(err => toast.error(err.response?.data?.errors?.name[0] || 'Bir hata oluştu.'))
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;
    setIsLoading(true);
    axios.delete(route('admin.categories.destroy', id))
      .then(() => {
        const updatedCategories = categories.filter(c => c.id !== id);
        setCategories(updatedCategories);
        onUpdate(updatedCategories);
        toast.success('Kategori silindi.');
      })
      .catch(err => toast.error(err.response?.data?.message || 'Bir hata oluştu.'))
      .finally(() => setIsLoading(false));
  };

  const handleStartEdit = (category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
    setEditingCategoryDescription(category.description || '');
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kategorileri Yönet</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">&times;</button>
        </div>

        <div className="mb-4 p-4 border rounded-md dark:border-gray-700">
          <form onSubmit={handleCreate} className="space-y-3">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Yeni Kategori Ekle</h4>
            <div>
              <label htmlFor="new_category_name" className={formLabelClass}>Kategori Adı</label>
              <input type="text" id="new_category_name" className={formInputClass} value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="new_category_description" className={formLabelClass}>Açıklama</label>
              <textarea id="new_category_description" rows="2" className={formInputClass} value={newCategoryDescription} onChange={(e) => setNewCategoryDescription(e.target.value)}></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={isLoading}>Ekle</button>
            </div>
          </form>
        </div>

        <div className="flex-grow overflow-y-auto">
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id} className="p-3 rounded-md bg-gray-50 dark:bg-gray-700">
                {editingCategoryId === category.id ? (
                  <div className="space-y-2">
                    <div>
                      <label className={formLabelClass}>Kategori Adı</label>
                      <input type="text" className={formInputClass} value={editingCategoryName} onChange={e => setEditingCategoryName(e.target.value)} />
                    </div>
                    <div>
                      <label className={formLabelClass}>Açıklama</label>
                      <textarea className={formInputClass} rows="2" value={editingCategoryDescription} onChange={e => setEditingCategoryDescription(e.target.value)}></textarea>
                    </div>
                    <div className="flex space-x-2 justify-end">
                      <button onClick={() => handleUpdate(category.id)} className="text-green-500 hover:text-green-700 disabled:opacity-50" disabled={isLoading}>Kaydet</button>
                      <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled={isLoading}>İptal</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{category.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                    </div>
                    <div className="flex space-x-2 ml-4 flex-shrink-0">
                      <button onClick={() => handleStartEdit(category)} className="text-blue-500 hover:text-blue-700 disabled:opacity-50" disabled={isLoading}>Düzenle</button>
                      <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 disabled:opacity-50" disabled={isLoading}>Sil</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">Kapat</button>
        </div>
      </div>
    </div>
  );
} 
