import React from 'react';

const SearchImagePost = ({ post }) => (
    <div className="relative overflow-hidden rounded-xl border border-divider bg-background p-5 shadow-lg dark:border-label-border-dark dark:bg-repository-card-bg-dark">
        <div className="absolute left-4 top-4 z-10 rounded-lg border border-outline-color bg-button px-3 py-1.5 text-text dark:border-outline-color-dark dark:bg-button-dark dark:text-text-dark">
            {post.type === 'drawing' ? __('👾 Çizim') : __('📷 Fotoğraf')}
        </div>
        <div className="flex justify-center">
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
                <img
                    src={post.post_image}
                    alt={post.post_title}
                    className="absolute inset-0 h-full w-full object-contain object-center"
                />
            </div>
        </div>
    </div>
);

export default SearchImagePost;
