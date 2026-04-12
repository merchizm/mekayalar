import React from 'react';
import { FolderIcon } from './Icons';

export default function FolderItem({ folder, onFolderClick, viewMode = 'list' }) {
    const folderName = folder.name.split('/').pop();

    if (viewMode === 'grid') {
        return (
            <div
                className="group cursor-pointer rounded-lg border border-border p-4 transition-colors duration-200 hover:bg-secondary/70 dark:border-border dark:hover:bg-secondary"
                onClick={() => onFolderClick(folder.name)}
            >
                <div className="flex flex-col items-center text-center">
                    <FolderIcon className="mb-3 h-12 w-12 transition-transform duration-200 group-hover:scale-110" />
                    <span
                        className="w-full truncate text-sm font-medium text-foreground dark:text-foreground"
                        title={folderName}
                    >
                        {folderName}
                    </span>
                    <small className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground">
                        {new Date(folder.creation_time).toLocaleDateString()}
                    </small>
                </div>
            </div>
        );
    }

    return (
        <li
            className="group flex cursor-pointer items-center border-b border-border px-4 py-3 transition-colors duration-200 last:border-b-0 hover:bg-secondary/70 dark:border-border dark:hover:bg-secondary"
            onClick={() => onFolderClick(folder.name)}
        >
            <FolderIcon className="mr-3 h-8 w-8 transition-transform duration-200 group-hover:scale-110" />
            <span className="flex-grow text-sm font-medium text-foreground dark:text-foreground">{folderName}</span>
            <div className="flex flex-col items-end">
                <small className="text-muted-foreground dark:text-muted-foreground">Klasör</small>
                <small className="text-xs text-muted-foreground dark:text-muted-foreground">
                    {new Date(folder.creation_time).toLocaleDateString()}
                </small>
            </div>
        </li>
    );
}
