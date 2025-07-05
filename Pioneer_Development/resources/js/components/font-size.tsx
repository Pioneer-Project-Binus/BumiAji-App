import React from 'react';
import { motion } from 'framer-motion';
import type { FontSizeControllerProps } from '@/types/props-articles';
import type { FontSize } from '@/types/types-articles';

export const FontSizeController: React.FC<FontSizeControllerProps> = ({ 
  fontSize, 
  onFontSizeChange 
}) => {
  const fontSizes: Array<{
    size: FontSize;
    value: string;
    style: string;
  }> = [
    { size: 'large', value: 'text-lg', style: 'text-xl' },
    { size: 'medium', value: 'text-base', style: 'text-lg' },
    { size: 'small', value: 'text-sm', style: 'text-base' }
  ];

  return (
    <motion.div 
      className="flex items-center gap-x-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.8 }}
    >
      {fontSizes.map((font, index) => (
        <motion.button
          key={font.size}
          onClick={() => onFontSizeChange(font.size, font.value)}
          className="bg-transparent p-0 m-0 focus:outline-none"
          aria-label={`Set font size to ${font.size}`}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
        >
          <span
            className={`
              font-black
              ${font.style}
              text-black
              transition-all
              ${fontSize === font.size ? 'border-b-2 border-black' : ''}
            `}
            style={{ lineHeight: '1' }}
          >
            A
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}; 