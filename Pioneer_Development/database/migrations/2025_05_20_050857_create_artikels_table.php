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
            $table->string('featuredImage')->nullable(); // camelCase
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');

            $table->uuid('categoryId')->nullable(); // camelCase & type fix
            $table->foreign('categoryId')->references('id')->on('categoryArticles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->uuid('authorId')->nullable(); // camelCase & type fix
            $table->foreign('authorId')->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->timestamps();

            $table->uuid('createdBy')->index(); // camelCase & defined
            $table->foreign('createdBy')
                ->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->uuid('updatedBy')->nullable()->index(); // camelCase
            $table->foreign('updatedBy')
                ->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->boolean('isDeleted')->default(false); // camelCase
            $table->timestamp('createdAt')->useCurrent(); 
            $table->timestamp('updatedAt')->useCurrent()->useCurrentOnUpdate();

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
