import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectCard = ({ project }) => {
  const limitText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  return (
    <Link href={route('projects.show', project)} className="flex flex-col p-6 h-full rounded-2xl border shadow-sm transition-all duration-300 bg-background dark:bg-repository-card-bg-dark group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1 hover:border-menu-active dark:hover:border-menu-active-dark">
      <div className="flex-shrink-0 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-menu-active dark:text-menu-active-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{project.title}</h3>
        <p className="flex-grow mt-3 text-sm text-light-text dark:text-light-text-dark">{limitText(project.description, 120)}</p>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
          <span className="text-sm font-semibold text-menu-active dark:text-menu-active-dark">
            {__('Detayları İncele')}
          </span>
          {project.completed_at && (
            <span className="text-sm text-light-text dark:text-dark-text-dark">{new Date(project.completed_at).getFullYear()}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard; 
