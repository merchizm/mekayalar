import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

const ALERT_LABELS = {
    note: 'Not',
    tip: 'İpucu',
    info: 'Bilgi',
    warning: 'Uyarı',
    danger: 'Tehlike',
    success: 'Başarılı',
};

const LANGUAGE_LABELS = {
    js: 'JS',
    javascript: 'JS',
    ts: 'TS',
    typescript: 'TS',
    jsx: 'JSX',
    tsx: 'TSX',
    php: 'PHP',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    md: 'MD',
    markdown: 'MD',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    sh: 'SH',
    bash: 'BASH',
    py: 'PY',
    python: 'PY',
    go: 'GO',
    java: 'JAVA',
    rb: 'RB',
    ruby: 'RB',
    sql: 'SQL',
    text: 'TXT',
};

const LANGUAGE_NORMALIZE = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    sh: 'bash',
    shell: 'bash',
    py: 'python',
    yml: 'yaml',
    md: 'markdown',
};

const ALERT_BLOCK_REGEX = /^:::([a-zA-Z]+)(?:\s+([^\r\n]+))?\r?\n([\s\S]*?)\r?\n:::\s*$/gm;
const SPOILER_BLOCK_REGEX = /^:::spoiler(?:\s+([^\r\n]+))?\r?\n([\s\S]*?)\r?\n:::\s*$/gm;
const CHECKLIST_BLOCK_REGEX = /^:::checklist\s*\r?\n([\s\S]*?)\r?\n:::\s*$/gm;
const TAB_START_REGEX = /^:::tab(?:\s+([^\r\n]+))?\s*$/;
const COLUMN_START_REGEX = /^:::column(?:\s+([^\r\n]+))?\s*$/;
const ACCORDION_ITEM_REGEX = /^:::item(?:\s+([^\r\n]+))?\s*$/;

