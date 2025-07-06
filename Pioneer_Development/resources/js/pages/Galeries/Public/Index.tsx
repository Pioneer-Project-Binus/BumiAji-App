import Navbar from '@/components/ui/navbar';

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}

interface GalleryItem {
    id: string; // ubah dari number ke string sesuai data
    filePath: string; // ubah dari image ke filePath sesuai data
    title: string;
    description?: string;
    type: 'photo' | 'video';
}

interface PaginationData {
    current_page: number;
    data: GalleryItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export default function Gallery({ galeries }: { galeries: PaginationData }) {
    // Ambil data dari struktur pagination
    const galleryItems = galeries.data;
    const chunks = chunkArray(galleryItems, 8); // layout per 8
    
    console.log('Gallery data:', galleryItems);
    
    return (
        <div className="min-h-screen bg-white px-8 py-6">
            <Navbar />

            <div className="mx-10 my-12 flex flex-col gap-[50px]">
                <div>
                    <h1 className="text-3xl font-semibold text-[#0E2815]">Galeri</h1>
                </div>

                {chunks.map((chunk, index) => {
                    const [
                        topFull,
                        leftLarge,
                        rightTop,
                        rightMid1,
                        rightMid2,
                        bottom1,
                        bottom2,
                        bottom3,
                    ] = chunk;

                    return (
                        <div key={index} className="flex flex-col gap-6">
                            {topFull && (
                                <div className="h-[442px] w-full overflow-hidden rounded-md bg-gray-200">
                                    <img 
                                        src={`/storage/${topFull.filePath}`} 
                                        alt={topFull.title || `Gallery Image ${topFull.id}`} 
                                        className="h-full w-full object-cover" 
                                    />
                                </div>
                            )}

                            {(leftLarge || rightTop || rightMid1 || rightMid2) && (
                                <div className="flex gap-6">
                                    {leftLarge && (
                                        <div className="h-[442px] w-1/2 overflow-hidden rounded-md bg-gray-200">
                                            <img 
                                                src={`/storage/${leftLarge.filePath}`} 
                                                alt={leftLarge.title || `Gallery Image ${leftLarge.id}`} 
                                                className="h-full w-full object-cover" 
                                            />
                                        </div>
                                    )}

                                    {(rightTop || rightMid1 || rightMid2) && (
                                        <div className="flex w-1/2 flex-col gap-6">
                                            {rightTop && (
                                                <div className="h-[210px] overflow-hidden rounded-md bg-gray-200">
                                                    <img 
                                                        src={`/storage/${rightTop.filePath}`} 
                                                        alt={rightTop.title || `Gallery Image ${rightTop.id}`} 
                                                        className="h-full w-full object-cover" 
                                                    />
                                                </div>
                                            )}
                                            <div className="flex w-full gap-6">
                                                {rightMid1 && (
                                                    <div className="h-[210px] w-1/2 overflow-hidden rounded-md bg-gray-200">
                                                        <img 
                                                            src={`/storage/${rightMid1.filePath}`} 
                                                            alt={rightMid1.title || `Gallery Image ${rightMid1.id}`} 
                                                            className="h-full w-full object-cover" 
                                                        />
                                                    </div>
                                                )}
                                                {rightMid2 && (
                                                    <div className="h-[210px] w-1/2 overflow-hidden rounded-md bg-gray-200">
                                                        <img 
                                                            src={`/storage/${rightMid2.filePath}`} 
                                                            alt={rightMid2.title || `Gallery Image ${rightMid2.id}`} 
                                                            className="h-full w-full object-cover" 
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {(bottom1 || bottom2 || bottom3) && (
                                <div className="grid grid-cols-3 gap-6">
                                    {[bottom1, bottom2, bottom3].filter(Boolean).map((item) => (
                                        <div key={item!.id} className="h-[210px] overflow-hidden rounded-md bg-gray-200">
                                            <img 
                                                src={`/storage/${item!.filePath}`} 
                                                alt={item!.title || `Gallery Image ${item!.id}`} 
                                                className="h-full w-full object-cover" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}