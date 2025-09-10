import React from 'react';

const TwitterModal = ({ isOpen, onCancel, onProceed, url }) => {
  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50" onClick={onCancel}>
      <div className="p-6 mx-4 w-full max-w-sm rounded-lg border shadow-lg bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark" onClick={e => e.stopPropagation()}>
        <h3 className="mb-4 text-xl font-semibold text-text dark:text-text-dark">{__('Uyarı')}</h3>
        <p className="mb-6 text-text dark:text-text-dark">
          {__('Bu Twitter hesabı profesyonellikten uzaktır ve tamamen kafamı dağıtmak için kullandığım bir alandır. Yine de devam etmek istiyor musunuz?')}
        </p>
        <div className="flex gap-4 justify-end">
          <button onClick={onCancel} className="px-4 py-2 font-medium rounded-md border transition-colors border-divider dark:border-label-border-dark text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700">{__('Vazgeç')}</button>
          <button onClick={() => onProceed(url)} className="px-4 py-2 font-medium text-white rounded-md transition-colors bg-menu-active hover:bg-opacity-90">{__('Devam Et')}</button>
        </div>
      </div>
    </div>
  );
};

export default TwitterModal; 
