import React from 'react';

const TextIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);

const ImageIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
  </svg>
);

const DrawingIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

export default function PostTypeBadge({ type }) {
  const getTypeConfig = (type) => {
    switch (String(type)) {
      case '0':
        return {
          label: 'Yazı',
          icon: TextIcon,
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        };
      case '1':
        return {
          label: 'Resim',
          icon: ImageIcon,
          className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        };
      case '2':
        return {
          label: 'Çizim',
          icon: DrawingIcon,
          className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
        };
      default:
        return {
          label: 'Bilinmeyen',
          icon: TextIcon,
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
        };
    }
  };

  const config = getTypeConfig(type);
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}