import React from 'react';

const SearchImagePost = ({ post }) => (
    <div className="overflow-hidden relative p-5 rounded-xl border shadow-lg bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
        <div className="absolute top-4 left-4 bg-button dark:bg-button-dark px-3 py-1.5 rounded-lg border border-outline-color dark:border-outline-color-dark text-text dark:text-text-dark z-10">
            {post.type === 'drawing' ? __('👾 Çizim') : __('📷 Fotoğraf')}
        </div>
        <div className="flex justify-center">
            <div className="overflow-hidden relative w-full h-80 rounded-lg">
                <img src={post.post_image} alt={post.post_title} className="object-contain object-center absolute inset-0 w-full h-full" />
            </div>
        </div>
    </div>
);

export default SearchImagePost; 
