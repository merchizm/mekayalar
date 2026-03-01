<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table): void {
            $table->dropForeign(['post_category_id']);
        });

        Schema::table('posts', function (Blueprint $table): void {
            $table->text('post_content')->nullable()->change();
            $table->unsignedBigInteger('post_category_id')->nullable()->change();
            $table->string('post_image')->nullable()->change();
            $table->string('description')->nullable()->change();
            $table->text('quote_text')->nullable()->after('description');
            $table->string('quote_page')->nullable()->after('quote_text');
            $table->string('quote_highlight_color')->nullable()->after('quote_page');
            $table->foreign('post_category_id')->references('id')->on('categories')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table): void {
            $table->dropForeign(['post_category_id']);
            $table->dropColumn(['quote_text', 'quote_page', 'quote_highlight_color']);
            $table->text('post_content')->nullable(false)->change();
            $table->unsignedBigInteger('post_category_id')->nullable(false)->change();
            $table->string('post_image')->nullable(false)->change();
            $table->string('description')->nullable(false)->change();
            $table->foreign('post_category_id')->references('id')->on('categories')->cascadeOnDelete();
        });
    }
};
