<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clap extends Model
{
    protected $fillable = ['type', 'clappable_id', 'count'];
}
