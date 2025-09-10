import React from 'react';
import { Link } from '@inertiajs/react';

const Breadcrumb = ({ post }) => (
  <nav aria-label="breadcrumb" className="mb-6">
    <ol className="flex text-sm text-light-text dark:text-light-text-dark">
      <li className="breadcrumb-item"><Link href={route('landing.index')} className="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">{__('Ana Sayfa')}</Link></li>
      <li className="mx-2">/</li>
      <li className="breadcrumb-item"><Link href={route('blog.index')} className="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">{__('Yazılar')}</Link></li>
      <li className="mx-2">/</li>
      <li className="font-medium text-text breadcrumb-item dark:text-text-dark" aria-current="page">{post.post_title}</li>
    </ol>
  </nav>
);

export default Breadcrumb; 
