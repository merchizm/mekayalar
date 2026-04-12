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
                        className="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-primary dark:text-muted-foreground dark:hover:bg-secondary dark:hover:text-white"
                    >
                        <HomeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        Root
                    </button>
                </li>
                {parts.map(
                    (part, index) =>
                        part && (
                            <li key={index}>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="mx-1 text-muted-foreground" />
                                    <button
                                        onClick={() => handleCrumbClick(index)}
                                        className="ml-1 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-primary dark:text-muted-foreground dark:hover:bg-secondary dark:hover:text-white md:ml-2"
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
