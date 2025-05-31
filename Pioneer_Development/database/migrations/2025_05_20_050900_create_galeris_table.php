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
        Schema::create('galerys', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique()->after('title')->nullable();
            $table->text('description')->nullable();
            $table->enum('type', ['photo', 'video'])->default('photo');
            $table->string('filePath'); // camelCase
            $table->string('thumbnail')->nullable();
            $table->integer('displayOrder')->default(0); // camelCase
            $table->string('albumId'); // camelCase
            $table->timestamps();
            $table->uuid('createdBy')->index(); // camelCase
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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galerys');
    }
};
