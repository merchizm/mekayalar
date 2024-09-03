<?php

namespace App\Enums;

enum PostEnum : string
{
    case PUBLISHED = 'published';
    case DRAFT = 'draft';
    case TRASH = 'trash';

    public function label(): string
    {
        return match ($this) {
            self::PUBLISHED => 'Paylaşıldı',
            self::DRAFT => 'Taslak',
            self::TRASH => 'Çöp',
        };
    }

    public function color(): string
    {
        return match ($this){
            self::PUBLISHED => 'success',
            self::DRAFT => 'warning',
            self::TRASH => 'danger',
        };
    }
}
