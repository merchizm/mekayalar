<?php

namespace App\Http\Controllers;

use App\Models\MyCvData;
use App\Models\CvSetting;
use App\Services\PersonalCvPdfGenerator;
use Inertia\Inertia;

class PublicCvController extends Controller
{
    public function show()
    {
        $visibility = CvSetting::get('cv_visibility', ['show_on_public_site' => false]);
        
        if (!$visibility['show_on_public_site']) {
            abort(404);
        }

        // Get questionnaire parameters
        $language = request('lang', 'tr');
        $roleFocus = request('role_focus', 'fullstack');
        $purpose = request('purpose', 'general_view');
        $industry = request('industry', 'tech');

        $cvData = $this->getCvDataForLanguage($language, $roleFocus);
        $settings = [
            'template' => CvSetting::get('cv_template', []),
            'visibility' => $visibility,
        ];

        return Inertia::render('CV/PublicView', [
            'cvData' => $cvData,
            'settings' => $settings,
            'questionnaire' => [
                'language' => $language,
                'roleFocus' => $roleFocus,
                'purpose' => $purpose,
                'industry' => $industry,
            ],
        ]);
    }

    public function downloadPdf()
    {
        $visibility = CvSetting::get('cv_visibility', [
            'show_on_public_site' => false,
            'allow_pdf_download' => false,
        ]);
        
        if (!$visibility['show_on_public_site'] || !$visibility['allow_pdf_download']) {
            abort(404);
        }

        // Get questionnaire parameters for PDF
        $language = request('lang', 'tr');
        $roleFocus = request('role_focus', 'fullstack');
        
        $cvData = $this->getCvDataForLanguage($language, $roleFocus);
        $settings = CvSetting::get('cv_template', []);

        $pdf = app(PersonalCvPdfGenerator::class)->generate($cvData, $settings);

        return response()->streamDownload(function() use ($pdf) {
            echo $pdf;
        }, "meric-enes-kayalar-{$roleFocus}-cv.pdf", [
            'Content-Type' => 'application/pdf',
        ]);
    }

    private function getFullCvData(): array
    {
        $sections = MyCvData::visible()->ordered()->get();
        $data = [];
        
        foreach ($sections as $section) {
            $data[$section->section_name] = $section->data;
        }
        
        return $data;
    }

    private function getCvDataForLanguage(string $language = 'tr', string $roleFocus = 'fullstack'): array
    {
        $sections = MyCvData::where('language', $language)->visible()->ordered()->get();
        $data = [];
        
        foreach ($sections as $section) {
            $data[$section->section_name] = $section->data;
        }

        // Customize CV based on role focus
        return $this->customizeCvForRole($data, $roleFocus);
    }

    private function customizeCvForRole(array $cvData, string $roleFocus): array
    {
        // Skills prioritization based on role
        if (isset($cvData['skills']) && is_array($cvData['skills'])) {
            $cvData['skills'] = $this->prioritizeSkillsForRole($cvData['skills'], $roleFocus);
        }

        // Projects filtering and prioritization
        if (isset($cvData['projects']) && is_array($cvData['projects'])) {
            $cvData['projects'] = $this->prioritizeProjectsForRole($cvData['projects'], $roleFocus);
        }

        // Experience highlighting
        if (isset($cvData['experience']) && is_array($cvData['experience'])) {
            $cvData['experience'] = $this->highlightExperienceForRole($cvData['experience'], $roleFocus);
        }

        return $cvData;
    }

    private function prioritizeSkillsForRole(array $skills, string $roleFocus): array
    {
        $skillsPriority = [
            'backend' => ['Backend', 'Database', 'API', 'Server', 'Infrastructure'],
            'frontend' => ['Frontend', 'UI/UX', 'JavaScript', 'CSS', 'Design'],
            'fullstack' => ['Full-Stack', 'Backend', 'Frontend', 'JavaScript', 'Database'],
            'devops' => ['DevOps', 'Infrastructure', 'Cloud', 'Automation', 'Monitoring'],
        ];

        $priority = $skillsPriority[$roleFocus] ?? $skillsPriority['fullstack'];
        $sortedSkills = [];

        // First add priority categories
        foreach ($priority as $categoryName) {
            foreach ($skills as $category => $skillList) {
                if (stripos($category, $categoryName) !== false) {
                    $sortedSkills[$category] = $skillList;
                    break;
                }
            }
        }

        // Then add remaining categories
        foreach ($skills as $category => $skillList) {
            if (!isset($sortedSkills[$category])) {
                $sortedSkills[$category] = $skillList;
            }
        }

        return $sortedSkills;
    }

    private function prioritizeProjectsForRole(array $projects, string $roleFocus): array
    {
        $roleKeywords = [
            'backend' => ['api', 'backend', 'server', 'database', 'microservice'],
            'frontend' => ['frontend', 'ui', 'react', 'vue', 'angular', 'javascript'],
            'fullstack' => ['full-stack', 'fullstack', 'web', 'application'],
            'devops' => ['devops', 'docker', 'kubernetes', 'ci/cd', 'deployment'],
        ];

        $keywords = $roleKeywords[$roleFocus] ?? [];

        usort($projects, function($a, $b) use ($keywords) {
            $scoreA = 0;
            $scoreB = 0;

            foreach ($keywords as $keyword) {
                if (stripos($a['description'] ?? '', $keyword) !== false || 
                    stripos($a['name'] ?? '', $keyword) !== false) {
                    $scoreA++;
                }
                if (stripos($b['description'] ?? '', $keyword) !== false || 
                    stripos($b['name'] ?? '', $keyword) !== false) {
                    $scoreB++;
                }
            }

            return $scoreB - $scoreA; // Higher score first
        });

        return array_slice($projects, 0, 6); // Limit to top 6 projects
    }

    private function highlightExperienceForRole(array $experience, string $roleFocus): array
    {
        // This could add role-specific highlights to experience descriptions
        // For now, just return as is, but you could enhance descriptions based on role focus
        return $experience;
    }
}