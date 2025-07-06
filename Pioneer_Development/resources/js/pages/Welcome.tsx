import React from 'react';
import logo from "@/assets/AMAZING.png";
import destinasi from "@/assets/destinasi.png";
import { motion } from "motion/react";
import ProductCarousel from "@/components/productCarrousel"; // Tetap impor ProductCarousel

// --- Data Produk untuk Carousel (dipindahkan ke sini) ---
// Asumsikan Anda memiliki beberapa gambar produk yang bisa diimpor,
// atau gunakan placeholder jika belum ada.
// Pastikan path gambar ini benar dan sesuai dengan lokasi aset Anda.
import productImg1 from "@/assets/Kale Produk.jpg";
import productImg2 from "@/assets/Kale Produk.jpg";
import productImg3 from "@/assets/Kale Produk.jpg";
import productImg4 from "@/assets/Kale Produk.jpg";
import productImg5 from "@/assets/Kale Produk.jpg";
// --- Data Galeri Sementara (Hardcode) ---
const galleryData = [
  {
    id: 1,
    title: "Kebun Apel",
    image: "https://source.unsplash.com/400x300/?apple,orchard",
  },
  {
    id: 2,
    title: "Perkebunan Kopi",
    image: "https://source.unsplash.com/400x300/?coffee,plantation",
  },
  {
    id: 3,
    title: "Air Terjun",
    image: "https://source.unsplash.com/400x300/?waterfall,nature",
  },
  {
    id: 4,
    title: "Petani Lokal",
    image: "https://source.unsplash.com/400x300/?farmer,indonesia",
  },
  {
    id: 5,
    title: "Bunga-bunga",
    image: "https://source.unsplash.com/400x300/?flowers,garden",
  },
  {
    id: 6,
    title: "Teh Herbal",
    image: "https://source.unsplash.com/400x300/?herbal,tea",
  },
  {
    id: 7,
    title: "Panorama Alam",
    image: "https://source.unsplash.com/400x300/?landscape,mountain",
  },
  {
    id: 8,
    title: "Kegiatan Wisata",
    image: "https://source.unsplash.com/400x300/?tourism,village",
  },
];

const productsData = [
  {
    name: "1",
    description: "Camilan sehat dari apel pilihan Bumiaji, tanpa pengawet.",
    price: 15000,
    image: destinasi,
  },
  {
    name: "2",
    description: "Keripik renyah dari kentang lokal, gurih dan nagih.",
    price: 12500,
    image: destinasi,
  },
  {
    name: "3",
    description: "Selai apel buatan rumahan, cocok untuk sarapan.",
    price: 25000,
    image: destinasi,
  },
  {
    name: "4",
    description: "Teh herbal dari bunga pilihan, menenangkan dan aromatik.",
    price: 18000,
    image: destinasi,
  },
  {
    name: "5",
    description: "Madu murni dari hutan sekitar Bumiaji, kaya manfaat.",
    price: 50000,
    image: destinasi,
  },
  {
    name: "6",
    description: "Biji kopi pilihan dari perkebunan Bumiaji, aroma kuat.",
    price: 35000,
    image: destinasi, // Menggunakan kembali gambar untuk contoh
  },
  {
    name: "7",
    description: "Biji kopi pilihan dari perkebunan Bumiaji, aroma kuat.",
    price: 35000,
    image: destinasi, // Menggunakan kembali gambar untuk contoh
  },
  {
    name: "8",
    description: "Biji kopi pilihan dari perkebunan Bumiaji, aroma kuat.",
    price: 35000,
    image: destinasi, // Menggunakan kembali gambar untuk contoh
  },
  {
    name: "9",
    description: "Biji kopi pilihan dari perkebunan Bumiaji, aroma kuat.",
    price: 35000,
    image: destinasi, // Menggunakan kembali gambar untuk contoh
  },
  {
    name: "10",
    description: "Biji kopi pilihan dari perkebunan Bumiaji, aroma kuat.",
    price: 35000,
    image: destinasi, // Menggunakan kembali gambar untuk contoh
  },

];
// --- Akhir Data Produk ---

const destinations = [
  {
    id: 1,
    title: "Coban Talun",
    description: "Air terjun indah dengan taman bunga yang menawan.",
    imageUrl: destinasi,
  },
  {
    id: 2,
    title: "Bumiaji Tilik Kopi",
    description: "Nikmati kopi lokal dengan pemandangan pegunungan.",
    imageUrl: destinasi,
  },
  {
    id: 3,
    title: "Taman Bunga Selecta",
    description: "Taman rekreasi legendaris dengan beragam jenis bunga.",
    imageUrl: destinasi,
  },
  {
    id: 4,
    title: "Petik Apel Agro Rakyat",
    description: "Pengalaman memetik apel segar langsung dari pohonnya.",
    imageUrl: destinasi,
  },
];

