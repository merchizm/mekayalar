<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->string('original_name')->nullable()->after('name');
            $table->bigInteger('size')->nullable()->after('path');
            $table->string('mime_type')->nullable()->after('size');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media', function (Blueprint $table) {
            $table->dropColumn('original_name');
            $table->dropColumn('size');
            $table->dropColumn('mime_type');
        });
    }
};
