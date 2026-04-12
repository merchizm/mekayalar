import React from 'react';

const ImagePost = ({ post, onClick }) => (
    <div className="mx-auto max-w-2xl text-center">
        <div onClick={onClick} className="group block cursor-pointer">
            <div className="surface-lift relative overflow-hidden rounded-[2rem] border border-border shadow-lg dark:border-border">
                <div className="absolute left-4 top-4 z-10 rounded-lg bg-background/80 px-3 py-1.5 text-sm font-semibold text-foreground backdrop-blur-sm transition duration-300 group-hover:-translate-y-0.5 dark:bg-background/80 dark:text-foreground">
                    {post.type === '2' ? __('👾 Çizim') : __('📷 Fotoğraf')}
                </div>
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-85"></div>
                <img
                    src={post.post_image}
                    alt={post.post_title || 'Blog Image'}
                    className="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
            </div>
        </div>
    </div>
);

export default ImagePost;
