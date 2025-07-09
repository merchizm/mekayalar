import React from 'react';
import Modal from '@/Components/Modal';
import PoemForm from './PoemForm';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function AddPoemModal({ show, onClose, onSuccess }) {
  return (
    <Modal show={show} onClose={onClose} maxWidth="2xl">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Şiir</h5>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <PoemForm onCancel={onClose} onSuccess={() => {
          onSuccess();
          onClose();
        }} />
      </div>
    </Modal>
  );
} 
