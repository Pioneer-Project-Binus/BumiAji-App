import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Undo2, ImageIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import tourismPhotoRoutes from '@/routes/tourism-photos';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type InertiaSharedProps } from '@/types/index';
import { type PhotoTourism, type PaginatedData, type PhotoTourismFilters } from '@/types/types-tourismPhotos';
import Pagination from '@/components/pagination';

const BREADCRUMBS: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: dashboard().url },
    { title: 'Tourism Photo Management', href: tourismPhotoRoutes.index().url },
    { title: 'Archived Tourism Photos', href: tourismPhotoRoutes.archived().url },
];

interface Props extends InertiaSharedProps {
    tourismPhotos: PaginatedData<PhotoTourism>;
    filters: PhotoTourismFilters;
}

export default function TourismPhotoArchived({ tourismPhotos: initialPhotos, filters: initialFilters }: Props) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(tourismPhotoRoutes.archived().url, { search: searchTerm }, { preserveState: true, replace: true });
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleRestore = (id: number) => {
        router.put(tourismPhotoRoutes.restore(id).url, {}, { preserveScroll: true });
    };

    const handleDeletePermanent = (id: number) => {
        router.delete(tourismPhotoRoutes.deletePermanent(id).url, { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title="Archived Tourism Photos" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-fuchsia-50 to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 py-8 lg:py-12">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <h1 className="text-4xl lg:text-5xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                            Archived Tourism Photos
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">View and manage deleted tourism photos.</p>
                    </div>

                    {flash?.success && (
                        <Alert variant="destructive" className="mb-6 bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-700">
                            <AlertTitle className="font-semibold text-green-700 dark:text-green-300">Success!</AlertTitle>
                            <AlertDescription className="text-green-600 dark:text-green-400">
                                {flash.success}
                            </AlertDescription>
                        </Alert>
                    )}
                    {flash?.error && (
                        <Alert variant="destructive" className="mb-6 bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-700">
                            <AlertTitle className="font-semibold text-red-700 dark:text-red-300">Error!</AlertTitle>
                            <AlertDescription className="text-red-600 dark:text-red-400">
                                {flash.error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30">
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white shadow-md">
                                    <Link href={tourismPhotoRoutes.index().url}>
                                        ← Back to Tourism Photos
                                    </Link>
                                </Button>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
                                <Input
                                    type="text"
                                    placeholder="Search archived tourism photos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 text-base border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-700/50 focus:border-purple-500"
                                />
                            </div>

                            {initialPhotos.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Destination</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {initialPhotos.data.map(photo => (
                                                <TableRow key={photo.id}>
                                                    <TableCell>
                                                        {photo.filePath ? (
                                                            <img src={`/storage/${photo.filePath}`} alt={photo.description} className="h-16 w-16 object-cover rounded-lg shadow-sm" />
                                                        ) : (
                                                            <div className="h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                                                <ImageIcon size={24} />
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{photo.description ?? '-'}</TableCell>
                                                    <TableCell>{photo.destination?.name ?? 'N/A'}</TableCell>
                                                    <TableCell className="text-right space-x-2">
                                                        <Button onClick={() => handleRestore(photo.id)} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                                            <Undo2 size={16} className="mr-1" /> Restore
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                                                                    <Trash2 size={16} className="mr-1" /> Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-white dark:bg-slate-800">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Confirm Permanent Deletion</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to permanently delete this photo? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDeletePermanent(photo.id)} className="bg-red-700 hover:bg-red-800">
                                                                        Yes, Delete Permanently
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ImageIcon size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
                                    <p className="text-slate-500 dark:text-slate-400 text-lg">No archived tourism photos found.</p>
                                </div>
                            )}
                        </div>
                        {initialPhotos.data.length > 0 && (
                            <div className="px-6 md:px-8 py-4 border-t border-slate-200 dark:border-slate-700">
                                <Pagination links={initialPhotos.links} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
