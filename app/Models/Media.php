<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    protected $fillable = [
        'name',
        'original_name',
        'path',
        'type',
        'parent_folder',
        'size',
        'mime_type'
    ];

    protected $appends = [
        'url',
    ];

    public function getUrlAttribute(){
        return asset('storage/uploads/'.$this->attributes['parent_folder'].'/'. $this->attributes['name']);
    }
}
