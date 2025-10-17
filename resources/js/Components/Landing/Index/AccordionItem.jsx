import React, { useState } from 'react';

const AccordionItem = ({ title, date, children, logo }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-lg border border-divider bg-background transition-all duration-300 dark:border-label-border-dark dark:bg-repository-card-bg-dark">
            <button
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-grow items-start gap-4">
                    {logo && (
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full object-cover" src={logo} alt="Logo" />
                        </div>
                    )}
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-text dark:text-text-dark">{title}</h3>
                        <p className="text-sm text-light-text dark:text-light-text-dark">{date}</p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <svg
                        className={`h-5 w-5 transform text-text transition-transform duration-300 dark:text-text-dark ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div
                className="transition-max-height max-h-0 overflow-hidden duration-500 ease-in-out"
                style={{ maxHeight: isOpen ? '1000px' : '0' }}
            >
                <div className="p-4 pt-0">
                    <div className="mb-3 text-base text-text dark:text-text-dark">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
