"use client"
import { useState } from "react";
import "../globals.css";
import Image from "next/image";

const coordinates = [
  { id: 1, x: 100, y: 150 },
  { id: 2, x: 200, y: 250 },
  { id: 3, x: 300, y: 350 },
];

export default function Hunter() {
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {isMailboxOpen && (
        <div 
          className="fixed top-20" 
          style={{ 
            fontSize: '120px', 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: '#5EA4BF'
          }}
        >
          mail
        </div>
      )}
      
      <header className="flex justify-between items-start py-12 pl-4 text-white">
        <div 
          className="flex flex-col items-baseline"
          style={{
            transform: isMailboxOpen ? 'translateX(-200px)' : 'translateX(0)',
            transition: 'transform 0.3s ease'
          }}
        >
          <h1 className="text-1xl font-bold">あなたは</h1>
          <h1 className="text-5xl font-bold pl-4">ハンター</h1>
        </div>
        <div className="relative pt-2">
          <button
            onClick={() => setIsMailboxOpen(!isMailboxOpen)}
            className="bg-white p-2 rounded-l-full rounded-r-none flex items-center justify-center relative"
            style={{ 
              width: isMailboxOpen ? '300px' : '150px',
              height: isMailboxOpen ? '1000px' : '65px',
              transition: 'width 0.3s ease, border-radius 0.3s ease',
              borderTopLeftRadius: isMailboxOpen ? '20px' : '32.5px',
              borderBottomLeftRadius: isMailboxOpen ? '20px' : '32.5px'
            }}
          >
            <Image 
              src="/img/mail_black.png" 
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
              <div className="absolute left-0 top-16 text-black p-8">
                <h2 className="text-3xl font-bold mb-6 -ml-1">受信メール</h2>
                <ul className="space-y-4">
                  <li className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                    <div className="w-4 h-4 bg-[#5EA4BF] mr-3"></div>
                    メール1
                  </li>
                  <li className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                    <div className="w-4 h-4 bg-[#5EA4BF] mr-3"></div>
                    メール2
                  </li>
                  <li className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                    <div className="w-4 h-4 bg-[#5EA4BF] mr-3"></div>
                    メール3
                  </li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </header>
      <main className="flex-grow relative flex justify-center items-start pt-4">
        <Image src="/img/map_white.png" alt="Map" width={360} height={360} />
        {coordinates.map((coord) => (
          <div
            key={coord.id}
            className="absolute bg-blue-500 rounded-full w-4 h-4 border-2 border-white"
            style={{ left: coord.x, top: coord.y }}
          />
        ))}
      </main>
    </div>
  );
}
