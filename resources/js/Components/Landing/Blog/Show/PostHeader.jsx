import React from 'react';

const PostHeader = ({ post }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <div className="mb-6">
            <div className="flex items-center mb-3 text-sm text-light-text dark:text-light-text-dark">
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {post.readingTime} Dakika
                </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl text-text dark:text-text-dark">{post.post_title}</h1>
            <p className="mb-8 text-xl text-light-text dark:text-light-text-dark">
                {post.description}
            </p>
        </div>
    );
};

export default PostHeader; 
