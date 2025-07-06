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
        Schema::create('articles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->string('featuredImage')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');

            $table->uuid('categoryId')->nullable();
            $table->foreign('categoryId')->references('id')->on('categoryArticles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->uuid('authorId')->nullable();
            $table->foreign('authorId')->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // Tambahkan kolom views dengan default 0
            $table->unsignedBigInteger('views')->default(0);

            $table->timestamps();

            $table->uuid('createdBy')->index();
            $table->foreign('createdBy')->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->uuid('updatedBy')->nullable()->index();
            $table->foreign('updatedBy')->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->boolean('isDeleted')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
