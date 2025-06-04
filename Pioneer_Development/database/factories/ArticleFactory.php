<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use App\Models\CategoryArticle;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        $title = $this->faker->sentence();
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        $category = CategoryArticle::inRandomOrder()->first() ?? CategoryArticle::factory()->create();

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $this->faker->paragraphs(3, true),
            'featuredImage' => 'articles/default.jpg',
            'status' => $this->faker->randomElement(['draft', 'published']),
            'categoryId' => $category->id,
            'authorId' => $user->id,
            'createdBy' => $user->id,
            'updatedBy' => $user->id,
            'isDeleted' => false,
        ];
    }
}
