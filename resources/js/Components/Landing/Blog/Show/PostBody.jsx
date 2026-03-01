import React from 'react';
import Highlight from 'react-highlight';
import { useMarkdownGallery } from '@/hooks/useMarkdownGallery.jsx';

const PostBody = ({ post }) => {
    const { lightbox, onGalleryClick } = useMarkdownGallery();
    const type = String(post.type);
    const primaryBook = Array.isArray(post.books) ? post.books.find((book) => book.pivot?.is_primary) || post.books[0] : null;
    const albumItems = Array.isArray(post.album_items) ? post.album_items : [];

    return (
        <>
            {(type === '1' || type === '2' || type === '0' || type === '4') && post.post_image && (
                <div className="relative mb-8 w-full overflow-hidden rounded-xl">
                    <img src={post.post_image} alt={post.post_title} className="h-auto w-full rounded-xl" />
                </div>
            )}
            {type === '3' && (
                <section className="mb-8 rounded-3xl border border-amber-200 bg-amber-50/70 p-8 dark:border-amber-900 dark:bg-amber-950/20">
                    <blockquote
                        className="border-l-4 pl-5 text-2xl font-semibold leading-relaxed text-text dark:text-text-dark"
                        style={{ borderColor: post.quote_highlight_color || '#f59e0b' }}
                    >
                        “{post.quote_text}”
                    </blockquote>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-light-text dark:text-light-text-dark">
                        {primaryBook && <span>{primaryBook.title}</span>}
                        {primaryBook && <span>•</span>}
                        {primaryBook && <span>{primaryBook.author}</span>}
                        {post.quote_page && <span>•</span>}
                        {post.quote_page && <span>s. {post.quote_page}</span>}
                    </div>
                </section>
            )}
            {type === '4' && albumItems.length > 0 && (
                <section className="mb-12">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-text dark:text-text-dark">Galeri</h2>
                        <p className="mt-1 text-sm text-light-text dark:text-light-text-dark">
                            Albümde {albumItems.length} görsel var. Büyütmek için bir kare seç.
                        </p>
                    </div>
                    <div
                        className="md-gallery columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4"
                        data-gallery={`album-${post.id}`}
                        onClick={onGalleryClick}
                    >
                        {albumItems.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                className="md-gallery-item group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] bg-white text-left shadow-[0_18px_60px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.18)] dark:bg-neutral-900 dark:shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
                                data-src={item.image_path}
                                data-title={item.caption || item.alt_text || post.post_title}
                            >
                                <img
                                    src={item.image_path}
                                    alt={item.alt_text || post.post_title}
                                    className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                                        index % 5 === 0
                                            ? 'aspect-[4/6]'
                                            : index % 4 === 0
                                              ? 'aspect-square'
                                              : index % 3 === 0
                                                ? 'aspect-[5/4]'
                                                : 'aspect-[4/5]'
                                    }`}
                                />
                                {(item.caption || item.alt_text) && (
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 via-black/28 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-white">
                                        {item.caption || item.alt_text}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>
            )}
            {type === '0' && (
                <article className="md-content prose prose-lg dark:prose-invert max-w-none pb-8" onClick={onGalleryClick}>
                    <Highlight innerHTML={true}>{post.content}</Highlight>
                </article>
            )}
            {lightbox}
        </>
    );
};

export default PostBody;
