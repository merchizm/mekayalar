<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    public function up(): void
    {
        Schema::create('guestbook_reactions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('entry_id')->constrained('guestbook_entries')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('guest_ip', 45)->nullable();
            $table->string('emoji', 16);
            $table->timestamps();

            $table->unique(['entry_id', 'user_id', 'guest_ip', 'emoji'], 'guestbook_reactions_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guestbook_reactions');
    }
};
