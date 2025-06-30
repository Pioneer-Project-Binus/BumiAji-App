import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { destinationData } from '@/data/destination-data';
import { Link, usePage } from '@inertiajs/react';
import IcArrowLeft from '../../../assets/icons/ic-arrow-left.svg';
import ImgCardStaticVertical from '../../../assets/images/img-statis-vertical.png';
import ImgCardStatic from '../../../assets/images/img-statis.png';

export default function DestinationDetail() {
    const { slug } = usePage().props;

    console.log('Props:', usePage().props);

    const destination = destinationData.find((item) => item.slug === slug);

    console.log('Slug:', slug);
    console.log('Destination:', destination);

    if (!destination) {
        return <p>Destinasi tidak ditemukan.</p>;
    }

    return (
        <div className="min-h-screen bg-white px-8 py-10">
            {/* head */}
            <div className="flex gap-6">
                <Link href="/destinasi">
                    <button>
                        <img src={IcArrowLeft} alt="Icon Arrow" width={36} height={36} style={{ cursor: 'pointer' }} />
                    </button>
                </Link>
                <h1 className="text-3xl font-medium text-black">Destinasi</h1>
            </div>

            {/* breadcrumbs */}
            <div className="mx-5 mt-5 px-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link href="/" className="font-medium hover:text-[#537D5D]">
                                    Home
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link href="/destinasi" className="font-medium hover:text-[#537D5D]">
                                    Destinasi
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium text-[#537D5D]">{destination.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* content */}
            <div className="mt-8 grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-10">
                {/* left content */}
                <div className="px-0 md:px-6">
                    <img src={ImgCardStatic} alt="" className="w-full rounded-lg object-cover" />
                    <div className="mt-6 flex items-start justify-between gap-2 text-black md:flex-row md:items-center">
                        <h1 className="text-lg font-semibold md:text-xl">{destination.title}</h1>
                        <p className="text-base font-medium">{destination.price}</p>
                    </div>
                </div>

                {/* right content */}
                <div className="text-black">
                    <div className="px-10 md:px-10">
                        <Carousel className="w-full max-w-full">
                            <CarouselContent className="-ml-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index} className="basis-1/2 pl-1 md:basis-1/3 lg:basis-1/4">
                                        <div className="p-1">
                                            <img src={ImgCardStaticVertical} alt="" className="h-[275px] w-full rounded-md object-cover" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>

                    <p className="mt-6 text-sm md:mt-8">{destination.description}</p>
                </div>
            </div>
        </div>
    );
}
