import React, { useState } from 'react';

const KontakPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReopen = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <div className=" bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center">
        <button
          onClick={handleReopen}
          className="bg-[#537D5D] cursor-pointer text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Kirim Pesan
        </button>
      </div>
    );
  }

  return (
    <div className="absolute z-10 min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        {/* Pop-up Container */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center relative ">
          {/* Happy Emojis */}
          <div className="flex justify-center items-center mb-6 space-x-4">
            <img
              src="/storage/popup/emoji.png"
              alt="Happy emojis"
              className="w-64 h-28 object-contain drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Terima kasih!
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.
          </p>

          {/* Button */}
          <button
            onClick={handleClose}
            className="cursor-pointer bg-[#537D5D] w-40 h-12 text-white px-8 py-3 rounded-4xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  );
};

export default KontakPopup;
