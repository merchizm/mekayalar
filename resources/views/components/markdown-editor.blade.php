<style>
    body {
        margin: 0;
        padding: 0;
    }

    #editor-container {
        display: flex;
        height: 40vh;
    }

    #markdown-editor, #html-preview {
        padding: 10px;
        height: 100%;
        overflow-y: auto;
    }

    #markdown-editor {
        width: 50%;
        resize: none;
    }

    #html-preview {
        width: 50%;
        border-left: 1px solid #ccc;
    }

    /* Divider line */
    #divider {
        width: 5px;
        background-color: #ccc;
        cursor: col-resize;
        position: relative;
    }

    /* Fullscreen preview */
    #html-preview.fullscreen {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        width: 100% !important;
        height: 100% !important;
        background-color: white;
        overflow-y: auto;
    }

    .bottom-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        border-top: 1px solid #ccc;
    }

    .toolbar-btn {
        margin-right: 5px;
    }

    /* Hide Preview CSS */
    #html-preview.hidden {
        display: none;
    }
</style>
<div id="editor-container">
    <!-- Markdown Editor Area -->
    <div id="markdown-editor" class="form-control">
        <!-- Toolbar -->
        <div id="toolbar" class="mb-2">
            <button id="bold-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Bold"><i class="bi bi-type-bold"></i></button>
            <button id="italic-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Italic"><i class="bi bi-type-italic"></i></button>
            <button id="heading-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Heading"><i class="bi bi-type-h1"></i></button>
            <button id="link-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Link"><i class="bi bi-link-45deg"></i></button>
            <button id="strikethrough-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Strikethrough"><i class="bi bi-type-strikethrough"></i></button>
            <button id="blockquote-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Blockquote"><i class="bi bi-blockquote-right"></i></button>
            <button id="codeblock-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Code Block"><i class="bi bi-code-slash"></i></button>
            <button id="ul-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Unordered List"><i class="bi bi-list-ul"></i></button>
            <button id="ol-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Ordered List"><i class="bi bi-list-ol"></i></button>
            <button id="hr-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Horizontal Rule"><i class="bi bi-dash-lg"></i></button>
            <button id="image-btn" class="btn btn-sm btn-secondary toolbar-btn" title="Image"><i class="bi bi-image"></i></button>

            <!-- Hide/Show Preview Button -->
            <button id="preview-hide-btn" class="btn btn-sm btn-warning toolbar-btn" title="Hide Preview"><i class="bi bi-eye-slash"></i></button>

            <!-- Fullscreen Preview Button -->
            <button id="preview-fullscreen-btn" class="btn btn-sm btn-info toolbar-btn float-end" title="Fullscreen Preview"><i class="bi bi-arrows-fullscreen"></i></button>
        </div>
        <textarea id="markdown-content" class="form-control" placeholder="Write your markdown here..." name="{{ $name }}" style="height: calc(100% - 60px);">{{ $value }}</textarea>

        <!-- Bottom Bar for character count -->
        <div class="bottom-bar">
            <span id="character-count">Characters: 0</span>
        </div>
    </div>

    <!-- Divider for adjustable split -->
    <div id="divider"></div>

    <!-- HTML Preview Area -->
    <div id="html-preview">
        <h5 class="mb-2">HTML Preview</h5>
        <div id="html-content"></div>
    </div>
