import React from 'react';

const BookmarkItem = ({ bookmark }) => (
    <a
        href={bookmark.link}
        target="_blank"
        rel="noopener noreferrer"
        className="surface-lift group block rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:border-border dark:bg-card dark:hover:border-primary/50"
    >
        <div className="flex items-center justify-between">
            <div className="flex min-w-0 flex-1 items-center">
                <img
                    src={`https://www.google.com/s2/favicons?domain=${bookmark.domain}&sz=32`}
                    alt={`${bookmark.domain} favicon`}
                    className="mr-4 h-8 w-8 flex-shrink-0 rounded-md"
                />
                <div className="min-w-0">
                    <h3 className="mb-1 truncate text-lg font-semibold text-foreground transition-colors group-hover:text-primary dark:text-foreground dark:group-hover:text-primary">
                        {bookmark.title}
                    </h3>
                    <p className="truncate text-sm text-muted-foreground dark:text-muted-foreground">
                        {bookmark.domain}
                    </p>
                </div>
            </div>
            <div className="ml-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary dark:text-muted-foreground dark:group-hover:text-primary"
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
