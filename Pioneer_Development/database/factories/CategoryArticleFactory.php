<?php

namespace Database\Factories;

use App\Models\CategoryArticle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryArticleFactory extends Factory
{
    protected $model = CategoryArticle::class;

    // Daftar nama kategori tetap
    protected static $staticNames = [
        'Berita',
        'Tutorial',
        'Pengumuman',
        'Event',
        'Tips & Trik',
    ];

    public function definition(): array
    {
        static $index = 0;

        // Pastikan tidak melebihi jumlah nama tetap
        $name = static::$staticNames[$index % count(static::$staticNames)];
        $index++;

        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => "Kategori artikel tentang {$name}.",
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
