<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'url',
        'github_url',
        'is_featured',
        'is_published',
        'completed_at',
        'tags',
    ];

    protected $casts = [
        'is_featured'  => 'boolean',
        'is_published' => 'boolean',
        'completed_at' => 'date',
        'tags'         => 'array',
    ];

    public function setTitleAttribute($value): void
    {
        $this->attributes['title'] = $value;

        $slugText                 = $this->extractLocalizedText($value);
        $this->attributes['slug'] = Str::slug($slugText);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Extract localized text for slug generation
     * Prioritizes English for SEO-friendly URLs, falls back to Turkish, or returns plain text.
     */
    private function extractLocalizedText(string $text): string
    {
        if (empty($text)) {
            return '';
        }

        // Check if text has language markers
        if (str_contains($text, '[tr:]') || str_contains($text, '[en:]')) {
            // Prioritize English for SEO-friendly slugs
            if (preg_match('/\[en:\](.*?)\[:\]/s', $text, $matches)) {
                return $matches[1];
            }

            // Fallback to Turkish if no English
            if (preg_match('/\[tr:\](.*?)\[:\]/s', $text, $matches)) {
                return $matches[1];
            }
        }

        // Backward compatibility: return plain text as-is
        return $text;
    }

    /**
     * Parse multilingual content from field
     * Format: [tr:]Turkish content[:][en:]English content[:]
     * Backward compatible: if no markers, treats as Turkish content.
     */
    private function parseMultilingual(string $field): array
    {
        $value = $this->attributes[$field] ?? '';

        // If empty, return empty array
        if (empty($value)) {
            return ['tr' => '', 'en' => ''];
        }

        // Check if content has language markers
        if (str_contains($value, '[tr:]') || str_contains($value, '[en:]')) {
            $result = ['tr' => '', 'en' => ''];

            // Extract Turkish content
            if (preg_match('/\[tr:\](.*?)\[:\]/s', $value, $matches)) {
                $result['tr'] = $matches[1];
            }

            // Extract English content
            if (preg_match('/\[en:\](.*?)\[:\]/s', $value, $matches)) {
                $result['en'] = $matches[1];
            }

            return $result;
        }

        // Backward compatibility: no markers means Turkish content
        return ['tr' => $value, 'en' => ''];
    }

    /**
     * Get localized content for a field
     * Returns empty string if locale doesn't exist (no fallback).
     */
    public function getLocalized(string $field, ?string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        $parsed = $this->parseMultilingual($field);

        // Return requested language only, no fallback
        return $parsed[$locale] ?? '';
    }

    /**
     * Localize an arbitrary multilingual string value.
     */
    public function localizeValue(?string $value, ?string $locale = null): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        $locale = $locale ?? app()->getLocale();

        if (str_contains($value, '[tr:]') || str_contains($value, '[en:]')) {
            if (preg_match('/\['.preg_quote($locale, '/').':\](.*?)\[:\]/s', $value, $matches)) {
                return trim($matches[1]);
            }

            if ($locale !== 'tr' && preg_match('/\[tr:\](.*?)\[:\]/s', $value, $matches)) {
                return trim($matches[1]);
            }

            if (preg_match('/\[en:\](.*?)\[:\]/s', $value, $matches)) {
                return trim($matches[1]);
            }
        }

        return trim($value);
    }

    /**
     * Return localized tags for the given locale.
     */
    public function getLocalizedTags(?string $locale = null): array
    {
        $tags = is_array($this->tags) ? $this->tags : [];

        return collect($tags)
            ->map(fn ($tag) => is_string($tag) ? $this->localizeValue($tag, $locale) : '')
            ->filter()
            ->values()
            ->all();
    }

    /**
     * Check if content exists for a specific locale.
     */
    public function hasLocale(string $locale): bool
    {
        // Check all multilingual fields
        $fields = ['title', 'description', 'content'];

        foreach ($fields as $field) {
            $parsed = $this->parseMultilingual($field);
            // If any field has content in this locale, return true
            if (!empty($parsed[$locale])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Encode multilingual content for storage.
     */
    public static function encodeMultilingual(?string $tr, ?string $en): string
    {
        $parts = [];

        if (!empty($tr)) {
            $parts[] = "[tr:]{$tr}[:]";
        }

        if (!empty($en)) {
            $parts[] = "[en:]{$en}[:]";
        }

        return implode('', $parts);
    }

    // Accessor methods for Turkish content
    public function getTitleTrAttribute(): string
    {
        return $this->parseMultilingual('title')['tr'];
    }

    public function getDescriptionTrAttribute(): string
    {
        return $this->parseMultilingual('description')['tr'];
    }

    public function getContentTrAttribute(): string
    {
        return $this->parseMultilingual('content')['tr'];
    }

    // Accessor methods for English content
    public function getTitleEnAttribute(): string
    {
        return $this->parseMultilingual('title')['en'];
    }

    public function getDescriptionEnAttribute(): string
    {
        return $this->parseMultilingual('description')['en'];
    }

    public function getContentEnAttribute(): string
    {
        return $this->parseMultilingual('content')['en'];
    }

    // Accessor methods for localized content (based on app locale)
    public function getLocalizedTitleAttribute(): string
    {
        return $this->getLocalized('title');
    }

    public function getLocalizedDescriptionAttribute(): string
    {
        return $this->getLocalized('description');
    }

    public function getLocalizedContentAttribute(): string
    {
        return $this->getLocalized('content');
    }
}
