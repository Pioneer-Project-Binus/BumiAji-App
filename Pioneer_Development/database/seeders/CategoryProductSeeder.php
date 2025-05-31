<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;

class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Mengambil ID user yang akan dijadikan createdBy dan updatedBy
        $createdBy = User::first()->id; // Pastikan ada user di database
        $updatedBy = $createdBy; // Bisa disesuaikan jika kamu ingin user berbeda

        $categories = [
            [
                'name' => 'Makanan',
                'slug' => Str::slug('Makanan'),
                'description' => 'Kategori untuk semua jenis makanan',
                'createdBy' => $createdBy,
                'updatedBy' => $updatedBy,
                'isDeleted' => false,
            ],
            [
                'name' => 'Minuman',
                'slug' => Str::slug('Minuman'),
                'description' => 'Kategori untuk semua jenis minuman',
                'createdBy' => $createdBy,
                'updatedBy' => $updatedBy,
                'isDeleted' => false,
            ],
            [
                'name' => 'Snack',
                'slug' => Str::slug('Snack'),
                'description' => 'Kategori untuk semua jenis snack',
                'createdBy' => $createdBy,
                'updatedBy' => $updatedBy,
                'isDeleted' => false,
            ],
            [
                'name' => 'Buah',
                'slug' => Str::slug('Buah'),
                'description' => 'Kategori untuk produk Buah',
                'createdBy' => $createdBy,
                'updatedBy' => $updatedBy,
                'isDeleted' => false,
            ],
        ];

        // Menambahkan kategori ke dalam tabel 'categoryProducts'
        foreach ($categories as $category) {
            DB::table('categoryProducts')->insert([
                'id' => (string) Str::uuid(),
                'name' => $category['name'],
                'slug' => $category['slug'],
                'description' => $category['description'],
                'createdBy' => $category['createdBy'],
                'updatedBy' => $category['updatedBy'],
                'isDeleted' => $category['isDeleted'],
                'createdAt' => now(),
                'updatedAt' => now(),
            ]);
        }
    }
}
