import React from 'react';
import { Link } from '@inertiajs/react';

const PostFooter = () => (
  <div className="pt-6 mt-10 border-t border-divider dark:border-label-border-dark">
    <Link href={route('blog.index')} className="inline-flex items-center px-4 py-2 transition-colors rounded-lg bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>{__('Tüm Yazılar')}</span>
    </Link>
  </div>
);

export default PostFooter; 
