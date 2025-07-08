import React from 'react';
import Highlight from 'react-highlight';

const PostBody = ({ post }) => (
  <>
    {post.post_image && (
      <div className="relative w-full mb-8 overflow-hidden rounded-xl">
        <img src={post.post_image} alt={post.post_title} className="w-full h-auto rounded-xl" />
      </div>
    )}
    <article className="pb-8 prose prose-lg dark:prose-invert max-w-none">
      <Highlight innerHTML={true}>
        {post.content}
      </Highlight>
    </article>
  </>
);

export default PostBody; 
