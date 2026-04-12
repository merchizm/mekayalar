import React from 'react';

const GistsTab = ({ gists }) => (
    <div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {gists && gists.length > 0 ? (
                gists.map((gist) => (
                    <div
                        key={gist.id}
                        className="surface-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-transparent p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-border"
                    >
                        <div className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
                        <div className="relative z-10 flex flex-grow flex-col">
                            <a href={gist.html_url} target="_blank" rel="noopener noreferrer" className="flex-grow">
                                <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary dark:text-foreground dark:group-hover:text-primary">
                                    {gist.description || __('İsimsiz Gist')}
                                </h3>
                            </a>
                            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/50 pt-4 dark:border-border/50">
                                {gist.files && Object.keys(gist.files).length > 0 && (
                                    <span className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-1.5 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {__(':count Dosya', { count: Object.keys(gist.files).length })}
                                    </span>
                                )}
                                <span className="flex items-center text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-1.5 h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    {__(':count Yorum', { count: gist.comments })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="my-5 rounded-2xl border-2 border-dashed border-border bg-background py-24 text-center dark:border-border dark:bg-card lg:col-span-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto mb-6 h-20 w-20 text-muted-foreground dark:text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <h2 className="mb-3 text-3xl font-bold text-foreground dark:text-foreground">
                        {__('Gist Bulunamadı')}
                    </h2>
                    <p className="text-xl text-muted-foreground dark:text-muted-foreground">
                        {__("Henüz herkese açık bir gist'im bulunmuyor.")}
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default GistsTab;
