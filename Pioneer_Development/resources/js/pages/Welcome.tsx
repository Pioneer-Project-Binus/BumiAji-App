import React from 'react';
import HeroSection from '@/components/Landing/HeroSection';
import TourismSection from '@/components/Landing/TourismSection';
import ProductSection from '@/components/Landing/ProductSection';
import Galery from '@/components/Landing/GalerySection';
import ContactSection from '@/components/Landing/ContactSection';
import Footer from '@/components/Landing/FooterSection';
import TestimoniSection from '@/components/Landing/TestimonialSection';
import ArticleSection from '@/components/Landing/Articles';

import type { Galery as GaleryType, Product } from '@/types';
import Navbar from '@/components/ui/navbar';

interface WelcomeProps {
    profile: any;
    tourism: Array<any>;
    products: Product[];
    galeries: GaleryType[];
    testimonials: any[]; // Added type
    latestArticles: any; // Added type
    otherArticles: any[]; // Added type
}

export default function Index({ profile, tourism, products, galeries, testimonials, latestArticles, otherArticles }: WelcomeProps) {
  console.log(latestArticles, "<<");
  console.log(otherArticles, 'otherArticles <<');
  
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Navbar />
            <HeroSection profile={profile} />
            <TourismSection tourism={tourism} />
            <ProductSection products={products} />
            <ArticleSection latestArticles={latestArticles} otherArticles={otherArticles} />
            <Galery galeries={galeries} />
            <TestimoniSection testimonials={testimonials} />
            <ContactSection profile={profile} />
            <Footer profile={profile} galeries={galeries} />
        </div>
    );
}