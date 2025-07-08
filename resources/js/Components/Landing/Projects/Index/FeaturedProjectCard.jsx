import React from 'react';
import { Link } from '@inertiajs/react';

const FeaturedProjectCard = ({ project }) => (
  <Link href={route('projects.show', project)} className="block overflow-hidden relative bg-transparent rounded-2xl border shadow-sm transition-all duration-300 transform group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
    {project.image && (
      <div className="overflow-hidden h-64">
        <img src={project.image} className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105" alt={project.title} />
      </div>
    )}
    <div className="p-6">
      <h3 className="text-2xl font-bold text-text dark:text-text-dark">{project.title}</h3>
      <p className="mt-2 text-light-text dark:text-light-text-dark">{project.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="inline-flex items-center text-sm font-semibold text-menu-active dark:text-menu-active-dark">
          Detayları İncele
          <svg className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
        {project.completed_at && (
          <span className="text-sm text-light-text dark:text-dark-text-dark">{new Date(project.completed_at).getFullYear()}</span>
        )}
      </div>
    </div>
  </Link>
);

export default FeaturedProjectCard; 
