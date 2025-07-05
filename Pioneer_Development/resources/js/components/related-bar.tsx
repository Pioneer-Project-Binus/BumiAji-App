import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { PopularBarProps, PopularBarItem } from '@/types/props-articles';

const defaultRelatedArticles: PopularBarItem[] = [
  { id: 1, title: "7 Tempat Wisata Alam yang Instagramable" },
  { id: 2, title: "Rekomendasi Penginapan Murah di Bumi Aji" },
  { id: 3, title: "Event Seru di Desa Wisata Tahun Ini" },
  { id: 4, title: "Tips Liburan Aman Bersama Anak" },
  { id: 5, title: "Kuliner Malam Favorit Wisatawan" },
];

export const RelatedBar: React.FC<PopularBarProps> = ({ 
  items = defaultRelatedArticles, 
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "hidden lg:flex flex-col relative mx-auto w-full max-w-[350px] bg-[#0E2815] overflow-hidden p-2 gap-4",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center border-b border-[#B0D3C2] px-4 py-3 w-full overflow-hidden"
      >
        <div className="text-left font-bold text-[#B0D3C2] text-[20px] leading-[20px] w-full whitespace-nowrap overflow-hidden text-ellipsis">
          Related Post
        </div>
      </motion.div>
      <div className="flex flex-col w-full gap-5">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.slug ? `/artikel/${item.slug}` : `/artikel/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.4 + index * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
              className="cursor-pointer group flex w-full items-center border-b border-[#B0D3C2] last:border-b-0 min-h-[80px] px-2"
            >
              <motion.div
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 text-transparent font-bold stroke-default stroke-hover text-center mr-0 flex items-center"
                style={{
                  WebkitTextStrokeWidth: "1px",
                  fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "clamp(60px, 15vw, 96px)",
                  lineHeight: 1,
                  minWidth: "60px",
                  maxWidth: "80px",
                  overflow: "hidden",
                }}
              >
                {item.id}
              </motion.div>
              <motion.div
                className="flex flex-1 items-center bg-[#0E2815] min-w-0 w-full overflow-hidden"
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="group-hover:opacity-95 transition-opacity duration-200 text-[#B0D3C2] font-bold text-base leading-snug w-full break-words pb-2 group-hover:text-yellow-400"
                  style={{
                    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "clamp(16px, 4vw, 20px)",
                    lineHeight: "1.2",
                    minWidth: 0,
                  }}
                >
                  {item.title}
                </div>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}; 