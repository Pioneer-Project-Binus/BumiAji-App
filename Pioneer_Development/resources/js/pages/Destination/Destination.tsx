import DestinationCard from '@/components/ui/destination-card';
import Navbar from '@/components/ui/navbar';
import { destinationData } from '@/data/destination-data';
import { Link } from '@inertiajs/react';

export default function Destination() {
    return (
        <div className="min-h-screen bg-white px-8 py-6">
            {/* Nav */}
            <Navbar />
            {/* End Nav */}

            {/* Content */}
            <div className="mx-10 my-12 flex flex-col gap-[90px]">
                <div>
                    <h1 className="mb-3 text-3xl font-semibold text-[#0E2815]">Destinasi</h1>

                    <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {destinationData.map((item) => (
                            <Link key={item.slug} href={`/destinasi/${item.slug}`} className="block">
                                <DestinationCard image={item.image} title={item.title} description={item.description} price={item.price} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="mb-3 text-3xl font-semibold text-[#0E2815]">Paket Destinasi</h1>

                    <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {destinationData.map((item) => (
                            <Link key={item.slug} href={`/destinasi/${item.slug}`} className="block">
                                <DestinationCard image={item.image} title={item.title} description={item.description} price={item.price} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/* End Content */}
        </div>
    );
}
