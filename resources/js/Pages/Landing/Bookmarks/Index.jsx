import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import BookmarkGroup from '@/Components/Landing/Bookmarks/Index/BookmarkGroup';

export default function Index({ bookmarks, seo }) {
  const sortedBookmarkKeys = Object.keys(bookmarks).sort((a, b) => new Date(b) - new Date(a));

  return (
    <LandingLayout seo={seo}>
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Yer İmlerim</h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">İlham veren, yol gösteren ve ufkumu genişleten dijital duraklarım. Burada seninde hoşuna gidecek şeyler bulabilirsin.</p>
      </header>

      <div className="mx-auto max-w-3xl">
        {sortedBookmarkKeys.length > 0 ? (
          sortedBookmarkKeys.map(date => (
            <BookmarkGroup key={date} date={date} bookmarks={bookmarks[date]} />
          ))
        ) : (
          <div className="py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">Henüz Yer İmi Eklenmemiş</h2>
            <p className="text-xl text-light-text dark:text-light-text-dark">Keşfettiğim faydalı bağlantıları burada paylaşacağım.</p>
          </div>
        )}
      </div>
    </LandingLayout>
  );
} 
