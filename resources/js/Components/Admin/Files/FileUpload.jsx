import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function FileUpload({ currentPath, onSuccess }) {
    const [uploadingFiles, setUploadingFiles] = useState([]);

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
                        onSuccess();
                    })
                    .catch((error) => {
                        const message = error.response?.data?.message || 'Dosya yüklenemedi.';
                        toast.error(`'${file.name}' yüklenemedi: ${message}`);
                        setUploadingFiles((prev) =>
                            prev.map((f) => (f.name === file.name ? { ...f, error: message } : f))
                        );
                    })
                    .finally(() => {
                        setTimeout(() => {
                            setUploadingFiles((prev) => prev.filter((f) => f.name !== file.name));
                        }, 5000);
                    });
            });
        },
        [currentPath, onSuccess]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="mt-4">
            <div
                {...getRootProps()}
                className={`cursor-pointer rounded-md border-2 border-dashed p-6 text-center transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-input hover:border-border dark:border-border dark:hover:border-border'}`}
            >
                <input {...getInputProps()} />
                <p className="text-muted-foreground dark:text-muted-foreground">
                    Dosyaları buraya sürükleyin veya seçmek için tıklayın
                </p>
            </div>
            {uploadingFiles.length > 0 && (
                <div className="mt-4 space-y-3">
                    <h6 className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                        Yükleniyor:
                    </h6>
                    {uploadingFiles.map((file, index) => (
                        <div key={index}>
                            <div className="flex items-center justify-between">
                                <span className="truncate pr-4 text-sm font-medium text-foreground dark:text-foreground">
                                    {file.name}
                                </span>
                                <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                                    {file.progress}%
                                </span>
                            </div>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-accent dark:bg-secondary">
                                <div
                                    className="h-1.5 rounded-full bg-primary"
                                    style={{ width: `${file.progress}%` }}
                                ></div>
                            </div>
                            {file.error && <small className="mt-1 text-xs text-destructive">{file.error}</small>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
