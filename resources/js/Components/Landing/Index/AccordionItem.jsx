import React, { useState } from 'react';

const AccordionItem = ({ title, date, children, logo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border transition-all duration-300 border-divider dark:border-label-border-dark bg-background dark:bg-repository-card-bg-dark">
      <button
        className="flex gap-4 justify-between items-center p-4 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-grow gap-4 items-start">
          {logo && (
            <div className="flex-shrink-0">
              <img className="object-cover w-12 h-12 rounded-full" src={logo} alt="Logo" />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-text dark:text-text-dark">{title}</h3>
            <p className="text-sm text-light-text dark:text-light-text-dark">{date}</p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <svg className={`w-5 h-5 transition-transform duration-300 transform text-text dark:text-text-dark ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        className="overflow-hidden max-h-0 duration-500 ease-in-out transition-max-height"
        style={{ maxHeight: isOpen ? '1000px' : '0' }}
      >
        <div className="p-4 pt-0">
          <div className="mb-3 text-base text-text dark:text-text-dark">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem; 
