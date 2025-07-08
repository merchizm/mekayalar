import React from 'react';

const ProjectHeader = ({ project }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <>
      {project.image ? (
        <div className="overflow-hidden relative mb-8 w-full h-80 rounded-2xl md:h-96">
          <img src={project.image} alt={project.title} className="object-cover absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t to-transparent from-background-dark/80 via-background-dark/30"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full md:p-8">
            <h1 className="mb-2 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">{project.title}</h1>
            {project.completed_at && (
              <div className="flex items-center text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(project.completed_at)}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl text-text dark:text-text-dark">{project.title}</h1>
          {project.completed_at && (
            <div className="flex justify-center items-center text-light-text dark:text-light-text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
