import articles from '@/routes/articles';
import galeries from '@/routes/galeries';
import products from '@/routes/products';
import testimonials from '@/routes/testimonials';
import tourism from '@/routes/tourism';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Destinasi', href: tourism.indexPublic().url },
    { label: 'Produk', href: products.indexPublic().url },
    { label: 'Berita', href: articles.indexPublic().url },
    { label: 'Testimoni', href: testimonials.indexPublic().url },
    { label: 'Galeri', href: galeries.indexPublic().url },
];

export default function Navbar() {
    const { url } = usePage();
    const [active, setActive] = useState(url);
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <nav className="w-full bg-transparent px-6 py-4 shadow-md relative z-50">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#537D5D] to-[#6B9B6F] shadow-md">
                            <MapPin size={20} className="text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-[#537D5D] to-[#6B9B6F] bg-clip-text text-transparent">
                            ExploreID
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.href} className="relative">
                                <Link
                                    href={item.href}
                                    onClick={() => setActive(item.href)}
                                    className={`relative font-medium transition-all duration-300 hover:text-[#537D5D] group ${
                                        active === item.href ? 'text-[#537D5D]' : 'text-gray-700'
                                    }`}
                                >
                                    {item.label}
                                    {/* Hover underline effect */}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#537D5D] to-[#6B9B6F] transition-all duration-300 ${
                                        active === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-[#537D5D] hover:text-[#6B9B6F] transition-colors duration-200 focus:outline-none menu-button" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 md:hidden backdrop-blur-sm bg-black/30 transition-opacity duration-300"
                />
            )}
            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden sidebar ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#537D5D] to-[#6B9B6F] shadow-md">
                            <MapPin size={16} className="text-white" />
                        </div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-[#537D5D] to-[#6B9B6F] bg-clip-text text-transparent">
                            ExploreID
                        </h2>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-[#537D5D] transition-colors duration-200"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="p-6">
                    <ul className="space-y-2">
                        {navItems.map((item, index) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => {
                                        setActive(item.href);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-[#537D5D]/10 hover:to-[#6B9B6F]/10 hover:text-[#537D5D] ${
                                        active === item.href 
                                            ? 'bg-gradient-to-r from-[#537D5D]/20 to-[#6B9B6F]/20 text-[#537D5D] border-l-4 border-[#537D5D]' 
                                            : 'text-gray-700 hover:translate-x-1'
                                    }`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Jelajahi Indonesia bersama kami
                        </p>
                        <div className="mt-2 flex justify-center">
                            <div className="w-16 h-1 bg-gradient-to-r from-[#537D5D] to-[#6B9B6F] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}