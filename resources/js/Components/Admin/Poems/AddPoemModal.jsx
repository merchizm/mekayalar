import React from 'react';
import Modal from '@/Components/Modal';
import PoemForm from './PoemForm';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function AddPoemModal({ show, onClose, onSuccess }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="rounded-lg bg-card shadow-xl dark:bg-card">
                <div className="flex items-center justify-between border-b p-4 dark:border-border">
                    <h5 className="text-lg font-semibold text-foreground dark:text-foreground">Yeni Şiir</h5>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground dark:hover:bg-accent dark:hover:text-white"
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
