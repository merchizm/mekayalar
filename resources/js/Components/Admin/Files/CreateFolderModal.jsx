import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PlusIcon } from './Icons';

export default function CreateFolderModal({ isOpen, onClose, currentPath, onSuccess }) {
    const [newFolderName, setNewFolderName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setNewFolderName('');
        }
    }, [isOpen]);

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) {
            toast.error('Klasör adı boş olamaz.');
            return;
        }

        setLoading(true);
        try {
            await axios.post(route('admin.media.createFolder'), {
                folderName: newFolderName.trim(),
                parent_folder: currentPath,
            });

            toast.success('Klasör başarıyla oluşturuldu.');
            setNewFolderName('');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Klasör oluşturulurken bir hata oluştu.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCreateFolder();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Klasör Oluştur</h3>
                </div>

                <div className="px-6 py-4">
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Klasör Adı
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            placeholder="Klasör adını girin..."
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Konum: <span className="font-mono">{currentPath}</span>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 rounded-b-lg bg-gray-50 px-6 py-4 dark:bg-gray-700">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                        disabled={loading}
                    >
                        İptal
                    </button>
                    <button
                        onClick={handleCreateFolder}
                        disabled={loading || !newFolderName.trim()}
                        className="flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Oluşturuluyor...
                            </>
                        ) : (
                            <>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Oluştur
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
