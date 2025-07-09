import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LogoutButton() {
  return (
    <Link
      href={route('logout')}
      method="post"
      as="button"
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300"
      title="Çıkış Yap"
    >
      <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
    </Link>
  );
} 