const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (char) => {
        switch (char) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#39;';
            default:
                return char;
        }
    });

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const slugify = (value, seen) => {
    const base = String(value || '')
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[`~!@#$%^&*()=+{}[\]|\\;:'",.<>/?]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    const slug = base || 'section';
    const count = seen.get(slug) || 0;
    seen.set(slug, count + 1);
    return count ? `${slug}-${count}` : slug;
};

const stripInline = (value) =>
    String(value || '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1');

const parseAttributes = (input = '') => {
    const attrs = {};
    const regex = /(\w+)=(("[^"]+")|('[^']+')|[^\s]+)/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
        attrs[match[1].toLowerCase()] = match[2].replace(/^['"]|['"]$/g, '');
    }
    return attrs;
};

const parseInfoString = (info = '') => {
    const parts = info.trim().split(/\s+/).filter(Boolean);
    const lang = parts.shift() || '';
    const meta = parts.join(' ');
    let file = '';
    const flags = [];
    const match = meta.match(/(?:file|filename|title)=("[^"]+"|'[^']+'|\S+)/i);
    if (match) {
        file = match[1].replace(/^['"]|['"]$/g, '');
    }
    meta.split(/\s+/).forEach((token) => {
        if (!token || token.includes('=')) {
            return;
        }
        flags.push(token.toLowerCase());
    });
    return { lang, file, flags };
};

const normalizeLang = (lang) => {
    const key = String(lang || '').trim().toLowerCase();
    return LANGUAGE_NORMALIZE[key] || key || 'text';
};

const getLabelFor = (key) => LANGUAGE_LABELS[key] || LANGUAGE_LABELS.text;

const sanitizeClass = (value) => value.replace(/[^a-z0-9-]/g, '');

const isMermaidLang = (lang) => ['mermaid', 'flowchart', 'sequence'].includes(lang);

const normalizeMermaidCode = (lang, code) => {
    const trimmed = String(code || '').trim();
    if (lang === 'flowchart') {
        return trimmed.startsWith('flowchart') ? trimmed : `flowchart TD\n${trimmed}`;
    }
    if (lang === 'sequence') {
        return trimmed.startsWith('sequenceDiagram') ? trimmed : `sequenceDiagram\n${trimmed}`;
    }
    return trimmed;
};

const buildMermaidHtml = (lang, code, flags = []) => {
    const mermaidCode = normalizeMermaidCode(lang, code);
    const plainClass = flags.includes('plain') || flags.includes('nocard') ? ' md-mermaid-plain' : '';
    return `<div class="md-mermaid${plainClass}" data-mermaid>${escapeHtml(mermaidCode)}</div>`;
};

const buildCodeBlockHtml = (code, info) => {
    const normalizedCode = String(code || '').replace(/\n$/, '');
    const { lang, file, flags } = parseInfoString(info);
    const normalizedLang = normalizeLang(lang);

    if (isMermaidLang(normalizedLang)) {
        return buildMermaidHtml(normalizedLang, normalizedCode, flags);
    }

    const fileExt = file ? file.split('.').pop().toLowerCase() : '';
    const labelKey = fileExt || normalizedLang || 'text';
    const label = getLabelFor(labelKey);
    const langClass = `md-lang-${sanitizeClass(labelKey)}`;
    const lineCount = Math.max(1, normalizedCode.split('\n').length);
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
    const fileHtml = file ? `<span class="md-code-file">${escapeHtml(file)}</span>` : '';
    const langHtml = `<span class="md-code-lang ${langClass}" data-lang="${escapeHtml(labelKey)}">${escapeHtml(label)}</span>`;
    const dataFile = file ? ` data-file="${escapeHtml(file)}"` : '';
    const headerHtml = `<div class="md-code-header">${fileHtml}${langHtml}</div>`;

    return [
        `<details class="md-code-block" data-lang="${escapeHtml(normalizedLang)}"${dataFile} open>`,
        `<summary class="md-code-summary">${headerHtml}</summary>`,
        `<div class="md-code-body">`,
        `<div class="md-code-lines" aria-hidden="true">${lineNumbers}</div>`,
        `<pre><code class="language-${escapeHtml(normalizedLang)}">${escapeHtml(normalizedCode)}</code></pre>`,
        `</div>`,
        `</details>`,
    ].join('');
};

const replaceFencedCodeBlocks = (markdown, addBlock) => {
    const lines = String(markdown || '').split(/\r?\n/);
    const output = [];
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const fenceMatch = line.match(/^```(.*)$/);
        if (fenceMatch) {
            const info = fenceMatch[1] || '';
            const codeLines = [];
            let closed = false;
            let j = i + 1;
            for (; j < lines.length; j += 1) {
                if (/^```/.test(lines[j])) {
                    closed = true;
                    break;
                }
                codeLines.push(lines[j]);
            }
            if (closed) {
                const html = buildCodeBlockHtml(codeLines.join('\n'), info);
                output.push(addBlock(html));
                i = j;
                continue;
            }
        }
        output.push(line);
    }
    return output.join('\n');
};

const buildChecklistHtml = (body) => {
    const lines = body.split(/\r?\n/);
    const items = lines
        .map((line) => {
            const match = line.match(/^\s*[-*]\s+\[( |x|X)\]\s+(.*)$/);
            if (!match) {
                return null;
            }
            const checked = match[1].toLowerCase() === 'x';
            const text = match[2].trim();
            const itemHtml = marked.parseInline(text || '');
            return `<li><label><input type="checkbox" disabled ${checked ? 'checked' : ''} />${itemHtml}</label></li>`;
        })
        .filter(Boolean);

    if (!items.length) {
        return null;
    }

    return `<ul class="md-checklist">${items.join('')}</ul>`;
};

const buildColumnsHtml = (columns, depth, options, config = {}) => {
    const plainClass = config.plain ? ' md-columns-plain' : '';
    const columnHtml = columns
        .map((col) => {
            const body = Array.isArray(col.body) ? col.body.join('\n') : col.body || '';
            return `<div class="md-column">${renderMarkdownWithBlocks(body.trim(), depth + 1, options)}</div>`;
        })
        .join('');
    return `<div class="md-columns${plainClass}">${columnHtml}</div>`;
};

const buildAccordionHtml = (items, depth, options) => {
    const itemHtml = items
        .map((item, index) => {
            const title = escapeHtml(item.title || `Item ${index + 1}`);
            const body = Array.isArray(item.body) ? item.body.join('\n') : item.body || '';
            const bodyHtml = renderMarkdownWithBlocks(body.trim(), depth + 1, options);
            return [
                `<details class="md-accordion-item">`,
                `<summary class="md-accordion-title">${title}</summary>`,
                `<div class="md-accordion-body">${bodyHtml}</div>`,
                `</details>`,
            ].join('');
        })
        .join('');
    return `<div class="md-accordion">${itemHtml}</div>`;
};

const buildEmbedHtml = (attrs) => {
    const type = Object.keys(attrs)[0];
    const value = attrs[type];
    if (!type || !value) {
        return '';
    }

    let src = '';
    let title = `${type} embed`;

    if (type === 'youtube') {
        const match = value.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
        const id = match ? match[1] : value;
        src = `https://www.youtube-nocookie.com/embed/${id}?si=hDW_8NptTpT7Jp8f`;
        return [
            `<div class="md-embed md-embed-${escapeHtml(type)}">`,
            `<iframe width="560" height="315" src="${escapeHtml(src)}"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen></iframe>`,
            `</div>`,
        ].join('');
    } else if (type === 'figma') {
        const url = value;
        src = `https://www.figma.com/embed?embed_host=mekayalar&url=${encodeURIComponent(url)}`;
        title = 'Figma embed';
        return [
            `<div class="md-embed md-embed-${escapeHtml(type)}">`,
            `<iframe src="${escapeHtml(src)}" title="${escapeHtml(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="no-referrer"></iframe>`,
            `</div>`,
        ].join('');
    } else {
        return '';
    }
};

const buildFigureHtml = (attrs, body) => {
    if (!attrs.src) {
        return '';
    }

    const caption = attrs.caption || attrs.title || body.trim();
    const captionHtml = caption ? `<figcaption>${marked.parseInline(caption)}</figcaption>` : '';
    const alt = attrs.alt || caption || '';

    return [
        `<figure class="md-figure">`,
        `<img src="${escapeHtml(attrs.src)}" alt="${escapeHtml(alt)}" loading="lazy" />`,
        captionHtml,
        `</figure>`,
    ].join('');
};

const buildGalleryHtml = (body, galleryId) => {
    const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const items = [];
    let match;
    while ((match = regex.exec(body)) !== null) {
        const title = match[1].trim();
        const src = match[2].trim();
        if (src) {
            items.push({ src, title });
        }
    }
    if (!items.length) {
        return '';
    }

    const itemsHtml = items
        .map((item) => {
            const titleHtml = item.title ? `<span class="md-gallery-title">${escapeHtml(item.title)}</span>` : '';
            return [
                `<button type="button" class="md-gallery-item" data-src="${escapeHtml(item.src)}" data-title="${escapeHtml(item.title)}">`,
                `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title || 'Gallery image')}" loading="lazy" />`,
                titleHtml,
                `</button>`,
            ].join('');
        })
        .join('');

    return `<div class="md-gallery" data-gallery="${escapeHtml(galleryId)}">${itemsHtml}</div>`;
};

const buildQuoteHtml = (attrs, bodyHtml) => {
    const title = attrs.title || '';
    const author = attrs.author || '';
    const page = attrs.page || '';
    const image = attrs.image || '';
    const imageHtml = image
        ? `<div class="md-quote-cover"><img src="${escapeHtml(image)}" alt="${escapeHtml(title || 'Quote')}" loading="lazy" /></div>`
        : '';
    const titleHtml = title ? `<div class="md-quote-title">${escapeHtml(title)}</div>` : '';
    const authorHtml = author ? `<div class="md-quote-author">${escapeHtml(author)}</div>` : '';
    const pageHtml = page ? `<div class="md-quote-page">s. ${escapeHtml(page)}</div>` : '';
    const metaHtml = `<div class="md-quote-meta">${titleHtml}${authorHtml}${pageHtml}</div>`;

    return [
        `<figure class="md-quote">`,
        `<blockquote>${bodyHtml}</blockquote>`,
        `<div class="md-quote-footer">${imageHtml}${metaHtml}</div>`,
        `</figure>`,
    ].join('');
};

const buildBubbleHtml = (attrs, bodyHtml) => {
    const rawSide = (attrs.side || attrs.position || attrs.align || 'left').toLowerCase();
    const side = ['left', 'right', 'top'].includes(rawSide) ? rawSide : 'left';
    const name = attrs.name || attrs.character || attrs.title || '';
    const image = attrs.image || attrs.avatar || '';
    const sideClass = `md-bubble-${side}`;
    const avatarHtml = image
        ? `<div class="md-bubble-avatar"><img src="${escapeHtml(image)}" alt="${escapeHtml(name || 'Character')}" loading="lazy" /></div>`
        : '';
    const nameHtml = name ? `<div class="md-bubble-name">${escapeHtml(name)}</div>` : '';

    return [
        `<div class="md-bubble ${sideClass}">`,
        avatarHtml,
        `<div class="md-bubble-content">`,
        nameHtml,
        `<div class="md-bubble-text">${bodyHtml}</div>`,
        `</div>`,
        `</div>`,
    ].join('');
};

const parseAbbreviations = (markdown) => {
    const lines = markdown.split(/\r?\n/);
    const abbreviations = {};
    const output = [];

    lines.forEach((line) => {
        const match = line.match(/^\*\[([^\]]+)\]:\s*(.+)$/);
        if (match) {
            abbreviations[match[1]] = match[2].trim();
        } else {
            output.push(line);
        }
    });

    return { markdown: output.join('\n'), abbreviations };
};

const applyAbbreviations = (markdown, abbreviations) => {
    let result = markdown;
    Object.entries(abbreviations).forEach(([abbr, title]) => {
        const regex = new RegExp(`\\b${escapeRegExp(abbr)}\\b`, 'g');
        result = result.replace(
            regex,
            `<abbr class="md-abbr" title="${escapeHtml(title)}">${escapeHtml(abbr)}</abbr>`,
        );
    });
    return result;
};

const parseFootnotes = (markdown) => {
    const lines = markdown.split(/\r?\n/);
    const notes = {};
    const output = [];

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const match = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
        if (!match) {
            output.push(line);
            continue;
        }

        const key = match[1];
        const body = [match[2]];
        let j = i + 1;
        for (; j < lines.length; j += 1) {
            const continuation = lines[j];
            if (!/^\s{2,}/.test(continuation)) {
                break;
            }
            body.push(continuation.trim());
        }
        notes[key] = body.join(' ').trim();
        i = j - 1;
    }

    return { markdown: output.join('\n'), notes };
};

