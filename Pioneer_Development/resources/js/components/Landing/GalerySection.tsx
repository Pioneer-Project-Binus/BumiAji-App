import React from 'react';
import { motion } from "framer-motion";
import type { Galery } from '@/types';

interface GallerySectionProps {
  galeries: Galery[];
}

export default function GallerySection({ galeries }: GallerySectionProps) {
  const handleImageClick = (item: Galery) => {
    console.log(`Navigating to /galeri with image:`, item);
    alert(`Would navigate to /galeri with image: ${item.title}`);
  };

  return (
    <div className="py-20 px-4 bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-[#0E2815] mb-12 text-center">
        Galeri
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galeries.map((item) => (
          <motion.div
            key={item.id}
            className="rounded-lg overflow-hidden shadow-md cursor-pointer relative group"
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
            onClick={() => handleImageClick(item)}
          >
            <motion.img
              src={`/storage/${item.filePath}`}
              alt={item.title}
              className="w-full h-[200px] object-cover"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            />
            
            {/* Overlay with hover effect */}
            <motion.div
              className="absolute inset-0 bg-opacity-0 flex items-center justify-center"
              whileHover={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, delay: 0.1 }
                }}
              >
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <svg
                    className="w-6 h-6 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <p className="text-sm font-medium">Lihat Detail</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Subtle shadow enhancement on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg shadow-lg opacity-0"
              whileHover={{
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}