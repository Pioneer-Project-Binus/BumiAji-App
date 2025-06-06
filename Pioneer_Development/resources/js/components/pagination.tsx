import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({ links, className = '' }: PaginationProps) {
    if (links.length <= 3) return null; // Don't show pagination if only prev/next buttons exist

    const getDisplayLinks = () => {
        const displayLinks = [];
        const totalLinks = links.length;
        
        // Remove first and last links (prev/next buttons)
        const pageLinks = links.slice(1, -1);
        
        if (pageLinks.length <= 7) {
            return pageLinks;
        }

        const currentIndex = pageLinks.findIndex(link => link.active);
        const currentPage = currentIndex + 1;
        const totalPages = pageLinks.length;

        // Always show first page
        displayLinks.push(pageLinks[0]);

        if (currentPage > 4) {
            displayLinks.push({ url: null, label: '...', active: false });
        }

        // Show pages around current page
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== totalPages) {
                displayLinks.push(pageLinks[i - 1]);
            }
        }

        if (currentPage < totalPages - 3) {
            displayLinks.push({ url: null, label: '...', active: false });
        }

        // Always show last page
        if (totalPages > 1) {
            displayLinks.push(pageLinks[totalPages - 1]);
        }

        return displayLinks;
    };

    const displayLinks = getDisplayLinks();
    const prevLink = links[0];
    const nextLink = links[links.length - 1];

    return (
        <div className={`flex items-center justify-center space-x-1 ${className}`}>
            {/* Previous Button */}
            {prevLink.url ? (
                <Link href={prevLink.url} preserveState>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                </Link>
            ) : (
                <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="h-9 px-3 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {displayLinks.map((link, index) => {
                    if (link.label === '...') {
                        return (
                            <div key={`ellipsis-${index}`} className="flex items-center justify-center h-9 w-9">
                                <MoreHorizontal className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                            </div>
                        );
                    }

                    return link.url ? (
                        <Link key={index} href={link.url} preserveState>
                            <Button
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                className={`h-9 w-9 p-0 transition-all duration-200 ${
                                    link.active
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md'
                                        : 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600'
                                }`}
                            >
                                {link.label}
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            key={index}
                            variant={link.active ? "default" : "outline"}
                            size="sm"
                            className={`h-9 w-9 p-0 ${
                                link.active
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                                    : 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700'
                            }`}
                        >
                            {link.label}
                        </Button>
                    );
                })}
            </div>

            {/* Next Button */}
            {nextLink.url ? (
                <Link href={nextLink.url} preserveState>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </Link>
            ) : (
                <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="h-9 px-3 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600"
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            )}
        </div>
    );
}