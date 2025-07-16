import React from 'react';
import { HomeIcon, ChevronRightIcon } from './Icons';

export default function Breadcrumb({ path, onPathClick }) {
  const parts = path === '/' ? [] : path.split('/').filter(p => p);

  const handleCrumbClick = (index) => {
    if (index < 0) {
      onPathClick('/');
      return;
    }
    const newPath = '/' + parts.slice(0, index + 1).join('/');
    onPathClick(newPath);
  };

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <button 
            onClick={() => handleCrumbClick(-1)} 
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <HomeIcon className="w-4 h-4 mr-2 text-gray-500" />
            Root
          </button>
        </li>
        {parts.map((part, index) => (
          part && (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRightIcon className="text-gray-400 mx-1" />
                <button 
                  onClick={() => handleCrumbClick(index)} 
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {part}
                </button>
              </div>
            </li>
          )
        ))}
      </ol>
    </nav>
  );
} 
