import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className='bg-white min-h-screen mt-20 mb-30'>
      <div className='h-auto lg:h-[800px] bg-[#B0D3C2] pb-8 lg:pb-0'>
        <div className="flex flex-col items-center pt-14 px-4">
          <div className="text-3xl md:text-4xl lg:text-[48px] font-semibold mb-2 text-center">
            Hubungi Kami
          </div>
          <div className="text-gray-700 max-w-6xl text-lg md:text-xl lg:text-[24px] text-center mb-8 lg:mb-32">
            Hubungi kami jika Anda memiliki pertanyaan, saran, atau ingin mengetahui lebih lanjut tentang pelayanan dan kegiatan di desa kami.
          </div>
          
          {/* Contact Card */}
          <div className='w-full max-w-7xl bg-white rounded-2xl shadow-2xl mx-4 lg:mx-20 overflow-hidden'>
            <div className='flex flex-col lg:flex-row min-h-[520px]'>
              
              {/* Form Panel */}
              <div className='flex-1 p-6 lg:p-8 order-1 lg:order-2'>
                <div className='text-xl lg:text-[24px] font-semibold mb-2 text-[#295740]'>
                  Formulir Kontak
                </div>
                <div className='text-base lg:text-[18px] font-normal mb-8 text-gray-600'>
                  Silakan isi formulir berikut untuk menghubungi kami
                </div>
                <div className='space-y-6'>
                  
                  {/* Name and Email Row */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <div className='block text-xl lg:text-[24px] font-semibold mb-2 text-[#295740]'>
                        Nama Anda
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pb-2 pt-2 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#295740] transition-all duration-300 placeholder-gray-400"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                    <div>
                      <div className='block text-xl lg:text-[24px] font-semibold mb-2 text-[#295740]'>
                        Email Anda
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pb-2 pt-2 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#295740] transition-all duration-300 placeholder-gray-400"
                        placeholder="Masukkan email Anda"
                      />
                    </div>
                  </div>
                  
                  {/* Subject */}
                  <div>
                    <div className='block text-xl lg:text-[24px] font-semibold mb-2 text-[#295740]'>
                      Subjek
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pb-2 pt-2 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#295740] transition-all duration-300 placeholder-gray-400"
                      placeholder="Masukkan subjek pesan"
                    />
                  </div>
                  
                  {/* Message */}
                  <div>
                    <div className='block text-xl lg:text-[24px] font-semibold mb-2 text-[#295740]'>
                      Pesan Anda
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full pb-2 bg-transparent border-2 rounded-2xl p-2 border-gray-300 focus:outline-none focus:border-[#295740] transition-all duration-300 resize-none placeholder-gray-400"
                      rows={4}
                      placeholder="Tulis pesan Anda di sini"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div className='flex justify-center md:justify-start'>
                    <button
                      onClick={handleSubmit}
                      className='flex justify-center items-center bg-[#295740] text-white text-lg lg:text-[24px] font-semibold rounded-lg w-full md:w-[200px] h-[60px] hover:bg-[#537D5D] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                    >
                      Kirim Pesan
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Contact Info Panel */}
              <div className='w-full lg:w-[411px] bg-[#537D5D] m-3 rounded-2xl order-2 lg:order-1'>
                <div className='p-6 lg:p-8'>
                  <div className='text-xl lg:text-[24px] font-semibold mb-2 text-white'>
                    Informasi Kontak
                  </div>
                  <div className='text-base lg:text-[18px] font-normal mb-8 lg:mb-12 text-white'>
                    Gunakan informasi berikut untuk menghubungi kami secara langsung
                  </div>
                  
                  {/* Contact Items */}
                  <div className='space-y-6'>
                    <div className='flex items-center space-x-4 group'>
                      <Phone className='w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200' />
                      <span className='text-lg text-white'>0856-xxxx-xxxx</span>
                    </div>

                    <div className='flex items-center space-x-4 group'>
                      <Mail className='w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200' />
                      <span className='text-lg text-white'>email@desa.id</span>
                    </div>

                    <div className='flex items-center space-x-4 group'>
                      <MessageSquare className='w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200' />
                      <span className='text-lg text-white'>Kirim pesan langsung</span>
                    </div>

                    <div className='flex items-center space-x-4 group'>
                      <MapPin className='w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200' />
                      <span className='text-lg text-white'>Jl. Raya Desa No. 123</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}