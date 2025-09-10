import React from 'react';

const GistsTab = ({ gists }) => (
  <div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {gists && gists.length > 0 ? (
        gists.map(gist => (
          <div key={gist.id} className="flex overflow-hidden relative flex-col p-8 h-full bg-transparent rounded-2xl border shadow-sm transition-all duration-300 group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
            <div className="flex relative z-10 flex-col flex-grow">
              <a href={gist.html_url} target="_blank" rel="noopener noreferrer" className="flex-grow">
                <h3 className="mb-2 text-xl font-bold transition-colors text-text dark:text-text-dark group-hover:text-menu-active dark:group-hover:text-menu-active-dark">{gist.description || __('İsimsiz Gist')}</h3>
              </a>
              <div className="flex flex-wrap gap-y-2 gap-x-6 items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
                {gist.files && Object.keys(gist.files).length > 0 && (
                  <span className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    {__(':count Dosya', { count: Object.keys(gist.files).length })}
                  </span>
                )}
                <span className="flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  {__(':count Yorum', { count: gist.comments })}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-24 my-5 text-center rounded-2xl border-2 border-dashed lg:col-span-2 bg-background dark:bg-repository-card-bg-dark border-divider dark:border-divider-dark">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 w-20 h-20 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">{__('Gist Bulunamadı')}</h2>
          <p className="text-xl text-light-text dark:text-light-text-dark">{__('Henüz herkese açık bir gist\'im bulunmuyor.')}</p>
        </div>
      )}
    </div>
  </div>
);

export default GistsTab; 
