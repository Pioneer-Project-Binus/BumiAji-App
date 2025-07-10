interface ProductCardProps {
    image: string;
    title: string;
    description: string;
    price: string;
}

export default function DestinationCard({ image, title, description, price }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">{price}</span>
            <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              Lihat Detail
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}