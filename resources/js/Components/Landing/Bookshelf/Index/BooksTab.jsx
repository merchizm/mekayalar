import React from 'react';

const BooksTab = () => (
  <div>
    <div className="py-24 my-5 text-center rounded-2xl border-2 border-dashed bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">Çok Yakında</h2>
      <p className="text-xl text-center text-light-text dark:text-light-text-dark">Okuduğum kitapları burada sergilemek için sabırsızlanıyorum.</p>
    </div>
  </div>
);

export default BooksTab; 
