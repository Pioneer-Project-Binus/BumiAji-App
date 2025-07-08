import React from 'react';
import { MessageCircle, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function ProfileVillageIndex() {
    // Data hardcode untuk profil desa
    const villageData = {
        name: "Desa Sumberejo",
        banner: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
        photo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
        description: "Desa Sumberejo adalah sebuah desa yang terletak di kaki Gunung Merapi dengan pemandangan alam yang indah dan udara yang sejuk. Desa ini memiliki potensi wisata alam yang luar biasa dengan hamparan sawah hijau yang membentang luas. Masyarakat desa yang ramah dan budaya lokal yang masih terjaga menjadi daya tarik tersendiri bagi wisatawan yang berkunjung.",
        vision: "Menjadi desa wisata yang mandiri, sejahtera, dan berkelanjutan dengan tetap menjaga kelestarian alam dan budaya lokal.",
        missions: [
            "Mengembangkan potensi wisata alam dan budaya secara berkelanjutan",
            "Meningkatkan kesejahteraan masyarakat melalui pemberdayaan ekonomi lokal",
            "Melestarikan lingkungan dan kearifan lokal",
            "Meningkatkan kualitas infrastruktur dan pelayanan publik"
        ],
        socialMedia: {
            facebook: "https://facebook.com/desasumberejo",
            instagram: "https://instagram.com/desasumberejo",
            twitter: "https://twitter.com/desasumberejo",
            youtube: "https://youtube.com/desasumberejo"
        },
        contact: {
            address: "Jl. Raya Sumberejo No. 123, Kec. Merapi, Kab. Sleman",
            phone: "(0274) 123-4567",
            email: "info@desasumberejo.id"
        }
    };

    const handleContactClick = () => {
        // Navigasi ke halaman contact
        console.log("Navigating to contact page");
        // window.location.href = '/contact'; // Uncomment untuk navigasi sesungguhnya
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <div 
                className="w-full h-80 bg-cover bg-center bg-no-repeat relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${villageData.banner})`
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                            {villageData.name}
                        </h1>
                        <p className="text-xl drop-shadow-md">
                            Desa Wisata yang Asri dan Sejahtera
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8 mb-16">
                    {/* Village Photo */}
                    <div className="lg:w-1/2">
                        <img 
                            src={villageData.photo}
                            alt={`Foto ${villageData.name}`}
                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    
                    {/* Village Description */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Tentang {villageData.name}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {villageData.description}
                        </p>
                        
                        {/* Contact Info */}
                        <div className="mb-8 space-y-3">
                            <div className="flex items-center text-gray-600">
                                <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                                <span>{villageData.contact.address}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Phone className="w-5 h-5 mr-3 text-blue-600" />
                                <span>{villageData.contact.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Mail className="w-5 h-5 mr-3 text-blue-600" />
                                <span>{villageData.contact.email}</span>
                            </div>
                        </div>
                        
                        {/* Contact Button */}
                        <button 
                            onClick={handleContactClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Kirim Pesan
                        </button>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Vision & Mission */}
                    <div className="lg:w-1/2">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Visi & Misi
                            </h3>
                            
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                                    Visi
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {villageData.vision}
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold text-blue-600 mb-3">
                                    Misi
                                </h4>
                                <ul className="text-gray-600 space-y-2">
                                    {villageData.missions.map((mission, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-blue-600 mr-2 mt-1">•</span>
                                            <span>{mission}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Social Media */}
                    <div className="lg:w-1/2">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Media Sosial
                            </h3>
                            
                            <p className="text-gray-600 mb-6">
                                Ikuti media sosial kami untuk mendapatkan informasi terkini tentang kegiatan dan perkembangan desa.
                            </p>
                            
                            <div className="space-y-4">
                                <a 
                                    href={villageData.socialMedia.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                >
                                    <Facebook className="w-6 h-6 text-blue-600 mr-3" />
                                    <span className="text-gray-700">Facebook</span>
                                </a>
                                
                                <a 
                                    href={villageData.socialMedia.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors duration-200"
                                >
                                    <Instagram className="w-6 h-6 text-pink-600 mr-3" />
                                    <span className="text-gray-700">Instagram</span>
                                </a>
                                
                                <a 
                                    href={villageData.socialMedia.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors duration-200"
                                >
                                    <Twitter className="w-6 h-6 text-sky-600 mr-3" />
                                    <span className="text-gray-700">Twitter</span>
                                </a>
                                
                                <a 
                                    href={villageData.socialMedia.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                >
                                    <Youtube className="w-6 h-6 text-red-600 mr-3" />
                                    <span className="text-gray-700">YouTube</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}