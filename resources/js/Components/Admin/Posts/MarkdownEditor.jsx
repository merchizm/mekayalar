import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Toolbar from './Toolbar';

export default function MarkdownEditor({ value, onChange }) {
    const [content, setContent] = useState(value || '');
    const [showPreview, setShowPreview] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        onChange(content);
    }, [content]);

    useEffect(() => {
        if (fullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [fullscreen]);

    const handleAction = (action) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        const syntaxMap = {
            bold: `**${selectedText || 'bold text'}**`,
            italic: `*${selectedText || 'italic text'}*`,
            heading: `# ${selectedText || 'Heading'}`,
            link: `[${selectedText || 'link text'}](url)`,
            strikethrough: `~~${selectedText || 'strikethrough'}~~`,
            blockquote: `> ${selectedText || 'blockquote'}`,
            codeblock: `\`\`\`\n${selectedText || 'code'}\n\`\`\``,
            ul: `- ${selectedText || 'list item'}`,
            ol: `1. ${selectedText || 'list item'}`,
            hr: '\n---\n',
            image: `![${selectedText || 'alt text'}](image-url)`,
        };

        const newContent = content.substring(0, start) + syntaxMap[action] + content.substring(end);
        setContent(newContent);
        textarea.focus();
    };

    const sanitizedHtml = DOMPurify.sanitize(marked.parse(content), { USE_PROFILES: { html: true } });

    const editorContainerClass = `flex border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden ${fullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`;
    const editorSectionClass = `flex flex-col flex-1 min-w-0`;
    const previewSectionClass = `flex-1 min-w-0 p-4 overflow-y-auto prose dark:prose-invert max-w-none ${showPreview ? 'block' : 'hidden'}`;

    return (
        <div className={editorContainerClass}>
            <div className={editorSectionClass}>
                <div className="flex flex-wrap justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
                    <Toolbar onAction={handleAction} />
                    <div className="flex gap-2 items-center">
                        <button type="button" onClick={() => setShowPreview(!showPreview)} className="px-2 py-1 text-xs font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600">
                            {showPreview ? 'Önizlemeyi Gizle' : 'Önizlemeyi Göster'}
                        </button>
                        <button type="button" onClick={() => setFullscreen(!fullscreen)} className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                            {fullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
                        </button>
                    </div>
                </div>
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-grow p-4 w-full bg-transparent border-0 resize-none focus:ring-0 dark:text-gray-200"
                    style={{ minHeight: '400px' }}
                />
                <div className="p-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    Karakter: {content.length}
                </div>
            </div>
            {showPreview && <div className="bg-gray-300 dark:bg-gray-600 cursor-col-resize w-1.5 hover:bg-blue-500 flex-shrink-0"></div>}
            <div className={previewSectionClass}>
                <h5 className="mb-2 text-lg font-bold">Önizleme</h5>
                <div className="max-w-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            </div>
        </div>
    );
} 
