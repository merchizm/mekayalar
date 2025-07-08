import React from 'react';
import BookmarkItem from './BookmarkItem';

const BookmarkGroup = ({ date, bookmarks }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="relative pl-8 mb-12 last:mb-0">
      <div className="absolute left-0 h-full border-l-2 border-dashed border-divider dark:border-divider-dark"></div>
      <div className="absolute left-[-11px] top-1.5 w-6 h-6 bg-menu-active dark:bg-menu-active-dark rounded-full border-4 border-background dark:border-background-dark"></div>
      <h2 className="mb-4 text-2xl font-bold text-text dark:text-text-dark">
        {formatDate(date)}
      </h2>
      <div className="space-y-4">
        {bookmarks.map(bookmark => (
          <BookmarkItem key={bookmark.link} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkGroup; 
