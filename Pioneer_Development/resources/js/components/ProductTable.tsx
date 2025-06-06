import React, { memo, useMemo, useCallback } from 'react';
import { Link } from '@inertiajs/react'; // router removed as handlers are passed down
import { format as formatDateFns } from 'date-fns';
import {
    Package,
    Edit3,
    TrendingUp,
    TrendingDown,
    Eye,
    Trash2,
    PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, PaginatedData } from '@/types'; // CategoryProduct removed if not directly part of Product type here
const OptimizedProductImage = memo(({ 
  src, 
  alt, 
  className 
}: { 
  src?: string; 
  alt: string; 
  className?: string; 
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  if (!src || error) {
    return (
      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 ${className}`}>
        <Package className="h-6 w-6 text-slate-400 dark:text-slate-500" />
      </div>
    );
  }

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`h-12 w-12 rounded-lg object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
});
OptimizedProductImage.displayName = 'OptimizedProductImage';


// ProductRow component (remains largely the same, receives individual handlers)
const ProductRow = memo(({
    product,
    formatPrice,
    formatNumber,
    onView,
    onEdit,
    onDelete
}: {
    product: Product;
    formatPrice: (price: number) => string;
    formatNumber: (num: number) => string;
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}) => {
    const statusConfig = useMemo(() => ({
        published: {
            label: 'Published',
            className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
            icon: <TrendingUp className="h-3 w-3" />
        },
        draft: {
            label: 'Draft',
            className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
            icon: <Edit3 className="h-3 w-3" />
        },
        outofstock: {
            label: 'Out of Stock',
            className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
            icon: <TrendingDown className="h-3 w-3" />
        }
    }), []);

    const currentStatus = product.status as keyof typeof statusConfig;
    const statusInfo = statusConfig[currentStatus] || statusConfig.draft;

    const handleView = useCallback(() => onView(product), [onView, product]);
    const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
    const handleDelete = useCallback(() => onDelete(product), [onDelete, product]);

    return (
        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
            {/* Product Info */}
            <td className="p-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <OptimizedProductImage
                        src={product.photos?.[0]?.file_path_url}
                        alt={product.productName}
                    />
                    <div>
                        <Link
                            href={`/products/${product.slug}`} // Assuming productsRoute.show(product.slug).url resolves similarly
                            className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {product.productName}
                        </Link>
                        {product.description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                {product.description}
                            </p>
                        )}
                    </div>
                </div>
            </td>
            {/* Category */}
            <td className="p-4 whitespace-nowrap">
                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {product.category?.name || 'Uncategorized'}
                </Badge>
            </td>
            {/* Price */}
            <td className="p-4 whitespace-nowrap text-right">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                    {typeof product.price === 'number' ? formatPrice(product.price) : 'N/A'}
                </span>
            </td>
            {/* Stock */}
            <td className="p-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center gap-2">
                    <span className={`font-medium ${typeof product.stock === 'number' ? (
                        product.stock <= 5
                            ? 'text-red-600 dark:text-red-400'
                            : product.stock <= 20
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-green-600 dark:text-green-400'
                    ) : 'text-slate-500 dark:text-slate-400'
                        }`}>
                        {typeof product.stock === 'number' ? formatNumber(product.stock) : 'N/A'}
                    </span>
                    {typeof product.stock === 'number' && product.stock <= 5 && (
                        <Badge variant="destructive" className="text-xs">
                            Low
                        </Badge>
                    )}
                </div>
            </td>
            {/* Status */}
            <td className="p-4 whitespace-nowrap">
                <Badge className={`flex items-center gap-1 ${statusInfo.className}`}>
                    {statusInfo.icon}
                    {statusInfo.label}
                </Badge>
            </td>
            {/* Created Date */}
            <td className="p-4 whitespace-nowrap">
                <div className="text-sm">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                        {product.createdAt ? formatDateFns(new Date(product.createdAt), "dd MMM yyyy") : "N/A"}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                        {product.createdAt ? formatDateFns(new Date(product.createdAt), "HH:mm") : ""}
                    </div>
                </div>
            </td>
            {/* Actions */}
            <td className="p-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button onClick={handleView} variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:border-slate-500">
                        <Eye className="h-4 w-4" /> <span className="sr-only">View</span>
                    </Button>
                    <Button onClick={handleEdit} variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:border-slate-500">
                        <Edit3 className="h-4 w-4" /> <span className="sr-only">Edit</span>
                    </Button>
                    <Button onClick={handleDelete} variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:border-red-600">
                        <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </td>
        </tr>
    );
});
ProductRow.displayName = 'ProductRow';

// TableHeader component (assuming it's defined as in your provided code)
// ... TableHeader code ...
const TableHeader = memo(({ 
  onSort, 
  filters 
}: { 
  onSort: (column: string) => void;
  filters: {
    sort?: string;
    direction?: 'asc' | 'desc';
  };
}) => {
  const columns = [
    { key: 'productName', label: 'Product', sortable: true },
    { key: 'category.name', label: 'Category', sortable: true },
    { key: 'price', label: 'Price', sortable: true, className: 'text-right' },
    { key: 'stock', label: 'Stock', sortable: true, className: 'text-center' },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true },
  ];

  return (
    <thead className="bg-slate-50 dark:bg-slate-800/50">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            className={`p-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${col.className || ''} ${col.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors' : ''}`}
            onClick={() => col.sortable && onSort(col.key)}
          >
            <div className="flex items-center gap-1">
              {col.label}
              {col.sortable && filters.sort === col.key && (
                filters.direction === 'asc' ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              )}
            </div>
          </th>
        ))}
        <th className="p-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
});
TableHeader.displayName = 'TableHeader';

