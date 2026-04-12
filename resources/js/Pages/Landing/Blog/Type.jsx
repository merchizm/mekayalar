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
                <h1 className="text-5xl font-bold tracking-tight text-foreground dark:text-foreground">
                    {__(typeLabel) + __(' Gönderileri')}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground dark:text-muted-foreground">
                    {__(typeLabel) + __(' türündeki tüm gönderilerim.')}
                </p>
            </RevealSection>

            <RevealSection className="mb-10 flex flex-wrap items-center justify-center gap-4" delay={0.04}>
                <Link
                    href={route('blog.index')}
                    className="interactive-pill rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                >
                    {__('Tüm Gönderiler')}
                </Link>
                {typeLinks.map((link) => {
                    const isActive = currentType === link.type;
                    return (
                        <Link
                            key={link.type}
                            href={route('blog.type', { type: link.type })}
                            className={`interactive-pill flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-primary text-white dark:bg-primary dark:text-foreground' : 'bg-secondary text-foreground dark:bg-secondary dark:text-foreground'} border-border hover:border-primary/50 hover:bg-accent dark:border-border dark:hover:bg-accent`}
                        >
                            <span className="text-lg">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
                <div className="mx-2 h-6 w-px bg-border dark:bg-border"></div>
                <CategoryPanel categories={categories} />
            </RevealSection>

            {postItems.length > 0 ? (
                <RevealSection delay={0.08}>
                    <PostFeed postItems={postItems} />
                    <Pagination links={links} />
                </RevealSection>
            ) : (
                <RevealSection
                    className="my-5 rounded-2xl border-2 border-dashed border-border bg-background py-24 text-center dark:border-border dark:bg-card"
                    delay={0.08}
                >
                    <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-foreground">
                        {__('Bu Türde Henüz Gönderi Yok')}
                    </h2>
                    <p className="text-center text-xl text-muted-foreground dark:text-muted-foreground">
                        {__('Bu alanda paylaşım yaptığımda tekrar kontrol edin.')}
                    </p>
                </RevealSection>
            )}
        </>
    );
}

Type.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Type;
