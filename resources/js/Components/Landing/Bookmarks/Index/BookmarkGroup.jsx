import React from 'react';
import BookmarkItem from './BookmarkItem';

const BookmarkGroup = ({ date, bookmarks }) => {
    const items = Array.isArray(bookmarks) ? bookmarks : Object.values(bookmarks || {});

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <div className="relative pl-8">
            <div className="absolute left-0 h-full border-l-2 border-dashed border-border dark:border-border"></div>
            <div className="absolute left-[-11px] top-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary dark:border-background dark:bg-primary"></div>
            <h2 className="mb-4 text-2xl font-bold text-foreground dark:text-foreground">{formatDate(date)}</h2>
            <div className="space-y-4">
                {items.map((bookmark) => (
                    <BookmarkItem key={bookmark.link} bookmark={bookmark} />
                ))}
            </div>
        </div>
    );
};

export default BookmarkGroup;
