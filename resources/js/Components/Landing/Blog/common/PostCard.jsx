import React from 'react';
import { Link } from '@inertiajs/react';
import { createExcerpt } from '@/utils/blog';

const PostCard = ({ post }) => (
    <Link href={route('blog.show', { slug: post.post_slug })} className="group mx-auto block w-full max-w-4xl">
        <div className="surface-lift rounded-[2rem] border border-divider/70 bg-background/55 p-5 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-label-border-dark dark:bg-repository-card-bg-dark/55">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-5">
            {post.post_image && (
                <div className="h-60 overflow-hidden rounded-2xl md:col-span-2">
                    <img
                        src={post.post_image}
                        alt={post.post_title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>
            )}
            <div className={post.post_image ? 'md:col-span-3' : 'md:col-span-5'}>
                <h2 className="mb-2 text-3xl font-bold text-text transition duration-300 group-hover:translate-x-1 group-hover:text-menu-active dark:text-text-dark dark:group-hover:text-menu-active-dark">
                    {post.post_title}
                </h2>
                <div className="mb-4 flex items-center text-sm text-light-text dark:text-light-text-dark">
                    <span>
                        {new Date(post.created_at).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{__(':count dakikalık okuma', { count: post.readingTime })}</span>
                </div>
                <p className="line-clamp-3 leading-relaxed text-light-text dark:text-dark-text-dark">
                    {createExcerpt(post.content)}
                </p>
            </div>
            </div>
        </div>
    </Link>
);

export default PostCard;
