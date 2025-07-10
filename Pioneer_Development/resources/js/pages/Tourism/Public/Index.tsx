import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import DestinationCard from '@/components/ui/destination-card';
import Navbar from '@/components/ui/navbar';
import { destinationData } from '@/data/destination-data';

export default function Destination() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,         // Hanya sekali animasi
      offset: 100,        // Jarak offset sebelum elemen mulai animasi
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Jelajahi <span className="text-blue-600">Destinasi</span> Impian
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan petualangan tak terlupakan di destinasi-destinasi terbaik Indonesia
          </p>
        </div>

        {/* Destinasi Populer */}
        <section className="mb-24">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Destinasi Populer</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationData.map((item, index) => (
              <div
                key={item.slug}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <DestinationCard 
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Paket Destinasi Spesial */}
        <section>
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Paket Destinasi Spesial</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Pilih paket liburan yang telah dirancang khusus untuk pengalaman terbaik
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationData.map((item, index) => (
              <div
                key={`package-${item.slug}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <DestinationCard
                  image={item.image}
                  title={`Paket ${item.title}`}
                  description={item.description}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action */}
        <section className="text-center mt-24" data-aos="fade-up">
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Siap Memulai Petualangan?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk mendapatkan penawaran terbaik dan konsultasi gratis
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Konsultasi Gratis
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
