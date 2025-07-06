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
        Schema::create('photoProducts', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('productId'); // camelCase
            $table->string('title')->nullable();
            $table->string('slug')->unique(); 
            $table->foreign('productId')
                ->references('id')->on('products')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('filePath'); // camelCase
            $table->integer('displayOrder')->default(0); // camelCase
            
            $table->uuid('createdBy')->index(); // camelCase & added
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
        Schema::dropIfExists('photoProducts');
    }
};
