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
        $this->attributes['slug']  = Str::slug($value);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
