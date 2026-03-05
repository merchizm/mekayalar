<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::table('guestbook_entries', function (Blueprint $table): void {
            $table->boolean('approved')->default(true)->index()->after('city');
        });
    }

    public function down(): void
    {
        Schema::table('guestbook_entries', function (Blueprint $table): void {
            $table->dropColumn('approved');
        });
    }
};
