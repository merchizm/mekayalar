import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectSidebar = ({ project }) => {
    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                {project.tags && project.tags.length > 0 && (
                    <div className="space-y-4 rounded-2xl border border-border bg-background p-6 shadow-sm dark:border-border dark:bg-card">
                        <h3 className="text-xl font-bold text-foreground dark:text-foreground">{__('Etiketler')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-primary dark:bg-blue-900/50 dark:text-primary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4 rounded-2xl border border-border bg-background p-6 shadow-sm dark:border-border dark:bg-card">
                    <h3 className="text-xl font-bold text-foreground dark:text-foreground">{__('Proje Linkleri')}</h3>
                    {project.url && (
                        <a
                            href={project.url}
                            className="flex w-full items-center justify-center rounded-lg bg-secondary px-5 py-3 text-center font-semibold text-foreground shadow-sm transition-colors hover:bg-accent dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            <span>{__('Projeyi Ziyaret Et')}</span>
                        </a>
                    )}
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            className="flex w-full items-center justify-center rounded-lg bg-card px-5 py-3 text-center font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github mr-2"></i>
                            <span>{__("GitHub'da İncele")}</span>
                        </a>
                    )}
                    <Link
                        href={route('projects.index')}
                        className="flex w-full items-center justify-center rounded-lg border border-border bg-transparent px-5 py-3 text-center font-semibold text-foreground transition-colors hover:bg-accent/50 dark:border-border dark:text-foreground dark:hover:bg-accent/50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span>{__('Tüm Projeler')}</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default ProjectSidebar;
