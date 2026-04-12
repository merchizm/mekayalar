import React from 'react';
import { Link } from '@inertiajs/react';

const FeaturedProjectCard = ({ project }) => (
    <Link
        href={route('projects.show', project)}
        className="surface-lift group relative block transform overflow-hidden rounded-2xl border border-border bg-transparent shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-border"
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
            <h3 className="text-2xl font-bold text-foreground dark:text-foreground">{project.title}</h3>
            <p className="mt-2 text-muted-foreground dark:text-muted-foreground">{project.description}</p>
            {project.tags && project.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-primary dark:bg-blue-900/50 dark:text-primary"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center text-sm font-semibold text-primary dark:text-primary">
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
                    <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                        {new Date(project.completed_at).getFullYear()}
                    </span>
                )}
            </div>
        </div>
    </Link>
);

export default FeaturedProjectCard;
