import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import 'highlight.js/styles/an-old-hope.css';
import Breadcrumb from '@/Components/Landing/Blog/Show/Breadcrumb';
import PostHeader from '@/Components/Landing/Blog/Show/PostHeader';
import PostBody from '@/Components/Landing/Blog/Show/PostBody';
import PostFooter from '@/Components/Landing/Blog/Show/PostFooter';

export default function Show({ post, seo }) {
  return (
    <LandingLayout seo={seo}>
      <div className="container my-8">
        <div>
          <Breadcrumb post={post} />
          <div>
            <PostHeader post={post} />
            <PostBody post={post} />
            <PostFooter />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
} 
