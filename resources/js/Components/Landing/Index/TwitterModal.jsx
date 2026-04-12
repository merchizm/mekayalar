import React from 'react';
import { createPortal } from 'react-dom';

const TwitterModal = ({ isOpen, onCancel, onProceed, url }) => {
    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" onClick={onCancel}>
            <div className="bg-background/72 absolute inset-0 backdrop-blur-sm" />
            <div
                className="relative mx-4 w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl dark:border-border dark:bg-card"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mb-4 text-xl font-semibold text-foreground dark:text-foreground">{__('Uyarı')}</h3>
                <p className="mb-6 text-foreground dark:text-foreground">
                    {__(
                        'Bu Twitter hesabı profesyonellikten uzaktır ve tamamen kafamı dağıtmak için kullandığım bir alandır. Yine de devam etmek istiyor musunuz?'
                    )}
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="interactive-pill rounded-md border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-accent dark:border-border dark:text-foreground dark:hover:bg-accent"
                    >
                        {__('Vazgeç')}
                    </button>
                    <button
                        onClick={() => onProceed(url)}
                        className="interactive-pill rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-opacity-90 dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
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
