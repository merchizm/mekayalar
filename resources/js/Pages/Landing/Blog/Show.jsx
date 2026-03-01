import React from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import 'highlight.js/styles/an-old-hope.css';
import Breadcrumb from '@/Components/Landing/Blog/Show/Breadcrumb';
import PostHeader from '@/Components/Landing/Blog/Show/PostHeader';
import PostBody from '@/Components/Landing/Blog/Show/PostBody';
import PostFooter from '@/Components/Landing/Blog/Show/PostFooter';
import PostComments from '@/Components/Landing/Blog/Show/PostComments';

function Show({
    post,
    comments = [],
    commentsCount = 0,
    commentsApprovalRequired = false,
    commentsOrder = 'latest',
    repliesEnabled = true,
    honeypot = null,
}) {
    return (
        <>
            <div className="container my-8">
                <div>
                    <Breadcrumb post={post} />
                    <div>
                        <PostHeader post={post} />
                        <PostBody post={post} />
                        <PostComments
                            post={post}
                            comments={comments}
                            commentsCount={commentsCount}
                            approvalRequired={commentsApprovalRequired}
                            order={commentsOrder}
                            repliesEnabled={repliesEnabled}
                            honeypot={honeypot}
                        />
                        <PostFooter />
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Show;
