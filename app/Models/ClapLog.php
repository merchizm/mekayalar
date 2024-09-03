<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClapLog extends Model
{
    protected $table = 'clap_logs';

    protected $fillable = [
        'clap_id',
        'ip_address',
        'count'
    ];
}
