import React from 'react';

export default function FolderItem({ folder, onFolderClick }) {
  return (
    <li
      className="px-4 py-3 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => onFolderClick(folder.name)}
    >
      <i className="fas fa-folder mr-3 text-yellow-500 w-5"></i>
      <span className="flex-grow text-sm font-medium text-gray-800 dark:text-gray-200">{folder.name.split('/').pop()}</span>
      <small className="text-gray-500 dark:text-gray-400">{folder.creation_time}</small>
    </li>
  );
} 