const applyFootnoteRefs = (markdown, notes) => {
    const order = [];
    const refs = {};
    const result = markdown.replace(/\[\^([^\]]+)\]/g, (match, key) => {
        if (!notes[key]) {
            return match;
        }
        if (!refs[key]) {
            order.push(key);
            refs[key] = order.length;
        }
        const index = refs[key];
        return `<sup class="md-footnote-ref"><a href="#fn-${escapeHtml(key)}" id="fnref-${escapeHtml(key)}">${index}</a></sup>`;
    });

    return { markdown: result, order };
};

const buildFootnotesHtml = (order, notes) => {
    if (!order.length) {
        return '';
    }
    const items = order
        .map((key) => {
            const text = notes[key] || '';
            const bodyHtml = marked.parseInline(text);
            return `<li id="fn-${escapeHtml(key)}">${bodyHtml} <a href="#fnref-${escapeHtml(key)}" class="md-footnote-back">↩</a></li>`;
        })
        .join('');

    return `<section class="md-footnotes"><ol>${items}</ol></section>`;
};

const protectMarkdownLinks = (markdown) => {
    const placeholders = [];
    const protectedMarkdown = markdown.replace(/!?\[[^\]]*]\([^)]+\)/g, (match) => {
        const placeholder = `@@MDLINK${placeholders.length}@@`;
        placeholders.push(match);
        return placeholder;
    });
    return { markdown: protectedMarkdown, placeholders };
};

