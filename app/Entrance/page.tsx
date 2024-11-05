"use client"
import "../globals.css";
import Image from "next/image";

export default function Entrance() {
  return (
    <div
      key="entrance"
      className="min-h-[86vh] flex flex-col items-center justify-center py-12 gap-[9vh]"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-end mb-6 justify-center">
          <div className="relative">
            <Image
              src="/img/hunter.png"
              alt="Hunter"
              width={80}
              height={80}
              priority
            />
          </div>
          <span className="tracking-tighter text-[#2B2B2B] text-[3.25rem] whitespace-nowrap ml-4 leading-none">ハンター</span>
        </div>
        <div className="bg-[#2B2B2B] text-white px-24 py-2 rounded-3xl">
          <p className="text-4xl tracking-tighter">選ぶ</p>
        </div>
      </div>

      <div className="flex items-center w-full whitespace-nowrap">
        <div className="h-[1px] bg-white w-[35vw]"></div>
        <h1 className="text-5xl tracking-tighter text-transparent [-webkit-text-stroke:0.75px_white] mx-4">役職はどっち？</h1>
        <div className="h-[1px] bg-white w-[35vw]"></div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-end mb-6 justify-center gap-[4vw]">
          <span className="tracking-tighter text-[#FFFFFF] text-[3.25rem] whitespace-nowrap leading-none">逃走者</span>
          <div className="relative">
            <Image
              src="/img/tousousya.png"
              alt="Tousousya"
              width={135}
              height={135}
              priority
            />
          </div>
        </div>
        <div className="bg-[#FFFFFF] text-[#2B2B2B] px-24 py-2 rounded-3xl">
          <p className="text-4xl tracking-tighter">選ぶ</p>
        </div>
      </div>
    </div>
  );
}