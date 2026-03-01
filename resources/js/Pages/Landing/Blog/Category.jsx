import React from 'react';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import CategoryPanel from '@/Components/Landing/Blog/common/CategoryPanel';
import Pagination from '@/Components/Common/Pagination';
import PostFeed from '@/Components/Landing/Blog/common/PostFeed';

function Category({ posts, categories, currentCategory }) {
    const { data: postItems, links } = posts;

    return (
        <>
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">{currentCategory.name}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">{currentCategory.description}</p>
            </header>

            <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
                <Link href={route('blog.index')} className="rounded-full bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-button-hover dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark">{__('Tüm Gönderiler')}</Link>
                <Link href={route('blog.type', { type: 'photo' })} className="flex items-center gap-2 rounded-full border border-divider bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"><span className="text-lg">📸</span><span>{__('Fotoğraflar')}</span></Link>
                <Link href={route('blog.type', { type: 'drawing' })} className="flex items-center gap-2 rounded-full border border-divider bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"><span className="text-lg">👾</span><span>{__('Çizimler')}</span></Link>
                <Link href={route('blog.type', { type: 'quote' })} className="flex items-center gap-2 rounded-full border border-divider bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"><span className="text-lg">“”</span><span>{__('Alıntılar')}</span></Link>
                <Link href={route('blog.type', { type: 'album' })} className="flex items-center gap-2 rounded-full border border-divider bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"><span className="text-lg">🗂️</span><span>{__('Albümler')}</span></Link>
                <div className="mx-2 h-6 w-px bg-divider dark:bg-divider-dark"></div>
                <CategoryPanel categories={categories} currentCategory={currentCategory} />
            </div>

            {postItems.length > 0 ? (
                <>
                    <PostFeed postItems={postItems} />
                    <Pagination links={links} />
                </>
            ) : (
                <div className="my-5 rounded-2xl border-2 border-dashed border-divider bg-background py-24 text-center dark:border-divider-dark dark:bg-repository-card-bg-dark">
                    <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">{__('Bu Kategoride Henüz Gönderi Yok')}</h2>
                    <p className="text-center text-xl text-light-text dark:text-light-text-dark">{__('Bu konu hakkında yazacaklarım olduğunda tekrar uğrayın.')}</p>
                </div>
            )}
        </>
    );
}

Category.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Category;
