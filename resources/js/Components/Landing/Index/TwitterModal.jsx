import React from 'react';
import { createPortal } from 'react-dom';

const TwitterModal = ({ isOpen, onCancel, onProceed, url }) => {
    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" onClick={onCancel}>
            <div className="absolute inset-0 bg-background-dark/72 backdrop-blur-sm" />
            <div
                className="relative mx-4 w-full max-w-sm rounded-2xl border border-divider bg-background p-6 shadow-2xl dark:border-label-border-dark dark:bg-repository-card-bg-dark"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mb-4 text-xl font-semibold text-text dark:text-text-dark">{__('Uyarı')}</h3>
                <p className="mb-6 text-text dark:text-text-dark">
                    {__(
                        'Bu Twitter hesabı profesyonellikten uzaktır ve tamamen kafamı dağıtmak için kullandığım bir alandır. Yine de devam etmek istiyor musunuz?'
                    )}
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="interactive-pill rounded-md border border-divider px-4 py-2 font-medium text-text transition-colors hover:bg-button-hover dark:border-label-border-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
                    >
                        {__('Vazgeç')}
                    </button>
                    <button
                        onClick={() => onProceed(url)}
                        className="interactive-pill rounded-md bg-menu-active px-4 py-2 font-medium text-white transition-colors hover:bg-opacity-90 dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
                    >
                        {__('Devam Et')}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default TwitterModal;
