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
        Schema::table('tech_stack', function (Blueprint $table) {
            $table->enum('status', [1,2,3]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tech_stack', function (Blueprint $table) {
            // hiç bir şey yapmamıza gerek yok açıkcası
        });
    }
};
