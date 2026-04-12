import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import QuotePostCard from '@/Components/Landing/Blog/common/QuotePostCard';
import { Link } from '@inertiajs/react';
import RevealSection from '@/Components/Common/RevealSection';

export default function Show({ book, quotePosts = [] }) {
    const statusLabels = {
        reading: __('Okunuyor'),
        completed: __('Tamamlandı'),
        on_hold: __('Beklemede'),
        dropped: __('Bırakıldı'),
    };

    return (
        <div className="container py-10">
            <RevealSection
                as="nav"
                aria-label="breadcrumb"
                className="mb-6 text-sm text-muted-foreground dark:text-muted-foreground"
            >
                <Link href={route('landing.index')} className="hover:text-primary">
                    {__('Ana Sayfa')}
                </Link>
                <span className="mx-2">/</span>
                <Link href={route('bookshelf.index')} className="hover:text-primary">
                    {__('Kitaplık')}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground dark:text-foreground">{book.title}</span>
            </RevealSection>
            <RevealSection className="grid grid-cols-1 gap-10 md:grid-cols-[280px,1fr]" delay={0.04}>
                <aside>
                    {book.cover_image ? (
                        <img
                            src={book.cover_image}
                            alt={book.title}
                            className="w-full rounded-3xl object-cover shadow-lg"
                        />
                    ) : (
                        <div className="aspect-[3/4] w-full rounded-3xl bg-border dark:bg-border" />
                    )}
                </aside>
                <section>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground dark:bg-secondary dark:text-foreground">
                            {statusLabels[book.status] || book.status}
                        </span>
                        {book.rating && (
                            <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                                {__('Puan: :count/10', { count: book.rating })}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold text-foreground dark:text-foreground">{book.title}</h1>
                    <p className="mt-3 text-xl text-muted-foreground dark:text-muted-foreground">{book.author}</p>
                    {(book.publisher || book.published_year) && (
                        <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
                            {[book.publisher, book.published_year].filter(Boolean).join(' • ')}
                        </p>
                    )}
                    {book.notes && (
                        <p className="mt-6 max-w-3xl leading-relaxed text-foreground dark:text-foreground">
                            {book.notes}
                        </p>
                    )}
                </section>
            </RevealSection>
            <RevealSection as="section" className="mt-14 space-y-8" delay={0.08}>
                <div>
                    <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
                        {__('Bu kitaptan alıntılar')}
                    </h2>
                    <p className="mt-2 text-muted-foreground dark:text-muted-foreground">
                        {__(':count kayıt bulundu.', { count: quotePosts.length })}
                    </p>
                </div>
                {quotePosts.length > 0 ? (
                    quotePosts.map((post) => <QuotePostCard key={post.id} post={post} />)
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-border bg-background py-16 text-center dark:border-border dark:bg-card">
                        {__('Bu kitaba ait hiç alıntı girilmemiş.')}
                    </div>
                )}
            </RevealSection>
        </div>
    );
}

Show.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;
