import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import BookmarkGroup from '@/Components/Landing/Bookmarks/Index/BookmarkGroup';
import RevealSection from '@/Components/Common/RevealSection';

function Index({ bookmarks }) {
    const sortedBookmarkKeys = Object.keys(bookmarks).sort((a, b) => new Date(b) - new Date(a));

    return (
        <>
            <RevealSection as="header" className="mb-12 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">{__('Yer İmlerim')}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">
                    {__(
                        'İlham veren, yol gösteren ve ufkumu genişleten dijital duraklarım. Burada seninde hoşuna gidecek şeyler bulabilirsin.'
                    )}
                </p>
            </RevealSection>

            <div className="mx-auto max-w-3xl space-y-16 md:space-y-20">
                {sortedBookmarkKeys.length > 0 ? (
                    sortedBookmarkKeys.map((date, index) => (
                        <RevealSection key={date} delay={Math.min(index * 0.04, 0.16)}>
                            <BookmarkGroup date={date} bookmarks={bookmarks[date]} />
                        </RevealSection>
                    ))
                ) : (
                    <RevealSection className="my-5 rounded-2xl border-2 border-dashed border-divider bg-background py-24 text-center dark:border-divider-dark dark:bg-repository-card-bg-dark" delay={0.06}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto mb-6 h-20 w-20 text-light-text dark:text-dark-text-dark"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                        <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">
                            {__('Henüz Yer İmi Eklenmemiş')}
                        </h2>
                        <p className="text-xl text-light-text dark:text-light-text-dark">
                            {__('Keşfettiğim faydalı bağlantıları burada paylaşacağım.')}
                        </p>
                    </RevealSection>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Index;
