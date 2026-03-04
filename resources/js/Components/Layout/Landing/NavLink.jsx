import React from 'react';
import { Link } from '@inertiajs/react';
const NavLink = ({ href, active, loading, children }) => {
    const baseClasses =
        'px-3 py-2.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-full text-[13px] font-medium sm:text-sm md:text-sm transition-colors flex items-center justify-center gap-2';

    let stateClasses = '';
    if (active) {
        stateClasses = 'bg-menu-active text-white dark:text-text-dark';
    } else {
        stateClasses = 'hover:bg-menu-hover dark:hover:bg-menu-hover-dark nav-link-wave';
    }

    return (
        <Link
            href={href}
            className={`${baseClasses} ${stateClasses}`}
            as="button"
            onClick={() => {}}
        >
            <span className="relative z-10">{children}</span>
        </Link>
    );
};

export default NavLink;
