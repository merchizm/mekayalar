import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import FsLightbox from 'fslightbox-react';
import PostCard from '@/Components/Landing/Blog/common/PostCard';
import ImagePost from '@/Components/Landing/Blog/common/ImagePost';
import Pagination from '@/Components/Common/Pagination';

function Index({ posts, categories }) {
    const { data: postItems, links } = posts;

    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        sourceIndex: 0,
    });

    const imageSources = useMemo(() => postItems.filter((p) => p.type !== '0').map((p) => p.post_image), [postItems]);

    function openLightboxOnSource(sourceIndex) {
        setLightboxController({
            toggler: !lightboxController.toggler,
            sourceIndex: sourceIndex,
        });
    }

    const findImagePostIndex = (post) => {
        const imagePosts = postItems.filter((p) => p.type !== '0');
        return imagePosts.findIndex((p) => p.post_image === post.post_image);
    };

    return (
        <>
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">
                    {__('Gönderilerim')}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">
                    {__(
                        'Düşüncelerim, tecrübelerim ve ara sıra karaladığım çizimler. Burada da çok profesyonel şeyler paylaşmadığımı ve daha kişisel şeyler olduğunu itiraf etmeliyim.'
                    )}
                </p>
            </header>

            <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                    href={route('blog.type', { type: 'photo' })}
                    className="flex items-center gap-2 rounded-full border border-divider bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
                >
                    <span className="text-lg">📸</span>
                    <span>{__('Fotoğraflar')}</span>
                </Link>
                <Link
                    href={route('blog.type', { type: 'drawing' })}
                    className="flex items-center gap-2 rounded-full border border-divider bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-menu-active/50 hover:bg-button-hover dark:border-divider-dark dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
                >
                    <span className="text-lg">👾</span>
                    <span>{__('Çizimler')}</span>
                </Link>
                <div className="mx-2 h-6 w-px bg-divider dark:bg-divider-dark"></div>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={route('blog.category', { slug: category.slug })}
                        className="rounded-full bg-button px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-button-hover dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            <div className="space-y-12">
                {postItems.length > 0 ? (
                    postItems.map((post) =>
                        post.type === '0' ? (
                            <PostCard key={post.id} post={post} />
                        ) : (
                            <ImagePost
                                key={post.id}
                                post={post}
                                onClick={() => openLightboxOnSource(findImagePostIndex(post))}
                            />
                        )
                    )
                ) : (
                    <div className="my-5 rounded-2xl border-2 border-dashed border-divider bg-background py-24 text-center dark:border-divider-dark dark:bg-repository-card-bg-dark">
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
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                        </svg>
                        <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">
                            {__('Henüz Gönderi Yok')}
                        </h2>
                        <p className="text-center text-xl text-light-text dark:text-light-text-dark">
                            {__('Burada paylaşacak bir şeyler olduğunda tekrar uğrayın.')}
                        </p>
                    </div>
                )}
            </div>

            {postItems.length > 0 && <Pagination links={links} />}

            <FsLightbox
                toggler={lightboxController.toggler}
                sources={imageSources}
                sourceIndex={lightboxController.sourceIndex}
            />
        </>
    );
}

Index.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Index;
