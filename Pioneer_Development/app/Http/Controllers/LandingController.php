<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // <-- Import Inertia
use App\Models\ProfileVillage;
use App\Models\Tourism;
use App\Models\Product;
use App\Models\Galery;
use App\Models\Testimonial;

class LandingController extends Controller
{
    /**
     * Merender komponen React Landing/Index dengan props yang diperlukan.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $profile = ProfileVillage::first();

        $tourisms = Tourism::where('status', 'published')
                           ->where('isDeleted', false)
                           ->latest()
                           ->get();

        $products = Product::where('status', 'tersedia')
                           ->where('isDeleted', false)
                           ->latest()
                           ->get();

        $galleries = Galery::where('isDeleted', false)
                           ->orderBy('displayOrder', 'asc')
                           ->get();

        $testimonials = Testimonial::where('isDeleted', false)
                                   ->latest()
                                   ->get();

        return Inertia::render('Landing/Index', [
            'profile' => $profile,
            'tourisms' => $tourisms,
            'products' => $products,
            'galleries' => $galleries,
            'testimonials' => $testimonials,
        ]);
    }

    public function showTourism($slug)
    {
        $tourism = Tourism::where('slug', $slug)->where('isDeleted', false)->firstOrFail();
        
        return Inertia::render('Landing/TourismDetail', [
            'tourism' => $tourism
        ]);
    }

    public function showProduct($slug)
    {
        $product = Product::where('slug', $slug)->where('isDeleted', false)->firstOrFail();
        
        return Inertia::render('Landing/ProductDetail', [
            'product' => $product
        ]);
    }
}