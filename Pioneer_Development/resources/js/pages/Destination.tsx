import DestinationCard from '@/components/ui/destination-card';
import Navbar from '@/components/ui/navbar';
import ImgCardStatic from '../../assets/images/img-statis.png';

export default function Destination() {
    const staticContentCard = [
        {
            image: ImgCardStatic,
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum dolor sit amet quet',
            price: 'Rp 150.000',
        },
        {
            image: ImgCardStatic,
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum dolor sit amet quet',
            price: 'Rp 150.000',
        },
        {
            image: ImgCardStatic,
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum dolor sit amet quet',
            price: 'Rp 150.000',
        },
        {
            image: ImgCardStatic,
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum dolor sit amet quet',
            price: 'Rp 150.000',
        },
        {
            image: ImgCardStatic,
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum dolor sit amet quet',
            price: 'Rp 150.000',
        },
    ];

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
                        {staticContentCard.map((item) => (
                            <DestinationCard image={item.image} title={item.title} description={item.description} price={item.price} />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="mb-3 text-3xl font-semibold text-[#0E2815]">Paket Destinasi</h1>

                    <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {staticContentCard.map((item) => (
                            <DestinationCard image={item.image} title={item.title} description={item.description} price={item.price} />
                        ))}
                    </div>
                </div>
            </div>
            {/* End Content */}
        </div>
    );
}
