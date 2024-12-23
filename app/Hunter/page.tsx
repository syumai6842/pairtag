"use client"
import { useEffect, useState } from "react";
import "../globals.css";
import Image from "next/image";
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

const MAILBOX_STYLES = {
  closed: { width: '150px', height: '65px', borderRadius: '32.5px 0 0 32.5px' },
  open: { width: '300px', height: '1000px', borderRadius: '20px 0 0 20px' },
};

function CoodToPosition(lat:number, lng:number):{x:number, y:number} {
  const windowSize = {width:360, height: 672};
  const mapStartPoint:{lat:number, lng:number} = {lat:33.973011, lng:134.363519};
  const mapEndPoint:{lat:number, lng:number} = {lat:33.972478, lng:134.362219};
  const mapSize:{lat:number, lng:number} = {lat:Math.abs(mapStartPoint.lat-mapEndPoint.lat), lng:Math.abs(mapStartPoint.lng-mapEndPoint.lng)};
  const distanceFromStart:{lat:number, lng:number} = {lat:mapStartPoint.lat - lat, lng:lng - mapStartPoint.lng};
  
  const distanceInPixel:{x:number, y:number} = {x:distanceFromStart.lat/mapSize.lat * windowSize.width, y:-(distanceFromStart.lng/mapSize.lng * windowSize.height)};
  return distanceInPixel;
}

export default function Hunter() {
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [isMailClosing, setIsMailClosing] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<{x: number, y: number}[]>([]);
  const router = useRouter(); // useRouterをここで呼び出し

  const handleMailboxToggle = () => {
    if (isMailboxOpen) {
      setIsMailClosing(true);
      setTimeout(() => {
        setIsMailboxOpen(false);
        setIsMailClosing(false);
      }, 500);
    } else {
      setIsMailboxOpen(true);
    }
  };

  const handleMainClick = () => {
    if (isMailboxOpen) {
      handleMailboxToggle();
    }
  };

  useEffect(() => {

    onSnapshot(collection(db,"message"), (snapshot) => {
      const m = snapshot.docs.map(doc => doc.data().text);
      setMessages(m);
    });

    onSnapshot(collection(db,"locations"), (snapshot) => {
      const loc = snapshot.docs.map(doc => doc.data());
      const coords = loc.map(coord => CoodToPosition(coord.lat, coord.lng));
      setCoordinates(coords);
    });

    const timer = setTimeout(() => {
      router.push('/GameEnd'); // useRouterをここで使用
    }, 600000); //

    return () => {clearTimeout(timer)}
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {(isMailboxOpen || isMailClosing) && (
        <div 
          className="fixed top-20" 
          style={{ 
            fontSize: '120px', 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: '#5EA4BF',
            animation: isMailClosing 
              ? 'slideOutToTop 0.5s ease-out forwards'
              : 'slideInFromTop 0.5s ease-out'
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
            onClick={handleMailboxToggle}
            className="bg-white p-2 rounded-l-full rounded-r-none flex items-center justify-center relative"
            style={{ 
              ...isMailboxOpen ? MAILBOX_STYLES.open : MAILBOX_STYLES.closed,
              transition: 'all 0.3s ease',
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
              <div className="absolute left-0 top-16 text-[#2B2B2B] p-8">
                <h2 className="text-3xl font-bold mb-6 -ml-1">受信メール</h2>
                <ul className="space-y-4">
                  {messages.map((message)=>(
                    <li key={Math.random()} className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                      <div className="w-4 h-4 bg-[#5EA4BF] mr-3"></div>
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        </div>
      </header>
      <main 
        className="flex-grow relative flex justify-center items-start pt-4"
        onClick={handleMainClick}
      >
        <Image src="/img/map_white.png" alt="Map" width={360} height={0} />
        {coordinates.map((coord) => (
          <Image
            key={coord.x+coord.y*10}
            src="/img/location_blue.png"
            alt="Location marker"
            width={24}
            height={24}
            className="absolute"
            style={{ 
              left: coord.x,
              top: coord.y
            }}
          />
        ))}
      </main>
    </div>
  );
}
