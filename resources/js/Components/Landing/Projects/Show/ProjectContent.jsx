import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Highlight from 'react-highlight';

const ProjectContent = ({ project }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && project.content) {
            const parsedContent = marked.parse(project.content || '');
            const sanitizedContent = DOMPurify.sanitize(parsedContent);
            setContent(sanitizedContent);
        }
    }, [project.content]);

    return (
        <div className="lg:col-span-2">
            {project.content ? (
                <article className="prose prose-lg dark:prose-invert max-w-none pb-8">
                    <Highlight innerHTML={true}>{content}</Highlight>
                </article>
            ) : (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>{project.description}</p>
                </div>
            )}
        </div>
    );
};

export default ProjectContent;
