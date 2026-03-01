<?php

namespace App\Models;

use App\Enums\PostEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use LakM\Commenter\Concerns\Commentable;
use LakM\Commenter\Contracts\CommentableContract;
use Parsedown;

class Post extends Model implements CommentableContract
{
    use Commentable;

    protected $fillable = [
        'post_title',
        'post_slug',
        'post_content',
        'post_status',
        'author',
        'post_category_id',
        'post_tags',
        'post_image',
        'type',
        'description',
        'quote_text',
        'quote_page',
        'quote_highlight_color',
    ];

    protected $casts = [
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
        'post_tags'   => 'array',
        'post_status' => PostEnum::class,
    ];

    protected $appends = ['readingTime', 'content'];

    public function getReadingTimeAttribute()
    {
        $text_content         = strip_tags($this->post_content);
        $word_count           = str_word_count($text_content);
        $reading_time_minutes = ceil($word_count / 200);

        return $reading_time_minutes;
    }

    public function post_author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author');
    }

    public function thumbnail(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'post_image');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'post_category_id');
    }

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class)
            ->withPivot('is_primary')
            ->withTimestamps();
    }

    public function albumItems(): HasMany
    {
        return $this->hasMany(PostAlbumItem::class)->orderBy('sort_order');
    }

    public function isStandardPost(): bool
    {
        return (string) $this->type === '0';
    }

    public function isImagePost(): bool
    {
        return in_array((string) $this->type, ['1', '2'], true);
    }

    public function isQuotePost(): bool
    {
        return (string) $this->type === '3';
    }

    public function isAlbumPost(): bool
    {
        return (string) $this->type === '4';
    }

    public function getContentAttribute()
    {
        $Parsedown = new Parsedown();

        $markdown = is_string($this->post_content) ? $this->sanitizeUtf8($this->post_content) : '';

        return $this->sanitizeUtf8($this->renderMarkdownWithBlocks($markdown, $Parsedown));
    }

    private function renderMarkdownWithBlocks(?string $markdown, Parsedown $parser, int $depth = 0, array $options = []): string
    {
        $markdown = $markdown ?? '';
        if ($depth > 4) {
            return $parser->text($markdown);
        }

        $disableAutoLink = $options['disableAutoLink'] ?? false;

        $labels = [
            'note'    => 'Not',
            'tip'     => 'İpucu',
            'info'    => 'Bilgi',
            'warning' => 'Uyarı',
            'danger'  => 'Tehlike',
            'success' => 'Başarılı',
        ];
        $languageLabels = [
            'js'         => 'JS',
            'javascript' => 'JS',
            'ts'         => 'TS',
            'typescript' => 'TS',
            'jsx'        => 'JSX',
            'tsx'        => 'TSX',
            'php'        => 'PHP',
            'html'       => 'HTML',
            'css'        => 'CSS',
            'scss'       => 'SCSS',
            'md'         => 'MD',
            'markdown'   => 'MD',
            'json'       => 'JSON',
            'yaml'       => 'YAML',
            'yml'        => 'YAML',
            'sh'         => 'SH',
            'bash'       => 'BASH',
            'py'         => 'PY',
            'python'     => 'PY',
            'go'         => 'GO',
            'java'       => 'JAVA',
            'rb'         => 'RB',
            'ruby'       => 'RB',
            'sql'        => 'SQL',
            'text'       => 'TXT',
        ];
        $languageNormalize = [
            'js'    => 'javascript',
            'jsx'   => 'jsx',
            'ts'    => 'typescript',
            'tsx'   => 'tsx',
            'sh'    => 'bash',
            'shell' => 'bash',
            'py'    => 'python',
            'yml'   => 'yaml',
            'md'    => 'markdown',
        ];

        $blocks     = [];
        $blockIndex = 0;
        $addBlock   = function (string $html) use (&$blocks, &$blockIndex, $depth): string {
            $placeholder = "<div data-md-block=\"{$depth}-{$blockIndex}\"></div>";
            $blocks[]    = ['placeholder' => $placeholder, 'html' => $html];
            $blockIndex += 1;

            return "\n\n{$placeholder}\n\n";
        };

        $lines       = preg_split('/\R/', $markdown);
        $outputLines = [];
        for ($i = 0; $i < count($lines); $i++) {
            $line = $lines[$i];
            if (preg_match('/^```(.*)$/', $line, $fenceMatch)) {
                $info      = $fenceMatch[1] ?? '';
                $codeLines = [];
                $closed    = false;
                $j         = $i + 1;
                for (; $j < count($lines); $j++) {
                    if (preg_match('/^```/', $lines[$j])) {
                        $closed = true;
                        break;
                    }
                    $codeLines[] = $lines[$j];
                }

                if ($closed) {
                    $outputLines[] = $addBlock(
                        $this->buildCodeBlockHtml(implode("\n", $codeLines), $info, $languageLabels, $languageNormalize)
                    );
                    $i = $j;
                    continue;
                }
            }
            $outputLines[] = $line;
        }

        $markdown = implode("\n", $outputLines);
        $markdown = $this->wrapIframes($markdown, $addBlock);
        $headings = $this->extractHeadings($markdown);

        $lines       = preg_split('/\R/', $markdown);
        $outputLines = [];
        for ($i = 0; $i < count($lines); $i++) {
            $line    = $lines[$i];
            $trimmed = trim($line);

            if ($trimmed === ':::tabs') {
                $tabs       = [];
                $currentTab = null;
                $closed     = false;

                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine    = $lines[$j];
                    $innerTrimmed = trim($innerLine);

                    if (preg_match('/^:::tab(?:\s+(.+))?$/', $innerTrimmed, $tabMatch)) {
                        if ($currentTab) {
                            $tabs[] = $currentTab;
                        }
                        $title      = trim($tabMatch[1] ?? ('Sekme '.(count($tabs) + 1)));
                        $currentTab = ['title' => $title, 'body' => []];
                        continue;
                    }

                    if ($innerTrimmed === ':::') {
                        if ($currentTab) {
                            $tabs[]     = $currentTab;
                            $currentTab = null;
                            continue;
                        }
                        $closed = true;
                        break;
                    }

                    if ($currentTab) {
                        $currentTab['body'][] = $innerLine;
                    }
                }

                if ($closed && $tabs) {
                    $tabIdBase  = "md-tab-{$depth}-{$blockIndex}";
                    $listHtml   = '';
                    $panelsHtml = '';

                    foreach ($tabs as $index => $tab) {
                        $isActive = $index === 0 ? ' is-active' : '';
                        $listHtml .= '<button type="button" class="md-tab-button'.$isActive
                            .'" data-tab="'.$tabIdBase.'-'.$index.'">'.htmlspecialchars($tab['title'], ENT_QUOTES, 'UTF-8').'</button>';
                        $body = trim(implode("\n", $tab['body']));
                        $panelsHtml .= '<div class="md-tab-panel'.$isActive
                            .'" data-tab-panel="'.$tabIdBase.'-'.$index.'">'
                            .$this->renderMarkdownWithBlocks($body, $parser, $depth + 1, $options)
                            .'</div>';
                    }

                    $html = '<div class="md-tabs" data-tabs>'
                        .'<div class="md-tabs-list">'.$listHtml.'</div>'
                        .'<div class="md-tabs-panels">'.$panelsHtml.'</div>'
                        .'</div>';

                    $outputLines[] = $addBlock($html);
                    $i             = $j;
                    continue;
                }
            }

            if (str_starts_with($trimmed, ':::columns')) {
                $columnsConfig = strtolower(trim(str_replace(':::columns', '', $trimmed)));
                $plain         = str_contains($columnsConfig, 'plain') || str_contains($columnsConfig, 'nocard');
                $columns       = [];
                $currentColumn = null;
                $closed        = false;

                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine    = $lines[$j];
                    $innerTrimmed = trim($innerLine);

                    if (preg_match('/^:::column(?:\s+(.+))?$/', $innerTrimmed, $colMatch)) {
                        if ($currentColumn) {
                            $columns[] = $currentColumn;
                        }
                        $currentColumn = ['title' => trim($colMatch[1] ?? ''), 'body' => []];
                        continue;
                    }

                    if ($innerTrimmed === ':::') {
                        if ($currentColumn) {
                            $columns[]     = $currentColumn;
                            $currentColumn = null;
                            continue;
                        }
                        $closed = true;
                        break;
                    }

                    if ($currentColumn) {
                        $currentColumn['body'][] = $innerLine;
                    }
                }

                if ($closed && $columns) {
                    $columnHtml = '';
                    foreach ($columns as $column) {
                        $body = trim(implode("\n", $column['body']));
                        $columnHtml .= '<div class="md-column">'.$this->renderMarkdownWithBlocks($body, $parser, $depth + 1, $options).'</div>';
                    }
                    $class         = $plain ? 'md-columns md-columns-plain' : 'md-columns';
                    $outputLines[] = $addBlock('<div class="'.$class.'">'.$columnHtml.'</div>');
                    $i             = $j;
                    continue;
                }
            }

            if ($trimmed === ':::accordion') {
                $items       = [];
                $currentItem = null;
                $closed      = false;

                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine    = $lines[$j];
                    $innerTrimmed = trim($innerLine);

                    if (preg_match('/^:::item(?:\s+(.+))?$/', $innerTrimmed, $itemMatch)) {
                        if ($currentItem) {
                            $items[] = $currentItem;
                        }
                        $currentItem = ['title' => trim($itemMatch[1] ?? ''), 'body' => []];
                        continue;
                    }

                    if ($innerTrimmed === ':::') {
                        if ($currentItem) {
                            $items[]     = $currentItem;
                            $currentItem = null;
                            continue;
                        }
                        $closed = true;
                        break;
                    }

                    if ($currentItem) {
                        $currentItem['body'][] = $innerLine;
                    }
                }

                if ($closed && $items) {
                    $itemHtml = '';
                    foreach ($items as $index => $item) {
                        $title = htmlspecialchars($item['title'] ?: 'Item '.($index + 1), ENT_QUOTES, 'UTF-8');
                        $body  = trim(implode("\n", $item['body']));
                        $itemHtml .= '<details class="md-accordion-item">'
                            .'<summary class="md-accordion-title">'.$title.'</summary>'
                            .'<div class="md-accordion-body">'.$this->renderMarkdownWithBlocks($body, $parser, $depth + 1, $options).'</div>'
                            .'</details>';
                    }
                    $outputLines[] = $addBlock('<div class="md-accordion">'.$itemHtml.'</div>');
                    $i             = $j;
                    continue;
                }
            }

            if (str_starts_with($trimmed, ':::embed')) {
                $attrs = $this->parseAttributes(str_replace(':::embed', '', $trimmed));
                $html  = $this->buildEmbedHtml($attrs);
                if ($html !== '') {
                    $outputLines[] = $addBlock($html);
                    continue;
                }
            }

            if (str_starts_with($trimmed, ':::figure')) {
                $attrs  = $this->parseAttributes(str_replace(':::figure', '', $trimmed));
                $body   = [];
                $closed = false;
                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine = $lines[$j];
                    if (trim($innerLine) === ':::') {
                        $closed = true;
                        break;
                    }
                    $body[] = $innerLine;
                }
                if ($closed) {
                    $html = $this->buildFigureHtml($attrs, trim(implode("\n", $body)), $parser);
                    if ($html !== '') {
                        $outputLines[] = $addBlock($html);
                        $i             = $j;
                        continue;
                    }
                }
            }

            if (str_starts_with($trimmed, ':::gallery')) {
                $body   = [];
                $closed = false;
                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine = $lines[$j];
                    if (trim($innerLine) === ':::') {
                        $closed = true;
                        break;
                    }
                    $body[] = $innerLine;
                }
                if ($closed) {
                    $galleryId = 'gallery-'.$depth.'-'.$blockIndex;
                    $html      = $this->buildGalleryHtml(implode("\n", $body), $galleryId);
                    if ($html !== '') {
                        $outputLines[] = $addBlock($html);
                        $i             = $j;
                        continue;
                    }
                }
            }

            if (str_starts_with($trimmed, ':::quote')) {
                $attrs  = $this->parseAttributes(str_replace(':::quote', '', $trimmed));
                $body   = [];
                $closed = false;
                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine = $lines[$j];
                    if (trim($innerLine) === ':::') {
                        $closed = true;
                        break;
                    }
                    $body[] = $innerLine;
                }
                if ($closed) {
                    $bodyHtml      = $this->renderMarkdownWithBlocks(trim(implode("\n", $body)), $parser, $depth + 1, $options);
                    $outputLines[] = $addBlock($this->buildQuoteHtml($attrs, $bodyHtml));
                    $i             = $j;
                    continue;
                }
            }

            if (str_starts_with($trimmed, ':::bubble')) {
                $attrs  = $this->parseAttributes(str_replace(':::bubble', '', $trimmed));
                $body   = [];
                $closed = false;
                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine = $lines[$j];
                    if (trim($innerLine) === ':::') {
                        $closed = true;
                        break;
                    }
                    $body[] = $innerLine;
                }
                if ($closed) {
                    $bodyHtml      = $this->renderMarkdownWithBlocks(trim(implode("\n", $body)), $parser, $depth + 1, $options);
                    $outputLines[] = $addBlock($this->buildBubbleHtml($attrs, $bodyHtml));
                    $i             = $j;
                    continue;
                }
            }

            if (str_starts_with($trimmed, ':::noautolink')) {
                $body   = [];
                $closed = false;
                for ($j = $i + 1; $j < count($lines); $j++) {
                    $innerLine = $lines[$j];
                    if (trim($innerLine) === ':::') {
                        $closed = true;
                        break;
                    }
                    $body[] = $innerLine;
                }
                if ($closed) {
                    $bodyHtml      = $this->renderMarkdownWithBlocks(trim(implode("\n", $body)), $parser, $depth + 1, $options);
                    $outputLines[] = $addBlock($bodyHtml);
                    $i             = $j;
                    continue;
                }
            }

            if ($trimmed === ':::toc') {
                $tocHtml = $this->buildTocHtml($headings);
                if ($tocHtml !== '') {
                    $outputLines[] = $addBlock($tocHtml);
                    continue;
                }
            }

            $outputLines[] = $line;
        }

        $markdown = implode("\n", $outputLines);

        $alertPattern = '/^:::([a-zA-Z]+)(?:\s+([^\n]+))?\R([\s\S]*?)\R:::\s*$/m';
        $markdown     = preg_replace_callback(
            $alertPattern,
            function (array $matches) use ($labels, $parser, $addBlock, $depth, $options): string {
                $type = strtolower($matches[1] ?? '');
                if (!isset($labels[$type])) {
                    return $matches[0];
                }

                $title     = trim($matches[2] ?? '');
                $label     = $title !== '' ? $title : $labels[$type];
                $body      = trim($matches[3] ?? '');
                $bodyHtml  = $this->renderMarkdownWithBlocks($body, $parser, $depth + 1, $options);
                $labelHtml = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');

                $html = '<div class="md-alert md-alert-'.$type.'">'
                    .'<div class="md-alert-title">'.$labelHtml.'</div>'
                    .'<div class="md-alert-body">'.$bodyHtml.'</div>'
                    .'</div>';

                return $addBlock($html);
            },
            $markdown
        );

        $spoilerPattern = '/^:::spoiler(?:\s+([^\n]+))?\R([\s\S]*?)\R:::\s*$/m';
        $markdown       = preg_replace_callback(
            $spoilerPattern,
            function (array $matches) use ($parser, $addBlock, $depth, $options): string {
                $title     = trim($matches[1] ?? 'Spoiler');
                $body      = trim($matches[2] ?? '');
                $bodyHtml  = $this->renderMarkdownWithBlocks($body, $parser, $depth + 1, $options);
                $titleHtml = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');

                $html = '<details class="md-spoiler">'
                    .'<summary class="md-spoiler-title">'.$titleHtml.'</summary>'
                    .'<div class="md-spoiler-body">'.$bodyHtml.'</div>'
                    .'</details>';

                return $addBlock($html);
            },
            $markdown
        );

        $checklistPattern = '/^:::checklist\s*\R([\s\S]*?)\R:::\s*$/m';
        $markdown         = preg_replace_callback(
            $checklistPattern,
            function (array $matches) use ($parser, $addBlock): string {
                $lines = preg_split('/\R/', trim($matches[1] ?? ''));
                $items = [];

                foreach ($lines as $line) {
                    if (!preg_match('/^\s*[-*]\s+\[( |x|X)\]\s+(.*)$/', $line, $itemMatch)) {
                        continue;
                    }

                    $checked  = strtolower($itemMatch[1]) === 'x';
                    $text     = trim($itemMatch[2] ?? '');
                    $itemHtml = $parser->line($text);
                    $items[]  = '<li><label><input type="checkbox" disabled'.($checked ? ' checked' : '').' />'
                        .$itemHtml.'</label></li>';
                }

                if (!$items) {
                    return $matches[0];
                }

                $html = '<ul class="md-checklist">'.implode('', $items).'</ul>';

                return $addBlock($html);
            },
            $markdown
        );

        [$markdown, $abbreviations] = $this->parseAbbreviations($markdown);
        [$markdown, $notes]         = $this->parseFootnotes($markdown);
        $markdown                   = $this->applyHighlights($markdown);

        if (!$disableAutoLink) {
            $markdown = $this->autoLinkUrls($markdown);
        }

        $markdown                   = $this->applyAbbreviations($markdown, $abbreviations);
        [$markdown, $footnoteOrder] = $this->applyFootnoteRefs($markdown, $notes);

        $html = $parser->text($markdown);
        foreach ($blocks as $block) {
            $html = str_replace($block['placeholder'], $block['html'], $html);
        }

        $html          = $this->injectHeadingIds($html, $headings);
        $footnotesHtml = $this->buildFootnotesHtml($footnoteOrder, $notes, $parser);
        if ($footnotesHtml !== '') {
            $html .= $footnotesHtml;
        }

        return $html;
    }

    private function buildCodeBlockHtml(string $code, string $info, array $labels, array $normalize): string
    {
        $normalizedCode = preg_replace('/\n$/', '', $code);
        $parsed         = $this->parseCodeInfo($info);
        $normalizedLang = $this->normalizeLanguage($parsed['lang'] ?? '', $normalize);

        if (in_array($normalizedLang, ['mermaid', 'flowchart', 'sequence'], true)) {
            $mermaidCode = $this->normalizeMermaidCode($normalizedLang, $normalizedCode);
            $flags       = $parsed['flags'] ?? [];
            $plain       = in_array('plain', $flags, true) || in_array('nocard', $flags, true);
            $class       = $plain ? 'md-mermaid md-mermaid-plain' : 'md-mermaid';

            return '<div class="'.$class.'" data-mermaid>'.htmlspecialchars($mermaidCode, ENT_NOQUOTES, 'UTF-8').'</div>';
        }

        $file        = $parsed['file'] ?? '';
        $fileExt     = $file !== '' ? strtolower(pathinfo($file, PATHINFO_EXTENSION)) : '';
        $labelKey    = $fileExt !== '' ? $fileExt : ($normalizedLang !== '' ? $normalizedLang : 'text');
        $label       = $labels[$labelKey] ?? ($labels['text'] ?? 'TXT');
        $langClass   = 'md-lang-'.preg_replace('/[^a-z0-9-]/', '', $labelKey);
        $lineCount   = max(1, substr_count($normalizedCode, "\n") + 1);
        $lineNumbers = implode("\n", range(1, $lineCount));
        $codeHtml    = htmlspecialchars($normalizedCode, ENT_NOQUOTES, 'UTF-8');
        $fileHtml    = $file !== '' ? '<span class="md-code-file">'.htmlspecialchars($file, ENT_QUOTES, 'UTF-8').'</span>' : '';
        $langHtml    = '<span class="md-code-lang '.$langClass.'" data-lang="'.htmlspecialchars($labelKey, ENT_QUOTES, 'UTF-8').'">'
            .htmlspecialchars($label, ENT_QUOTES, 'UTF-8').'</span>';
        $dataFile = $file !== '' ? ' data-file="'.htmlspecialchars($file, ENT_QUOTES, 'UTF-8').'"' : '';

        return '<details class="md-code-block" data-lang="'.htmlspecialchars($normalizedLang, ENT_QUOTES, 'UTF-8').'"'.$dataFile.' open>'
            .'<summary class="md-code-summary"><div class="md-code-header">'.$fileHtml.$langHtml.'</div></summary>'
            .'<div class="md-code-body">'
            .'<div class="md-code-lines" aria-hidden="true">'.$lineNumbers.'</div>'
            .'<pre><code class="language-'.htmlspecialchars($normalizedLang, ENT_QUOTES, 'UTF-8').'">'.$codeHtml.'</code></pre>'
            .'</div>'
            .'</details>';
    }

    private function parseCodeInfo(string $info): array
    {
        $parts = preg_split('/\s+/', trim($info));
        $lang  = $parts[0] ?? '';
        $meta  = implode(' ', array_slice($parts, 1));
        $file  = '';
        $flags = [];
        if (preg_match('/(?:file|filename|title)=(".*?"|\'.*?\'|\S+)/i', $meta, $match)) {
            $file = trim($match[1], "\"'");
        }
        foreach (preg_split('/\s+/', $meta) as $token) {
            if ($token === '' || str_contains($token, '=')) {
                continue;
            }
            $flags[] = strtolower($token);
        }

        return ['lang' => $lang, 'file' => $file, 'flags' => $flags];
    }

    private function normalizeLanguage(string $lang, array $normalize): string
    {
        $key = strtolower(trim($lang));

        return $normalize[$key] ?? ($key !== '' ? $key : 'text');
    }

    private function normalizeMermaidCode(string $lang, string $code): string
    {
        $trimmed = trim($code);
        if ($lang === 'flowchart') {
            return str_starts_with($trimmed, 'flowchart') ? $trimmed : "flowchart TD\n{$trimmed}";
        }
        if ($lang === 'sequence') {
            return str_starts_with($trimmed, 'sequenceDiagram') ? $trimmed : "sequenceDiagram\n{$trimmed}";
        }

        return $trimmed;
    }

    private function parseAttributes(string $input): array
    {
        $attrs = [];
        if (preg_match_all('/(\w+)=(".*?"|\'.*?\'|\S+)/', $input, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $attrs[strtolower($match[1])] = trim($match[2], "\"'");
            }
        }

        return $attrs;
    }

    private function wrapIframes(string $markdown, callable $addBlock): string
    {
        return preg_replace_callback('/<iframe[\s\S]*?<\/iframe>/i', function ($matches) use ($addBlock) {
            return $addBlock('<div class="md-embed md-embed-html">'.$matches[0].'</div>');
        }, $markdown);
    }

    private function buildEmbedHtml(array $attrs): string
    {
        $type  = array_key_first($attrs);
        $value = $type ? $attrs[$type] : null;
        if (!$type || !$value) {
            return '';
        }

        $src   = '';
        $title = $type.' embed';
        if ($type === 'youtube') {
            preg_match('/(?:v=|youtu\.be\/)([^&?\/]+)/', $value, $match);
            $id  = $match[1] ?? $value;
            $src = "https://www.youtube-nocookie.com/embed/{$id}";

            return '<div class="md-embed md-embed-'.htmlspecialchars($type, ENT_QUOTES, 'UTF-8').'">'
                .'<iframe width="560" height="315" src="'.htmlspecialchars($src, ENT_QUOTES, 'UTF-8').'" title="'.htmlspecialchars($title, ENT_QUOTES, 'UTF-8').'"'
                .'title="YouTube video player" frameBorder="0"'
                .'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"'
                .'referrerPolicy="strict-origin-when-cross-origin"'
                .'allowFullScreen></iframe>'
                .'</div>';
        } elseif ($type === 'vimeo') {
            preg_match('/vimeo\.com\/(\d+)/', $value, $match);
            $id    = $match[1] ?? $value;
            $src   = "https://player.vimeo.com/video/{$id}";
            $title = 'Vimeo video';
        } elseif ($type === 'figma') {
            $src   = 'https://www.figma.com/embed?embed_host=mekayalar&url='.urlencode($value);
            $title = 'Figma embed';
        }

        if ($src === '') {
            return '';
        }

        return '<div class="md-embed md-embed-'.htmlspecialchars($type, ENT_QUOTES, 'UTF-8').'">'
            .'<iframe src="'.htmlspecialchars($src, ENT_QUOTES, 'UTF-8').'" title="'.htmlspecialchars($title, ENT_QUOTES, 'UTF-8')
            .'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="no-referrer"></iframe>'
            .'</div>';
    }

    private function buildFigureHtml(array $attrs, string $body, Parsedown $parser): string
    {
        if (!isset($attrs['src'])) {
            return '';
        }
        $caption     = $attrs['caption'] ?? $attrs['title'] ?? $body;
        $captionHtml = $caption !== '' ? '<figcaption>'.$parser->line($caption).'</figcaption>' : '';
        $alt         = $attrs['alt'] ?? $caption;

        return '<figure class="md-figure">'
            .'<img src="'.htmlspecialchars($attrs['src'], ENT_QUOTES, 'UTF-8').'" alt="'.htmlspecialchars($alt, ENT_QUOTES, 'UTF-8').'" loading="lazy" />'
            .$captionHtml
            .'</figure>';
    }

    private function buildQuoteHtml(array $attrs, string $bodyHtml): string
    {
        $title     = $attrs['title'] ?? '';
        $author    = $attrs['author'] ?? '';
        $page      = $attrs['page'] ?? '';
        $image     = $attrs['image'] ?? '';
        $imageHtml = $image !== '' ? '<div class="md-quote-cover"><img src="'.htmlspecialchars($image, ENT_QUOTES, 'UTF-8').'" alt="'
            .htmlspecialchars($title ?: 'Quote', ENT_QUOTES, 'UTF-8').'" loading="lazy" /></div>' : '';
        $titleHtml  = $title !== '' ? '<div class="md-quote-title">'.htmlspecialchars($title, ENT_QUOTES, 'UTF-8').'</div>' : '';
        $authorHtml = $author !== '' ? '<div class="md-quote-author">'.htmlspecialchars($author, ENT_QUOTES, 'UTF-8').'</div>' : '';
        $pageHtml   = $page !== '' ? '<div class="md-quote-page">s. '.htmlspecialchars($page, ENT_QUOTES, 'UTF-8').'</div>' : '';
        $metaHtml   = '<div class="md-quote-meta">'.$titleHtml.$authorHtml.$pageHtml.'</div>';

        return '<figure class="md-quote"><blockquote>'.$bodyHtml.'</blockquote><div class="md-quote-footer">'.$imageHtml.$metaHtml.'</div></figure>';
    }

    private function buildGalleryHtml(string $body, string $galleryId): string
    {
        preg_match_all('/!\[([^\]]*)\]\(([^)]+)\)/', $body, $matches, PREG_SET_ORDER);
        if (!$matches) {
            return '';
        }

        $itemsHtml = '';
        foreach ($matches as $match) {
            $title = trim($match[1] ?? '');
            $src   = trim($match[2] ?? '');
            if ($src === '') {
                continue;
            }
            $titleHtml = $title !== '' ? '<span class="md-gallery-title">'.htmlspecialchars($title, ENT_QUOTES, 'UTF-8').'</span>' : '';
            $itemsHtml .= '<button type="button" class="md-gallery-item" data-src="'.htmlspecialchars($src, ENT_QUOTES, 'UTF-8')
                .'" data-title="'.htmlspecialchars($title, ENT_QUOTES, 'UTF-8').'">'
                .'<img src="'.htmlspecialchars($src, ENT_QUOTES, 'UTF-8').'" alt="'
                .htmlspecialchars($title !== '' ? $title : 'Gallery image', ENT_QUOTES, 'UTF-8').'" loading="lazy" />'
                .$titleHtml
                .'</button>';
        }

        if ($itemsHtml === '') {
            return '';
        }

        return '<div class="md-gallery" data-gallery="'.htmlspecialchars($galleryId, ENT_QUOTES, 'UTF-8').'">'.$itemsHtml.'</div>';
    }

    private function buildBubbleHtml(array $attrs, string $bodyHtml): string
    {
        $rawSide    = strtolower($attrs['side'] ?? $attrs['position'] ?? $attrs['align'] ?? 'left');
        $side       = in_array($rawSide, ['left', 'right', 'top'], true) ? $rawSide : 'left';
        $name       = $attrs['name'] ?? $attrs['character'] ?? $attrs['title'] ?? '';
        $image      = $attrs['image'] ?? $attrs['avatar'] ?? '';
        $sideClass  = 'md-bubble-'.$side;
        $avatarHtml = $image !== ''
            ? '<div class="md-bubble-avatar"><img src="'.htmlspecialchars($image, ENT_QUOTES, 'UTF-8').'" alt="'
                .htmlspecialchars($name ?: 'Character', ENT_QUOTES, 'UTF-8').'" loading="lazy" /></div>'
            : '';
        $nameHtml = $name !== '' ? '<div class="md-bubble-name">'.htmlspecialchars($name, ENT_QUOTES, 'UTF-8').'</div>' : '';

        return '<div class="md-bubble '.$sideClass.'">'.$avatarHtml
            .'<div class="md-bubble-content">'.$nameHtml.'<div class="md-bubble-text">'.$bodyHtml.'</div></div></div>';
    }

    private function extractHeadings(string $markdown): array
    {
        $lines    = preg_split('/\R/', $markdown);
        $headings = [];
        $seen     = [];

        foreach ($lines as $line) {
            if (!preg_match('/^(#{1,6})\s+(.+)$/', $line, $match)) {
                continue;
            }
            $level      = strlen($match[1]);
            $text       = $this->stripInline($match[2]);
            $slug       = $this->slugify($text, $seen);
            $headings[] = ['level' => $level, 'text' => $text, 'slug' => $slug];
        }

        return $headings;
    }

    private function buildTocHtml(array $headings): string
    {
        if (!$headings) {
            return '';
        }
        $html  = '<nav class="md-toc"><div class="md-toc-title">İçindekiler</div>';
        $stack = [0];

        foreach ($headings as $heading) {
            while (end($stack) < $heading['level']) {
                $html .= '<ul>';
                $stack[] = end($stack) + 1;
            }
            while (end($stack) > $heading['level']) {
                $html .= '</ul>';
                array_pop($stack);
            }
            $html .= '<li><a href="#'.htmlspecialchars($heading['slug'], ENT_QUOTES, 'UTF-8').'">'
                .htmlspecialchars($heading['text'], ENT_QUOTES, 'UTF-8').'</a></li>';
        }

        while (count($stack) > 1) {
            $html .= '</ul>';
            array_pop($stack);
        }

        return $html.'</nav>';
    }

    private function injectHeadingIds(string $html, array $headings): string
    {
        if (!$headings) {
            return $html;
        }
        $index = 0;

        return preg_replace_callback('/<h([1-6])>(.*?)<\/h\\1>/', function ($matches) use (&$index, $headings) {
            $slug = $headings[$index]['slug'] ?? null;
            $index++;
            if (!$slug) {
                return $matches[0];
            }

            return '<h'.$matches[1].' id="'.htmlspecialchars($slug, ENT_QUOTES, 'UTF-8').'">'.$matches[2].'</h'.$matches[1].'>';
        }, $html);
    }

    private function parseAbbreviations(string $markdown): array
    {
        $lines  = preg_split('/\R/', $markdown);
        $abbrs  = [];
        $output = [];
        foreach ($lines as $line) {
            if (preg_match('/^\*\[([^\]]+)\]:\s*(.+)$/', $line, $match)) {
                $abbrs[$match[1]] = trim($match[2]);
                continue;
            }
            $output[] = $line;
        }

        return [implode("\n", $output), $abbrs];
    }

    private function applyAbbreviations(string $markdown, array $abbrs): string
    {
        foreach ($abbrs as $abbr => $title) {
            $pattern     = '/\b'.preg_quote($abbr, '/').'\b/';
            $replacement = '<abbr class="md-abbr" title="'.htmlspecialchars($title, ENT_QUOTES, 'UTF-8').'">'
                .htmlspecialchars($abbr, ENT_QUOTES, 'UTF-8').'</abbr>';
            $markdown = preg_replace($pattern, $replacement, $markdown);
        }

        return $markdown;
    }

    private function parseFootnotes(string $markdown): array
    {
        $lines  = preg_split('/\R/', $markdown);
        $notes  = [];
        $output = [];

        for ($i = 0; $i < count($lines); $i++) {
            $line = $lines[$i];
            if (!preg_match('/^\[\^([^\]]+)\]:\s*(.*)$/', $line, $match)) {
                $output[] = $line;
                continue;
            }
            $key  = $match[1];
            $body = [$match[2]];
            $j    = $i + 1;
            for (; $j < count($lines); $j++) {
                if (!preg_match('/^\s{2,}/', $lines[$j])) {
                    break;
                }
                $body[] = trim($lines[$j]);
            }
            $notes[$key] = trim(implode(' ', $body));
            $i           = $j - 1;
        }

        return [implode("\n", $output), $notes];
    }

    private function applyFootnoteRefs(string $markdown, array $notes): array
    {
        $order    = [];
        $refs     = [];
        $markdown = preg_replace_callback('/\[\^([^\]]+)\]/', function ($matches) use (&$order, &$refs, $notes) {
            $key = $matches[1];
            if (!isset($notes[$key])) {
                return $matches[0];
            }
            if (!isset($refs[$key])) {
                $order[]    = $key;
                $refs[$key] = count($order);
            }
            $index = $refs[$key];

            return '<sup class="md-footnote-ref"><a href="#fn-'.htmlspecialchars($key, ENT_QUOTES, 'UTF-8').'" id="fnref-'
                .htmlspecialchars($key, ENT_QUOTES, 'UTF-8').'">'.$index.'</a></sup>';
        }, $markdown);

        return [$markdown, $order];
    }

    private function buildFootnotesHtml(array $order, array $notes, Parsedown $parser): string
    {
        if (!$order) {
            return '';
        }
        $items = '';
        foreach ($order as $key) {
            $text = $notes[$key] ?? '';
            $items .= '<li id="fn-'.htmlspecialchars($key, ENT_QUOTES, 'UTF-8').'">'
                .$parser->line($text)
                .' <a href="#fnref-'.htmlspecialchars($key, ENT_QUOTES, 'UTF-8').'" class="md-footnote-back">↩</a></li>';
        }

        return '<section class="md-footnotes"><ol>'.$items.'</ol></section>';
    }

    private function autoLinkUrls(string $markdown): string
    {
        $placeholders = [];
        $protected    = preg_replace_callback('/!?\[[^\]]*]\([^)]+\)/', function ($matches) use (&$placeholders) {
            $placeholder    = '@@MDLINK'.count($placeholders).'@@';
            $placeholders[] = $matches[0];

            return $placeholder;
        }, $markdown);

        $linked = preg_replace_callback('/(^|[\s(>])((https?:\/\/|www\.)[^\s<]+[^\s<.,;:!?)]?)/', function ($matches) {
            $prefix = $matches[1];
            $url    = $matches[2];
            if (str_contains($url, 'www.local.host')) {
                return $prefix.$url;
            }
            $href = str_starts_with($url, 'http') ? $url : 'https://'.$url;

            return $prefix.'<a href="'.htmlspecialchars($href, ENT_QUOTES, 'UTF-8')
                .'" rel="noopener noreferrer" target="_blank">'.htmlspecialchars($url, ENT_QUOTES, 'UTF-8').'</a>';
        }, $protected);

        foreach ($placeholders as $index => $value) {
            $linked = str_replace('@@MDLINK'.$index.'@@', $value, $linked);
        }

        return $linked;
    }

    private function applyHighlights(string $markdown): string
    {
        return preg_replace('/==([^\n=]+)==/', '<mark class="md-highlight">$1</mark>', $markdown);
    }

    private function slugify(string $text, array &$seen): string
    {
        $base        = strtolower(trim(preg_replace('/[`~!@#$%^&*()=+{}\[\]|\\\\;:\'",.<>\/?]+/', '', strip_tags($text))));
        $base        = preg_replace('/\s+/', '-', $base);
        $slug        = $base !== '' ? $base : 'section';
        $count       = $seen[$slug] ?? 0;
        $seen[$slug] = $count + 1;

        return $count ? $slug.'-'.$count : $slug;
    }

    private function stripInline(string $text): string
    {
        $text = preg_replace('/`([^`]+)`/', '$1', $text);
        $text = preg_replace('/\*\*([^*]+)\*\*/', '$1', $text);
        $text = preg_replace('/\*([^*]+)\*/', '$1', $text);
        $text = preg_replace('/_([^_]+)_/', '$1', $text);
        $text = preg_replace('/\[([^\]]+)\]\([^\)]+\)/', '$1', $text);
        $text = preg_replace('/!\[([^\]]*)\]\([^\)]+\)/', '$1', $text);

        return trim($text);
    }

    private function sanitizeUtf8(string $value): string
    {
        $clean = @iconv('UTF-8', 'UTF-8//IGNORE', $value);

        return $clean !== false ? $clean : $value;
    }
}
