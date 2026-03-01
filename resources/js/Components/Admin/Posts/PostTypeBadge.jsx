import React from 'react';

const TextIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
        />
    </svg>
);

const ImageIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
        />
    </svg>
);

const DrawingIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
);

const QuoteIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M6.5 5A2.5 2.5 0 004 7.5V10a2 2 0 002 2h1v1.5A1.5 1.5 0 015.5 15H5a1 1 0 000 2h.5A3.5 3.5 0 009 13.5V11a2 2 0 00-2-2H6V7.5A.5.5 0 016.5 7H8a1 1 0 000-2H6.5zm7 0A2.5 2.5 0 0011 7.5V10a2 2 0 002 2h1v1.5a1.5 1.5 0 01-1.5 1.5H12a1 1 0 100 2h.5a3.5 3.5 0 003.5-3.5V11a2 2 0 00-2-2h-1V7.5a.5.5 0 01.5-.5H15a1 1 0 100-2h-1.5z" />
    </svg>
);

const AlbumIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 4a2 2 0 012-2h6a2 2 0 011.414.586l2 2A2 2 0 0116 6v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V7h-2a2 2 0 01-2-2V3H6zm1.5 5.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5.793 3.707l-1.646-2.195a1 1 0 00-1.578 0L8 14h5.293z" />
    </svg>
);

export default function PostTypeBadge({ type }) {
    const getTypeConfig = (type) => {
        switch (String(type)) {
            case '0':
                return {
                    label: 'Yazı',
                    icon: TextIcon,
                    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                };
            case '1':
                return {
                    label: 'Resim',
                    icon: ImageIcon,
                    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                };
            case '2':
                return {
                    label: 'Çizim',
                    icon: DrawingIcon,
                    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
                };
            case '3':
                return {
                    label: 'Alıntı',
                    icon: QuoteIcon,
                    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
                };
            case '4':
                return {
                    label: 'Albüm',
                    icon: AlbumIcon,
                    className: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
                };
            default:
                return {
                    label: 'Bilinmeyen',
                    icon: TextIcon,
                    className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
                };
        }
    };

    const config = getTypeConfig(type);
    const IconComponent = config.icon;

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
            <IconComponent className="mr-1 h-3 w-3" />
            {config.label}
        </span>
    );
}
