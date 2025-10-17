import React from 'react';
import Modal from '@/Components/Modal';
import PoemForm from './PoemForm';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function AddPoemModal({ show, onClose, onSuccess }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="rounded-lg bg-white shadow-xl dark:bg-gray-900">
                <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Şiir</h5>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
                <PoemForm
                    onCancel={onClose}
                    onSuccess={() => {
                        onSuccess();
                        onClose();
                    }}
                />
            </div>
        </Modal>
    );
}
