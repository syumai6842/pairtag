"use client"
import { useEffect, useState } from "react";
import { GetLocation, SetLocation } from "../config/firebaseService";
import { motion, AnimatePresence } from "framer-motion";
import "../globals.css";
import Image from "next/image";

function CoodToPosition(lat:number, lng:number):{x:number, y:number} {
  const windowSize = {width:360, height: 672};
  const mapStartPoint:{lat:number, lng:number} = {lat:33.973011, lng:134.363519};
  const mapEndPoint:{lat:number, lng:number} = {lat:33.972478, lng:134.362219};
  const mapSize:{lat:number, lng:number} = {lat:Math.abs(mapStartPoint.lat-mapEndPoint.lat), lng:Math.abs(mapStartPoint.lng-mapEndPoint.lng)};
  const distanceFromStart:{lat:number, lng:number} = {lat:mapStartPoint.lat - lat, lng:lng - mapStartPoint.lng};
  
  const distanceInPixel:{x:number, y:number} = {x:distanceFromStart.lat/mapSize.lat * windowSize.width, y:-(distanceFromStart.lng/mapSize.lng * windowSize.height)};
  console.log(distanceInPixel);
  return distanceInPixel;
}

export default function Hunter() {
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const loc = await GetLocation();
      const coords = loc.map(coord => CoodToPosition(coord.lat, coord.lng));
      setCoordinates(coords);
    };
    fetchCoordinates();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
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
            className="bg-white p-2 rounded-l-full rounded-r-none flex items-center justify-center"
            style={{ 
              width: isMailboxOpen ? '300px' : '150px',
              height: isMailboxOpen ? '1000px' : '65px',
              transition: 'width 0.3s ease, border-radius 0.3s ease',
              borderTopLeftRadius: isMailboxOpen ? '20px' : '32.5px',
              borderBottomLeftRadius: isMailboxOpen ? '20px' : '32.5px'
            }}
          >
            <Image src="/img/mail_black.png" alt="Mailbox" width={65} height={65} />
          </button>
          {isMailboxOpen && (
            <div className="absolute right-0 top-16 bg-white text-black p-4 rounded shadow-lg">
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
      <main className="flex-grow relative flex justify-center items-start pt-4">
        <Image src="/img/map_white.png" alt="Map" width={360} height={0} />
        {coordinates.map((coord) => (
          <div
            key={coord.x+coord.y*10}
            className="absolute bg-blue-500 rounded-full w-4 h-4 border-2 border-white"
            style={{ left: coord.x, top: coord.y }}
          />
        ))}
      </main>
    </div>
  );
}
