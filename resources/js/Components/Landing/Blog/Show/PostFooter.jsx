import React from 'react';
import { Link } from '@inertiajs/react';

const PostFooter = () => (
    <div className="mt-10 border-t border-divider pt-6 dark:border-label-border-dark">
        <Link
            href={route('blog.index')}
            className="inline-flex items-center rounded-lg bg-button px-4 py-2 text-text transition-colors hover:bg-button-hover dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{__('Tüm Yazılar')}</span>
        </Link>
    </div>
);

export default PostFooter;
