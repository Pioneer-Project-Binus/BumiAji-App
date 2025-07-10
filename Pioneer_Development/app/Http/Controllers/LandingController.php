<?php

namespace App\Http\Controllers;

use App\Models\ProfileVillage;
use App\Models\Tourism;
use App\Models\TourismPhoto;
use App\Models\Product;
use App\Models\PhotoProduct;
use App\Models\Testimonial;
use App\Models\Galery;
use App\Models\Contact;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $profile = ProfileVillage::first();

        $latestArticles = Article::with(['category:id,name'])
            ->where('status', 'published')
            ->where('isDeleted', false)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();
            
        $otherArticles = Article::with(['category:id,name'])
            ->where('status', 'published')
            ->where('isDeleted', false)
            ->orderByDesc('created_at')
            ->limit(3)
            ->get();

        $tourism = Tourism::with(['photos' => function ($q) {
            $q->where('isDeleted', false);
        }])
            ->where('status', 'published')
            ->where('isDeleted', false)
            ->limit(4)
            ->get();

        $products = Product::with([
            'photos' => function ($q) {
                $q->where('isDeleted', false);
            },
            'category' => function ($q) {
                $q->where('isDeleted', false);
            }
        ])
            ->where('status', 'published')
            ->where('isDeleted', false)
            ->get();


        $testimonials = Testimonial::where('isDeleted', false)->get();

        $galeries = Galery::where('isDeleted', false)
            ->where('type', 'photo')  
            ->orderBy('displayOrder')
            ->limit(8)
            ->get();


        return Inertia::render('welcome', [
            'profile' => $profile,
            'latestArticles' => $latestArticles,
            'otherArticles' => $otherArticles,
            'tourism' => $tourism,
            'products' => $products,
            'testimonials' => $testimonials,
            'galeries' => $galeries,
        ]);
    }

    public function storeContact(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create([
            'id'      => Str::uuid(),
            'name'    => $request->name,
            'email'   => $request->email,
            'phone'   => $request->phone,
            'subject' => $request->subject,
            'slug'    => Str::slug($request->subject . '-' . now()->timestamp),
            'message' => $request->message,
        ]);

        return response()->json(['message' => 'Pesan berhasil dikirim.'], 201);
    }
}