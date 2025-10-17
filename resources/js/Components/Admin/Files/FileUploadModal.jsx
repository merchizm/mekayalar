import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UploadIcon } from './Icons';

export default function FileUploadModal({ isOpen, onClose, currentPath, onSuccess }) {
    const [uploadingFiles, setUploadingFiles] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setUploadingFiles([]);
        }
    }, [isOpen]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('parent_folder', currentPath);

                const fileEntry = { name: file.name, progress: 0, error: null };
                setUploadingFiles((prev) => [...prev, fileEntry]);

                axios
                    .post(route('admin.media.upload'), formData, {
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadingFiles((prev) =>
                                prev.map((f) => (f.name === file.name ? { ...f, progress } : f))
                            );
                        },
                    })
                    .then(() => {
                        toast.success(`'${file.name}' başarıyla yüklendi.`);
                        setUploadingFiles((prev) =>
                            prev.map((f) => (f.name === file.name ? { ...f, progress: 100 } : f))
                        );
                        onSuccess();
                    })
                    .catch((error) => {
                        const message = error.response?.data?.message || 'Dosya yüklenemedi.';
                        toast.error(`'${file.name}' yüklenemedi: ${message}`);
                        setUploadingFiles((prev) =>
                            prev.map((f) => (f.name === file.name ? { ...f, error: message } : f))
                        );
                    });
            });
        },
        [currentPath, onSuccess]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    });

    const handleClose = () => {
        if (uploadingFiles.some((f) => f.progress < 100 && !f.error)) {
            if (confirm('Dosya yükleme işlemi devam ediyor. Kapatmak istediğinizden emin misiniz?')) {
                onClose();
            }
        } else {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onKeyDown={handleKeyDown}
        >
            <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dosya Yükle</h3>
                </div>

                <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                    <div className="mb-4">
                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Konum: <span className="font-mono">{currentPath}</span>
                        </div>

                        <div
                            {...getRootProps()}
                            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 ${
                                isDragActive
                                    ? 'scale-105 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700/50'
                            }`}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center">
                                <UploadIcon
                                    className={`mb-4 h-12 w-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
                                />
                                <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                                    {isDragActive ? 'Dosyaları buraya bırakın' : 'Dosyaları sürükleyin veya seçin'}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Birden fazla dosya seçebilirsiniz (Maksimum 20MB)
                                </p>
                            </div>
                        </div>
                    </div>

                    {uploadingFiles.length > 0 && (
                        <div className="mt-6">
                            <h6 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Yükleme Durumu:
                            </h6>
                            <div className="max-h-48 space-y-3 overflow-y-auto">
                                {uploadingFiles.map((file, index) => (
                                    <div key={index} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="truncate pr-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {file.name}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                {file.error ? (
                                                    <span className="text-xs text-red-500">Hata</span>
                                                ) : file.progress === 100 ? (
                                                    <span className="text-xs text-green-500">Tamamlandı</span>
                                                ) : (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {file.progress}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    file.error
                                                        ? 'bg-red-500'
                                                        : file.progress === 100
                                                          ? 'bg-green-500'
                                                          : 'bg-blue-500'
                                                }`}
                                                style={{ width: `${file.error ? 100 : file.progress}%` }}
                                            ></div>
                                        </div>
                                        {file.error && <p className="mt-1 text-xs text-red-500">{file.error}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 rounded-b-lg bg-gray-50 px-6 py-4 dark:bg-gray-700">
                    <button
                        onClick={handleClose}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                    >
                        {uploadingFiles.some((f) => f.progress < 100 && !f.error) ? 'Arka Planda Devam Et' : 'Kapat'}
                    </button>
                </div>
            </div>
        </div>
    );
}
