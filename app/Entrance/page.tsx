"use client"
import "../globals.css";
import Image from "next/image";

export default function Entrance() {
  return (
    <div
      key="entrance"
      className="min-h-screen flex flex-col items-center justify-center translate-y-[-25vh]"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <span className="font-bold tracking-tighter text-[#2B2B2B] text-[3.25rem] whitespace-nowrap ml-auto mr-16 translate-y-[135px]">ハンター</span>
      <div className="flex items-center mb-6 self-start ml-16">
        <div className="relative">
          <Image
            src="/img/hunter.png"
            alt="Hunter"
            width={80}
            height={80}
            priority
          />
        </div>
      </div>
      <div className="bg-[#2B2B2B] text-white px-24 py-2 mb-48 rounded-3xl">
        <p className="text-4xl font-bold tracking-tighter">選ぶ</p>
      </div>
      <div className="flex items-center w-full whitespace-nowrap mt-[-10vh]">
        <div className="h-[1px] bg-white w-[35vw]"></div>
        <h1 className="text-5xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:0.75px_white] mx-4">役職はどっち？</h1>
        <div className="h-[1px] bg-white w-[35vw]"></div>
      </div>
    </div>
  );
}