<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuestbookReaction extends Model
{
    protected $fillable = [
        'entry_id',
        'user_id',
        'guest_ip',
        'emoji',
    ];

    public function entry(): BelongsTo
    {
        return $this->belongsTo(GuestbookEntry::class, 'entry_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