const restoreMarkdownLinks = (markdown, placeholders) => {
    let restored = markdown;
    placeholders.forEach((value, index) => {
        restored = restored.replace(`@@MDLINK${index}@@`, value);
    });
    return restored;
};

const autoLinkUrls = (markdown) => {
    const regex = /(^|[\s(>])((https?:\/\/|www\.)[^\s<]+[^\s<.,;:!?)]?)/g;
    return markdown.replace(regex, (match, prefix, url) => {
        if (url.includes('www.local.host')) {
            return `${prefix}${url}`;
        }
        const href = url.startsWith('http') ? url : `https://${url}`;
        return `${prefix}<a href="${escapeHtml(href)}" rel="noopener noreferrer" target="_blank">${escapeHtml(url)}</a>`;
    });
};

const applyHighlights = (markdown) => markdown.replace(/==([^\n=]+)==/g, '<mark class="md-highlight">$1</mark>');

const extractHeadings = (markdown) => {
    const lines = markdown.split(/\r?\n/);
    const seen = new Map();
    const headings = [];
    lines.forEach((line) => {
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (!match) {
            return;
        }
        const level = match[1].length;
        const rawText = stripInline(match[2].trim());
        const slug = slugify(rawText, seen);
        headings.push({ level, text: rawText, slug });
    });
    return headings;
};

