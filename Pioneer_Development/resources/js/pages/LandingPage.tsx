import Navbar from '@/components/ui/navbar';

console.log('LandingPage rendered!');
console.log('AppLayout rendered!');

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white px-8 py-6">
            {/* Nav */}
            <Navbar />
            {/* End Nav */}
        </div>
    );
}
