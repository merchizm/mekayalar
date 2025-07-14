<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('tech_stack');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('tech_stack', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->enum('icon_type', ['wdm', 'withoutdm']);
            $table->string('icon_name');
            $table->year('start_year');
            $table->timestamps();
        });
    }
};
