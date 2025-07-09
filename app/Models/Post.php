<?php

namespace App\Models;

use App\Enums\PostEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Parsedown;

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
        'type',
        'description',
    ];

    protected $casts = [
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
        'post_tags'   => 'array',
        'post_status' => PostEnum::class,
    ];

    protected $appends = [
        'readingTime',
        'content',
    ];

    public function getReadingTimeAttribute()
    {
        $text_content         = strip_tags($this->post_content);
        $word_count           = str_word_count($text_content);
        $reading_time_minutes = ceil($word_count / 200);

        return $reading_time_minutes;
    }

    public function post_author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author');
    }

    public function thumbnail(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'post_image');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'post_category_id');
    }

    public function getContentAttribute()
    {
        $Parsedown = new Parsedown();

        return $Parsedown->text($this->post_content);
    }
}
