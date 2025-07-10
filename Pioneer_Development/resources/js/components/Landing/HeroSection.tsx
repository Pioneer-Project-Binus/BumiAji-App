import React from 'react';
import logo from "@/assets/AMAZING.png";

interface HeroSectionProps {
  profile: {
    name?: string;
    description?: string;
    history?: string;
  };
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <div className="min-h-screen shadow-2xl w-full">
      <div className="pt-32 pl-10 tablet:pt-40 tablet:pl-20 desktop:pt-[230px] desktop:pl-[92px]">
        <div className="w-[574px] h-[192px] pt-2 text-[64px] font-extrabold leading-none">
          <div className="text-black">AMAZING</div>
          <div className="text-[#295740]">BUMIAJI</div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center p-4 tablet:p-8 desktop:p-12">
        <div className="text-[28px] tablet:text-[36px] desktop:text-[48px] font-bold text-[#295740] mb-4">
          Tentang Desa
        </div>
        <div
          className="text-base tablet:text-lg desktop:text-2xl text-gray-700 leading-relaxed max-w-[890px]"
          dangerouslySetInnerHTML={{ __html: profile?.history || 'Deskripsi desa belum tersedia.' }}
        />
      </div>
    </div>
  );
}