// EmptyState component (assuming it's defined as in your provided code)
// ... EmptyState code ...
const EmptyState = memo(({ 
  hasFilters, 
  onCreateProduct, 
  canCreate 
}: { 
  hasFilters: boolean;
  onCreateProduct: () => void;
  canCreate: boolean;
}) => (
  <div className="text-center py-12">
    <Package className="h-16 w-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
      Tidak ada produk ditemukan
    </h3>
    <p className="text-slate-500 dark:text-slate-400 mb-6">
      {hasFilters
        ? "Coba sesuaikan kriteria pencarian atau filter Anda."
        : "Mulai dengan membuat produk pertama Anda."
      }
    </p>
    {canCreate && (
      <Button
        onClick={onCreateProduct}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Buat Produk Baru
      </Button>
    )}
  </div>
));
EmptyState.displayName = 'EmptyState';


interface ProductTableActions {
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

interface ProductTableProps {
    products: PaginatedData<Product>; // CHANGED: Expects PaginatedData
    filters: {
        sort?: string;
        direction?: 'asc' | 'desc';
        search?: string;
        category?: string;
        status?: string;
    };
    onSort: (column: string) => void;
    actions: ProductTableActions; // CHANGED: Expects an actions object
    onCreateProduct: () => void; // Kept, as EmptyState needs it. Caller must provide.
    canCreate?: boolean;
    formatPrice?: (price: number) => string;
    formatNumber?: (num: number) => string;
}

const ProductTable = memo(({
    products: productsData, // This is PaginatedData<Product>
    filters,
    onSort,
    actions, // This is ProductTableActions
    onCreateProduct,
    canCreate = true,
    formatPrice = (price: number) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price),
    formatNumber = (num: number) => new Intl.NumberFormat('id-ID').format(num)
}: ProductTableProps) => {
    const actualProducts = productsData.data; // Use .data to get the array of products

    const hasFilters = useMemo(() =>
        Boolean(filters.search || filters.category || filters.status),
        [filters]
    );

    if (!actualProducts || actualProducts.length === 0) { // Check actualProducts
        return (
            <EmptyState
                hasFilters={hasFilters}
                onCreateProduct={onCreateProduct}
                canCreate={canCreate}
            />
        );
    }

    return (
        <div className="overflow-hidden shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <TableHeader onSort={onSort} filters={filters} />
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                        {actualProducts.map((product) => ( // Use actualProducts.map
                            <ProductRow
                                key={product.id}
                                product={product}
                                formatPrice={formatPrice}
                                formatNumber={formatNumber}
                                onView={actions.onView} // Pass handler from actions object
                                onEdit={actions.onEdit} // Pass handler from actions object
                                onDelete={actions.onDelete} // Pass handler from actions object
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

ProductTable.displayName = 'ProductTable';
export default ProductTable;