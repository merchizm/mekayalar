import React from 'react';
import { Link } from '@inertiajs/react';

export default function AlbumPostCard({ post }) {
    const previewItems = Array.isArray(post.album_items) ? post.album_items.slice(0, 4) : [];
    const previewSources =
        previewItems.length > 0 ? previewItems.map((item) => item.image_path) : [post.post_image].filter(Boolean);
    const totalCount = Array.isArray(post.album_items) ? post.album_items.length : 0;
    const stackClasses = [
        'translate-x-[-18px] translate-y-[0px] rotate-[-7deg] group-hover:translate-x-[-30px] group-hover:rotate-[-11deg] sm:translate-x-[-30px] sm:group-hover:translate-x-[-52px] md:translate-x-[-44px] md:group-hover:translate-x-[-74px]',
        'translate-x-[16px] translate-y-[18px] rotate-[6deg] group-hover:translate-x-[26px] group-hover:rotate-[10deg] sm:translate-x-[24px] sm:group-hover:translate-x-[42px] md:translate-x-[38px] md:group-hover:translate-x-[64px]',
        'translate-x-[-10px] translate-y-[36px] rotate-[-4deg] group-hover:translate-x-[-18px] group-hover:rotate-[-7deg] sm:translate-x-[-18px] sm:group-hover:translate-x-[-28px] md:translate-x-[-24px] md:group-hover:translate-x-[-42px]',
        'translate-x-[8px] translate-y-[54px] rotate-[3deg] group-hover:translate-x-[16px] group-hover:rotate-[6deg] sm:translate-x-[14px] sm:group-hover:translate-x-[24px] md:translate-x-[20px] md:group-hover:translate-x-[34px]',
    ];

    return (
        <Link href={route('blog.show', { slug: post.post_slug })} className="group mx-auto block w-full max-w-5xl">
            <div className="relative px-2 py-6 md:px-6 md:py-10">
                <div className="relative mx-auto flex min-h-[430px] max-w-4xl items-center justify-center md:min-h-[560px]">
                    {previewSources.map((src, index) => (
                        <div
                            key={`${src}-${index}`}
                            className={`absolute h-[300px] w-[220px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-card shadow-2xl transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] dark:border-border/70 dark:bg-card sm:h-[360px] sm:w-[260px] md:h-[430px] md:w-[320px] ${stackClasses[index] || ''}`}
                            style={{ zIndex: index + 1 }}
                        >
                            <img
                                src={src}
                                alt={post.post_title}
                                className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                            />
                        </div>
                    ))}
                    <div className="absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-xs px-3 sm:max-w-md md:max-w-xl">
                        <div className="bg-card/72 rounded-[1.75rem] border border-white/55 p-5 shadow-2xl backdrop-blur-xl transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:shadow-[0_28px_80px_-32px_rgba(17,24,39,0.38)] dark:border-border/80 dark:bg-card/85 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:p-6 md:p-7">
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <div className="inline-flex rounded-full bg-rose-100/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-800 dark:bg-rose-950/80 dark:text-rose-100">
                                    {__('Albüm')}
                                </div>
                                <div className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white dark:bg-secondary/90 dark:text-foreground">
                                    {__(':count görsel', { count: totalCount })}
                                </div>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-foreground transition group-hover:text-primary dark:text-foreground dark:group-hover:text-primary sm:text-3xl md:text-4xl">
                                {post.post_title}
                            </h2>
                            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground sm:text-base">
                                {post.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
