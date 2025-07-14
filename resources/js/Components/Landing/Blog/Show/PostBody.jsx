import React from 'react';
import Highlight from 'react-highlight';

const PostBody = ({ post }) => (
  <>
    {post.post_image && (
      <div className="overflow-hidden relative mb-8 w-full rounded-xl">
        <img src={post.post_image} alt={post.post_title} className="w-full h-auto rounded-xl" />
      </div>
    )}
    <article className="pb-8 max-w-none prose prose-lg dark:prose-invert">
      <Highlight innerHTML={true}>
        {post.content}
      </Highlight>
    </article>
  </>
);

export default PostBody; 
