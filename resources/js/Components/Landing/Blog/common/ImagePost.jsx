import React from 'react';

const ImagePost = ({ post, onClick }) => (
    <div className="mx-auto max-w-2xl text-center">
        <div onClick={onClick} className="block cursor-pointer group">
            <div className="overflow-hidden relative rounded-2xl border shadow-lg border-divider dark:border-divider-dark">
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 text-sm font-semibold rounded-lg backdrop-blur-sm bg-background/80 dark:bg-background-dark/80 text-text dark:text-text-dark">
                    {post.type === '2' ? '👾 Çizim' : '📷 Fotoğraf'}
                </div>
                <img src={post.post_image} alt={post.post_title || 'Blog Image'} className="object-contain w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105" />
            </div>
        </div>
    </div>
);

export default ImagePost; 
