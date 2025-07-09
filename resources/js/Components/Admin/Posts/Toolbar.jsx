import React from 'react';
import {
  BiBold,
  BiItalic,
  BiLink,
  BiStrikethrough,
  BiRightIndent,
  BiCode,
  BiListUl,
  BiListOl,
  BiMinus,
  BiImage,
  BiHeading,
} from 'react-icons/bi';

const iconMap = {
  'bi-type-bold': <BiBold />,
  'bi-type-italic': <BiItalic />,
  'bi-type-h1': <BiHeading />,
  'bi-link-45deg': <BiLink />,
  'bi-type-strikethrough': <BiStrikethrough />,
  'bi-blockquote-right': <BiRightIndent />,
  'bi-code-slash': <BiCode />,
  'bi-list-ul': <BiListUl />,
  'bi-list-ol': <BiListOl />,
  'bi-dash-lg': <BiMinus />,
  'bi-image': <BiImage />,
};

const ToolbarButton = ({ onClick, title, icon }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-2 py-1 text-gray-600 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
    title={title}
  >
    {iconMap[icon]}
  </button>
);

export default function Toolbar({ onAction }) {
  const buttons = [
    { action: 'bold', title: 'Bold', icon: 'bi-type-bold' },
    { action: 'italic', title: 'Italic', icon: 'bi-type-italic' },
    { action: 'heading', title: 'Heading', icon: 'bi-type-h1' },
    { action: 'link', title: 'Link', icon: 'bi-link-45deg' },
    { action: 'strikethrough', title: 'Strikethrough', icon: 'bi-type-strikethrough' },
    { action: 'blockquote', title: 'Blockquote', icon: 'bi-blockquote-right' },
    { action: 'codeblock', title: 'Code Block', icon: 'bi-code-slash' },
    { action: 'ul', title: 'Unordered List', icon: 'bi-list-ul' },
    { action: 'ol', title: 'Ordered List', icon: 'bi-list-ol' },
    { action: 'hr', title: 'Horizontal Rule', icon: 'bi-dash-lg' },
    { action: 'image', title: 'Image', icon: 'bi-image' },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center p-2 border-b border-gray-200 dark:border-gray-700">
      {buttons.map(btn => (
        <ToolbarButton key={btn.action} onClick={() => onAction(btn.action)} title={btn.title} icon={btn.icon} />
      ))}
    </div>
  );
} 