</div>
<script>
    const renderFun = function () {
        const markdownContent = document.getElementById('markdown-content');
        const htmlContent = document.getElementById('html-content');
        const charCountDisplay = document.getElementById('character-count');

        // Convert Markdown to HTML and sanitize
        const html = marked.parse(markdownContent.value);
        htmlContent.innerHTML = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

        // Update character count
        const characterCount = markdownContent.value.length;
        charCountDisplay.textContent = `Characters: ${characterCount}`;
    };
    
    // Event listener for markdown to HTML conversion and character count
    document.getElementById('markdown-content').addEventListener('input', renderFun);


    document.addEventListener('DOMContentLoaded', renderFun);

    // Fullscreen preview toggle
    document.getElementById('preview-fullscreen-btn').addEventListener('click', function () {
        const htmlPreview = document.getElementById('html-preview');
        const fullscreenButton = document.getElementById('preview-fullscreen-btn');

        htmlPreview.classList.toggle('fullscreen');
        if (htmlPreview.classList.contains('fullscreen')) {
            // Switch to exit full-screen mode
            fullscreenButton.innerHTML = '<i class="bi bi-arrows-collapse"></i>';
            fullscreenButton.title = 'Exit Fullscreen';
        } else {
            // Switch back to enter full-screen mode
            fullscreenButton.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
            fullscreenButton.title = 'Fullscreen Preview';
        }
    });

    // Hide/Show preview toggle
    document.getElementById('preview-hide-btn').addEventListener('click', function () {
        const htmlPreview = document.getElementById('html-preview');
        const hideButton = document.getElementById('preview-hide-btn');
        htmlPreview.classList.toggle('hidden');

        if (htmlPreview.classList.contains('hidden')) {
            hideButton.innerHTML = '<i class="bi bi-eye"></i>';
            hideButton.title = 'Show Preview';
        } else {
            hideButton.innerHTML = '<i class="bi bi-eye-slash"></i>';
            hideButton.title = 'Hide Preview';
        }
    });

    // Adjustable divider logic
    const divider = document.getElementById('divider');
    const editor = document.getElementById('markdown-editor');
    const preview = document.getElementById('html-preview');
    let isResizing = false;

    divider.addEventListener('mousedown', function (e) {
        isResizing = true;
        document.addEventListener('mousemove', resizeEditor);
        document.addEventListener('mouseup', stopResizing);
    });

    function resizeEditor(e) {
        if (isResizing) {
            const containerWidth = document.getElementById('editor-container').offsetWidth;
            const newEditorWidth = (e.clientX / containerWidth) * 100;
            editor.style.width = `${newEditorWidth}%`;
            preview.style.width = `${100 - newEditorWidth}%`;
        }
    }

    function stopResizing() {
        isResizing = false;
        document.removeEventListener('mousemove', resizeEditor);
        document.removeEventListener('mouseup', stopResizing);
    }

    // Insert markdown syntax functions
    function insertMarkdownSyntax(markdownSyntax, placeholder = '') {
        const markdownContent = document.getElementById('markdown-content');
        const startPos = markdownContent.selectionStart;
        const endPos = markdownContent.selectionEnd;
        const currentText = markdownContent.value;

        // Insert markdown syntax around the selected text
        markdownContent.value = currentText.slice(0, startPos) + markdownSyntax.replace('{content}', currentText.slice(startPos, endPos) || placeholder) + currentText.slice(endPos);
    }

    // Toolbar button listeners for inserting markdown syntax
    document.getElementById('bold-btn').addEventListener('click', function () {
        insertMarkdownSyntax('**{content}**', 'bold text');
    });

    document.getElementById('italic-btn').addEventListener('click', function () {
        insertMarkdownSyntax('*{content}*', 'italic text');
    });

    document.getElementById('heading-btn').addEventListener('click', function () {
        insertMarkdownSyntax('# {content}', 'Heading');
    });

    document.getElementById('link-btn').addEventListener('click', function () {
        insertMarkdownSyntax('[{content}](url)', 'link text');
    });

    document.getElementById('strikethrough-btn').addEventListener('click', function () {
        insertMarkdownSyntax('~~{content}~~', 'strikethrough text');
    });

    document.getElementById('blockquote-btn').addEventListener('click', function () {
        insertMarkdownSyntax('> {content}', 'blockquote');
    });

    document.getElementById('codeblock-btn').addEventListener('click', function () {
        insertMarkdownSyntax('```\n{content}\n```', 'code');
    });

    document.getElementById('ul-btn').addEventListener('click', function () {
        insertMarkdownSyntax('- {content}', 'list item');
    });

    document.getElementById('ol-btn').addEventListener('click', function () {
        insertMarkdownSyntax('1. {content}', 'ordered list item');
    });

    document.getElementById('hr-btn').addEventListener('click', function () {
        insertMarkdownSyntax('\n---\n', '');
    });

    document.getElementById('image-btn').addEventListener('click', function () {
        insertMarkdownSyntax('![{content}](image-url)', 'image alt text');
    });
</script>
