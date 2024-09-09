<?php

namespace App\Models;

use App\Enums\PostEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    protected $fillable = [
        'post_title',
        'post_slug',
        'post_content',
        'post_status',
        'author',
        'post_category_id',
        'post_tags',
        'post_image',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'post_tags' => 'array',
        'post_status' => PostEnum::class,
    ];

    protected $appends = [
        'readingTime'
    ];

    public function getReadingTimeAttribute()
    {
        $text_content = strip_tags($this->post_content);
        $word_count = str_word_count($text_content);
        $reading_time_minutes = ceil($word_count / 200);
        return $reading_time_minutes;
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author');
    }

    public function thumbnail(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'post_image');
    }

    public function category(): HasMany
    {
        return $this->hasMany(Category::class, 'post_category_id');
    }

}
