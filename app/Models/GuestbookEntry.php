<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GuestbookEntry extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'message',
        'ip_address',
        'avatar_seed',
        'country_code',
        'country',
        'region',
        'city',
        'approved',
    ];

    protected $casts = [
        'approved' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(GuestbookReaction::class, 'entry_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(GuestbookReply::class, 'entry_id');
    }
}
