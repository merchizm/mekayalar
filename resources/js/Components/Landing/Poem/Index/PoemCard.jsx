import React from 'react';
import { Link } from '@inertiajs/react';
import ApplauseButton from '@/Components/Common/ApplauseButton';

const PoemCard = ({ poem }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <Link
            href={route('poems.show', { poem: poem.slug })}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-transparent p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-divider-dark"
        >
            <div className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
            <div className="relative z-10 flex flex-grow flex-col">
                <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-2xl font-bold text-text dark:text-text-dark">{poem.title}</h3>
                    <ApplauseButton
                        id={poem.id}
                        type="poem"
                        multiclap="true"
                        className="h-[58px] w-[58px] flex-shrink-0"
                    />
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-divider/50 pt-4 dark:border-divider-dark/50">
                    <span className="text-sm text-light-text dark:text-light-text-dark">
                        {formatDate(poem.wrote_at)}
                    </span>
                    <span className="inline-flex items-center text-sm font-semibold text-text group-hover:underline dark:text-text-dark">
                        Devamını Oku
                        <svg
                            className="ml-1 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default PoemCard;
