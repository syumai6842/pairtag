"use client"
import { useState } from "react";
import "../globals.css";
import Image from "next/image";

export default function Tousousya() {
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--foreground)' }}>
      {isMailboxOpen && (
        <div 
          className="fixed top-20" 
          style={{ 
            fontSize: '120px', 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: '#D07320'
          }}
        >
          mail
        </div>
      )}
      
      <header className="flex justify-between items-start py-8 pl-8 text-[#2B2B2B]">
        <div 
          className="flex flex-col items-baseline"
          style={{
            transform: isMailboxOpen ? 'translateX(-200px)' : 'translateX(0)',
            transition: 'transform 0.3s ease'
          }}
        >
          <h1 className="text-2xl font-bold">あなたは</h1>
          <h1 className="text-6xl font-bold pl-4">逃走者</h1>
        </div>
        <div className="relative pt-8">
          <button
            onClick={() => setIsMailboxOpen(!isMailboxOpen)}
            className="bg-[#2B2B2B] p-2 rounded-l-full rounded-r-none flex items-center justify-center relative"
            style={{ 
              width: isMailboxOpen ? '300px' : '150px',
              height: isMailboxOpen ? '1000px' : '65px',
              transition: 'width 0.3s ease, border-radius 0.3s ease',
              borderTopLeftRadius: isMailboxOpen ? '20px' : '32.5px',
              borderBottomLeftRadius: isMailboxOpen ? '20px' : '32.5px'
            }}
          >
            <Image 
              src="/img/mail_white.png" 
              alt="Mailbox" 
              width={65} 
              height={65}
              style={{
                position: isMailboxOpen ? 'absolute' : 'static',
                top: isMailboxOpen ? '10px' : 'auto',
                left: isMailboxOpen ? '10px' : 'auto'
              }}
            />
            {isMailboxOpen && (
              <div className="absolute left-0 top-16 text-white p-8">
                <h2 className="text-3xl font-bold mb-6 -ml-1">受信メール</h2>
                <ul className="space-y-4">
                  <li className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                    <div className="w-4 h-4 bg-[#D07320] mr-3"></div>
                    メール1
                  </li>
                  <li className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                    <div className="w-4 h-4 bg-[#D07320] mr-3"></div>
                    メール2
                  </li>
                  <li className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                    <div className="w-4 h-4 bg-[#D07320] mr-3"></div>
                    メール3
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </header>
      <main 
        className="flex-grow relative flex justify-center items-start pt-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedLocation(null);
          }
        }}
      >
        <Image 
          src="/img/map_black.png" 
          alt="Map" 
          width={360} 
          height={360} 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLocation(null);
          }}
        />
        
        {/* Location 1 */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLocation(1);
          }}
          className="absolute cursor-pointer"
          style={{ left: 80, top: 510 }}
        >
          <Image
            src="/img/location_orange.png"
            alt="Location 1"
            width={30}
            height={30}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Location 2 */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLocation(2);
          }}
          className="absolute cursor-pointer"
          style={{ left: 190, top: 550 }}
        >
          <Image
            src="/img/location_orange.png"
            alt="Location 2"
            width={30}
            height={30}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Location 3 */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLocation(3);
          }}
          className="absolute cursor-pointer"
          style={{ left: 130, top: 120 }}
        >
          <Image
            src="/img/location_orange.png"
            alt="Location 3"
            width={30}
            height={30}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* 画面下部に詳細ボックスを表示 */}
        {selectedLocation && (
          <div 
            className="fixed bottom-0 left-0 right-0 bg-[#2B2B2B] h-40 text-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold">ミッション</h2>
          </div>
        )}
      </main>
    </div>
  );
}
