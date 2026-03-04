<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV</title>
    <style>
        @page {
            margin: 24px;
        }

        :root {
            --primary: {{ $templateSettings['colors']['primary'] ?? '#2563eb' }};
            --secondary: {{ $templateSettings['colors']['secondary'] ?? '#1f2937' }};
            --text: #1f2937;
            --muted: #6b7280;
            --border: #e5e7eb;
            --surface: #f8fafc;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            color: var(--text);
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            line-height: 1.55;
        }

        h1, h2, h3, h4, p {
            margin: 0;
        }

        .page {
            width: 100%;
        }

        .header {
            border-bottom: 2px solid var(--primary);
            margin-bottom: 24px;
            padding-bottom: 16px;
        }

        .name {
            color: var(--primary);
            font-size: 28px;
            font-weight: bold;
            line-height: 1.2;
        }

        .title {
            color: var(--secondary);
            font-size: 15px;
            margin-top: 6px;
        }

        .contact {
            color: var(--muted);
            font-size: 11px;
            margin-top: 10px;
        }

        .contact span {
            display: inline-block;
            margin-right: 12px;
        }

        .section {
            margin-bottom: 20px;
        }

        .section-title {
            color: var(--primary);
            border-bottom: 1px solid var(--border);
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            padding-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .summary {
            background: var(--surface);
            border-left: 4px solid var(--primary);
            padding: 12px 14px;
        }

        .item {
            margin-bottom: 14px;
            page-break-inside: avoid;
        }

        .item-header {
            margin-bottom: 4px;
        }

        .item-title {
            color: var(--secondary);
            font-size: 13px;
            font-weight: bold;
        }

        .item-meta {
            color: var(--muted);
            font-size: 11px;
            margin-top: 2px;
        }

        .item-description {
            margin-top: 6px;
        }

        .skills-group {
            margin-bottom: 12px;
            page-break-inside: avoid;
        }

        .skills-group-title {
            color: var(--secondary);
            font-weight: bold;
            margin-bottom: 6px;
        }

        .tag {
            display: inline-block;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 999px;
            font-size: 10px;
            margin: 0 6px 6px 0;
            padding: 3px 8px;
        }

        .links {
            color: var(--muted);
            font-size: 11px;
            margin-top: 6px;
        }

        .links div {
            margin-top: 2px;
        }
    </style>
</head>
<body>
    <div class="page">
        <header class="header">
            <h1 class="name">{{ $data['personal']['full_name'] ?? 'Ad Soyad' }}</h1>
            @if (!empty($data['personal']['title']))
                <p class="title">{{ $data['personal']['title'] }}</p>
            @endif
            <div class="contact">
                @if (!empty($data['personal']['email']))
                    <span>{{ $data['personal']['email'] }}</span>
                @endif
                @if (!empty($data['personal']['phone']))
                    <span>{{ $data['personal']['phone'] }}</span>
                @endif
                @if (!empty($data['personal']['location']))
                    <span>{{ $data['personal']['location'] }}</span>
                @endif
                @if (!empty($data['personal']['website']))
                    <span>{{ $data['personal']['website'] }}</span>
                @endif
            </div>
        </header>

        @if (!empty($data['summary']))
            <section class="section">
                <h2 class="section-title">Profesyonel Ozet</h2>
                <div class="summary">{{ $data['summary'] }}</div>
            </section>
        @endif

        @if (!empty($data['experience']))
            <section class="section">
                <h2 class="section-title">Deneyim</h2>
                @foreach ($data['experience'] as $experience)
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">{{ $experience['position'] ?? '-' }}</div>
                            <div class="item-meta">
                                {{ $experience['company'] ?? '-' }}
                                @if (!empty($experience['location']))
                                    - {{ $experience['location'] }}
                                @endif
                                @if (!empty($experience['start_date']) || !empty($experience['end_date']))
                                    | {{ $experience['start_date'] ?? '' }} - {{ $experience['end_date'] ?? 'Devam Ediyor' }}
                                @endif
                            </div>
                        </div>
                        @if (!empty($experience['description']))
                            <div class="item-description">{{ $experience['description'] }}</div>
                        @endif
                    </div>
                @endforeach
            </section>
        @endif

        @if (!empty($data['skills']))
            <section class="section">
                <h2 class="section-title">Yetenekler</h2>
                @foreach ($data['skills'] as $category => $skills)
                    <div class="skills-group">
                        <div class="skills-group-title">{{ $category }}</div>
                        <div>
                            @foreach ($skills as $skill)
                                <span class="tag">
                                    {{ $skill['skill_name'] ?? '' }}
                                    @if (!empty($skill['level']))
                                        ({{ $skill['level'] }})
                                    @endif
                                </span>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </section>
        @endif

        @if (!empty($data['projects']))
            <section class="section">
                <h2 class="section-title">Projeler</h2>
                @foreach ($data['projects'] as $project)
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">{{ $project['name'] ?? '-' }}</div>
                        </div>
                        @if (!empty($project['description']))
                            <div class="item-description">{{ $project['description'] }}</div>
                        @endif
                        @if (!empty($project['technologies']))
                            <div style="margin-top: 6px;">
                                @foreach ((array) $project['technologies'] as $technology)
                                    <span class="tag">{{ $technology }}</span>
                                @endforeach
                            </div>
                        @endif
                        @if (!empty($project['url']) || !empty($project['github']))
                            <div class="links">
                                @if (!empty($project['url']))
                                    <div>URL: {{ $project['url'] }}</div>
                                @endif
                                @if (!empty($project['github']) && $project['github'] !== ($project['url'] ?? null))
                                    <div>GitHub: {{ $project['github'] }}</div>
                                @endif
                            </div>
                        @endif
                    </div>
                @endforeach
            </section>
        @endif

        @if (!empty($data['education']))
            <section class="section">
                <h2 class="section-title">Egitim</h2>
                @foreach ($data['education'] as $education)
                    <div class="item">
                        <div class="item-header">
                            <div class="item-title">{{ $education['degree'] ?? '-' }}</div>
                            <div class="item-meta">
                                {{ $education['institution'] ?? '-' }}
                                @if (!empty($education['graduation_year']))
                                    | {{ $education['graduation_year'] }}
                                @endif
                                @if (!empty($education['gpa']))
                                    | GPA: {{ $education['gpa'] }}
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </section>
        @endif
    </div>
</body>
</html>
