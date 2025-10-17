import React from 'react';

const BookmarkItem = ({ bookmark }) => (
    <a
        href={bookmark.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-divider bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-menu-active/50 hover:shadow-lg dark:border-label-border-dark dark:bg-repository-card-bg-dark dark:hover:border-menu-active-dark/50"
    >
        <div className="flex items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center">
                <img
                    src={`https://www.google.com/s2/favicons?domain=${bookmark.domain}&sz=32`}
                    alt={`${bookmark.domain} favicon`}
                    className="mr-4 h-8 w-8 flex-shrink-0 rounded-md"
                />
                <div className="min-w-0">
                    <h3 className="mb-1 truncate text-lg font-semibold text-text transition-colors group-hover:text-menu-active dark:text-text-dark dark:group-hover:text-menu-active-dark">
                        {bookmark.title}
                    </h3>
                    <p className="truncate text-sm text-light-text dark:text-light-text-dark">{bookmark.domain}</p>
                </div>
            </div>
            <div className="ml-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-light-text transition-transform duration-300 group-hover:translate-x-1 group-hover:text-menu-active dark:text-light-text-dark dark:group-hover:text-menu-active-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </a>
);

export default BookmarkItem;
