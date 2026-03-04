import React from 'react';

const ReposTab = ({ repos, langColors }) => (
    <div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {repos && repos.length > 0 ? (
                repos.map((repo) => (
                    <div
                        key={repo.id}
                        className="surface-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-transparent p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-divider-dark"
                    >
                        <div className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
                        <div className="relative z-10 flex flex-grow flex-col">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex-grow">
                                <h3 className="mb-2 text-xl font-bold text-text transition-colors group-hover:text-menu-active dark:text-text-dark dark:group-hover:text-menu-active-dark">
                                    {repo.name}
                                </h3>
                                {repo.description && (
                                    <p className="mb-4 text-light-text dark:text-light-text-dark">{repo.description}</p>
                                )}
                            </a>
                            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-divider/50 pt-4 dark:border-divider-dark/50">
                                {repo.language && (
                                    <span className="flex items-center text-sm">
                                        <div
                                            className="mr-2 h-3 w-3 rounded-full"
                                            style={{ backgroundColor: langColors[repo.language]?.color ?? '#cccccc' }}
                                        ></div>
                                        {repo.language}
                                    </span>
                                )}
                                <span className="flex items-center text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="18"
                                        width="18"
                                        className="mr-1 fill-text dark:fill-text-dark"
                                    >
                                        <path d="M7.271 14.979 10 13.354l2.75 1.625-.729-3.062 2.375-2.042-3.146-.271L10 6.688 8.75 9.604l-3.146.271L8 11.896Z" />
                                    </svg>
                                    {repo.stargazers_count}
                                </span>
                                <span className="flex items-center text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="18"
                                        width="18"
                                        viewBox="0 0 16 16"
                                        className="mr-1 fill-text dark:fill-text-dark"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zM10.5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"
                                        />
                                    </svg>
                                    {repo.forks_count}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="my-5 rounded-2xl border-2 border-dashed border-divider bg-background py-24 text-center dark:border-divider-dark dark:bg-repository-card-bg-dark lg:col-span-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto mb-6 h-20 w-20 text-light-text dark:text-dark-text-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                    </svg>
                    <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">{__('Repo Bulunamadı')}</h2>
                    <p className="text-xl text-light-text dark:text-light-text-dark">
                        {__('Henüz herkese açık bir repom bulunmuyor.')}
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default ReposTab;
