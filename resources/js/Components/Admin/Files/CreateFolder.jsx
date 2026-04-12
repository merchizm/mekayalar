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
        axios
            .post(route('admin.media.createFolder'), {
                folderName: newFolderName,
                parent_folder: currentPath,
            })
            .then(() => {
                toast.success('Klasör başarıyla oluşturuldu.');
                setNewFolderName('');
                onSuccess();
            })
            .catch((error) => {
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
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-input focus:border-ring focus:ring-ring dark:border-border dark:bg-secondary dark:text-foreground sm:text-sm"
                    placeholder="Yeni klasör adı..."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                />
                <button
                    onClick={handleCreateFolder}
                    disabled={loading}
                    className="inline-flex items-center rounded-r-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Oluşturuluyor...' : 'Dizin Oluştur'}
                </button>
            </div>
        </div>
    );
}
