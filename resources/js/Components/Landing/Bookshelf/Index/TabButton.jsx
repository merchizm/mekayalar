import React from 'react';

const TabButton = ({ isActive, onClick, children }) => {
  const activeClasses = 'border-menu-active dark:border-menu-active-dark text-menu-active dark:text-menu-active-dark';
  const inactiveClasses = 'border-transparent text-light-text dark:text-light-text-dark hover:text-text dark:hover:text-text-dark hover:border-gray-300 dark:hover:border-gray-700';
  return (
    <button
      onClick={onClick}
      className={`inline-flex gap-2 items-center px-1 py-3 text-base font-semibold leading-5 border-b-2 transition-colors duration-150 ease-in-out sm:text-lg focus:outline-none ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

export default TabButton; 
