import React from 'react';
import { FolderIcon } from './Icons';

export default function FolderItem({ folder, onFolderClick, viewMode = 'list' }) {
  const folderName = folder.name.split('/').pop();

  if (viewMode === 'grid') {
    return (
      <div
        className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
        onClick={() => onFolderClick(folder.name)}
      >
        <div className="flex flex-col items-center text-center">
          <FolderIcon className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate w-full" title={folderName}>
            {folderName}
          </span>
          <small className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {new Date(folder.creation_time).toLocaleDateString()}
          </small>
        </div>
      </div>
    );
  }

  return (
    <li
      className="px-4 py-3 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group border-b border-gray-100 dark:border-gray-600 last:border-b-0"
      onClick={() => onFolderClick(folder.name)}
    >
      <FolderIcon className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform duration-200" />
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
