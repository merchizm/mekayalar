import React from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function ConfirmDeleteModal({ show, onClose, onConfirm, itemType, itemName }) {
  return (
    <Modal show={show} onClose={onClose} maxWidth="sm">
      <div className="p-6 dark:bg-gray-800">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {itemType === 'folder' ? 'Klasörü Sil' : 'Dosyayı Sil'}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          "{itemName}" {itemType === 'folder' ? 'klasörünü' : 'dosyasını'} ve tüm içeriğini kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <SecondaryButton onClick={onClose}>İptal</SecondaryButton>
          <DangerButton onClick={onConfirm}>Sil</DangerButton>
        </div>
      </div>
    </Modal>
  );
} 
