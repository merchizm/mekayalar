import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import Highlight from 'react-highlight';
import { renderMarkdownWithBlocks } from '@/utils/markdown';
import { useMarkdownGallery } from '@/hooks/useMarkdownGallery.jsx';

const ProjectContent = ({ project }) => {
    const [content, setContent] = useState('');
    const { lightbox, onGalleryClick } = useMarkdownGallery();

    useEffect(() => {
        if (typeof window !== 'undefined' && project.content) {
            const parsedContent = renderMarkdownWithBlocks(project.content || '');
            const sanitizedContent = DOMPurify.sanitize(parsedContent, {
                USE_PROFILES: { html: true },
                ADD_TAGS: [
                    'input',
                    'label',
                    'details',
                    'summary',
                    'button',
                    'figure',
                    'figcaption',
                    'abbr',
                    'mark',
                    'sup',
                    'section',
                    'nav',
                    'iframe',
                ],
                ADD_ATTR: [
                    'checked',
                    'type',
                    'name',
                    'id',
                    'for',
                    'disabled',
                    'data-tab',
                    'data-tab-panel',
                    'data-file',
                    'data-lang',
                    'data-mermaid',
                    'data-rendered',
                    'data-gallery',
                    'data-src',
                    'data-title',
                    'aria-hidden',
                    'allow',
                    'allowfullscreen',
                    'loading',
                    'referrerpolicy',
                    'title',
                    'src',
                    'width',
                    'height',
                    'frameborder',
                    'target',
                    'rel',
                ],
            });
            setContent(sanitizedContent);
        }
    }, [project.content]);

    return (
        <div className="lg:col-span-2">
            {project.content ? (
                <article
                    className="md-content prose prose-lg dark:prose-invert max-w-none pb-8"
                    onClick={onGalleryClick}
                >
                    <Highlight innerHTML={true}>{content}</Highlight>
                </article>
            ) : (
                <div className="md-content prose prose-lg dark:prose-invert max-w-none">
                    <p>{project.description}</p>
                </div>
            )}
            {lightbox}
        </div>
    );
};

export default ProjectContent;
