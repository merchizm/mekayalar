import React, { useState, useRef, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { lineNumbers, highlightActiveLineGutter, EditorView, keymap } from '@codemirror/view';
import { foldGutter, foldKeymap } from '@codemirror/language';
import Toolbar from './Toolbar';
import { renderMarkdownWithBlocks } from '@/utils/markdown';
import { useMarkdownGallery } from '@/hooks/useMarkdownGallery.jsx';

export default function MarkdownEditor({ value, onChange }) {
    const [content, setContent] = useState(value || '');
    const [showPreview, setShowPreview] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const editorRef = useRef(null);
    const { lightbox, onGalleryClick } = useMarkdownGallery();

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
        const editor = editorRef.current;
        if (!editor) {
            return;
        }
        const selection = editor.state.selection.main;
        const selectedText = editor.state.doc.sliceString(selection.from, selection.to);

        const syntaxMap = {
            bold: `**${selectedText || 'bold text'}**`,
            italic: `*${selectedText || 'italic text'}*`,
            heading: `# ${selectedText || 'Heading'}`,
            heading1: `# ${selectedText || 'Heading 1'}`,
            heading2: `## ${selectedText || 'Heading 2'}`,
            heading3: `### ${selectedText || 'Heading 3'}`,
            heading4: `#### ${selectedText || 'Heading 4'}`,
            heading5: `##### ${selectedText || 'Heading 5'}`,
            heading6: `###### ${selectedText || 'Heading 6'}`,
            link: `[${selectedText || 'link text'}](url)`,
            strikethrough: `~~${selectedText || 'strikethrough'}~~`,
            blockquote: `> ${selectedText || 'blockquote'}`,
            codeblock: `\`\`\`js file=example.js\n${selectedText || 'code'}\n\`\`\``,
            ul: `- ${selectedText || 'list item'}`,
            ol: `1. ${selectedText || 'list item'}`,
            hr: '\n---\n',
            image: `![${selectedText || 'alt text'}](image-url)`,
            alert: `:::warning ${selectedText || 'Uyarı'}\nUyarı içeriği...\n:::`,
            tabs: `:::tabs\n:::tab Sekme 1\n${selectedText || 'Sekme içeriği...'}\n:::\n:::tab Sekme 2\nSekme içeriği...\n:::\n:::`,
            spoiler: `:::spoiler Spoiler\n${selectedText || 'Spoiler içeriği...'}\n:::`,
            checklist: `:::checklist\n- [ ] Görev 1\n- [ ] Görev 2\n:::`,
            highlight: `==${selectedText || 'Vurgulu metin'}==`,
            columns: `:::columns\n:::column\n${selectedText || 'Sol kolon içeriği...'}\n:::\n:::column\nSağ kolon içeriği...\n:::\n:::`,
            accordion: `:::accordion\n:::item Başlık 1\n${selectedText || 'İçerik...'}\n:::\n:::item Başlık 2\nİçerik...\n:::\n:::`,
            toc: `:::toc`,
            embed: `:::embed youtube=VIDEO_ID`,
            figure: `:::figure src=/path/image.jpg caption="Açıklama" alt="Alt text"\n:::`,
            footnote: `${selectedText || 'Dipnot örneği'}[^1]\n\n[^1]: Dipnot açıklaması`,
            noautolink: `:::noautolink\n${selectedText || 'https://example.com'}\n:::`,
            quote: `:::quote title="Kitap Adı" author="Yazar" page="12" image="/path/cover.jpg"\n${selectedText || 'Alıntı metni...'}\n:::`,
            gallery: `:::gallery\n![Başlık](/path/image.jpg)\n![Başlık 2](/path/image2.jpg)\n:::`,
            bubble: `:::bubble side=left name="Karakter" image="/path/character.png"\n${selectedText || 'Mesaj...'}\n:::`,
            flowchart: `\`\`\`flowchart\nA --> B\n\`\`\``,
            sequence: `\`\`\`sequence\nAlice->>Bob: Merhaba\nBob-->>Alice: Selam\n\`\`\``,
        };

        const insert = syntaxMap[action] ?? '';
        editor.dispatch({
            changes: { from: selection.from, to: selection.to, insert },
            selection: { anchor: selection.from + insert.length },
            scrollIntoView: true,
        });
        const newContent = editor.state.doc.toString();
        setContent(newContent);
        onChange(newContent);
        editor.focus();
    };

    const editorExtensions = useMemo(
        () => [
            lineNumbers(),
            highlightActiveLineGutter(),
            foldGutter(),
            keymap.of(foldKeymap),
            markdown(),
            EditorView.lineWrapping,
            EditorView.theme(
                {
                    '&': {
                        backgroundColor: 'transparent',
                        color: '#111827',
                        fontSize: '14px',
                    },
                    '.cm-content': {
                        padding: '16px',
                        fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    },
                    '.cm-gutters': {
                        backgroundColor: 'transparent',
                        borderRight: '1px solid #e5e7eb',
                        color: '#9ca3af',
                        paddingRight: '8px',
                    },
                    '.cm-activeLineGutter': {
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        color: '#2563eb',
                    },
                    '.cm-foldGutter .cm-gutterElement': {
                        color: '#6b7280',
                    },
                },
                { dark: false }
            ),
        ],
        []
    );

    const sanitizedHtml = DOMPurify.sanitize(renderMarkdownWithBlocks(content), {
        USE_PROFILES: { html: true },
        ADD_TAGS: [
            'input',
            'label',
            'details',
            'summary',
            'button',
            'figure',
            'figcaption',
            'abbr',
            'mark',
            'sup',
            'section',
            'nav',
            'iframe',
        ],
        ADD_ATTR: [
            'checked',
            'type',
            'name',
            'id',
            'for',
            'disabled',
            'data-tab',
            'data-tab-panel',
            'data-file',
            'data-lang',
            'data-mermaid',
            'data-rendered',
            'data-gallery',
            'data-src',
            'data-title',
            'aria-hidden',
            'allow',
            'allowfullscreen',
            'loading',
            'referrerpolicy',
            'title',
            'src',
            'width',
            'height',
            'frameborder',
            'target',
            'rel',
        ],
    });

    const outerContainerClass = `flex min-h-0 flex-col overflow-hidden rounded-md border border-input dark:border-border ${
        fullscreen ? 'fixed inset-0 z-50 h-screen bg-card dark:bg-card' : 'h-[70vh]'
    }`;
    const editorContainerClass = 'flex flex-1 min-h-0';
    const editorSectionClass = `flex flex-1 min-h-0 min-w-0 flex-col`;
    const previewSectionClass = `flex-1 min-w-0 min-h-0 p-4 overflow-y-auto prose dark:prose-invert max-w-none ${
        showPreview ? 'block' : 'hidden'
    }`;

    return (
        <div className={outerContainerClass}>
            <div className="border-b border-border bg-secondary/70 px-4 py-3 dark:border-border dark:bg-card">
                <Toolbar
                    onAction={handleAction}
                    onTogglePreview={() => setShowPreview(!showPreview)}
                    onToggleFullscreen={() => setFullscreen(!fullscreen)}
                    showPreview={showPreview}
                    fullscreen={fullscreen}
                />
            </div>
            <div className={editorContainerClass}>
                <div className={editorSectionClass}>
                    <div className="flex min-h-0 flex-1 overflow-hidden bg-card dark:bg-card">
                        <CodeMirror
                            value={content}
                            height="100%"
                            maxHeight="100%"
                            minHeight="0"
                            className="h-full"
                            extensions={editorExtensions}
                            onCreateEditor={(editor) => {
                                editorRef.current = editor;
                            }}
                            onChange={(newValue) => {
                                setContent(newValue);
                                onChange(newValue);
                            }}
                            theme="none"
                        />
                    </div>
                    <div className="border-t border-border p-2 text-xs text-muted-foreground dark:border-border dark:text-muted-foreground">
                        Karakter: {content.length}
                    </div>
                </div>
                {showPreview && (
                    <div className="w-1.5 flex-shrink-0 cursor-col-resize bg-accent hover:bg-primary dark:bg-accent"></div>
                )}
                <div className={previewSectionClass} onClick={onGalleryClick}>
                    <h5 className="mb-2 text-lg font-bold dark:text-foreground">Önizleme</h5>
                    <div
                        className="md-content prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                    />
                </div>
            </div>
            {lightbox}
        </div>
    );
}
