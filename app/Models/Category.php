<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
        'slug',
    ];

    protected $attributes = [
        'description' => 'Kategori',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class, 'post_category_id');
    }
}
