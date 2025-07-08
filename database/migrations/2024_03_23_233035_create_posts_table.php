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
        Schema::create('posts', function (Blueprint $table): void {
            $table->id();
            $table->string('post_title');
            $table->string('post_slug');
            $table->text('post_content');
            $table->string('post_status')->default('draft');
            $table->json('post_tags')->nullable();
            $table->string('post_image')->comment('thumbnail');

            $table->foreignId('post_category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('author')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
