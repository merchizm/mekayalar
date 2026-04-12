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
            <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-card shadow-xl dark:bg-card">
                <div className="border-b border-border px-6 py-4 dark:border-border">
                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Dosya Yükle</h3>
                </div>

                <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                    <div className="mb-4">
                        <div className="mb-4 text-sm text-muted-foreground dark:text-muted-foreground">
                            Konum: <span className="font-mono">{currentPath}</span>
                        </div>

                        <div
                            {...getRootProps()}
                            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 ${
                                isDragActive
                                    ? 'scale-105 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-input hover:border-border hover:bg-secondary/70 dark:border-border dark:hover:border-border dark:hover:bg-secondary/50'
                            }`}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center">
                                <UploadIcon
                                    className={`mb-4 h-12 w-12 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`}
                                />
                                <p className="mb-2 text-lg font-medium text-muted-foreground dark:text-muted-foreground">
                                    {isDragActive ? 'Dosyaları buraya bırakın' : 'Dosyaları sürükleyin veya seçin'}
                                </p>
                                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                    Birden fazla dosya seçebilirsiniz (Maksimum 20MB)
                                </p>
                            </div>
                        </div>
                    </div>

                    {uploadingFiles.length > 0 && (
                        <div className="mt-6">
                            <h6 className="mb-3 text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                                Yükleme Durumu:
                            </h6>
                            <div className="max-h-48 space-y-3 overflow-y-auto">
                                {uploadingFiles.map((file, index) => (
                                    <div key={index} className="rounded-lg bg-secondary/70 p-3 dark:bg-secondary">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="truncate pr-4 text-sm font-medium text-foreground dark:text-foreground">
                                                {file.name}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                {file.error ? (
                                                    <span className="text-xs text-destructive">Hata</span>
                                                ) : file.progress === 100 ? (
                                                    <span className="text-xs text-success">Tamamlandı</span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                                                        {file.progress}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-accent dark:bg-accent">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    file.error
                                                        ? 'bg-destructive'
                                                        : file.progress === 100
                                                          ? 'bg-green-500'
                                                          : 'bg-primary'
                                                }`}
                                                style={{ width: `${file.error ? 100 : file.progress}%` }}
                                            ></div>
                                        </div>
                                        {file.error && <p className="mt-1 text-xs text-destructive">{file.error}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 rounded-b-lg bg-secondary/70 px-6 py-4 dark:bg-secondary">
                    <button
                        onClick={handleClose}
                        className="dark:hover:bg-secondary/700 rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-border dark:bg-accent dark:text-muted-foreground"
                    >
                        {uploadingFiles.some((f) => f.progress < 100 && !f.error) ? 'Arka Planda Devam Et' : 'Kapat'}
                    </button>
                </div>
            </div>
        </div>
    );
}
