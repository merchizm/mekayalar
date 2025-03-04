<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    

    protected $fillable = [
        'name',
        'description',
        'image',
        'slug'
    ];

    protected $attributes = [
        'description' => 'Kategori'
    ];
}
