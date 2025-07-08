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
        Schema::create('profileVillage', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('history')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->string('logo')->nullable();
            $table->text('address')->nullable();
            $table->string('postalCode')->nullable(); // camelCase
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('socialMedia')->nullable(); // camelCase
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
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

        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profileVillages');
    }
};
