import React from 'react';
import { motion } from "framer-motion";

interface TourismSectionProps {
  tourism: Array<{
    id: string;
    name: string;
    description: string;
    photos?: Array<{ filePath?: string }>;
  }>;
}

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

export default function TourismSection({ tourism }: TourismSectionProps) {
  return (
    <div className="py-20 text-center bg-white">
      <h2 className="text-4xl tablet:text-5xl font-bold text-[#0E2815] mb-12">
        Destinasi
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {tourism.map((tourismItem) => (
          <motion.div
            key={tourismItem.id}
            className="relative rounded-lg overflow-hidden shadow-2xl cursor-pointer h-[200px] phone:h-[250px] tablet:h-[300px] desktop:h-[400px]"
            initial="initial"
            whileHover="hover"
          >
            <img
              src={`storage/${tourismItem.photos?.[0]?.filePath}`}
              alt={tourismItem.name}
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
                {tourismItem.name}
              </motion.h3>
              <motion.p
                className="text-white text-sm mt-2 text-start"
                variants={descriptionAnimation}
              >
                {tourismItem.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}