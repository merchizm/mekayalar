import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Toolbar from './Toolbar';

export default function MarkdownEditor({ value, onChange }) {
    const [content, setContent] = useState(value || '');
    const [showPreview, setShowPreview] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const textareaRef = useRef(null);

    // Sync content with value prop when it changes externally
    useEffect(() => {
        if (value !== content) {
            setContent(value || '');
        }
    }, [value, content]);

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
        onChange(newContent);
        textarea.focus();
    };

    const sanitizedHtml = DOMPurify.sanitize(marked.parse(content), { USE_PROFILES: { html: true } });

    const editorContainerClass = `flex border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden ${fullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`;
    const editorSectionClass = `flex flex-col flex-1 min-w-0`;
    const previewSectionClass = `flex-1 min-w-0 p-4 overflow-y-auto prose dark:prose-invert max-w-none ${showPreview ? 'block' : 'hidden'}`;

    return (
        <div className={editorContainerClass}>
            <div className={editorSectionClass}>
                <div className="flex flex-wrap items-center justify-between border-b border-gray-200 p-2 dark:border-gray-700">
                    <Toolbar onAction={handleAction} />
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowPreview(!showPreview)}
                            className="rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-white hover:bg-yellow-600"
                        >
                            {showPreview ? 'Önizlemeyi Gizle' : 'Önizlemeyi Göster'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFullscreen(!fullscreen)}
                            className="rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white hover:bg-blue-600"
                        >
                            {fullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
                        </button>
                    </div>
                </div>
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setContent(newValue);
                        onChange(newValue);
                    }}
                    className="w-full flex-grow resize-none border-0 bg-transparent p-4 focus:ring-0 dark:text-gray-200"
                    style={{ minHeight: '400px' }}
                />
                <div className="border-t border-gray-200 p-2 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    Karakter: {content.length}
                </div>
            </div>
            {showPreview && (
                <div className="w-1.5 flex-shrink-0 cursor-col-resize bg-gray-300 hover:bg-blue-500 dark:bg-gray-600"></div>
            )}
            <div className={previewSectionClass}>
                <h5 className="mb-2 text-lg font-bold">Önizleme</h5>
                <div
                    className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
            </div>
        </div>
    );
}
