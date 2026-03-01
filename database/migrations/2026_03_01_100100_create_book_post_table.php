<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create('book_post', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
            $table->foreignId('post_id')->constrained('posts')->cascadeOnDelete();
            $table->boolean('is_primary')->default(true);
            $table->timestamps();
            $table->unique(['book_id', 'post_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('book_post');
    }
};
