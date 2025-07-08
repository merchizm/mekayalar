import React, { useState, useMemo } from 'react';
import { Link, useForm } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import FsLightbox from 'fslightbox-react';
import SearchPostCard from '@/Components/Landing/Blog/Search/SearchPostCard';
import SearchImagePost from '@/Components/Landing/Blog/Search/SearchImagePost';

// Re-using and adapting components from previous blog pages
const createExcerpt = (htmlString, limit = 250) => {
  if (!htmlString) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  const cleanedText = text.replace(/(\\s*[\\r\\n]+\\s*|\\s+)/g, ' ').trim();
  if (cleanedText.length <= limit) return cleanedText;
  return cleanedText.substring(0, limit) + '...';
};

export default function Search({ posts, categories, query, seo }) {
  const { data, setData, get } = useForm({
    q: query || '',
  });

  const submit = (e) => {
    e.preventDefault();
    get(route('blog.search'));
  };

  return (
    <LandingLayout seo={seo}>
      <header className="container overflow-hidden mb-8">
        <div className="flex gap-5 items-center">
          <div className="w-full">
            <h1 className="mb-3 text-4xl font-bold">"{query}" Araması</h1>
            <p className="mb-5 text-lg text-light-text dark:text-light-text-dark">Arama sonuçları aşağıda listelenmektedir.</p>
          </div>
        </div>
      </header>

      <div className="mb-8">
        <form onSubmit={submit} className="relative">
          <input
            type="text"
            name="q"
            value={data.q}
            onChange={(e) => setData('q', e.target.value)}
            className="py-3 pr-12 pl-4 w-full text-base rounded-lg bg-button dark:bg-button-dark text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-menu-active dark:focus:ring-menu-active-dark"
            placeholder="Yazılarımda ara..."
          />
          <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-light-text dark:text-light-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-3 justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          <Link href={route('blog.type', { type: 'photo' })} className="inline-flex items-center px-3 py-2 rounded-lg transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
            <span className="mr-2 text-lg">📸</span>
            <span>Fotoğraflar</span>
          </Link>
          <Link href={route('blog.type', { type: 'drawing' })} className="inline-flex items-center px-3 py-2 rounded-lg transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
            <span className="mr-2 text-lg">👾</span>
            <span>Çizimler</span>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={route('blog.index')} className="inline-flex items-center px-3 py-2 rounded-lg transition-colors bg-social-bg dark:bg-social-bg-dark text-text dark:text-text-dark hover:bg-social-bg-hover dark:hover:bg-social-bg-hover-dark">
            Tümü
          </Link>
          {categories.map(category => (
            <Link key={category.id} href={route('blog.category', { slug: category.slug })} className="inline-flex items-center px-3 py-2 rounded-lg transition-colors bg-social-bg dark:bg-social-bg-dark text-text dark:text-text-dark hover:bg-social-bg-hover dark:hover:bg-social-bg-hover-dark">
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {posts.length > 0 ? (
          posts.map(post => (
            post.type === '0' ? (
              <SearchPostCard key={post.id} post={post} />
            ) : (
              <SearchImagePost key={post.id} post={post} />
            )
          ))
        ) : (
          <div className="py-16 my-5 text-center rounded-xl border shadow-sm bg-poem-container dark:bg-poem-container-dark border-divider dark:border-label-border-dark">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 w-16 h-16 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h2 className="mb-3 text-2xl font-semibold text-text dark:text-text-dark">"{query}" için sonuç bulunamadı</h2>
            <p className="text-light-text dark:text-light-text-dark">Farklı bir arama terimi deneyin veya diğer gönderilere göz atın.</p>
          </div>
        )}
      </div>
    </LandingLayout>
  );
} 
