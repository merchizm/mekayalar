<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechStack extends Model
{
    protected $table = 'tech_stack';

    protected $fillable = [
        'name',
        'icon_type',
        'icon_name',
        'start_year',
        'status',
    ];
}
