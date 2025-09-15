<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('my_cv_data', function (Blueprint $table) {
            $table->string('language', 2)->default('tr')->after('section_name');
            $table->dropUnique(['section_name']);
            $table->unique(['section_name', 'language']);
        });
    }

    public function down(): void
    {
        Schema::table('my_cv_data', function (Blueprint $table) {
            $table->dropUnique(['section_name', 'language']);
            $table->dropColumn('language');
            $table->unique('section_name');
        });
    }
};