import React from 'react';

const TabButton = ({ isActive, onClick, children }) => {
    const activeClasses = 'border-primary dark:border-primary text-primary dark:text-primary';
    const inactiveClasses =
        'border-transparent text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-border dark:hover:border-border';
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
