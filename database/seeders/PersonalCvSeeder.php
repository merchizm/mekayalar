<?php

namespace Database\Seeders;

use App\Models\CvSection;
use App\Models\CvSectionQuestion;
use App\Models\CvSetting;
use Illuminate\Database\Seeder;

class PersonalCvSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedCvSections();
        $this->seedCvSettings();
    }

    private function seedCvSections(): void
    {
        $sections = [
            [
                'name' => 'personal_info',
                'title_translations' => [
                    'tr' => 'Kişisel Bilgiler',
                    'en' => 'Personal Information'
                ],
                'icon' => 'user',
                'sort_order' => 1,
                'questions' => [
                    [
                        'field_name' => 'full_name',
                        'label_translations' => [
                            'tr' => 'Ad Soyad',
                            'en' => 'Full Name'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'field_name' => 'title',
                        'label_translations' => [
                            'tr' => 'Meslek/Unvan',
                            'en' => 'Professional Title'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'field_name' => 'email',
                        'label_translations' => [
                            'tr' => 'E-posta',
                            'en' => 'Email'
                        ],
                        'input_type' => 'email',
                        'is_required' => true,
                        'validation_rules' => ['email'],
                        'sort_order' => 3,
                    ],
                    [
                        'field_name' => 'phone',
                        'label_translations' => [
                            'tr' => 'Telefon',
                            'en' => 'Phone'
                        ],
                        'input_type' => 'text',
                        'sort_order' => 4,
                    ],
                    [
                        'field_name' => 'location',
                        'label_translations' => [
                            'tr' => 'Konum',
                            'en' => 'Location'
                        ],
                        'input_type' => 'text',
                        'sort_order' => 5,
                    ],
                    [
                        'field_name' => 'website',
                        'label_translations' => [
                            'tr' => 'Website',
                            'en' => 'Website'
                        ],
                        'input_type' => 'url',
                        'validation_rules' => ['url'],
                        'sort_order' => 6,
                    ],
                ],
            ],
            [
                'name' => 'summary',
                'title_translations' => [
                    'tr' => 'Özet',
                    'en' => 'Summary'
                ],
                'icon' => 'document-text',
                'sort_order' => 2,
                'questions' => [
                    [
                        'field_name' => 'professional_summary',
                        'label_translations' => [
                            'tr' => 'Profesyonel Özet',
                            'en' => 'Professional Summary'
                        ],
                        'input_type' => 'textarea',
                        'is_required' => true,
                        'sort_order' => 1,
                    ],
                ],
            ],
            [
                'name' => 'experience',
                'title_translations' => [
                    'tr' => 'İş Deneyimi',
                    'en' => 'Work Experience'
                ],
                'icon' => 'briefcase',
                'sort_order' => 3,
                'questions' => [
                    [
                        'field_name' => 'company',
                        'label_translations' => [
                            'tr' => 'Şirket Adı',
                            'en' => 'Company Name'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'field_name' => 'position',
                        'label_translations' => [
                            'tr' => 'Pozisyon',
                            'en' => 'Position'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'field_name' => 'location',
                        'label_translations' => [
                            'tr' => 'Konum',
                            'en' => 'Location'
                        ],
                        'input_type' => 'text',
                        'sort_order' => 3,
                    ],
                    [
                        'field_name' => 'start_date',
                        'label_translations' => [
                            'tr' => 'Başlangıç Tarihi',
                            'en' => 'Start Date'
                        ],
                        'input_type' => 'date',
                        'is_required' => true,
                        'sort_order' => 4,
                    ],
                    [
                        'field_name' => 'end_date',
                        'label_translations' => [
                            'tr' => 'Bitiş Tarihi',
                            'en' => 'End Date'
                        ],
                        'input_type' => 'date',
                        'placeholder' => 'Devam ediyorsa boş bırakın',
                        'sort_order' => 5,
                    ],
                    [
                        'field_name' => 'description',
                        'label_translations' => [
                            'tr' => 'Açıklama',
                            'en' => 'Description'
                        ],
                        'input_type' => 'textarea',
                        'sort_order' => 6,
                    ],
                ],
            ],
            [
                'name' => 'education',
                'title_translations' => [
                    'tr' => 'Eğitim',
                    'en' => 'Education'
                ],
                'icon' => 'academic-cap',
                'sort_order' => 4,
                'questions' => [
                    [
                        'field_name' => 'institution',
                        'label_translations' => [
                            'tr' => 'Kurum',
                            'en' => 'Institution'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'field_name' => 'degree',
                        'label_translations' => [
                            'tr' => 'Derece/Bölüm',
                            'en' => 'Degree/Field'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'field_name' => 'graduation_year',
                        'label_translations' => [
                            'tr' => 'Mezuniyet Yılı',
                            'en' => 'Graduation Year'
                        ],
                        'input_type' => 'number',
                        'validation_rules' => ['numeric', 'min:1980', 'max:2030'],
                        'sort_order' => 3,
                    ],
                    [
                        'field_name' => 'gpa',
                        'label_translations' => [
                            'tr' => 'Not Ortalaması',
                            'en' => 'GPA'
                        ],
                        'input_type' => 'text',
                        'sort_order' => 4,
                    ],
                ],
            ],
            [
                'name' => 'skills',
                'title_translations' => [
                    'tr' => 'Yetenekler',
                    'en' => 'Skills'
                ],
                'icon' => 'code',
                'sort_order' => 5,
                'questions' => [
                    [
                        'field_name' => 'category',
                        'label_translations' => [
                            'tr' => 'Kategori',
                            'en' => 'Category'
                        ],
                        'input_type' => 'select',
                        'options' => [
                            'Programming Languages' => 'Programlama Dilleri',
                            'Frameworks' => 'Framework\'ler',
                            'Databases' => 'Veritabanları',
                            'Tools' => 'Araçlar',
                            'Soft Skills' => 'Kişisel Yetenekler',
                        ],
                        'is_required' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'field_name' => 'skill_name',
                        'label_translations' => [
                            'tr' => 'Yetenek',
                            'en' => 'Skill'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'field_name' => 'level',
                        'label_translations' => [
                            'tr' => 'Seviye',
                            'en' => 'Level'
                        ],
                        'input_type' => 'select',
                        'options' => [
                            'Beginner' => 'Başlangıç',
                            'Intermediate' => 'Orta',
                            'Advanced' => 'İleri',
                            'Expert' => 'Uzman',
                        ],
                        'sort_order' => 3,
                    ],
                ],
            ],
            [
                'name' => 'projects',
                'title_translations' => [
                    'tr' => 'Projeler',
                    'en' => 'Projects'
                ],
                'icon' => 'folder',
                'sort_order' => 6,
                'questions' => [
                    [
                        'field_name' => 'name',
                        'label_translations' => [
                            'tr' => 'Proje Adı',
                            'en' => 'Project Name'
                        ],
                        'input_type' => 'text',
                        'is_required' => true,
                        'sort_order' => 1,
                    ],
                    [
                        'field_name' => 'description',
                        'label_translations' => [
                            'tr' => 'Açıklama',
                            'en' => 'Description'
                        ],
                        'input_type' => 'textarea',
                        'is_required' => true,
                        'sort_order' => 2,
                    ],
                    [
                        'field_name' => 'technologies',
                        'label_translations' => [
                            'tr' => 'Kullanılan Teknolojiler (virgülle ayırın)',
                            'en' => 'Technologies Used (comma separated)'
                        ],
                        'input_type' => 'text',
                        'sort_order' => 3,
                    ],
                    [
                        'field_name' => 'url',
                        'label_translations' => [
                            'tr' => 'Proje URL\'si',
                            'en' => 'Project URL'
                        ],
                        'input_type' => 'url',
                        'validation_rules' => ['url'],
                        'sort_order' => 4,
                    ],
                    [
                        'field_name' => 'github',
                        'label_translations' => [
                            'tr' => 'GitHub URL\'si',
                            'en' => 'GitHub URL'
                        ],
                        'input_type' => 'url',
                        'validation_rules' => ['url'],
                        'sort_order' => 5,
                    ],
                ],
            ],
        ];

        foreach ($sections as $sectionData) {
            $questions = $sectionData['questions'];
            unset($sectionData['questions']);

            $section = CvSection::create($sectionData);

            foreach ($questions as $questionData) {
                $questionData['cv_section_id'] = $section->id;
                CvSectionQuestion::create($questionData);
            }
        }
    }

    private function seedCvSettings(): void
    {
        CvSetting::set('cv_template', [
            'template' => 'modern',
            'colors' => [
                'primary' => '#2563eb',
                'secondary' => '#1f2937',
            ],
            'font_family' => 'Inter',
        ]);

        CvSetting::set('cv_visibility', [
            'show_on_public_site' => true,
            'allow_pdf_download' => true,
            'show_contact_info' => true,
        ]);
    }
}