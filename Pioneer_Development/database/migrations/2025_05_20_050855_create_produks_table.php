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
            $table->string('productName'); // camelCase
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->enum('status', ['ready', 'outofstock'])->default('ready');

            $table->uuid('categoryId')->nullable(); // camelCase & type fix
            $table->foreign('categoryId')->references('id')->on('categoryProducts')
                ->onUpdate('cascade')
                ->onDelete('cascade'); // set null if category is deleted

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
        Schema::dropIfExists('products');
    }
};
