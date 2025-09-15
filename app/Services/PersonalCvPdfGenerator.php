<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;

class PersonalCvPdfGenerator
{
    public function generate(array $cvData, array $settings = []): string
    {
        $data = $this->prepareCvData($cvData);
        $templateSettings = array_merge([
            'colors' => [
                'primary' => '#2563eb',
                'secondary' => '#1f2937',
            ],
            'font_family' => 'Inter',
        ], $settings);

        $html = view('cv.personal-template', compact('data', 'templateSettings'))->render();

        $pdf = PDF::loadHTML($html)
            ->setPaper('a4', 'portrait')
            ->setOptions([
                'isRemoteEnabled' => false,
                'isPhpEnabled' => false,
                'isHtml5ParserEnabled' => true,
                'isFontSubsettingEnabled' => true,
                'defaultFont' => 'DejaVu Sans',
                'defaultMediaType' => 'print',
                'defaultPaperSize' => 'A4',
                'isJavascriptEnabled' => false,
                'debugKeepTemp' => false,
                'debugCss' => false,
                'debugLayout' => false,
                'debugLayoutLines' => false,
                'debugLayoutBlocks' => false,
                'debugLayoutInline' => false,
                'debugLayoutPaddingBox' => false,
                'fontHeightRatio' => 1.1,
                'chroot' => public_path(),
            ]);

        return $pdf->output();
    }

    private function prepareCvData(array $cvData): array
    {
        $processedData = [];

        // Personal Info
        $processedData['personal'] = $cvData['personal_info'] ?? [];

        // Summary
        $processedData['summary'] = $cvData['summary']['professional_summary'] ?? '';

        // Experience - sort by start date (most recent first)
        $processedData['experience'] = collect($cvData['experience'] ?? [])
            ->sortByDesc(function ($exp) {
                return $exp['start_date'] ?? '1900-01-01';
            })
            ->values()
            ->all();

        // Education - sort by graduation year (most recent first)
        $processedData['education'] = collect($cvData['education'] ?? [])
            ->sortByDesc(function ($edu) {
                return $edu['graduation_year'] ?? 1900;
            })
            ->values()
            ->all();

        // Skills - already grouped by category
        $processedData['skills'] = $cvData['skills'] ?? [];

        // Projects - sort by date or keep order
        $processedData['projects'] = $cvData['projects'] ?? [];

        return $processedData;
    }
}