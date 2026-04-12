import React from 'react';
import { Link } from '@inertiajs/react';

const Breadcrumb = ({ post }) => (
    <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex text-sm text-muted-foreground dark:text-muted-foreground">
            <li className="breadcrumb-item">
                <Link
                    href={route('landing.index')}
                    className="transition-colors hover:text-primary dark:hover:text-primary"
                >
                    {__('Ana Sayfa')}
                </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="breadcrumb-item">
                <Link
                    href={route('blog.index')}
                    className="transition-colors hover:text-primary dark:hover:text-primary"
                >
                    {__('Gönderiler')}
                </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="breadcrumb-item font-medium text-foreground dark:text-foreground" aria-current="page">
                {post.post_title}
            </li>
        </ol>
    </nav>
);

export default Breadcrumb;
