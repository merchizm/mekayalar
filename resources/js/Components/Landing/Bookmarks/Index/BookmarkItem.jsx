import React from 'react';

const BookmarkItem = ({ bookmark }) => (
  <a href={bookmark.link} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border shadow-sm transition-all duration-300 bg-background group dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark hover:shadow-lg hover:-translate-y-1 hover:border-menu-active/50 dark:hover:border-menu-active-dark/50">
    <div className="flex justify-between items-center">
      <div className="flex flex-1 items-center min-w-0">
        <img src={`https://www.google.com/s2/favicons?domain=${bookmark.domain}&sz=32`} alt={`${bookmark.domain} favicon`} className="flex-shrink-0 mr-4 w-8 h-8 rounded-md" />
        <div className="min-w-0">
          <h3 className="mb-1 text-lg font-semibold truncate transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{bookmark.title}</h3>
          <p className="text-sm truncate text-light-text dark:text-light-text-dark">{bookmark.domain}</p>
        </div>
      </div>
      <div className="ml-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform duration-300 text-light-text dark:text-light-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </a>
);

export default BookmarkItem; 
