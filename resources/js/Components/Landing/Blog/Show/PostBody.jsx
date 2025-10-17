import React from 'react';
import Highlight from 'react-highlight';

const PostBody = ({ post }) => (
    <>
        {post.post_image && (
            <div className="relative mb-8 w-full overflow-hidden rounded-xl">
                <img src={post.post_image} alt={post.post_title} className="h-auto w-full rounded-xl" />
            </div>
        )}
        <article className="prose prose-lg dark:prose-invert max-w-none pb-8">
            <Highlight innerHTML={true}>{post.content}</Highlight>
        </article>
    </>
);

export default PostBody;
