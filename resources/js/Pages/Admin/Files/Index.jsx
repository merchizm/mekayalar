import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import FolderItem from '@/Components/Admin/Files/FolderItem';
import FileItem from '@/Components/Admin/Files/FileItem';
import Breadcrumb from '@/Components/Admin/Files/Breadcrumb';
import CreateFolder from '@/Components/Admin/Files/CreateFolder';
import FileUpload from '@/Components/Admin/Files/FileUpload';
import ConfirmDeleteModal from '@/Components/Admin/Files/ConfirmDeleteModal';
import { Menu, Item, useContextMenu, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

const FILE_MENU_ID = "file-menu";
const FOLDER_MENU_ID = "folder-menu";

export default function Index({ auth }) {
  const [currentPath, setCurrentPath] = useState('/');
  const [items, setItems] = useState({ folders: [], files: [] });
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { show: showFileMenu } = useContextMenu({ id: FILE_MENU_ID });
  const { show: showFolderMenu } = useContextMenu({ id: FOLDER_MENU_ID });

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
        <div className="p-5">
          <Breadcrumb path={currentPath} onPathClick={handlePathChange} />

          <FileUpload currentPath={currentPath} onSuccess={() => fetchFiles(currentPath)} />

          <CreateFolder currentPath={currentPath} onSuccess={() => fetchFiles(currentPath)} />

          <div className="mt-5">
            <h4 className="mb-3 font-semibold text-gray-800 text-md dark:text-gray-200">Dosya Gezgini</h4>
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">Yükleniyor...</p>
            ) : (
              <div className="border border-gray-200 dark:border-gray-700 rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.folders.map(folder => (
                    <div key={folder.id} onContextMenu={(e) => showFolderMenu({ event: e, props: { folder } })}>
                      <FolderItem folder={folder} onFolderClick={handleFolderClick} />
                    </div>
                  ))}
                  {items.files.map(file => (
                    <div key={file.id} onContextMenu={(e) => showFileMenu({ event: e, props: { file } })}>
                      <FileItem file={file} />
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Menu id={FILE_MENU_ID} theme="dark">
        <Item id="download" onClick={onFileItemClick}><i className="fas fa-download mr-2"></i>İndir</Item>
        <Item id="copy-link" onClick={onFileItemClick}><i className="fas fa-link mr-2"></i>Bağlantıyı Kopyala</Item>
        <Separator />
        <Item id="delete" onClick={onFileItemClick} className="text-red-500"><i className="fas fa-trash mr-2"></i>Sil</Item>
      </Menu>

      <Menu id={FOLDER_MENU_ID} theme="dark">
        <Item id="delete" onClick={onFolderItemClick} className="text-red-500"><i className="fas fa-trash mr-2"></i>Sil</Item>
      </Menu>

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
