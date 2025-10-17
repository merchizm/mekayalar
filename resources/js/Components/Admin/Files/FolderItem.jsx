import React from 'react';
import { FolderIcon } from './Icons';

export default function FolderItem({ folder, onFolderClick, viewMode = 'list' }) {
    const folderName = folder.name.split('/').pop();

    if (viewMode === 'grid') {
        return (
            <div
                className="group cursor-pointer rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                onClick={() => onFolderClick(folder.name)}
            >
                <div className="flex flex-col items-center text-center">
                    <FolderIcon className="mb-3 h-12 w-12 transition-transform duration-200 group-hover:scale-110" />
                    <span
                        className="w-full truncate text-sm font-medium text-gray-800 dark:text-gray-200"
                        title={folderName}
                    >
                        {folderName}
                    </span>
                    <small className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(folder.creation_time).toLocaleDateString()}
                    </small>
                </div>
            </div>
        );
    }

    return (
        <li
            className="group flex cursor-pointer items-center border-b border-gray-100 px-4 py-3 transition-colors duration-200 last:border-b-0 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={() => onFolderClick(folder.name)}
        >
            <FolderIcon className="mr-3 h-8 w-8 transition-transform duration-200 group-hover:scale-110" />
            <span className="flex-grow text-sm font-medium text-gray-800 dark:text-gray-200">{folderName}</span>
            <div className="flex flex-col items-end">
                <small className="text-gray-500 dark:text-gray-400">Klasör</small>
                <small className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(folder.creation_time).toLocaleDateString()}
                </small>
            </div>
        </li>
    );
}
