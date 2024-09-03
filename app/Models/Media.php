<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'path',
        'type'
    ];

    protected $appends = [
        'url',
    ];

    public function getUrlAttribute(){
        return asset($this->attributes['path']);
    }
}
