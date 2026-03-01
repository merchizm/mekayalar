<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::table('guestbook_entries', function (Blueprint $table): void {
            $table->decimal('lat', 8, 5)->nullable()->after('city');
            $table->decimal('lng', 8, 5)->nullable()->after('lat');
        });
    }

    public function down(): void
    {
        Schema::table('guestbook_entries', function (Blueprint $table): void {
            $table->dropColumn(['lat', 'lng']);
        });
    }
};
