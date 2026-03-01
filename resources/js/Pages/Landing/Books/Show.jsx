import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import QuotePostCard from '@/Components/Landing/Blog/common/QuotePostCard';
import { Link } from '@inertiajs/react';

const statusLabels = {
    reading: 'Okunuyor',
    completed: 'Tamamlandı',
    on_hold: 'Beklemede',
    dropped: 'Bırakıldı',
};

export default function Show({ book, quotePosts = [] }) {
    return (
        <div className="container py-10">
            <nav aria-label="breadcrumb" className="mb-6 text-sm text-light-text dark:text-light-text-dark">
                <Link href={route('landing.index')} className="hover:text-menu-active">Ana Sayfa</Link>
                <span className="mx-2">/</span>
                <Link href={route('bookshelf.index')} className="hover:text-menu-active">Kitaplık</Link>
                <span className="mx-2">/</span>
                <span className="text-text dark:text-text-dark">{book.title}</span>
            </nav>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px,1fr]">
                <aside>
                    {book.cover_image ? (
                        <img src={book.cover_image} alt={book.title} className="w-full rounded-3xl object-cover shadow-lg" />
                    ) : (
                        <div className="aspect-[3/4] w-full rounded-3xl bg-divider dark:bg-divider-dark" />
                    )}
                </aside>
                <section>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-button px-4 py-2 text-sm font-semibold text-text dark:bg-button-dark dark:text-text-dark">
                            {statusLabels[book.status] || book.status}
                        </span>
                        {book.rating && <span className="text-sm text-light-text dark:text-light-text-dark">Puan: {book.rating}/10</span>}
                    </div>
                    <h1 className="text-4xl font-bold text-text dark:text-text-dark">{book.title}</h1>
                    <p className="mt-3 text-xl text-light-text dark:text-light-text-dark">{book.author}</p>
                    {(book.publisher || book.published_year) && (
                        <p className="mt-2 text-sm text-light-text dark:text-light-text-dark">
                            {[book.publisher, book.published_year].filter(Boolean).join(' • ')}
                        </p>
                    )}
                    {book.notes && <p className="mt-6 max-w-3xl leading-relaxed text-text dark:text-text-dark">{book.notes}</p>}
                </section>
            </div>
            <section className="mt-14 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-text dark:text-text-dark">Bu kitaptan alıntılar</h2>
                    <p className="mt-2 text-light-text dark:text-light-text-dark">{quotePosts.length} kayit bulundu.</p>
                </div>
                {quotePosts.length > 0 ? (
                    quotePosts.map((post) => <QuotePostCard key={post.id} post={post} />)
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-divider bg-background py-16 text-center dark:border-divider-dark dark:bg-repository-card-bg-dark">
                        Bu kitaba ait hiç alıntı girilmemiş.
                    </div>
                )}
            </section>
        </div>
    );
}

Show.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;
