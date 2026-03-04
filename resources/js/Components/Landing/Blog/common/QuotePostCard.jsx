import React from 'react';
import { Link } from '@inertiajs/react';

export default function QuotePostCard({ post }) {
    const primaryBook = Array.isArray(post.books) ? post.books.find((book) => book.pivot?.is_primary) || post.books[0] : null;

    return (
        <Link href={route('blog.show', { slug: post.post_slug })} className="group mx-auto block w-full max-w-4xl">
            <div className="surface-lift relative overflow-hidden rounded-3xl border border-amber-200 bg-amber-50/70 p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-900 dark:bg-amber-950/20">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_42%)] opacity-70 transition duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.12),transparent_44%)]"></div>
                <div className="mb-4 inline-flex rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900 transition duration-300 group-hover:-translate-y-0.5 dark:bg-amber-900/60 dark:text-amber-100">
                    {__('Alıntı')}
                </div>
                <blockquote className="relative border-l-4 border-amber-400 pl-5 text-2xl font-semibold leading-relaxed text-text transition duration-300 group-hover:translate-x-1 dark:text-text-dark">
                    “{post.quote_text || post.description || post.post_title}”
                </blockquote>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-light-text dark:text-light-text-dark">
                    {primaryBook && <span>{primaryBook.title}</span>}
                    {primaryBook && <span>•</span>}
                    {primaryBook && <span>{primaryBook.author}</span>}
                    {post.quote_page && <span>•</span>}
                    {post.quote_page && <span>{__('s. :page', { page: post.quote_page })}</span>}
                </div>
                {post.description && <p className="mt-4 text-sm text-light-text transition duration-300 group-hover:text-text dark:text-light-text-dark dark:group-hover:text-text-dark">{post.description}</p>}
            </div>
        </Link>
    );
}
