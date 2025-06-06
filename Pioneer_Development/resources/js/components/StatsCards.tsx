import React, { memo } from 'react';
import {
    Package,
    TrendingUp,
    TrendingDown,
    DollarSign,
    // ShoppingCart, // Not directly used for a primary stat from AdminProductIndex stats
    AlertTriangle,
    // Users, // Not directly used for a primary stat from AdminProductIndex stats
    Eye
} from 'lucide-react';

// Types
interface StatItem {
    id: string;
    label: string;
    value: number;
    type: 'currency' | 'number' | 'percentage';
    change?: {
        value: number;
        type: 'increase' | 'decrease';
        period: string;
    };
    icon?: React.ReactNode;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
}

// Adjusted Stats interface to match the structure from AdminProductIndex.tsx
interface Stats {
    total_products: number;
    published_products: number;
    draft_products: number;
    out_of_stock: number;
    total_value: number;
}

interface StatsCardsProps {
    stats?: Stats; // Stats prop is optional as per AdminProductIndex.tsx
    formatNumber: (num: number) => string;
    formatPrice: (price: number) => string;
}

// Skeleton Component - Adjusted to reflect 5 items and layout similar to AdminProductIndex's skeleton
export const StatsSkeleton = memo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, index) => (
            <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-3" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-20" />
                    </div>
                    <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
                </div>
            </div>
        ))}
    </div>
));

StatsSkeleton.displayName = 'StatsSkeleton';

// Individual Stat Card Component (remains unchanged)
const StatCard = memo(({
    stat,
    formatNumber,
    formatPrice
}: {
    stat: StatItem;
    formatNumber: (num: number) => string;
    formatPrice: (price: number) => string;
}) => {
    const colorClasses = {
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        green: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
        yellow: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
        red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
        indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
    };

    const formatValue = (value: number, type: string) => {
        switch (type) {
            case 'currency':
                return formatPrice(value);
            case 'percentage':
                return `${formatNumber(value)}%`;
            default:
                return formatNumber(value);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-md dark:hover:ring-slate-600 transition-all duration-200">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {formatValue(stat.value, stat.type)}
                    </p>
                    {stat.change && (
                        <div className={`flex items-center gap-1 text-xs font-medium ${
                            stat.change.type === 'increase'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-red-600 dark:text-red-400'
                        }`}>
                            {stat.change.type === 'increase' ? (
                                <TrendingUp className="h-3 w-3" />
                            ) : (
                                <TrendingDown className="h-3 w-3" />
                            )}
                            <span>
                                {stat.change.value > 0 ? '+' : ''}{formatNumber(stat.change.value)}% {stat.change.period}
                            </span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[stat.color || 'blue']}`}>
                    {stat.icon}
                </div>
            </div>
        </div>
    );
});

StatCard.displayName = 'StatCard';

// Main StatsCards Component - Adjusted for AdminProductIndex.tsx
const StatsCards = memo(({
    stats,
    formatNumber,
    formatPrice
}: StatsCardsProps) => {
    // If stats are not provided, render nothing.
    // Suspense in AdminProductIndex will handle loading state.
    if (!stats) {
        return null;
    }

    // Transform stats from AdminProductIndex.tsx into StatItem array
    const statItems: StatItem[] = [
        {
            id: 'total_products',
            label: 'Total Products',
            value: stats.total_products,
            type: 'number',
            icon: <Package className="h-6 w-6" />,
            color: 'blue',
            // 'change' data would be populated here if available in 'stats' prop
        },
        {
            id: 'total_value',
            label: 'Total Inventory Value',
            value: stats.total_value,
            type: 'currency',
            icon: <DollarSign className="h-6 w-6" />,
            color: 'green',
        },
        {
            id: 'published_products',
            label: 'Published Products',
            value: stats.published_products,
            type: 'number',
            icon: <Eye className="h-6 w-6" />,
            color: 'green',
        },
        {
            id: 'draft_products',
            label: 'Draft Products',
            value: stats.draft_products,
            type: 'number',
            icon: <Package className="h-6 w-6" />, // Using Package icon; could also be an Edit icon
            color: 'yellow',
        },
        {
            id: 'out_of_stock',
            label: 'Out of Stock',
            value: stats.out_of_stock,
            type: 'number',
            icon: <AlertTriangle className="h-6 w-6" />,
            color: 'red',
        }
    ];

    // Removed original logic for conditional stats (avgOrderValue, conversionRate, totalCustomers)
    // and 'recentChanges' as these are not provided by AdminProductIndex.tsx's 'stats' prop.

    return (
        // Adjusted grid to match the 5-item layout of AdminProductIndex's skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {statItems.map((stat) => (
                <StatCard
                    key={stat.id}
                    stat={stat}
                    formatNumber={formatNumber}
                    formatPrice={formatPrice}
                />
            ))}
        </div>
    );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;