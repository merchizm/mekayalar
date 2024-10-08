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
            self::PUBLISHED => 'bg-lime-lt',
            self::DRAFT => 'bg-indigo-lt',
            self::TRASH => 'bg-orange-lt',
        };
    }
}
