import React from 'react';
import { Link } from '@inertiajs/react';
import ApplauseButton from '@/Components/Common/ApplauseButton';

const PoemCard = ({ poem }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <Link href={route('poems.show', { poem: poem.slug })} className="flex overflow-hidden relative flex-col p-8 h-full bg-transparent rounded-2xl border shadow-sm transition-all duration-300 group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
      <div className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
      <div className="flex relative z-10 flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-text dark:text-text-dark">{poem.title}</h3>
          <ApplauseButton
            id={poem.id}
            type="poem"
            multiclap="true"
            className="w-[58px] h-[58px] flex-shrink-0"
          />
        </div>
        <div className="flex justify-between items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
          <span className="text-sm text-light-text dark:text-light-text-dark">{formatDate(poem.wrote_at)}</span>
          <span className="inline-flex items-center text-sm font-semibold text-text dark:text-text-dark group-hover:underline">
            Devamını Oku
            <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PoemCard; 
