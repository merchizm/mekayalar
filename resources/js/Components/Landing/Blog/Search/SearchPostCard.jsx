import React from 'react';
import { Link } from '@inertiajs/react';
import { createExcerpt } from '@/utils/blog';

const SearchPostCard = ({ post }) => (
  <Link href={route('blog.show', { slug: post.post_slug })} className="group block bg-background dark:bg-repository-card-bg-dark rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-divider dark:border-label-border-dark">
    <div className="flex flex-col md:flex-row">
      {post.post_image && (
        <div className="overflow-hidden relative w-full h-60 md:w-1/3 md:h-auto">
          <img src={post.post_image} alt={post.post_title} className="object-cover object-center absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="p-6 md:w-2/3">
        <h2 className="mb-3 text-2xl font-bold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{post.post_title}</h2>
        <div className="flex items-center mb-4 text-sm text-light-text dark:text-light-text-dark">
          <span className="flex items-center">
            <svg className="mr-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <svg className="mr-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {__(':count Dakika', { count: post.readingTime })}
          </span>
        </div>
        <p className="text-light-text dark:text-dark-text-dark line-clamp-3">
          {createExcerpt(post.content)}
        </p>
        <div className="mt-4">
          <span className="inline-flex items-center text-sm font-medium text-menu-active dark:text-menu-active-dark group-hover:underline">
            {__('Devamını Oku')}
            <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default SearchPostCard; 
