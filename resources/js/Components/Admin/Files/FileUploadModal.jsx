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
          setUploadingFiles(prev => prev.map(f => f.name === file.name ? { ...f, progress: 100 } : f));
          onSuccess();
        })
        .catch(error => {
          const message = error.response?.data?.message || 'Dosya yüklenemedi.';
          toast.error(`'${file.name}' yüklenemedi: ${message}`);
          setUploadingFiles(prev => prev.map(f => f.name === file.name ? { ...f, error: message } : f));
        });
    });
  }, [currentPath, onSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    multiple: true
  });

  const handleClose = () => {
    if (uploadingFiles.some(f => f.progress < 100 && !f.error)) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onKeyDown={handleKeyDown}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dosya Yükle
          </h3>
        </div>
        
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <div className="mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Konum: <span className="font-mono">{currentPath}</span>
            </div>
            
            <div 
              {...getRootProps()} 
              className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 ${
                isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <UploadIcon className={`w-12 h-12 mb-4 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Yükleme Durumu:
              </h6>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {uploadingFiles.map((file, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-4">
                        {file.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        {file.error ? (
                          <span className="text-xs text-red-500">Hata</span>
                        ) : file.progress === 100 ? (
                          <span className="text-xs text-green-500">Tamamlandı</span>
                        ) : (
                          <span className="text-xs text-gray-500 dark:text-gray-400">{file.progress}%</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          file.error ? 'bg-red-500' : file.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${file.error ? 100 : file.progress}%` }}
                      ></div>
                    </div>
                    {file.error && (
                      <p className="text-xs text-red-500 mt-1">{file.error}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {uploadingFiles.some(f => f.progress < 100 && !f.error) ? 'Arka Planda Devam Et' : 'Kapat'}
          </button>
        </div>
      </div>
    </div>
  );
}