const cardTextAnimation = {
  initial: { y: '100%', opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

const descriptionAnimation = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { delay: 0.1 } },
};

const overlayAnimation = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
};

export default function Welcome() {
  return (
    <div className="w-full bg-white">
      <div className="min-h-screen">
        <div className="pt-32 pl-10 tablet:pt-40 tablet:pl-20 desktop:pt-[230px] desktop:pl-[92px]">
          <img src={logo} alt="Logo" className="w-[400px] h-[172px]" />
          <div className="w-[574px] h-[192px] pt-2 text-[64px] font-extrabold leading-none">
            <div className="text-black">AMAZING</div>
            <div className="text-[#295740]">BUMIAJI</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-4 tablet:p-8 desktop:p-12">
          <div className="text-[28px] tablet:text-[36px] desktop:text-[48px] font-bold text-[#295740] mb-4">
            Tentang Desa
          </div>
          <div className="text-base tablet:text-lg desktop:text-xl text-gray-700 leading-relaxed max-w-[890px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>
      
      {/* Bagian Destinasi */}
      <div className="py-20 text-center bg-[#FBFBFB]">
        <h2 className="text-4xl tablet:text-5xl font-bold text-[#0E2815] mb-12">
          Destinasi
        </h2>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer
                         h-[200px]
                         phone:h-[250px]
                         tablet:h-[300px]
                         desktop:h-[400px]"
              initial="initial"
              whileHover="hover"
            >
              <img
                src={dest.imageUrl}
                alt={dest.title}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                variants={overlayAnimation}
              ></motion.div>

              <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end items-start h-full">
                <motion.h3
                  className="text-white text-2xl font-bold text-start"
                  variants={cardTextAnimation}
                >
                  {dest.title}
                </motion.h3>
                <motion.p
                  className="text-white text-sm mt-2 text-start"
                  variants={descriptionAnimation}
                >
                  {dest.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bagian ProductCarousel */}
          <div className="py-20 px-4 bg-[#295740] w-full">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Judul bagian atas */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl tablet:text-5xl font-bold text-white">
            Produk Unggulan
          </h2>
        </div>

        {/* Carousel dibungkus flex center */}
        <div className="flex justify-center">
          <div className="w-full max-w-full">
            <ProductCarousel products={productsData} />
          </div>
        </div>
      </div>
    </div>


          
          {/* Bagian Galeri */}
          <div className="py-20 px-4 bg-white">
            <h2 className="text-4xl tablet:text-5xl font-bold text-[#0E2815] mb-12 text-center">
              Galeri
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryData.map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

        <footer className="bg-[#0E2815] text-white py-12 px-6 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row justify-between">

            {/* Kolom 1: Info Desa */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Bumiaji</h2>
              <h4 className="text-2xl font-normal">Bumi Aji adalah desa yang mendukung adanya penghijauan</h4>
              <div className="flex items-center gap-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                  alt="Email"
                  className="w-6 h-6"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                  alt="Phone"
                  className="w-6 h-6"
                />
              </div>
            </div>
            <div>
              <h2>
                Galeri
              </h2>
            {/* Kolom 2: Galeri Mini */}
            <div className="grid grid-cols-3 gap-2">
              {[
                "https://source.unsplash.com/100x100/?nature,1",
                "https://source.unsplash.com/100x100/?nature,2",
                "https://source.unsplash.com/100x100/?nature,3",
                "https://source.unsplash.com/100x100/?nature,4",
                "https://source.unsplash.com/100x100/?nature,5",
                "https://source.unsplash.com/100x100/?nature,6",
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`gallery-${idx}`}
                  className="w-full h-[70px] object-cover rounded-md"
                />
              ))}
            </div>
              </div>

            {/* Kolom 3: Navigasi */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold mb-2">Navigasi</h3>
              <a href="#" className="hover:underline">Beranda</a>
              <a href="#" className="hover:underline">Tentang Desa</a>
              <a href="#" className="hover:underline">Destinasi</a>
              <a href="#" className="hover:underline">Produk</a>
              <a href="#" className="hover:underline">Berita</a>
              <a href="#" className="hover:underline">Testimoni</a>
            </div>

          </div>
        </footer>

    </div>
  );
}