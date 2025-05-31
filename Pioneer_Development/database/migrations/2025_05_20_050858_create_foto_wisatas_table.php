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
        Schema::create('tourismPhotos', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('destinationId'); // camelCase & fixed type
            $table->string('title')->nullable();
            $table->string('slug')->unique(); // slug for SEO
            $table->foreign('destinationId')
                ->references('id')->on('tourism')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('filePath'); // camelCase
            $table->string('description')->nullable();
            $table->uuid('createdBy')->index(); // camelCase & added
            $table->foreign('createdBy')
                ->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->uuid('updatedBy')->nullable()->index(); // camelCase

            $table->boolean('isDeleted')->default(false); // camelCase
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tourismPhotos');
    }
};
