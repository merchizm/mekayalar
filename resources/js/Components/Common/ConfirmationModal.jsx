import React from 'react';
import { createPortal } from 'react-dom';

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
    confirmButtonColor = 'red',
}) {
    if (!isOpen || typeof document === 'undefined') {
        return null;
    }

    const colorClasses = {
        red: 'button-destructive',
        blue: 'button-primary',
        green: 'rounded-md border border-success/30 bg-success text-success-foreground shadow-sm hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-background/70 transition-opacity"
                aria-hidden="true"
                onClick={onClose}
            ></div>

            <div className="relative inline-block transform overflow-hidden rounded-lg border border-border bg-card text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                <div className="bg-card px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                                className="h-6 w-6 text-destructive"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3
                                className="text-lg font-medium leading-6 text-foreground dark:text-foreground"
                                id="modal-title"
                            >
                                {title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-muted-foreground">{children}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className={`inline-flex w-full justify-center px-4 py-2 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm ${colorClasses[confirmButtonColor]}`}
                        onClick={onConfirm}
                    >
                        {confirmButtonText}
                    </button>
                    <button
                        type="button"
                        className="button-secondary mt-3 w-full px-4 py-2 text-base font-medium sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        {cancelButtonText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
