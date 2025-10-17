import React from 'react';
import { Link } from '@inertiajs/react';

const ProjectSidebar = ({ project }) => {
    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                {project.tags && project.tags.length > 0 && (
                    <div className="space-y-4 rounded-2xl border border-divider bg-background p-6 shadow-sm dark:border-label-border-dark dark:bg-repository-card-bg-dark">
                        <h3 className="text-xl font-bold text-text dark:text-text-dark">{__('Etiketler')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4 rounded-2xl border border-divider bg-background p-6 shadow-sm dark:border-label-border-dark dark:bg-repository-card-bg-dark">
                    <h3 className="text-xl font-bold text-text dark:text-text-dark">{__('Proje Linkleri')}</h3>
                    {project.url && (
                        <a
                            href={project.url}
                            className="flex w-full items-center justify-center rounded-lg bg-button px-5 py-3 text-center font-semibold text-text shadow-sm transition-colors hover:bg-button-hover dark:bg-button-dark dark:text-text-dark dark:hover:bg-button-hover-dark"
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
                            className="flex w-full items-center justify-center rounded-lg bg-gray-800 px-5 py-3 text-center font-semibold text-gray-50 shadow-sm transition-colors hover:bg-gray-700"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github mr-2"></i>
                            <span>{__("GitHub'da İncele")}</span>
                        </a>
                    )}
                    <Link
                        href={route('projects.index')}
                        className="flex w-full items-center justify-center rounded-lg border border-divider bg-transparent px-5 py-3 text-center font-semibold text-text transition-colors hover:bg-button-hover/50 dark:border-divider-dark dark:text-text-dark dark:hover:bg-button-hover-dark/50"
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
