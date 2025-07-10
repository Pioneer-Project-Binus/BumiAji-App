import React from 'react';
import { motion, Variants } from "framer-motion";
import type { Galery } from '@/types';

interface FooterSectionProps {
  profile: {
    name?: string;
    footer_tagline?: string;
    instagram_url?: string;
    email?: string;
    phone?: string;
  };
  galeries: Galery[];
}

export default function FooterSection({ profile, galeries }: FooterSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

    const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.0, 0.0, 0.58, 1.0] // ✅ cubic bezier untuk easeOut
      }
    }
  };



  const navigationLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang', label: 'Tentang Desa' },
    { href: '/destinasi', label: 'Destinasi' },
    { href: '/produk', label: 'Produk' },
    { href: '/berita', label: 'Berita' },
    { href: '/testimoni', label: 'Testimoni' },
  ];

  return (
    <footer className="bg-[#0E2815] text-white py-16 px-4 sm:px-6 lg:px-8 mt-40 relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E2815] via-[#0E2815] to-[#1a3a22] opacity-50"></div>
      
      <motion.div 
        className="w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Kolom 1: Info Desa */}
          <motion.div 
            className="space-y-6 lg:col-span-1"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {profile?.name || 'Bumiaji'}
              </motion.h2>
              <motion.h4 
                className="text-lg sm:text-xl font-normal text-gray-200 leading-relaxed"
                variants={itemVariants}
              >
                {profile?.footer_tagline || 'Desa yang mendukung adanya penghijauan'}
              </motion.h4>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Social Media Icons */}
              <motion.a 
                href={profile?.instagram_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  className="w-6 h-6 group-hover:brightness-110 transition-all duration-300"
                />
              </motion.a>
              
              <motion.a 
                href={`mailto:${profile?.email || ''}`}
                className="group p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                  alt="Email"
                  className="w-6 h-6 group-hover:brightness-110 transition-all duration-300"
                />
              </motion.a>
              
              <motion.a 
                href={`tel:${profile?.phone || ''}`}
                className="group p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                  alt="Phone"
                  className="w-6 h-6 group-hover:brightness-110 transition-all duration-300"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Kolom 2: Galeri Mini */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-xl sm:text-2xl font-semibold mb-6 text-white"
              variants={itemVariants}
            >
              Galeri
            </motion.h2>
            <div className="grid grid-cols-3 gap-3">
              {galeries.slice(0, 6).map((item) => (
                <motion.div
                  key={`footer-gal-${item.id}`}
                  className="group relative overflow-hidden rounded-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={`/storage/${item.filePath}`}
                    alt={item.title}
                    className="w-full h-[70px] sm:h-[80px] object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Kolom 3: Navigasi */}
          <motion.div 
            className="lg:col-span-1 justify-self-end"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-xl sm:text-2xl font-semibold mb-6 text-white"
              variants={itemVariants}
            >
              Navigasi
            </motion.h3>
            <div className="space-y-3">
              {navigationLinks.map((link, index) => (
                <motion.div
                  key={`nav-${index}`}
                  className="relative overflow-hidden"
                  variants={itemVariants}
                >
                  <motion.a
                    href={link.href}
                    className="block text-gray-200 hover:text-white transition-all duration-300 group relative px-3"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.div
                      className="absolute left-0 top-0 w-0 h-full bg-white bg-opacity-10 rounded-r-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-white border-opacity-20"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-300 text-sm text-center sm:text-left"
              variants={itemVariants}
            >
              © 2024 {profile?.name || 'Bumiaji'}. Semua hak dilindungi.
            </motion.p>
            <motion.div 
              className="flex items-center gap-2 text-gray-300 text-sm"
              variants={itemVariants}
            >
              <span>Dibuat dengan</span>
              <motion.span 
                className="text-red-400 text-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ♥
              </motion.span>
              <span>untuk desa</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}