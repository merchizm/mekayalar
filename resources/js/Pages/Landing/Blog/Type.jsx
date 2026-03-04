import React from 'react';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import CategoryPanel from '@/Components/Landing/Blog/common/CategoryPanel';
import Pagination from '@/Components/Common/Pagination';
import PostFeed from '@/Components/Landing/Blog/common/PostFeed';
import RevealSection from '@/Components/Common/RevealSection';

function Type({ posts, categories, currentType, typeLabel }) {
    const { data: postItems, links } = posts;

    const typeLinks = [
        { type: 'photo', label: __('Fotoğraflar'), icon: '📸' },
        { type: 'drawing', label: __('Çizimler'), icon: '👾' },
        { type: 'quote', label: __('Alıntılar'), icon: '“”' },
        { type: 'album', label: __('Albümler'), icon: '🗂️' },
    ];

    return (
        <>
            <RevealSection as="header" className="mb-12 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">{__(typeLabel) + __(' Gönderileri')}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">{__(typeLabel) + __(' türündeki tüm gönderilerim.')}</p>
            </RevealSection>

            <RevealSection className="mb-10 flex flex-wrap items-center justify-center gap-4" delay={0.04}>
                <Link href={route('blog.index')} className="interactive-pill rounded-full bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-button-hover dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark">{__('Tüm Gönderiler')}</Link>
                {typeLinks.map((link) => {
                    const isActive = currentType === link.type;
                    return (
                        <Link
                            key={link.type}
                            href={route('blog.type', { type: link.type })}
                            className={`interactive-pill flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-menu-active text-white dark:bg-menu-active-dark dark:text-text-dark' : 'bg-button text-text dark:bg-button-dark dark:text-text-dark'} border-divider hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:hover:bg-button-hover-dark`}
                        >
                            <span className="text-lg">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
                <div className="mx-2 h-6 w-px bg-divider dark:bg-divider-dark"></div>
                <CategoryPanel categories={categories} />
            </RevealSection>

            {postItems.length > 0 ? (
                <RevealSection delay={0.08}>
                    <PostFeed postItems={postItems} />
                    <Pagination links={links} />
                </RevealSection>
            ) : (
                <RevealSection className="my-5 rounded-2xl border-2 border-dashed border-divider bg-background py-24 text-center dark:border-divider-dark dark:bg-repository-card-bg-dark" delay={0.08}>
                    <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">{__('Bu Türde Henüz Gönderi Yok')}</h2>
                    <p className="text-center text-xl text-light-text dark:text-light-text-dark">{__('Bu alanda paylaşım yaptığımda tekrar kontrol edin.')}</p>
                </RevealSection>
            )}
        </>
    );
}

Type.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Type;
