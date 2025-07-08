import React from 'react';
import HeroSection from '@/components/Landing/HeroSection';
import TourismSection from '@/components/Landing/TourismSection';
import ProductSection from '@/components/Landing/ProductSection';
import Galery from '@/components/Landing/GalerySection';
import ContactSection from '@/components/Landing/ContactSection';
import Footer from '@/components/Landing/FooterSection';

import type { Galery as GaleryType, Product } from '@/types';
import TestimoniSection from '@/components/Landing/TestimonialSection';

interface WelcomeProps {
  profile: any;
  tourism: Array<any>;
  products: Product[];
  galeries: GaleryType[];
}

export default function Index({ profile, tourism, products, galeries, testimonials }: WelcomeProps) {
    console.log(testimonials);
  return (
    <div className="w-full bg-white">
      <HeroSection profile={profile} />
      <TourismSection tourism={tourism} />
      <ProductSection products={products} />
      <Galery galeries={galeries} />
      <ContactSection profile={profile} />
      <TestimoniSection testimonials={testimonials}/>
      <Footer profile={profile} galeries={galeries} />
    </div>
  );
}
