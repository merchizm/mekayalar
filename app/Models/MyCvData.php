<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyCvData extends Model
{
    protected $table = 'my_cv_data';

    protected $fillable = [
        'section_name',
        'language',
        'data',
        'sort_order',
        'is_visible',
    ];

    protected $casts = [
        'data' => 'array',
        'is_visible' => 'boolean',
    ];

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    public static function getSection(string $sectionName, string $language = 'tr'): ?self
    {
        return static::where('section_name', $sectionName)
                     ->where('language', $language)
                     ->first();
    }

    public static function updateSection(string $sectionName, array $data, string $language = 'tr'): self
    {
        return static::updateOrCreate(
            ['section_name' => $sectionName, 'language' => $language],
            ['data' => $data]
        );
    }

    public static function getSectionBothLanguages(string $sectionName): array
    {
        $sections = static::where('section_name', $sectionName)->get();
        return [
            'tr' => $sections->firstWhere('language', 'tr'),
            'en' => $sections->firstWhere('language', 'en'),
        ];
    }

    public function getCvSection(): ?CvSection
    {
        return CvSection::where('name', $this->section_name)->first();
    }
}