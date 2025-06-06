<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ProductsExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = Product::with('category')->where('isDeleted', false);

        if (!empty($this->filters['search'])) {
            $searchTerm = $this->filters['search'];
            $query->where(function ($q) use ($searchTerm) {
                $q->where('productName', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        if (!empty($this->filters['category'])) {
            $query->where('categoryId', $this->filters['category']);
        }

        if (!empty($this->filters['status'])) {
            $query->where('status', $this->filters['status']);
        }

        // Sort
        $sortColumn = $this->filters['sort'] ?? 'createdAt';
        $sortDirection = $this->filters['direction'] ?? 'desc';
        $allowedSortColumns = ['productName', 'price', 'stock', 'status', 'createdAt', 'category.name'];

        if (!in_array($sortColumn, $allowedSortColumns)) {
            $sortColumn = 'createdAt';
        }

        if ($sortColumn === 'category.name') {
            $query->select('products.*')
                ->leftJoin('categoryProducts', 'products.categoryId', '=', 'categoryProducts.id')
                ->orderBy('categoryProducts.name', $sortDirection);
        } else {
            $query->orderBy($sortColumn, $sortDirection);
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'Product Name',
            'Slug',
            'Description',
            'Category',
            'Price (IDR)',
            'Stock',
            'Status',
            'Created At',
        ];
    }

    public function map($product): array
    {
        return [
            $product->productName,
            $product->slug,
            strlen($product->description) > 100 ? substr($product->description, 0, 100) . '...' : $product->description,
            $product->category ? $product->category->name : 'N/A',
            number_format($product->price, 0, ',', '.'),
            $product->stock,
            ucfirst($product->status),
            $product->createdAt ? $product->createdAt->format('d M Y H:i') : 'N/A',
        ];
    }
}
