import React from 'react';
import { Link } from '@inertiajs/react';

const FeaturedProjectCard = ({ project }) => (
    <Link
        href={route('projects.show', project)}
        className="surface-lift group relative block transform overflow-hidden rounded-2xl border border-divider bg-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-divider-dark"
    >
        {project.image && (
            <div className="h-64 overflow-hidden">
                <img
                    src={project.image}
                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    alt={project.title}
                />
            </div>
        )}
        <div className="p-6">
            <h3 className="text-2xl font-bold text-text dark:text-text-dark">{project.title}</h3>
            <p className="mt-2 text-light-text dark:text-light-text-dark">{project.description}</p>
            {project.tags && project.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center text-sm font-semibold text-menu-active dark:text-menu-active-dark">
                    {__('Detayları İncele')}
                    <svg
                        className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </span>
                {project.completed_at && (
                    <span className="text-sm text-light-text dark:text-dark-text-dark">
                        {new Date(project.completed_at).getFullYear()}
                    </span>
                )}
            </div>
        </div>
    </Link>
);

export default FeaturedProjectCard;
