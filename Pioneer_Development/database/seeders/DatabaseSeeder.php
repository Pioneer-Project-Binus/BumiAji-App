<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Album;
use App\Models\Article;
use App\Models\CategoryArticle;
use App\Models\CategoryProduct;
use App\Models\Contact;
use App\Models\Galery;
use App\Models\Product;
use App\Models\PhotoProducts;
use App\Models\PhotoTourism;
use App\Models\ProfileVillage;
use App\Models\Testimonial;
use App\Models\Tourism;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Album::factory()->count(10)->create();
        CategoryArticle::factory()->count(5)->create();
        Article::factory()->count(10)->create();
        CategoryProduct::factory()->count(4)->create();
        Galery::factory()->count(10)->create();
        Product::factory()->count(10)->create();
        PhotoProducts::factory()->count(10)->create();
        Tourism::factory()->count(5)->create();
        PhotoTourism::factory()->count(5)->create();
        ProfileVillage::factory()->count(1)->create();
        Testimonial::factory()->count(5)->create();
        Contact::factory()->count(5)->create();
    }
}
