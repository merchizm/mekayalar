import React from 'react';

const TabButton = ({ isActive, onClick, children }) => {
    const activeClasses = 'border-menu-active dark:border-menu-active-dark text-menu-active dark:text-menu-active-dark';
    const inactiveClasses =
        'border-transparent text-light-text dark:text-light-text-dark hover:text-text dark:hover:text-text-dark hover:border-divider dark:hover:border-divider-dark';
    return (
        <button
            onClick={onClick}
            className={`interactive-pill inline-flex items-center gap-2 border-b-2 px-1 py-3 text-base font-semibold leading-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none sm:text-lg ${isActive ? activeClasses : inactiveClasses}`}
        >
            {children}
        </button>
    );
};

export default TabButton;
