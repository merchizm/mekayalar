import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const ProjectContent = ({ project }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (project.content && contentRef.current) {
      const parsedContent = marked.parse(project.content || '');
      const sanitizedContent = DOMPurify.sanitize(parsedContent);
      contentRef.current.innerHTML = sanitizedContent;
    }
  }, [project.content]);

  return (
    <div className="lg:col-span-2">
      {project.content ? (
        <div className="pb-8 max-w-none prose prose-lg project-content dark:prose-invert">
          <div ref={contentRef} className="min-h-[100px]"></div>
        </div>
      ) : (
        <div className="max-w-none prose prose-lg dark:prose-invert">
          <p>{project.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectContent; 
