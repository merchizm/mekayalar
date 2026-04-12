import React from 'react';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import CategoryPanel from '@/Components/Landing/Blog/common/CategoryPanel';
import Pagination from '@/Components/Common/Pagination';
import PostFeed from '@/Components/Landing/Blog/common/PostFeed';
import RevealSection from '@/Components/Common/RevealSection';

function Index({ posts, categories }) {
    const { data: postItems, links } = posts;

    return (
        <>
            <RevealSection as="header" className="mb-12 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-foreground dark:text-foreground">
                    {__('Gönderilerim')}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground dark:text-muted-foreground">
                    {__(
                        'Düşüncelerim, tecrübelerim, alıntılarım, görsel albümlerim ve ara sıra karaladığım şeyler. Burası daha kişisel bir arşiv.'
                    )}
                </p>
            </RevealSection>

            <RevealSection className="mb-10 flex flex-wrap items-center justify-center gap-4" delay={0.04}>
                <Link
                    href={route('blog.type', { type: 'photo' })}
                    className="interactive-pill flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                >
                    <span className="text-lg">📸</span>
                    <span>{__('Fotoğraflar')}</span>
                </Link>
                <Link
                    href={route('blog.type', { type: 'drawing' })}
                    className="interactive-pill flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                >
                    <span className="text-lg">👾</span>
                    <span>{__('Çizimler')}</span>
                </Link>
                <Link
                    href={route('blog.type', { type: 'quote' })}
                    className="interactive-pill flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                >
                    <span className="text-lg">“”</span>
                    <span>{__('Alıntılar')}</span>
                </Link>
                <Link
                    href={route('blog.type', { type: 'album' })}
                    className="interactive-pill flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                >
                    <span className="text-lg">🗂️</span>
                    <span>{__('Albümler')}</span>
                </Link>
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
                        {__('Henüz Gönderi Yok')}
                    </h2>
                    <p className="text-center text-xl text-muted-foreground dark:text-muted-foreground">
                        {__('Burada paylaşacak bir şeyler olduğunda tekrar uğrayın.')}
                    </p>
                </RevealSection>
            )}
        </>
    );
}

Index.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Index;
