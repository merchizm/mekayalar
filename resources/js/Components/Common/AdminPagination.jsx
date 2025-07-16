import React from 'react';
import { Link } from '@inertiajs/react';

const ChevronLeftIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function Pagination({ links, meta }) {
  if (!links || links.length <= 3) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {links[0].url ? (
          <Link
            href={links[0].url}
            className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Önceki
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed">
            Önceki
          </span>
        )}
        {links[links.length - 1].url ? (
          <Link
            href={links[links.length - 1].url}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Sonraki
          </Link>
        ) : (
          <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed">
            Sonraki
          </span>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">{meta.from || 0}</span> - <span className="font-medium">{meta.to || 0}</span> arası,{' '}
            <span className="font-medium">{meta.total}</span> sonuçtan
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Previous button */}
            {links[0].url ? (
              <Link
                href={links[0].url}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Önceki</span>
                <ChevronLeftIcon className="h-5 w-5" />
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-300 dark:text-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 cursor-not-allowed">
                <span className="sr-only">Önceki</span>
                <ChevronLeftIcon className="h-5 w-5" />
              </span>
            )}

            {/* Page numbers */}
            {links.slice(1, -1).map((link, index) => {
              if (link.url === null) {
                return (
                  <span
                    key={index}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.url}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-offset-0 ${
                    link.active
                      ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                      : 'text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              );
            })}

            {/* Next button */}
            {links[links.length - 1].url ? (
              <Link
                href={links[links.length - 1].url}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Sonraki</span>
                <ChevronRightIcon className="h-5 w-5" />
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-300 dark:text-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 cursor-not-allowed">
                <span className="sr-only">Sonraki</span>
                <ChevronRightIcon className="h-5 w-5" />
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}