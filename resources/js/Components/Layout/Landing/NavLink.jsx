import React from 'react';
import { Link } from '@inertiajs/react';
import DripLoader from '@/Components/Common/DripLoader';

const NavLink = ({ href, active, loading, children }) => {
  const baseClasses = 'px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-full text-xs font-medium sm:text-sm md:text-sm transition-colors flex items-center justify-center gap-2';

  let stateClasses = '';
  if (loading) {
    stateClasses = 'bg-menu-active text-white dark:text-text-dark cursor-wait';
  } else if (active) {
    stateClasses = 'bg-menu-active text-white dark:text-text-dark';
  } else {
    stateClasses = 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark';
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${stateClasses}`}
      as="button"
      disabled={loading}
      onClick={(e) => {
        if (loading) {
          e.preventDefault();
        }
      }}
    >
      {loading ? (
        <DripLoader />
      ) : (
        children
      )}
    </Link>
  );
};

export default NavLink; 