const buildTocHtml = (headings) => {
    if (!headings.length) {
        return '';
    }

    let html = '<nav class="md-toc"><div class="md-toc-title">İçindekiler</div>';
    const stack = [0];

    headings.forEach((heading) => {
        while (stack[stack.length - 1] < heading.level) {
            html += '<ul>';
            stack.push(stack[stack.length - 1] + 1);
        }
        while (stack[stack.length - 1] > heading.level) {
            html += '</ul>';
            stack.pop();
        }
        html += `<li><a href="#${escapeHtml(heading.slug)}">${escapeHtml(heading.text)}</a></li>`;
    });

    while (stack.length > 1) {
        html += '</ul>';
        stack.pop();
    }

    html += '</nav>';
    return html;
};

const renderWithHeadingIds = (markdown, headings) => {
    const seen = new Map();
    const renderer = new marked.Renderer();
    renderer.heading = (token) => {
        const rawText = stripInline(token.text || '');
        const slug = slugify(rawText, seen);
        return `<h${token.depth} id="${escapeHtml(slug)}">${token.text}</h${token.depth}>`;
    };
    return marked.parse(markdown, { renderer });
};

export const renderMarkdownWithBlocks = (markdown = '', depth = 0, options = {}) => {
    if (!markdown) {
        return '';
    }

    if (depth > 4) {
        return marked.parse(markdown);
    }

    const { disableAutoLink = false } = options;

    const blocks = [];
    let blockIndex = 0;
    const addBlock = (html) => {
        const placeholder = `<div data-md-block="${depth}-${blockIndex}"></div>`;
        blocks.push({ placeholder, html });
        blockIndex += 1;
        return `\n\n${placeholder}\n\n`;
    };

    const markdownWithoutCode = replaceFencedCodeBlocks(markdown, addBlock);
    const markdownWithEmbeds = markdownWithoutCode.replace(/<iframe[\s\S]*?<\/iframe>/gi, (match) =>
        addBlock(`<div class="md-embed md-embed-html">${match}</div>`),
    );
    const headings = extractHeadings(markdownWithEmbeds);
    let working = markdownWithEmbeds;

    const lines = working.split(/\r?\n/);
    const outputLines = [];
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed === ':::tabs') {
            const tabs = [];
            let currentTab = null;
            let j = i + 1;
            let closed = false;

            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                const innerTrimmed = innerLine.trim();

                const tabMatch = innerTrimmed.match(TAB_START_REGEX);
                if (tabMatch) {
                    if (currentTab) {
                        tabs.push(currentTab);
                    }
                    currentTab = { title: (tabMatch[1] || `Sekme ${tabs.length + 1}`).trim(), body: [] };
                    continue;
                }

                if (innerTrimmed === ':::') {
                    if (currentTab) {
                        tabs.push(currentTab);
                        currentTab = null;
                        continue;
                    }
                    closed = true;
                    break;
                }

                if (currentTab) {
                    currentTab.body.push(innerLine);
                }
            }

            if (closed && tabs.length) {
                const tabIdBase = `md-tab-${depth}-${blockIndex}`;
                const listHtml = tabs
                    .map((tab, index) => {
                        const isActive = index === 0 ? ' is-active' : '';
                        return `<button type="button" class="md-tab-button${isActive}" data-tab="${tabIdBase}-${index}">${escapeHtml(tab.title)}</button>`;
                    })
                    .join('');
                const panelsHtml = tabs
                    .map((tab, index) => {
                        const isActive = index === 0 ? ' is-active' : '';
                        const bodyHtml = renderMarkdownWithBlocks(tab.body.join('\n').trim(), depth + 1, options);
                        return `<div class="md-tab-panel${isActive}" data-tab-panel="${tabIdBase}-${index}">${bodyHtml}</div>`;
                    })
                    .join('');
                const html = [
                    `<div class="md-tabs" data-tabs>`,
                    `<div class="md-tabs-list">${listHtml}</div>`,
                    `<div class="md-tabs-panels">${panelsHtml}</div>`,
                    `</div>`,
                ].join('');
                outputLines.push(addBlock(html));
                i = j;
                continue;
            }
        }

        if (trimmed.startsWith(':::columns')) {
            const columnsConfig = trimmed.replace(':::columns', '').trim().toLowerCase();
            const plain = columnsConfig.includes('plain') || columnsConfig.includes('nocard');
            const columns = [];
            let currentColumn = null;
            let j = i + 1;
            let closed = false;

            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                const innerTrimmed = innerLine.trim();

                const colMatch = innerTrimmed.match(COLUMN_START_REGEX);
                if (colMatch) {
                    if (currentColumn) {
                        columns.push(currentColumn);
                    }
                    currentColumn = { title: (colMatch[1] || '').trim(), body: [] };
                    continue;
                }

                if (innerTrimmed === ':::') {
                    if (currentColumn) {
                        columns.push(currentColumn);
                        currentColumn = null;
                        continue;
                    }
                    closed = true;
                    break;
                }

                if (currentColumn) {
                    currentColumn.body.push(innerLine);
                }
            }

            if (closed && columns.length) {
                const html = buildColumnsHtml(columns, depth, options, { plain });
                outputLines.push(addBlock(html));
                i = j;
                continue;
            }
        }

        if (trimmed === ':::accordion') {
            const items = [];
            let currentItem = null;
            let j = i + 1;
            let closed = false;

            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                const innerTrimmed = innerLine.trim();

                const itemMatch = innerTrimmed.match(ACCORDION_ITEM_REGEX);
                if (itemMatch) {
                    if (currentItem) {
                        items.push(currentItem);
                    }
                    currentItem = { title: (itemMatch[1] || '').trim(), body: [] };
                    continue;
                }

                if (innerTrimmed === ':::') {
                    if (currentItem) {
                        items.push(currentItem);
                        currentItem = null;
                        continue;
                    }
                    closed = true;
                    break;
                }

                if (currentItem) {
                    currentItem.body.push(innerLine);
                }
            }

            if (closed && items.length) {
                const html = buildAccordionHtml(items, depth, options);
                outputLines.push(addBlock(html));
                i = j;
                continue;
            }
        }

        if (trimmed.startsWith(':::embed')) {
            const attrs = parseAttributes(trimmed.replace(':::embed', ''));
            const html = buildEmbedHtml(attrs);
            if (html) {
                outputLines.push(addBlock(html));
                continue;
            }
        }

        if (trimmed.startsWith(':::figure')) {
            const attrs = parseAttributes(trimmed.replace(':::figure', ''));
            const body = [];
            let j = i + 1;
            let closed = false;
            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                if (innerLine.trim() === ':::') {
                    closed = true;
                    break;
                }
                body.push(innerLine);
            }
            if (closed) {
                const html = buildFigureHtml(attrs, body.join('\n'));
                if (html) {
                    outputLines.push(addBlock(html));
                    i = j;
                    continue;
                }
            }
        }

        if (trimmed.startsWith(':::gallery')) {
            const body = [];
            let j = i + 1;
            let closed = false;
            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                if (innerLine.trim() === ':::') {
                    closed = true;
                    break;
                }
                body.push(innerLine);
            }
            if (closed) {
                const galleryId = `gallery-${depth}-${blockIndex}`;
                const html = buildGalleryHtml(body.join('\n'), galleryId);
                if (html) {
                    outputLines.push(addBlock(html));
                    i = j;
                    continue;
                }
            }
        }

        if (trimmed.startsWith(':::quote')) {
            const attrs = parseAttributes(trimmed.replace(':::quote', ''));
            const body = [];
            let j = i + 1;
            let closed = false;
            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                if (innerLine.trim() === ':::') {
                    closed = true;
                    break;
                }
                body.push(innerLine);
            }
            if (closed) {
                const bodyHtml = renderMarkdownWithBlocks(body.join('\n').trim(), depth + 1, options);
                const html = buildQuoteHtml(attrs, bodyHtml);
                outputLines.push(addBlock(html));
                i = j;
                continue;
            }
        }

        if (trimmed.startsWith(':::bubble')) {
            const attrs = parseAttributes(trimmed.replace(':::bubble', ''));
            const body = [];
            let j = i + 1;
            let closed = false;
            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                if (innerLine.trim() === ':::') {
                    closed = true;
                    break;
                }
                body.push(innerLine);
            }
            if (closed) {
                const bodyHtml = renderMarkdownWithBlocks(body.join('\n').trim(), depth + 1, options);
                const html = buildBubbleHtml(attrs, bodyHtml);
                outputLines.push(addBlock(html));
                i = j;
                continue;
            }
        }

        if (trimmed.startsWith(':::noautolink')) {
            const body = [];
            let j = i + 1;
            let closed = false;
            for (; j < lines.length; j += 1) {
                const innerLine = lines[j];
                if (innerLine.trim() === ':::') {
                    closed = true;
                    break;
                }
                body.push(innerLine);
            }
            if (closed) {
                const bodyHtml = renderMarkdownWithBlocks(body.join('\n').trim(), depth + 1, options);
                outputLines.push(addBlock(bodyHtml));
                i = j;
                continue;
            }
        }

        if (trimmed === ':::toc') {
            const tocHtml = buildTocHtml(headings);
            if (tocHtml) {
                outputLines.push(addBlock(tocHtml));
                continue;
            }
        }

        outputLines.push(line);
    }

    working = outputLines.join('\n');

    working = working.replace(ALERT_BLOCK_REGEX, (match, type, title, body) => {
        const normalized = String(type || '').toLowerCase();
        if (!ALERT_LABELS[normalized]) {
            return match;
        }

        const label = (title || ALERT_LABELS[normalized]).trim();
        const bodyHtml = renderMarkdownWithBlocks(body.trim(), depth + 1, options);
        const html = [
            `<div class="md-alert md-alert-${normalized}">`,
            `<div class="md-alert-title">${escapeHtml(label)}</div>`,
            `<div class="md-alert-body">${bodyHtml}</div>`,
            `</div>`,
        ].join('');

        return addBlock(html);
    });

    working = working.replace(SPOILER_BLOCK_REGEX, (match, title, body) => {
        const label = (title || 'Spoiler').trim();
        const bodyHtml = renderMarkdownWithBlocks(body.trim(), depth + 1, options);
        const html = [
            `<details class="md-spoiler">`,
            `<summary class="md-spoiler-title">${escapeHtml(label)}</summary>`,
            `<div class="md-spoiler-body">${bodyHtml}</div>`,
            `</details>`,
        ].join('');
        return addBlock(html);
    });

    working = working.replace(CHECKLIST_BLOCK_REGEX, (match, body) => {
        const checklistHtml = buildChecklistHtml(body.trim());
        if (!checklistHtml) {
            return match;
        }
        return addBlock(checklistHtml);
    });

    const { markdown: withoutAbbr, abbreviations } = parseAbbreviations(working);
    const { markdown: withoutFootnotes, notes } = parseFootnotes(withoutAbbr);

    let processed = applyHighlights(withoutFootnotes);

    if (!disableAutoLink) {
        const { markdown: protectedLinks, placeholders } = protectMarkdownLinks(processed);
        const linked = autoLinkUrls(protectedLinks);
        processed = restoreMarkdownLinks(linked, placeholders);
    }

    processed = applyAbbreviations(processed, abbreviations);

    const { markdown: withFootnotes, order } = applyFootnoteRefs(processed, notes);

    const rendered = renderWithHeadingIds(withFootnotes, headings);

    let html = rendered;
    blocks.forEach(({ placeholder, html: blockHtml }) => {
        html = html.replace(placeholder, blockHtml);
    });

    const footnotesHtml = buildFootnotesHtml(order, notes);
    if (footnotesHtml) {
        html += footnotesHtml;
    }

    return html;
};

