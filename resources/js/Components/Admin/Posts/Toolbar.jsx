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
    BiMessageAltError,
    BiTab,
    BiHide,
    BiCheckboxChecked,
    BiHighlight,
    BiColumns,
    BiChevronDownSquare,
    BiBookmarks,
    BiMoviePlay,
    BiImageAdd,
    BiNote,
    BiLinkAlt,
    BiBookOpen,
    BiSpreadsheet,
    BiParagraph,
    BiMessageRoundedDetail,
    BiImages,
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
    'bi-alert': <BiMessageAltError />,
    'bi-tabs': <BiTab />,
    'bi-spoiler': <BiHide />,
    'bi-checklist': <BiCheckboxChecked />,
    'bi-highlight': <BiHighlight />,
    'bi-columns': <BiColumns />,
    'bi-accordion': <BiChevronDownSquare />,
    'bi-toc': <BiBookmarks />,
    'bi-embed': <BiMoviePlay />,
    'bi-figure': <BiImageAdd />,
    'bi-footnote': <BiNote />,
    'bi-noautolink': <BiLinkAlt />,
    'bi-quote': <BiBookOpen />,
    'bi-flowchart': <BiSpreadsheet />,
    'bi-sequence': <BiParagraph />,
    'bi-bubble': <BiMessageRoundedDetail />,
    'bi-gallery': <BiImages />,
};

const ToolbarButton = ({ onClick, title, icon }) => (
    <button
        type="button"
        onClick={onClick}
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-gray-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        title={title}
    >
        {iconMap[icon]}
    </button>
);

const ToolbarGroup = ({ label, children }) => (
    <div className="flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {label}
        </div>
        <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
);

export default function Toolbar({ onAction, onTogglePreview, onToggleFullscreen, showPreview, fullscreen }) {
    const headingOptions = [
        { label: 'Normal', value: '' },
        { label: 'Heading 1', value: 'heading1' },
        { label: 'Heading 2', value: 'heading2' },
        { label: 'Heading 3', value: 'heading3' },
        { label: 'Heading 4', value: 'heading4' },
        { label: 'Heading 5', value: 'heading5' },
        { label: 'Heading 6', value: 'heading6' },
    ];

    return (
        <div className="flex flex-wrap items-stretch gap-3">
            <ToolbarGroup label="Format">
                <select
                    className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    onChange={(event) => {
                        const value = event.target.value;
                        if (value) {
                            onAction(value);
                        }
                        event.target.value = '';
                    }}
                    defaultValue=""
                    aria-label="Heading level"
                >
                    {headingOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ToolbarButton onClick={() => onAction('bold')} title="Bold" icon="bi-type-bold" />
                <ToolbarButton onClick={() => onAction('italic')} title="Italic" icon="bi-type-italic" />
                <ToolbarButton onClick={() => onAction('strikethrough')} title="Strikethrough" icon="bi-type-strikethrough" />
                <ToolbarButton onClick={() => onAction('highlight')} title="Highlight" icon="bi-highlight" />
            </ToolbarGroup>

            <ToolbarGroup label="Insert">
                <ToolbarButton onClick={() => onAction('link')} title="Link" icon="bi-link-45deg" />
                <ToolbarButton onClick={() => onAction('image')} title="Image" icon="bi-image" />
                <ToolbarButton onClick={() => onAction('embed')} title="Embed" icon="bi-embed" />
                <ToolbarButton onClick={() => onAction('figure')} title="Figure" icon="bi-figure" />
                <ToolbarButton onClick={() => onAction('gallery')} title="Gallery" icon="bi-gallery" />
                <ToolbarButton onClick={() => onAction('quote')} title="Quote" icon="bi-quote" />
                <ToolbarButton onClick={() => onAction('footnote')} title="Footnote" icon="bi-footnote" />
                <ToolbarButton onClick={() => onAction('bubble')} title="Message Bubble" icon="bi-bubble" />
            </ToolbarGroup>

            <ToolbarGroup label="Blocks">
                <ToolbarButton onClick={() => onAction('blockquote')} title="Blockquote" icon="bi-blockquote-right" />
                <ToolbarButton onClick={() => onAction('codeblock')} title="Code Block" icon="bi-code-slash" />
                <ToolbarButton onClick={() => onAction('alert')} title="Alert" icon="bi-alert" />
                <ToolbarButton onClick={() => onAction('spoiler')} title="Spoiler" icon="bi-spoiler" />
                <ToolbarButton onClick={() => onAction('checklist')} title="Checklist" icon="bi-checklist" />
                <ToolbarButton onClick={() => onAction('ul')} title="Unordered List" icon="bi-list-ul" />
                <ToolbarButton onClick={() => onAction('ol')} title="Ordered List" icon="bi-list-ol" />
                <ToolbarButton onClick={() => onAction('hr')} title="Horizontal Rule" icon="bi-dash-lg" />
            </ToolbarGroup>

            <ToolbarGroup label="Layout">
                <ToolbarButton onClick={() => onAction('columns')} title="Columns" icon="bi-columns" />
                <ToolbarButton onClick={() => onAction('tabs')} title="Tabs" icon="bi-tabs" />
                <ToolbarButton onClick={() => onAction('accordion')} title="Accordion" icon="bi-accordion" />
                <ToolbarButton onClick={() => onAction('toc')} title="Table of Contents" icon="bi-toc" />
            </ToolbarGroup>

            <ToolbarGroup label="Diagrams">
                <ToolbarButton onClick={() => onAction('flowchart')} title="Flowchart" icon="bi-flowchart" />
                <ToolbarButton onClick={() => onAction('sequence')} title="Sequence Diagram" icon="bi-sequence" />
            </ToolbarGroup>

            <ToolbarGroup label="View">
                <button
                    type="button"
                    onClick={onTogglePreview}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                >
                    {showPreview ? 'Önizlemeyi Gizle' : 'Önizlemeyi Göster'}
                </button>
                <button
                    type="button"
                    onClick={onToggleFullscreen}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                >
                    {fullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
                </button>
            </ToolbarGroup>
        </div>
    );
}
