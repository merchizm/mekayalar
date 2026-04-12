import React from 'react';
import { Link } from '@inertiajs/react';
const NavLink = ({ href, active, loading, children }) => {
    const baseClasses =
        'group interactive-pill px-3 py-2.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-full text-[13px] font-medium sm:text-sm md:text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center gap-2';

    let stateClasses = '';
    if (active) {
        stateClasses =
            'bg-primary text-primary-foreground shadow-[0_12px_24px_-18px_rgba(17,24,39,0.3)] ring-1 ring-black/5 dark:ring-white/10 dark:shadow-[0_12px_28px_-18px_rgba(255,255,255,0.18)]';
    } else {
        stateClasses =
            'text-muted-foreground hover:bg-accent hover:text-foreground hover:shadow-[0_10px_24px_-20px_rgba(17,24,39,0.28)] dark:hover:shadow-[0_10px_24px_-18px_rgba(0,0,0,0.4)] nav-link-wave';
    }

    return (
        <Link
            href={href}
            className={`${baseClasses} ${stateClasses} ${loading ? 'pointer-events-none scale-[0.985] opacity-70' : ''}`}
            as="button"
            onClick={() => {}}
        >
            <span className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                {children}
            </span>
        </Link>
    );
};

export default NavLink;
