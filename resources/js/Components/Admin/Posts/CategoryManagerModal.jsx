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

    const formInputClass =
        'mt-1 block w-full rounded-md border-input shadow-sm focus:border-ring focus:ring-ring dark:bg-secondary dark:border-border dark:text-foreground sm:text-sm';
    const formLabelClass = 'block text-sm font-medium text-muted-foreground dark:text-muted-foreground';

    const handleCreate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post(route('admin.categories.store'), {
                name: newCategoryName,
                description: newCategoryDescription,
            })
            .then((response) => {
                const updatedCategories = [...categories, response.data].sort((a, b) => a.name.localeCompare(b.name));
                setCategories(updatedCategories);
                onUpdate(updatedCategories);
                setNewCategoryName('');
                setNewCategoryDescription('');
                toast.success('Kategori oluşturuldu.');
            })
            .catch((err) => toast.error(err.response?.data?.errors?.name[0] || 'Bir hata oluştu.'))
            .finally(() => setIsLoading(false));
    };

    const handleUpdate = (id) => {
        setIsLoading(true);
        axios
            .put(route('admin.categories.update', id), {
                name: editingCategoryName,
                description: editingCategoryDescription,
            })
            .then((response) => {
                const updatedCategories = categories
                    .map((c) => (c.id === id ? response.data : c))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCategories(updatedCategories);
                onUpdate(updatedCategories);
                setEditingCategoryId(null);
                toast.success('Kategori güncellendi.');
            })
            .catch((err) => toast.error(err.response?.data?.errors?.name[0] || 'Bir hata oluştu.'))
            .finally(() => setIsLoading(false));
    };

    const handleDelete = (id) => {
        if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;
        setIsLoading(true);
        axios
            .delete(route('admin.categories.destroy', id))
            .then(() => {
                const updatedCategories = categories.filter((c) => c.id !== id);
                setCategories(updatedCategories);
                onUpdate(updatedCategories);
                toast.success('Kategori silindi.');
            })
            .catch((err) => toast.error(err.response?.data?.message || 'Bir hata oluştu.'))
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-lg bg-card p-6 shadow-xl dark:bg-card">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Kategorileri Yönet</h3>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-4 rounded-md border p-4 dark:border-border">
                    <form onSubmit={handleCreate} className="space-y-3">
                        <h4 className="font-semibold text-foreground dark:text-foreground">Yeni Kategori Ekle</h4>
                        <div>
                            <label htmlFor="new_category_name" className={formLabelClass}>
                                Kategori Adı
                            </label>
                            <input
                                type="text"
                                id="new_category_name"
                                className={formInputClass}
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="new_category_description" className={formLabelClass}>
                                Açıklama
                            </label>
                            <textarea
                                id="new_category_description"
                                rows="2"
                                className={formInputClass}
                                value={newCategoryDescription}
                                onChange={(e) => setNewCategoryDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary disabled:opacity-50"
                                disabled={isLoading}
                            >
                                Ekle
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.id} className="rounded-md bg-secondary/70 p-3 dark:bg-secondary">
                                {editingCategoryId === category.id ? (
                                    <div className="space-y-2">
                                        <div>
                                            <label className={formLabelClass}>Kategori Adı</label>
                                            <input
                                                type="text"
                                                className={formInputClass}
                                                value={editingCategoryName}
                                                onChange={(e) => setEditingCategoryName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className={formLabelClass}>Açıklama</label>
                                            <textarea
                                                className={formInputClass}
                                                rows="2"
                                                value={editingCategoryDescription}
                                                onChange={(e) => setEditingCategoryDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleUpdate(category.id)}
                                                className="text-success hover:text-success disabled:opacity-50"
                                                disabled={isLoading}
                                            >
                                                Kaydet
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="text-muted-foreground hover:text-muted-foreground disabled:opacity-50"
                                                disabled={isLoading}
                                            >
                                                İptal
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-foreground dark:text-foreground">
                                                {category.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                {category.description}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0 space-x-2">
                                            <button
                                                onClick={() => handleStartEdit(category)}
                                                className="text-primary hover:text-primary disabled:opacity-50"
                                                disabled={isLoading}
                                            >
                                                Düzenle
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-destructive hover:text-destructive disabled:opacity-50"
                                                disabled={isLoading}
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:bg-secondary/70 dark:border-border dark:bg-secondary dark:text-muted-foreground dark:hover:bg-accent"
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
