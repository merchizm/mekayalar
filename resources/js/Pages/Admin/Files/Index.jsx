import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import FolderItem from '@/Components/Admin/Files/FolderItem';
import FileItem from '@/Components/Admin/Files/FileItem';
import Breadcrumb from '@/Components/Admin/Files/Breadcrumb';
import CreateFolderModal from '@/Components/Admin/Files/CreateFolderModal';
import FileUploadModal from '@/Components/Admin/Files/FileUploadModal';
import ConfirmDeleteModal from '@/Components/Admin/Files/ConfirmDeleteModal';
import { GridIcon, ListIcon, PlusIcon, UploadIcon, DownloadIcon, LinkIcon, TrashIcon, ExternalLinkIcon } from '@/Components/Admin/Files/Icons';
import { Menu, Item, useContextMenu, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const setCookie = (name, value, days = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const FILE_MENU_ID = "file-menu";
const FOLDER_MENU_ID = "folder-menu";

export default function Index({ auth }) {
  const [currentPath, setCurrentPath] = useState('/');
  const [items, setItems] = useState({ folders: [], files: [] });
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewMode, setViewMode] = useState(() => getCookie('file-manager-view') || 'list');
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { show: showFileMenu } = useContextMenu({ id: FILE_MENU_ID });
  const { show: showFolderMenu } = useContextMenu({ id: FOLDER_MENU_ID });

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCookie('file-manager-view', mode);
  };

  const fetchFiles = useCallback((path) => {
    setLoading(true);
    axios.get(route('admin.media.files', { folder: path }))
      .then(response => {
        setItems(response.data);
        setCurrentPath(response.data.path);
      })
      .catch(error => {
        toast.error('Dosyalar getirilirken bir hata oluştu.');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchFiles('/');
  }, [fetchFiles]);

  const handleFolderClick = (path) => {
    fetchFiles(path);
  };

  const handlePathChange = (newPath) => {
    fetchFiles(newPath);
  };

  const openDeleteModal = (item, type) => {
    setItemToDelete({ ...item, type });
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;

    const { type, name, original_name } = itemToDelete;
    const itemIdentifier = type === 'folder' ? name : original_name;

    axios.post(route('admin.media.delete'), { type, path: name })
      .then(() => {
        toast.success(`'${itemIdentifier}' başarıyla silindi.`);
        fetchFiles(currentPath);
      })
      .catch(() => toast.error(`'${itemIdentifier}' silinirken bir hata oluştu.`))
      .finally(() => closeDeleteModal());
  };

  const onFileItemClick = ({ id, props }) => {
    const file = props.file;
    switch (id) {
      case "download":
        window.location = route('admin.media.download', { file: file.name });
        break;
      case "copy-link":
        navigator.clipboard.writeText(file.url).then(() => toast.success('Bağlantı kopyalandı!'));
        break;
      case "open-new-window":
        window.open(file.url, '_blank');
        break;
      case "delete":
        openDeleteModal(file, 'file');
        break;
    }
  };

  const onFolderItemClick = ({ id, props }) => {
    const folder = props.folder;
    switch (id) {
      case "delete":
        openDeleteModal(folder, 'folder');
        break;
    }
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Dosya Yöneticisi" />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dosya Yöneticisi</h3>
        </div>
        <div className="p-6">
          <Breadcrumb path={currentPath} onPathClick={handlePathChange} />

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateFolderModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Yeni Klasör
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                Dosya Yükle
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 ml-auto">
              <button
                onClick={() => handleViewModeChange('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Liste Görünümü"
              >
                <ListIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Izgara Görünümü"
              >
                <GridIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* File Explorer */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 text-lg dark:text-gray-200">
                Dosya Gezgini
              </h4>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {items.folders.length + items.files.length} öğe
              </div>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">Yükleniyor...</span>
                </div>
              </div>
            ) : items.folders.length === 0 && items.files.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-center">Bu klasör boş</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 text-center">
                  Dosya yükleyin veya yeni klasör oluşturun
                </p>
              </div>
            ) : (
              <>
                {viewMode === 'list' ? (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <ul>
                      {items.folders.map(folder => (
                        <div key={folder.id} onContextMenu={(e) => showFolderMenu({ event: e, props: { folder } })}>
                          <FolderItem folder={folder} onFolderClick={handleFolderClick} viewMode={viewMode} />
                        </div>
                      ))}
                      {items.files.map(file => (
                        <div key={file.id} onContextMenu={(e) => showFileMenu({ event: e, props: { file } })}>
                          <FileItem file={file} viewMode={viewMode} />
                        </div>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {items.folders.map(folder => (
                      <div key={folder.id} onContextMenu={(e) => showFolderMenu({ event: e, props: { folder } })}>
                        <FolderItem folder={folder} onFolderClick={handleFolderClick} viewMode={viewMode} />
                      </div>
                    ))}
                    {items.files.map(file => (
                      <div key={file.id} onContextMenu={(e) => showFileMenu({ event: e, props: { file } })}>
                        <FileItem file={file} viewMode={viewMode} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Menu id={FILE_MENU_ID} theme="dark">
        <Item id="open-new-window" onClick={onFileItemClick}>
          <div className="flex items-center">
            <ExternalLinkIcon className="mr-2" />
            Yeni Pencerede Aç
          </div>
        </Item>
        <Item id="download" onClick={onFileItemClick}>
          <div className="flex items-center">
            <DownloadIcon className="mr-2" />
            İndir
          </div>
        </Item>
        <Item id="copy-link" onClick={onFileItemClick}>
          <div className="flex items-center">
            <LinkIcon className="mr-2" />
            Bağlantıyı Kopyala
          </div>
        </Item>
        <Separator />
        <Item id="delete" onClick={onFileItemClick} className="text-red-500">
          <div className="flex items-center">
            <TrashIcon className="mr-2" />
            Sil
          </div>
        </Item>
      </Menu>

      <Menu id={FOLDER_MENU_ID} theme="dark">
        <Item id="delete" onClick={onFolderItemClick} className="text-red-500">
          <div className="flex items-center">
            <TrashIcon className="mr-2" />
            Sil
          </div>
        </Item>
      </Menu>

      <CreateFolderModal
        isOpen={showCreateFolderModal}
        onClose={() => setShowCreateFolderModal(false)}
        currentPath={currentPath}
        onSuccess={() => fetchFiles(currentPath)}
      />

      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        currentPath={currentPath}
        onSuccess={() => fetchFiles(currentPath)}
      />

      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemType={itemToDelete?.type}
        itemName={itemToDelete?.type === 'folder' ? itemToDelete?.name : itemToDelete?.original_name}
      />
    </AdminLayout>
  );
} 
