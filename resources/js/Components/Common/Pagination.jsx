import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
  return (
    <nav className="flex justify-center items-center mt-12 space-x-1">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url || '#'}
          dangerouslySetInnerHTML={{ __html: link.label }}
          className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors
                        ${link.active ? 'bg-primary/20 dark:bg-primary-dark/20 text-primary dark:text-primary-dark' : 'bg-button dark:bg-button-dark'}
                        ${!link.url ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark'}
                    `}
          as="button"
          disabled={!link.url}
        />
      ))}
    </nav>
  );
} 
