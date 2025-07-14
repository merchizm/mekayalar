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
        <article className="pb-8 max-w-none prose prose-lg dark:prose-invert">
          <Highlight innerHTML={true}>{content}</Highlight>
        </article>
      ) : (
        <div className="max-w-none prose prose-lg dark:prose-invert">
          <p>{project.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectContent; 
