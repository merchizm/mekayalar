import React from 'react';
import { Link } from '@inertiajs/react';

export default function AlbumPostCard({ post }) {
    const previewItems = Array.isArray(post.album_items) ? post.album_items.slice(0, 4) : [];
    const previewSources = previewItems.length > 0 ? previewItems.map((item) => item.image_path) : [post.post_image].filter(Boolean);
    const totalCount = Array.isArray(post.album_items) ? post.album_items.length : 0;
    const offsets = [-44, 38, -24, 20];
    const mobileOffsets = [-18, 16, -10, 8];
    const rotations = [-7, 6, -4, 3];

    return (
        <Link href={route('blog.show', { slug: post.post_slug })} className="group mx-auto block w-full max-w-5xl">
            <div className="relative px-2 py-6 md:px-6 md:py-10">
                <div className="relative mx-auto flex min-h-[430px] max-w-4xl items-center justify-center md:min-h-[560px]">
                    {previewSources.map((src, index) => (
                        <div
                            key={`${src}-${index}`}
                            className="absolute h-[300px] w-[220px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-2xl transition duration-300 group-hover:scale-[1.02] dark:border-label-border-dark/70 dark:bg-repository-card-bg-dark sm:h-[360px] sm:w-[260px] md:h-[430px] md:w-[320px]"
                            style={{
                                transform: `translateX(clamp(${mobileOffsets[index] ?? 0}px, 4vw, ${offsets[index] ?? 0}px)) translateY(${index * 18}px) rotate(${rotations[index] ?? 0}deg)`,
                                zIndex: index + 1,
                            }}
                        >
                            <img src={src} alt={post.post_title} className="h-full w-full object-cover" />
                        </div>
                    ))}
                    <div className="absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-xs px-3 sm:max-w-md md:max-w-xl">
                        <div className="rounded-[1.75rem] border border-white/55 bg-white/72 p-5 shadow-2xl backdrop-blur-xl dark:border-label-border-dark/80 dark:bg-repository-card-bg-dark/85 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:p-6 md:p-7">
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <div className="inline-flex rounded-full bg-rose-100/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-800 dark:bg-rose-950/80 dark:text-rose-100">
                                    {__('Albüm')}
                                </div>
                                <div className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white dark:bg-button-dark/90 dark:text-text-dark">
                                    {__(':count görsel', { count: totalCount })}
                                </div>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-text transition group-hover:text-menu-active dark:text-text-dark dark:group-hover:text-menu-active-dark sm:text-3xl md:text-4xl">
                                {post.post_title}
                            </h2>
                            <p className="line-clamp-3 text-sm leading-relaxed text-light-text dark:text-dark-text-dark sm:text-base">
                                {post.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
