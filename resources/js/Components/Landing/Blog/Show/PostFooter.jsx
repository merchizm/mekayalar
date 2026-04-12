import React from 'react';
import { Link } from '@inertiajs/react';

const PostFooter = () => (
    <div className="mt-10 border-t border-border pt-6 dark:border-border">
        <Link
            href={route('blog.index')}
            className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 text-foreground transition-colors hover:bg-accent dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
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
