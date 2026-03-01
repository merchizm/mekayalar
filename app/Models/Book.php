<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Book extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'author',
        'cover_image',
        'publisher',
        'published_year',
        'started_at',
        'finished_at',
        'rating',
        'notes',
        'status',
        'is_public',
        'sort_order',
    ];

    protected $casts = [
        'started_at'  => 'date',
        'finished_at' => 'date',
        'rating'      => 'integer',
        'is_public'   => 'boolean',
        'sort_order'  => 'integer',
    ];

    protected static function booted(): void
    {
        static::saving(function (Book $book): void {
            if (!$book->slug || $book->isDirty('title')) {
                $book->slug = Str::slug($book->title);
            }
        });
    }

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class)
            ->withPivot('is_primary')
            ->withTimestamps();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
