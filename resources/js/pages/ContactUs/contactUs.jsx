import telp from '../assets/Frame.svg';
import message from '../assets/message.svg';
import loc from '../assets/fluent_location-16-filled.svg';

function ContactUsPage() {




  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Background Section */}
      <div className="w-full h-[300px] md:h-[625px] bg-[#B0D3C2]"></div>

      {/* Header Text */}
      <div className="max-w-screen-md mx-auto px-4 mt-[-280px] md:mt-[-520px] relative z-10 text-center space-y-2 md:space-y-4">
        <h1 className="text-xl md:text-4xl font-semibold text-[#0E2815]">Hubungi Kami</h1>
        <p className="text-xs md:text-xl font-medium text-black">
          Hubungi kami jika Anda memiliki pertanyaan, saran, atau ingin mengetahui lebih lanjut tentang pelayanan dan kegiatan di desa kami.
        </p>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 mt-6 md:mt-12 flex flex-col md:flex-row gap-6 bg-white md:shadow-lg md:rounded-2xl md:p-6">
        {/* Kiri: Informasi Kontak */}
        <div className="bg-[#537D5D] text-white p-4 md:p-8 rounded-xl flex-1 space-y-4 md:space-y-10">
          <div>
            <h2 className="text-sm md:text-2xl font-medium">Informasi Kontak</h2>
            <p className="text-[8px] md:text-base mt-1 md:mt-3">
              Silakan gunakan informasi berikut untuk pertanyaan atau keperluan terkait layanan Desa.
            </p>
          </div>
          <div className="space-y-3 md:space-y-6 text-[8px] md:text-lg">
            <div className="flex items-center gap-2 md:gap-4">
              <img src= {telp} className="w-4 md:w-10 h-4 md:h-10" />
              <span className="font-medium">+62 814325678</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <img src={message} className="w-4 md:w-10 h-4 md:h-10"/>
              <span className="font-medium">loremIpsum@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <img src={loc} className="w-4 md:w-10 h-4 md:h-10"/>
              <span className="font-medium">rt14</span>
            </div>
          </div>
        </div>

        {/* Kanan: Form */}
        <div className="flex-1 space-y-4 md:space-y-6 text-[8px] md:text-base">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <label className="block text-[#878787] font-medium mb-1">Nama Anda</label>
              <input
                type="text"
                placeholder="contoh : Jamal Davidson"
                className="w-full border-b border-black py-1 md:py-2 text-black italic outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#878787] font-medium mb-1">Email Anda</label>
              <input
                type="email"
                placeholder="contoh : jamals@gmail.com"
                className="w-full border-b border-black py-1 md:py-2 text-black italic outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#878787] font-medium mb-1">Subyek / Perihal Anda</label>
            <input
              type="text"
              placeholder="contoh : penginapan sekitar"
              className="w-full border-b border-black py-1 md:py-2 text-black italic outline-none"
            />
          </div>

          <div>
            <label className="block text-[#878787] font-medium mb-1">Pesan</label>
            <textarea
              placeholder="Tuliskan pesan anda di sini"
              className="w-full h-24 md:h-40 border border-gray-300 rounded-lg p-2 md:p-4 text-black italic"
            ></textarea>
          </div>

          <button className="bg-[#537D5D] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-[8px] md:text-sm">
            Kirim Pesan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
