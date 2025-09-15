<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // CV Sections (Experience, Education, Skills, etc.)
        Schema::create('cv_sections', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // experience, education, skills, projects, etc.
            $table->json('title_translations'); // {en: "Experience", tr: "Deneyim"}
            $table->string('icon')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Dynamic Questions for each section
        Schema::create('cv_section_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_section_id')->constrained()->onDelete('cascade');
            $table->string('field_name'); // company, position, start_date, etc.
            $table->json('label_translations'); // {en: "Company Name", tr: "Şirket Adı"}
            $table->string('input_type'); // text, textarea, date, select, etc.
            $table->json('options')->nullable(); // For select inputs
            $table->boolean('is_required')->default(false);
            $table->json('validation_rules')->nullable();
            $table->string('placeholder')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Your personal CV data
        Schema::create('my_cv_data', function (Blueprint $table) {
            $table->id();
            $table->string('section_name'); // experience, education, skills, etc.
            $table->json('data'); // All the data for that section
            $table->integer('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->unique('section_name');
        });

        // CV Settings and metadata
        Schema::create('cv_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cv_settings');
        Schema::dropIfExists('my_cv_data');
        Schema::dropIfExists('cv_section_questions');
        Schema::dropIfExists('cv_sections');
    }
};