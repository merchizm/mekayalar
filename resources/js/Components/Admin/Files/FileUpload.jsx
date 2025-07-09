import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function FileUpload({ currentPath, onSuccess }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('parent_folder', currentPath);

      const fileEntry = { name: file.name, progress: 0, error: null };
      setUploadingFiles(prev => [...prev, fileEntry]);

      axios.post(route('admin.media.upload'), formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadingFiles(prev => prev.map(f => f.name === file.name ? { ...f, progress } : f));
        }
      })
        .then(() => {
          toast.success(`'${file.name}' başarıyla yüklendi.`);
          onSuccess();
        })
        .catch(error => {
          const message = error.response?.data?.message || 'Dosya yüklenemedi.';
          toast.error(`'${file.name}' yüklenemedi: ${message}`);
          setUploadingFiles(prev => prev.map(f => f.name === file.name ? { ...f, error: message } : f));
        })
        .finally(() => {
          setTimeout(() => {
            setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
          }, 5000);
        });
    });
  }, [currentPath, onSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="mt-4">
      <div {...getRootProps()} className={`p-6 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}>
        <input {...getInputProps()} />
        <p className="text-gray-500 dark:text-gray-400">Dosyaları buraya sürükleyin veya seçmek için tıklayın</p>
      </div>
      {uploadingFiles.length > 0 && (
        <div className="mt-4 space-y-3">
          <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Yükleniyor:</h6>
          {uploadingFiles.map((file, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-4">{file.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{file.progress}%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${file.progress}%` }}></div>
              </div>
              {file.error && <small className="text-red-500 text-xs mt-1">{file.error}</small>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
