<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'name',
        'original_name',
        'path',
        'type',
        'parent_folder',
        'size',
        'mime_type',
    ];

    protected $appends = [
        'url',
    ];

    public function getUrlAttribute()
    {
        $parentFolder = $this->attributes['parent_folder'];
        $name = $this->attributes['name'];
        
        // Handle root folder case to avoid double slashes
        if ($parentFolder === '/') {
            return asset('storage/uploads/' . $name);
        }
        
        return asset('storage/uploads/' . trim($parentFolder, '/') . '/' . $name);
    }
}
