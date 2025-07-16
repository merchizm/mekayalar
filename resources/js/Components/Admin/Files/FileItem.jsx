import React from 'react';
import { FileIcon, ImageIcon, DocumentIcon, VideoIcon, AudioIcon } from './Icons';

const FileIconComponent = ({ type, extension, thumbnailUrl, className = "w-5 h-5", isGrid = false }) => {
  const gridSize = isGrid ? "w-12 h-12" : className;
  
  if (thumbnailUrl) {
    return (
      <img 
        src={thumbnailUrl} 
        alt="thumbnail" 
        className={`${isGrid ? 'w-12 h-12' : 'w-6 h-6'} rounded object-cover ${isGrid ? 'mb-3' : 'mr-3'}`}
      />
    );
  }

  switch (type) {
    case 'Image':
      return <ImageIcon className={`${gridSize} ${isGrid ? 'mb-3' : 'mr-3'}`} />;
    case 'Document':
      return <DocumentIcon className={`${gridSize} ${isGrid ? 'mb-3' : 'mr-3'}`} />;
    case 'Video':
      return <VideoIcon className={`${gridSize} ${isGrid ? 'mb-3' : 'mr-3'}`} />;
    case 'Audio':
      return <AudioIcon className={`${gridSize} ${isGrid ? 'mb-3' : 'mr-3'}`} />;
    default:
      return <FileIcon className={`${gridSize} ${isGrid ? 'mb-3' : 'mr-3'}`} />;
  }
};

export default function FileItem({ file, viewMode = 'list' }) {
  const formatFileSize = (size) => {
    if (!size || size === 'Unknown') return size;
    return size;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (viewMode === 'grid') {
    return (
      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group">
        <div className="flex flex-col items-center text-center">
          <FileIconComponent 
            type={file.type} 
            extension={file.extension} 
            thumbnailUrl={file.thumbnail}
            isGrid={true}
          />
          <span 
            className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate w-full mb-1" 
            title={file.original_name}
          >
            {file.original_name}
          </span>
          <div className="flex flex-col items-center space-y-1">
            <small className="text-xs text-gray-500 dark:text-gray-400">
              {file.type} • {formatFileSize(file.size)}
            </small>
            <small className="text-xs text-gray-400 dark:text-gray-500">
              {formatDate(file.creation_time)}
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <li className="px-4 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group border-b border-gray-100 dark:border-gray-600 last:border-b-0">
      <FileIconComponent 
        type={file.type} 
        extension={file.extension} 
        thumbnailUrl={file.thumbnail}
      />
      <span className="flex-grow text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-4">
        {file.original_name}
      </span>
      <div className="flex flex-col items-end min-w-0">
        <div className="flex items-center space-x-4">
          <small className="text-gray-500 dark:text-gray-400">{file.type}</small>
          <small className="text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</small>
        </div>
        <small className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(file.creation_time)}
        </small>
      </div>
    </li>
  );
} 
