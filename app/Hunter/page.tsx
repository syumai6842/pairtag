"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <header className="flex justify-between items-center py-4 pl-4 text-white">
        <h1 className="text-2xl font-bold">あなたはハンター</h1>
        <div className="relative">
          <button
            onClick={() => setIsMailboxOpen(!isMailboxOpen)}
            className="bg-white p-2 rounded-l-full rounded-r-none"
            style={{ width: '120px', height: '80px' }}
          >
            <Image src="/img/mail_black.png" alt="Mailbox" width={40} height={40} />
          </button>
          {isMailboxOpen && (
            <div className="absolute right-0 top-12 bg-white text-black p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-2">メール一覧</h2>
              <ul>
                <li>メール1</li>
                <li>メール2</li>
                <li>メール3</li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <main className="flex-grow relative flex justify-center items-center">
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
