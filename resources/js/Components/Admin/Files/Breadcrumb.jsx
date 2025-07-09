import React from 'react';

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
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); handleCrumbClick(-1); }} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <i className="fas fa-home mr-2.5"></i>
            Root
          </a>
        </li>
        {parts.map((part, index) => (
          part && (
            <li key={index}>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCrumbClick(index); }} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  {part}
                </a>
              </div>
            </li>
          )
        ))}
      </ol>
    </nav>
  );
} 
