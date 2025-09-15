<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CvSection extends Model
{
    protected $fillable = [
        'name',
        'title_translations',
        'icon',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'title_translations' => 'array',
        'is_active' => 'boolean',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(CvSectionQuestion::class)->orderBy('sort_order');
    }

    public function getTranslatedTitle(string $locale = 'tr'): string
    {
        return $this->title_translations[$locale] ?? $this->title_translations['en'] ?? $this->name;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}