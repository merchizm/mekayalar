import React from 'react';
import { HomeIcon, ChevronRightIcon } from './Icons';

export default function Breadcrumb({ path, onPathClick }) {
    const parts = path === '/' ? [] : path.split('/').filter((p) => p);

    const handleCrumbClick = (index) => {
        if (index < 0) {
            onPathClick('/');
            return;
        }
        const newPath = '/' + parts.slice(0, index + 1).join('/');
        onPathClick(newPath);
    };

    return (
        <nav className="mb-6 flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <button
                        onClick={() => handleCrumbClick(-1)}
                        className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <HomeIcon className="mr-2 h-4 w-4 text-gray-500" />
                        Root
                    </button>
                </li>
                {parts.map(
                    (part, index) =>
                        part && (
                            <li key={index}>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="mx-1 text-gray-400" />
                                    <button
                                        onClick={() => handleCrumbClick(index)}
                                        className="ml-1 rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:ml-2"
                                    >
                                        {part}
                                    </button>
                                </div>
                            </li>
                        )
                )}
            </ol>
        </nav>
    );
}
