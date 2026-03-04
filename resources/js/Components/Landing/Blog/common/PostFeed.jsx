import React, { useMemo, useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { createPortal } from 'react-dom';
import PostCard from '@/Components/Landing/Blog/common/PostCard';
import ImagePost from '@/Components/Landing/Blog/common/ImagePost';
import QuotePostCard from '@/Components/Landing/Blog/common/QuotePostCard';
import AlbumPostCard from '@/Components/Landing/Blog/common/AlbumPostCard';

export default function PostFeed({ postItems = [] }) {
    const [lightboxController, setLightboxController] = useState({ toggler: false, sourceIndex: 0 });

    const imagePosts = useMemo(() => postItems.filter((post) => ['1', '2'].includes(String(post.type))), [postItems]);
    const imageSources = useMemo(() => imagePosts.map((post) => post.post_image).filter(Boolean), [imagePosts]);

    const openLightboxOnSource = (sourceIndex) => {
        setLightboxController((prev) => ({
            toggler: !prev.toggler,
            sourceIndex,
        }));
    };

    const findImagePostIndex = (post) => imagePosts.findIndex((item) => item.post_image === post.post_image);

    return (
        <>
            <div className="space-y-12">
                {postItems.map((post) => {
                    const type = String(post.type);
                    if (type === '0') {
                        return <PostCard key={post.id} post={post} />;
                    }
                    if (type === '3') {
                        return <QuotePostCard key={post.id} post={post} />;
                    }
                    if (type === '4') {
                        return <AlbumPostCard key={post.id} post={post} />;
                    }
                    return (
                        <ImagePost key={post.id} post={post} onClick={() => openLightboxOnSource(findImagePostIndex(post))} />
                    );
                })}
            </div>
            {typeof document !== 'undefined'
                ? createPortal(
                      <FsLightbox
                          toggler={lightboxController.toggler}
                          sources={imageSources}
                          sourceIndex={lightboxController.sourceIndex}
                      />,
                      document.body
                  )
                : null}
        </>
    );
}
