import React from 'react';

const PostHeader = ({ post }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    const type = String(post.type);
    const typeLabel = {
        0: 'Yazı',
        1: 'Fotoğraf',
        2: 'Çizim',
        3: 'Alıntı',
        4: 'Albüm',
    }[type];

    return (
        <div className="mb-6">
            <div className="mb-3 flex items-center text-sm text-muted-foreground dark:text-muted-foreground">
                <span className="flex items-center">
                    <svg
                        className="mr-1 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </span>
                {type === '0' && (
                    <>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                            <svg
                                className="mr-1 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            {__(':count Dakika', { count: post.readingTime })}
                        </span>
                    </>
                )}
                {typeLabel && (
                    <>
                        <span className="mx-2">•</span>
                        <span>{typeLabel}</span>
                    </>
                )}
                {type === '4' && Array.isArray(post.album_items) && (
                    <>
                        <span className="mx-2">•</span>
                        <span>{post.album_items.length} görsel</span>
                    </>
                )}
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground dark:text-foreground md:text-4xl">
                {post.post_title}
            </h1>
            <p className="mb-8 text-xl text-muted-foreground dark:text-muted-foreground">{post.description}</p>
        </div>
    );
};

export default PostHeader;
