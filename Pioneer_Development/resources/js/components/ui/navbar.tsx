import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Destinasi', href: '/destinasi' },
    { label: 'Produk', href: '/produk' },
    { label: 'Berita', href: '/berita' },
    { label: 'Testimoni', href: '/testimoni' },
    { label: 'Galeri', href: '/galeri' },
];

export default function Navbar() {
    const { url } = usePage();
    const [active, setActive] = useState(url);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full rounded-2xl bg-white px-6 py-4 shadow-md">
            <div className="align-center flex justify-start gap-15">
                <h1 className="text-lg font-bold text-[#537D5D]">Logo</h1>

                {/* Mobile nav */}
                <button className="text-[#537D5D] focus:outline-none md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop nav */}
                <ul className="hidden gap-6 md:flex">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => setActive(item.href)}
                                className={`cursor-pointer font-medium transition-colors duration-200 hover:text-[#537D5D] ${
                                    active === item.href ? 'text-[#537D5D]' : 'text-black'
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile nav */}
            {isOpen && (
                <ul className="mt-4 flex flex-col gap-4 md:hidden">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => {
                                    setActive(item.href);
                                    setIsOpen(false);
                                }}
                                className={`block w-full cursor-pointer font-medium transition-colors duration-200 hover:text-[#537D5D] ${
                                    active === item.href ? 'text-[#537D5D]' : 'text-black'
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}