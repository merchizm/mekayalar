import React, { useState } from 'react';

const AccordionItem = ({ title, date, children, logo }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-lg border border-border bg-background transition-all duration-300 dark:border-border dark:bg-card">
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
                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">{title}</h3>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">{date}</p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <svg
                        className={`h-5 w-5 transform text-foreground transition-transform duration-300 dark:text-foreground ${isOpen ? 'rotate-180' : ''}`}
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
                    <div className="mb-3 text-base text-foreground dark:text-foreground">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
