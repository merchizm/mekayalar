import React from 'react';

const FileIcon = ({ type, extension, thumbnailUrl }) => {
  if (thumbnailUrl) {
    return <img src={thumbnailUrl} alt="thumbnail" className="mr-3 rounded" style={{ width: '24px', height: '24px', objectFit: 'cover' }} />;
  }

  let iconClass = 'fas fa-file w-5';
  switch (type) {
    case 'Image':
      iconClass = 'fas fa-file-image text-blue-500 w-5';
      break;
    case 'Document':
      iconClass = 'fas fa-file-word text-purple-500 w-5';
      break;
    case 'Video':
      iconClass = 'fas fa-file-video text-red-500 w-5';
      break;
    case 'Audio':
      iconClass = 'fas fa-file-audio text-green-500 w-5';
      break;
    default:
      break;
  }
  return <i className={`${iconClass} mr-3`}></i>;
};


export default function FileItem({ file }) {
  return (
    <li className="px-4 py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700">
      <FileIcon type={file.type} extension={file.extension} thumbnailUrl={file.thumbnail} />
      <span className="flex-grow text-sm font-medium text-gray-800 dark:text-gray-200">{file.original_name}</span>
      <small className="text-gray-500 dark:text-gray-400 mr-4">{file.size}</small>
      <small className="text-gray-500 dark:text-gray-400">{file.creation_time}</small>
    </li>
  );
} 
