import React from 'react';

const TwitterModal = ({ isOpen, onCancel, onProceed, url }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onCancel}>
            <div
                className="mx-4 w-full max-w-sm rounded-lg border border-divider bg-background p-6 shadow-lg dark:border-label-border-dark dark:bg-repository-card-bg-dark"
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
                        className="rounded-md border border-divider px-4 py-2 font-medium text-text transition-colors hover:bg-gray-100 dark:border-label-border-dark dark:text-text-dark dark:hover:bg-gray-700"
                    >
                        {__('Vazgeç')}
                    </button>
                    <button
                        onClick={() => onProceed(url)}
                        className="rounded-md bg-menu-active px-4 py-2 font-medium text-white transition-colors hover:bg-opacity-90"
                    >
                        {__('Devam Et')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TwitterModal;
