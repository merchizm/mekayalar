import React from 'react';

const ProjectHeader = ({ project }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <>
            {project.image ? (
                <div className="relative mb-8 h-80 w-full overflow-hidden rounded-2xl md:h-96">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                        <h1 className="mb-2 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
                            {project.title}
                        </h1>
                        {project.completed_at && (
                            <div className="flex items-center text-foreground">
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>{formatDate(project.completed_at)}</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <header className="mb-10 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground dark:text-foreground md:text-5xl">
                        {project.title}
                    </h1>
                    {project.completed_at && (
                        <div className="flex items-center justify-center text-muted-foreground dark:text-muted-foreground">
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
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>{formatDate(project.completed_at)}</span>
                        </div>
                    )}
                </header>
            )}
        </>
    );
};

export default ProjectHeader;
