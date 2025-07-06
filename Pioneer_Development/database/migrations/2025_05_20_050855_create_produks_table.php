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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('productName'); 
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->enum('status', ['draft', 'published', 'outofstock'])->default('draft');
            $table->boolean('highlight')->default(false);

            $table->uuid('categoryId')->nullable();
            $table->foreign('categoryId')->references('id')->on('categoryProducts')
                ->onUpdate('cascade')
                ->onDelete('cascade'); 

            $table->timestamps();

            $table->uuid('createdBy')->index(); 
            $table->foreign('createdBy')
                ->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->uuid('updatedBy')->nullable()->index(); 
            $table->foreign('updatedBy')
                ->references('id')->on('users')
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
        Schema::dropIfExists('products');
    }
};