let mermaidLoader = null;

const loadMermaid = async () => {
    if (!mermaidLoader) {
        mermaidLoader = import('mermaid').then((module) => {
            const mermaid = module.default;
            mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
            return mermaid;
        });
    }
    return mermaidLoader;
};

const renderMermaid = async (container) => {
    const mermaid = await loadMermaid();
    const targets = container.querySelectorAll('.md-mermaid:not([data-rendered])');
    await Promise.all(
        Array.from(targets).map(async (node, index) => {
            const code = node.textContent || '';
            const id = `md-mermaid-${Date.now()}-${index}`;
            try {
                const { svg } = await mermaid.render(id, code);
                node.innerHTML = svg;
                node.setAttribute('data-rendered', 'true');
            } catch (error) {
                node.setAttribute('data-rendered', 'true');
            }
        }),
    );
};

export const bindMarkdownTabs = () => {
    if (typeof document === 'undefined') {
        return;
    }

    if (document.__mdTabsBound) {
        return;
    }

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.md-tab-button');
        if (!button) {
            return;
        }

        const container = button.closest('.md-tabs');
        if (!container) {
            return;
        }

        const tabId = button.getAttribute('data-tab');
        if (!tabId) {
            return;
        }

        container.querySelectorAll('.md-tab-button').forEach((btn) => {
            btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tabId);
        });
        container.querySelectorAll('.md-tab-panel').forEach((panel) => {
            panel.classList.toggle('is-active', panel.getAttribute('data-tab-panel') === tabId);
        });
    });

    document.__mdTabsBound = true;
};

export const bindMarkdownMermaid = () => {
    if (typeof document === 'undefined') {
        return;
    }

    if (document.__mdMermaidBound) {
        return;
    }

    const observer = new MutationObserver(() => {
        renderMermaid(document.body);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    renderMermaid(document.body);

    document.__mdMermaidBound = true;
};
