interface ProductCardProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

export default function DestinationCard({ image, title, description, price }: ProductCardProps) {
    return (
        <div className="flex max-w-sm flex-col items-center rounded-xl bg-white px-4 py-5 text-center shadow-md">
            <img src={image} alt={title} className="mb-4 h-[180px] w-[315px] rounded-md object-cover" />
            <h3 className="mb-5 text-base font-semibold text-black">{title}</h3>
            <p className="mb-5 text-xs text-[#878787]">{description}</p>
            <p className="text-sm font-medium text-black">{price}</p>
        </div>
    );
}
