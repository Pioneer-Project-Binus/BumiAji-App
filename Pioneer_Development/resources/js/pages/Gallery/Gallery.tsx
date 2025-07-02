import Navbar from '@/components/ui/navbar';
import { useState } from 'react';
import ImgCardStatic from '../../../assets/images/img-statis.png';

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

export default function Gallery() {
    const [galleryItems] = useState([
        { id: 1, imageUrl: ImgCardStatic },
        { id: 2, imageUrl: ImgCardStatic },
        { id: 3, imageUrl: ImgCardStatic },
        { id: 4, imageUrl: ImgCardStatic },
        { id: 5, imageUrl: ImgCardStatic },
        { id: 6, imageUrl: ImgCardStatic },
        { id: 7, imageUrl: ImgCardStatic },
        { id: 8, imageUrl: ImgCardStatic },
        { id: 9, imageUrl: ImgCardStatic },
        { id: 10, imageUrl: ImgCardStatic },
        { id: 11, imageUrl: ImgCardStatic },
        { id: 12, imageUrl: ImgCardStatic },
        { id: 13, imageUrl: ImgCardStatic },
        { id: 14, imageUrl: ImgCardStatic },
        { id: 15, imageUrl: ImgCardStatic },
        { id: 16, imageUrl: ImgCardStatic },
    ]);

    const chunks = chunkArray(galleryItems, 8);

    return (
        <div className="min-h-screen bg-white px-8 py-6">
            <Navbar />

            <div className="mx-10 my-12 flex flex-col gap-[50px]">
                <div>
                    <h1 className="text-3xl font-semibold text-[#0E2815]">Galeri</h1>
                </div>

                {chunks.map((chunk, index) => (
                    <div key={index} className="flex flex-col gap-6">
                        {chunk[0] && (
                            <div className="h-[442px] w-full max-w-full overflow-hidden rounded-md bg-gray-200">
                                <img src={chunk[0].imageUrl} alt={`Gallery Image ${chunk[0].id}`} className="h-full w-full object-cover" />
                            </div>
                        )}

                        <div className="flex gap-6">
                            {/* Left big */}
                            {chunk[1] && (
                                <div className="h-[442px] w-1/2 overflow-hidden rounded-md bg-gray-200">
                                    <img src={chunk[1].imageUrl} alt={`Gallery Image ${chunk[1].id}`} className="h-full w-full object-cover" />
                                </div>
                            )}

                            {/* Right side */}
                            <div className="flex w-1/2 flex-col gap-6">
                                {chunk[2] && (
                                    <div className="h-[210px] overflow-hidden rounded-md bg-gray-200">
                                        <img src={chunk[2].imageUrl} alt={`Gallery Image ${chunk[2].id}`} className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <div className="flex w-full gap-6">
                                    {chunk[3] && (
                                        <div className="h-[210px] w-1/2 overflow-hidden rounded-md bg-gray-200">
                                            <img
                                                src={chunk[3].imageUrl}
                                                alt={`Gallery Image ${chunk[3].id}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    {chunk[4] && (
                                        <div className="h-[210px] w-1/2 overflow-hidden rounded-md bg-gray-200">
                                            <img
                                                src={chunk[4].imageUrl}
                                                alt={`Gallery Image ${chunk[4].id}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/*  Bottom 3-grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {chunk.slice(5, 8).map((item) => (
                                <div key={item.id} className="h-[210px] overflow-hidden rounded-md bg-gray-200">
                                    <img src={item.imageUrl} alt={`Gallery Image ${item.id}`} className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
