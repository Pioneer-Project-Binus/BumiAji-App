import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { PopularBarProps, PopularBarItem } from '@/types/props-articles';
import articleRoute from '@/routes/articles';

const defaultRelatedArticles: PopularBarItem[] = [
  { id: 1, title: "7 Tempat Wisata Alam yang Instagramable" },
  { id: 2, title: "Rekomendasi Penginapan Murah di Bumi Aji" },
  { id: 3, title: "Event Seru di Desa Wisata Tahun Ini" },
  { id: 4, title: "Tips Liburan Aman Bersama Anak" },
  { id: 5, title: "Kuliner Malam Favorit Wisatawan" },
];

function truncateText(text: string, maxLength: number) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export const RelatedBar: React.FC<PopularBarProps> = ({
  items = defaultRelatedArticles,
  className,
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
        <div className="text-left font-semibold text-[#B0D3C2] text-lg leading-tight w-full whitespace-nowrap overflow-hidden text-ellipsis">
          Related Post
        </div>
      </motion.div>
      <div className="flex flex-col w-full gap-5">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.slug ? articleRoute.showPublic(item.slug).url : '#'}
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
              className="cursor-pointer group flex w-full items-center border-b border-[#B0D3C2] last:border-b-0 min-h-[80px] px-2 relative"
            >
              {/* Nomor */}
              <div
                className="absolute left-2 z-10 text-transparent font-semibold stroke-default stroke-hover text-center flex items-center pointer-events-none transition-transform duration-300 ease-in-out group-hover:-translate-x-2"
                style={{
                  WebkitTextStrokeWidth: "1px",
                  fontSize: "clamp(60px, 15vw, 88px)",
                  lineHeight: 1,
                  width: "60px",
                  height: "60px",
                }}
              >
                {item.id}
              </div>
              {/* Teks */}
              <div
                className="flex flex-1 items-center bg-[#0E2815] min-w-0 w-full overflow-hidden relative z-20 ml-5 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                style={{ paddingLeft: "0px" }}
              >
                <div
                  className="group-hover:opacity-95 transition-all duration-300 text-[#B0D3C2] font-semibold text-base leading-snug w-full break-words pb-2 group-hover:text-yellow-400 ml-1"
                  style={{
                    fontSize: "clamp(16px, 4vw, 18px)",
                    lineHeight: "1.2",
                    minWidth: 0,
                  }}
                >
                  {truncateText(item.title, 50)}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}; 