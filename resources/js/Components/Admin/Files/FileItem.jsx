import React from 'react';
import { FileIcon, ImageIcon, DocumentIcon, VideoIcon, AudioIcon } from './Icons';

const FileIconComponent = ({ type, thumbnailUrl, className = 'w-5 h-5', isGrid = false }) => {
    const gridSize = isGrid ? 'w-12 h-12' : className;

    if (thumbnailUrl) {
        return (
            <img
                src={thumbnailUrl}
                alt="thumbnail"
                className={`${isGrid ? 'h-12 w-12' : 'h-6 w-6'} rounded object-cover ${isGrid ? 'mb-3' : 'mr-3'}`}
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
            <div className="group rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center text-center">
                    <FileIconComponent
                        type={file.type}
                        extension={file.extension}
                        thumbnailUrl={file.thumbnail}
                        isGrid={true}
                    />
                    <span
                        className="mb-1 w-full truncate text-sm font-medium text-gray-800 dark:text-gray-200"
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
        <li className="group flex items-center border-b border-gray-100 px-4 py-3 transition-colors duration-200 last:border-b-0 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
            <FileIconComponent type={file.type} extension={file.extension} thumbnailUrl={file.thumbnail} />
            <span className="flex-grow truncate pr-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                {file.original_name}
            </span>
            <div className="flex min-w-0 flex-col items-end">
                <div className="flex items-center space-x-4">
                    <small className="text-gray-500 dark:text-gray-400">{file.type}</small>
                    <small className="text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</small>
                </div>
                <small className="text-xs text-gray-400 dark:text-gray-500">{formatDate(file.creation_time)}</small>
            </div>
        </li>
    );
}
