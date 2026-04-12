import React from 'react';

const SearchImagePost = ({ post }) => (
    <div className="relative overflow-hidden rounded-xl border border-border bg-background p-5 shadow-lg dark:border-border dark:bg-card">
        <div className="absolute left-4 top-4 z-10 rounded-lg border border-border bg-secondary px-3 py-1.5 text-foreground dark:border-border dark:bg-secondary dark:text-foreground">
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
