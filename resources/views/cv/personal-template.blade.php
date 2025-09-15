<!DOCTYPE html>
<html lang="tr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $data['personal']['full_name'] ?? 'Meriç Enes Kayalar' }} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "DejaVu Sans", Arial, Helvetica, sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #000000;
            background: #ffffff;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 15mm;
        }
        
        .header {
            text-align: center;
            margin-bottom: 25pt;
            border-bottom: 2pt solid {{ $templateSettings['colors']['primary'] ?? '#2563eb' }};
            padding-bottom: 15pt;
        }
        
        .name {
            font-size: 24pt;
            font-weight: bold;
            color: {{ $templateSettings['colors']['primary'] ?? '#2563eb' }};
            margin-bottom: 8pt;
        }
        
        .title {
            font-size: 14pt;
            color: {{ $templateSettings['colors']['secondary'] ?? '#1f2937' }};
            margin-bottom: 10pt;
            font-style: italic;
        }
        
        .contact-info {
            font-size: 10pt;
            color: #666666;
        }
        
        .contact-info span {
            margin: 0 10pt;
        }
        
        .section {
            margin-bottom: 20pt;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 16pt;
            font-weight: bold;
            color: {{ $templateSettings['colors']['primary'] ?? '#2563eb' }};
            border-bottom: 1pt solid {{ $templateSettings['colors']['primary'] ?? '#2563eb' }};
            padding-bottom: 5pt;
            margin-bottom: 12pt;
        }
        
        .section-content {
            margin-left: 5pt;
        }
        
        .item {
            margin-bottom: 15pt;
            page-break-inside: avoid;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 5pt;
        }
        
        .item-title {
            font-weight: bold;
            font-size: 12pt;
            color: {{ $templateSettings['colors']['secondary'] ?? '#1f2937' }};
        }
        
        .item-subtitle {
            font-style: italic;
            color: #666666;
            margin-top: 2pt;
        }
        
        .item-date {
            font-size: 10pt;
            color: #888888;
            white-space: nowrap;
        }
        
        .item-description {
            margin-top: 5pt;
            text-align: justify;
            line-height: 1.4;
        }
        
        .summary {
            font-style: italic;
            text-align: justify;
            padding: 10pt;
            background-color: #f8f9fa;
            border-left: 4pt solid {{ $templateSettings['colors']['primary'] ?? '#2563eb' }};
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200pt, 1fr));
            gap: 15pt;
            margin-top: 10pt;
        }
        
        .skill-category {
            page-break-inside: avoid;
        }
        
        .skill-category-title {
            font-weight: bold;
            color: {{ $templateSettings['colors']['secondary'] ?? '#1f2937' }};
            margin-bottom: 5pt;
            font-size: 11pt;
        }
        
        .skill-list {
            line-height: 1.6;
        }
        
        .skill-item {
            margin: 2pt 0;
            font-size: 10pt;
        }
        
        .skill-name {
            font-weight: 500;
        }
        
        .skill-level {
            color: #666666;
            font-size: 9pt;
        }
        
        .project {
            border-left: 3pt solid #e0e0e0;
            padding-left: 10pt;
            margin-bottom: 12pt;
        }
        
        .project-tech {
            margin-top: 5pt;
            font-size: 10pt;
            color: #666666;
        }
        
        .project-links {
            margin-top: 3pt;
            font-size: 9pt;
        }
        
        .project-links a {
            color: {{ $templateSettings['colors']['primary'] ?? '#2563eb' }};
            text-decoration: none;
            margin-right: 10pt;
        }
        
        @media print {
            .container {
                margin: 0;
                padding: 10mm;
            }
            
            body {
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        {{-- Header - ATS Compatible --}}
        <header class="header">
            <h1 class="name">{{ $data['personal']['full_name'] ?? 'Meriç Enes Kayalar' }}</h1>
            <h2 class="title">{{ $data['personal']['title'] ?? 'Full-stack Developer' }}</h2>
            <div class="contact-info">
                @if(!empty($data['personal']['email']))
                    <span>{{ $data['personal']['email'] }}</span>
                @endif
                @if(!empty($data['personal']['phone']))
                    <span>{{ $data['personal']['phone'] }}</span>
                @endif
                @if(!empty($data['personal']['location']))
                    <span>{{ $data['personal']['location'] }}</span>
                @endif
                @if(!empty($data['personal']['website']))
                    <span>{{ $data['personal']['website'] }}</span>
                @endif
            </div>
        </header>

        {{-- Professional Summary --}}
        @if(!empty($data['summary']))
        <section class="section">
            <h3 class="section-title">Profesyonel Özet</h3>
            <div class="summary">{{ $data['summary'] }}</div>
        </section>
        @endif

        {{-- Work Experience --}}
        @if(!empty($data['experience']))
        <section class="section">
            <h3 class="section-title">İş Deneyimi</h3>
            <div class="section-content">
                @foreach($data['experience'] as $exp)
                <div class="item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">{{ $exp['position'] ?? '' }}</div>
                            <div class="item-subtitle">
                                {{ $exp['company'] ?? '' }}
                                @if(!empty($exp['location']))<span style="color: #888;"> • {{ $exp['location'] }}</span>@endif
                            </div>
                        </div>
                        <div class="item-date">
                            {{ $exp['start_date'] ? \Carbon\Carbon::parse($exp['start_date'])->format('M Y') : '' }}
                            -
                            {{ $exp['end_date'] ? \Carbon\Carbon::parse($exp['end_date'])->format('M Y') : 'Devam Ediyor' }}
                        </div>
                    </div>
                    @if(!empty($exp['description']))
                        <div class="item-description">{!! nl2br(e($exp['description'])) !!}</div>
                    @endif
                </div>
                @endforeach
            </div>
        </section>
        @endif

        {{-- Skills --}}
        @if(!empty($data['skills']))
        <section class="section">
            <h3 class="section-title">Yetenekler</h3>
            <div class="skills-grid">
                @foreach($data['skills'] as $category => $skills)
                <div class="skill-category">
                    <div class="skill-category-title">{{ $category }}</div>
                    <div class="skill-list">
                        @foreach($skills as $skill)
                        <div class="skill-item">
                            <span class="skill-name">{{ $skill['skill_name'] ?? '' }}</span>
                            @if(!empty($skill['level']))
                                <span class="skill-level">({{ $skill['level'] }})</span>
                            @endif
                        </div>
                        @endforeach
                    </div>
                </div>
                @endforeach
            </div>
        </section>
        @endif

        {{-- Projects --}}
        @if(!empty($data['projects']))
        <section class="section">
            <h3 class="section-title">Projeler</h3>
            <div class="section-content">
                @foreach($data['projects'] as $project)
                <div class="project">
                    <div class="item-title">{{ $project['name'] ?? '' }}</div>
                    @if(!empty($project['description']))
                        <div class="item-description">{!! nl2br(e($project['description'])) !!}</div>
                    @endif
                    @if(!empty($project['technologies']))
                        <div class="project-tech">
                            <strong>Teknolojiler:</strong> 
                            @if(is_array($project['technologies']))
                                {{ implode(', ', $project['technologies']) }}
                            @else
                                {{ $project['technologies'] }}
                            @endif
                        </div>
                    @endif
                    <div class="project-links">
                        @if(!empty($project['url']))
                            <a href="{{ $project['url'] }}">{{ $project['url'] }}</a>
                        @endif
                        @if(!empty($project['github']))
                            <a href="{{ $project['github'] }}">GitHub</a>
                        @endif
                    </div>
                </div>
                @endforeach
            </div>
        </section>
        @endif

        {{-- Education --}}
        @if(!empty($data['education']))
        <section class="section">
            <h3 class="section-title">Eğitim</h3>
            <div class="section-content">
                @foreach($data['education'] as $edu)
                <div class="item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">{{ $edu['degree'] ?? '' }}</div>
                            <div class="item-subtitle">{{ $edu['institution'] ?? '' }}</div>
                        </div>
                        <div class="item-date">{{ $edu['graduation_year'] ?? '' }}</div>
                    </div>
                    @if(!empty($edu['gpa']))
                        <div class="item-description">Not Ortalaması: {{ $edu['gpa'] }}</div>
                    @endif
                </div>
                @endforeach
            </div>
        </section>
        @endif
    </div>
</body>
</html>