<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CvSection;
use App\Models\CvSectionQuestion;
use App\Models\MyCvData;
use App\Models\CvSetting;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CvController extends Controller
{
    public function index()
    {
        $sections = CvSection::active()->ordered()->with('questions')->get();
        
        // Get CV data for both languages
        $cvDataTr = MyCvData::where('language', 'tr')->ordered()->get()->keyBy('section_name');
        $cvDataEn = MyCvData::where('language', 'en')->ordered()->get()->keyBy('section_name');
        
        $settings = [
            'template' => CvSetting::get('cv_template', []),
            'visibility' => CvSetting::get('cv_visibility', []),
        ];

        return Inertia::render('Admin/CV/Index', [
            'sections' => $sections,
            'cvData' => [
                'tr' => $cvDataTr,
                'en' => $cvDataEn,
            ],
            'settings' => $settings,
        ]);
    }

    public function editSection($sectionName)
    {
        $section = CvSection::where('name', $sectionName)->with('questions')->firstOrFail();
        $cvDataBoth = MyCvData::getSectionBothLanguages($sectionName);

        $additionalData = [];
        
        // If this is projects section, also get existing projects
        if ($sectionName === 'projects') {
            $additionalData['existingProjects'] = Project::where('is_published', true)
                ->orderBy('completed_at', 'desc')
                ->get()
                ->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'name' => $project->title,
                        'description' => $project->description,
                        'technologies' => $project->tags ?? [],
                        'url' => $project->url,
                        'github' => $project->github_url,
                        'start_date' => $project->started_at ? $project->started_at->format('Y-m-d') : null,
                        'end_date' => $project->completed_at ? $project->completed_at->format('Y-m-d') : null,
                        'is_from_projects' => true,
                        'project_id' => $project->id,
                    ];
                });
        }

        return Inertia::render('Admin/CV/EditSection', [
            'section' => $section,
            'cvData' => [
                'tr' => $cvDataBoth['tr'] ? $cvDataBoth['tr']->data : [],
                'en' => $cvDataBoth['en'] ? $cvDataBoth['en']->data : [],
            ],
            ...$additionalData,
        ]);
    }

    public function updateSection(Request $request, $sectionName)
    {
        \Log::info('CV Section Update Request', [
            'section' => $sectionName,
            'all_data' => $request->all(),
            'tr_data' => $request->input('tr', []),
            'en_data' => $request->input('en', []),
            'method' => $request->method(),
            'url' => $request->url()
        ]);
        
        $section = CvSection::where('name', $sectionName)->with('questions')->firstOrFail();
        
        \Log::info('Section found', [
            'section_name' => $section->name,
            'questions_count' => $section->questions->count()
        ]);
        
        // Temporarily skip validation for debugging
        \Log::info('Skipping validation for debugging');

        // Process data based on section type for both languages
        $dataTr = $this->processDataForSection($sectionName, $request->input('tr', []));
        $dataEn = $this->processDataForSection($sectionName, $request->input('en', []));

        // Save both languages
        if (!empty($dataTr)) {
            \Log::info('Saving TR data', ['section' => $sectionName, 'data' => $dataTr]);
            MyCvData::updateSection($sectionName, $dataTr, 'tr');
        }
        if (!empty($dataEn)) {
            \Log::info('Saving EN data', ['section' => $sectionName, 'data' => $dataEn]);
            MyCvData::updateSection($sectionName, $dataEn, 'en');
        }
        
        \Log::info('CV Section updated successfully', ['section' => $sectionName]);

        return redirect()->route('admin.cv.index')->with('success', 'CV bölümü başarıyla güncellendi!');
    }

    public function settings()
    {
        $settings = [
            'template' => CvSetting::get('cv_template', [
                'template' => 'modern',
                'colors' => [
                    'primary' => '#2563eb',
                    'secondary' => '#1f2937',
                ],
                'font_family' => 'Inter',
            ]),
            'visibility' => CvSetting::get('cv_visibility', [
                'show_on_public_site' => true,
                'allow_pdf_download' => true,
                'show_contact_info' => true,
            ]),
        ];

        return Inertia::render('Admin/CV/Settings', [
            'settings' => $settings,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'template.template' => 'required|string',
            'template.colors.primary' => 'required|string',
            'template.colors.secondary' => 'required|string',
            'template.font_family' => 'required|string',
            'visibility.show_on_public_site' => 'boolean',
            'visibility.allow_pdf_download' => 'boolean',
            'visibility.show_contact_info' => 'boolean',
        ]);

        CvSetting::set('cv_template', $request->input('template'));
        CvSetting::set('cv_visibility', $request->input('visibility'));

        return back()->with('success', 'CV settings updated successfully!');
    }

    public function preview()
    {
        // Get CV data for both languages like in index method
        $cvDataTr = MyCvData::where('language', 'tr')->ordered()->get()->keyBy('section_name');
        $cvDataEn = MyCvData::where('language', 'en')->ordered()->get()->keyBy('section_name');
        
        // Transform to the format expected by frontend
        $cvData = [
            'tr' => [],
            'en' => []
        ];
        
        foreach ($cvDataTr as $section) {
            $cvData['tr'][$section->section_name] = $section->data;
        }
        
        foreach ($cvDataEn as $section) {
            $cvData['en'][$section->section_name] = $section->data;
        }
        
        $settings = [
            'template' => CvSetting::get('cv_template', []),
            'visibility' => CvSetting::get('cv_visibility', []),
        ];

        return Inertia::render('Admin/CV/Preview', [
            'cvData' => $cvData,
            'settings' => $settings,
        ]);
    }

    public function generatePdf()
    {
        // Get Turkish CV data for PDF (you can add language parameter later)
        $language = request('lang', 'tr');
        $cvData = $this->getCvDataForLanguage($language);
        $settings = CvSetting::get('cv_template', []);

        \Log::info('Generating PDF', [
            'language' => $language,
            'cv_data_keys' => array_keys($cvData),
            'settings' => $settings
        ]);

        $pdf = app(\App\Services\PersonalCvPdfGenerator::class)->generate($cvData, $settings);

        return response()->streamDownload(function() use ($pdf) {
            echo $pdf;
        }, 'meric-enes-kayalar-cv.pdf', [
            'Content-Type' => 'application/pdf',
        ]);
    }

    private function processDataForSection(string $sectionName, array $requestData): array
    {
        \Log::info('Processing data for section', [
            'section' => $sectionName,
            'request_data' => $requestData
        ]);
        
        switch ($sectionName) {
            case 'personal_info':
            case 'summary':
                // Single record sections
                \Log::info('Processing as single record section');
                return $requestData;
                
            case 'experience':
            case 'education':
            case 'projects':
                // Multiple record sections - expect array of items
                \Log::info('Processing as multiple items section', [
                    'has_items' => isset($requestData['items']),
                    'items_count' => isset($requestData['items']) ? count($requestData['items']) : 0
                ]);
                return $requestData['items'] ?? [];
                
            case 'skills':
                // Skills are grouped by category
                $skills = [];
                
                // Skills come as { items: [...] } format from frontend
                $skillItems = $requestData['items'] ?? [];
                
                \Log::info('Processing skills items', ['skill_items' => $skillItems]);
                
                if (!empty($skillItems)) {
                    foreach ($skillItems as $skill) {
                        $category = $skill['category'] ?? 'General';
                        if (!isset($skills[$category])) {
                            $skills[$category] = [];
                        }
                        $skills[$category][] = [
                            'skill_name' => $skill['skill_name'] ?? '',
                            'level' => $skill['level'] ?? 'Intermediate',
                        ];
                    }
                }
                
                \Log::info('Processing as skills section', ['final_skills' => $skills]);
                return $skills;
                
            default:
                \Log::info('Processing as default section');
                return $requestData;
        }
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

    private function getCvDataForLanguage(string $language = 'tr'): array
    {
        $sections = MyCvData::where('language', $language)->visible()->ordered()->get();
        $data = [];
        
        foreach ($sections as $section) {
            $data[$section->section_name] = $section->data;
        }
        
        return $data;
    }

    public function addItem(Request $request, $sectionName)
    {
        $section = CvSection::where('name', $sectionName)->firstOrFail();
        $cvData = MyCvData::getSection($sectionName);
        $currentData = $cvData ? $cvData->data : [];

        // For sections that support multiple items
        if (in_array($sectionName, ['experience', 'education', 'projects', 'skills'])) {
            $currentData[] = $request->all();
            MyCvData::updateSection($sectionName, $currentData);
        }

        return back()->with('success', 'Item added successfully!');
    }

    public function removeItem(Request $request, $sectionName, $index)
    {
        $cvData = MyCvData::getSection($sectionName);
        if (!$cvData) {
            return back()->withErrors(['error' => 'Section not found']);
        }

        $currentData = $cvData->data;
        if (isset($currentData[$index])) {
            array_splice($currentData, $index, 1);
            MyCvData::updateSection($sectionName, $currentData);
        }

        return back()->with('success', 'Item removed successfully!');
    }

    public function reorderItems(Request $request, $sectionName)
    {
        $request->validate([
            'items' => 'required|array',
        ]);

        MyCvData::updateSection($sectionName, $request->input('items'));

        return response()->json(['success' => true]);
    }
}