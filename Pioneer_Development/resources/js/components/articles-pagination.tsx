import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationProps } from '@/types/props-articles';

export const ArticlesPagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange
}) => {
  if (totalPages <= 1) return null;
  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };
  const visiblePages = totalPages > 1 ? getVisiblePages() : [1];
  return (
    <div className="flex items-center justify-center space-x-1 mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`
          p-2 rounded border transition-colors
          ${currentPage === 1 
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
          }
        `}
      >
        <ChevronLeft size={16} />
      </button>
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`
                w-10 h-10 rounded border flex items-center justify-center text-sm transition-colors
                ${currentPage === page
                  ? 'bg-white border-blue-600 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded border transition-colors
          ${currentPage === totalPages 
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
          }
        `}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}; 