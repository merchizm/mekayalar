<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CvSectionQuestion extends Model
{
    protected $fillable = [
        'cv_section_id',
        'field_name',
        'label_translations',
        'input_type',
        'options',
        'is_required',
        'validation_rules',
        'placeholder',
        'sort_order',
    ];

    protected $casts = [
        'label_translations' => 'array',
        'options' => 'array',
        'validation_rules' => 'array',
        'is_required' => 'boolean',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(CvSection::class, 'cv_section_id');
    }

    public function getTranslatedLabel(string $locale = 'tr'): string
    {
        return $this->label_translations[$locale] ?? $this->label_translations['en'] ?? $this->field_name;
    }

    public function getValidationRules(): array
    {
        $rules = [];
        
        if ($this->is_required) {
            $rules[] = 'required';
        }
        
        if ($this->validation_rules) {
            $rules = array_merge($rules, $this->validation_rules);
        }
        
        return $rules;
    }
}