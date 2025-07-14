import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectSidebar = ({ project }) => {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        {project.tags && project.tags.length > 0 && (
          <div className="p-6 space-y-4 rounded-2xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
            <h3 className="text-xl font-bold text-text dark:text-text-dark">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 space-y-4 rounded-2xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark">
          <h3 className="text-xl font-bold text-text dark:text-text-dark">Proje Linkleri</h3>
          {project.url && (
            <a href={project.url} className="flex justify-center items-center px-5 py-3 w-full font-semibold text-center rounded-lg shadow-sm transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Projeyi Ziyaret Et</span>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} className="flex justify-center items-center px-5 py-3 w-full font-semibold text-center text-gray-50 bg-gray-800 rounded-lg shadow-sm transition-colors hover:bg-gray-700" target="_blank" rel="noopener noreferrer">
              <i className="mr-2 fab fa-github"></i>
              <span>GitHub'da İncele</span>
            </a>
          )}
          <Link href={route('projects.index')} className="flex justify-center items-center px-5 py-3 w-full font-semibold text-center bg-transparent rounded-lg border transition-colors text-text dark:text-text-dark border-divider dark:border-divider-dark hover:bg-button-hover/50 dark:hover:bg-button-hover-dark/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Tüm Projeler</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar; 
