import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreateFolder({ currentPath, onSuccess }) {
    const [newFolderName, setNewFolderName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) {
            toast.error('Klasör adı boş olamaz.');
            return;
        }
        setLoading(true);
        axios.post(route('admin.media.createFolder'), {
            folderName: newFolderName,
            parent_folder: currentPath
        })
            .then(() => {
                toast.success('Klasör başarıyla oluşturuldu.');
                setNewFolderName('');
                onSuccess();
            })
            .catch(error => {
                toast.error('Klasör oluşturulurken bir hata oluştu.');
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="mt-4">
            <div className="flex rounded-md shadow-sm">
                <input
                    type="text"
                    className="flex-1 block w-full min-w-0 rounded-none rounded-l-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Yeni klasör adı..."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                />
                <button
                    onClick={handleCreateFolder}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? 'Oluşturuluyor...' : 'Dizin Oluştur'}
                </button>
            </div>
        </div>
    );
} 
