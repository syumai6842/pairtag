"use client"
import { useEffect, useState } from "react";
import "../globals.css";
import Image from "next/image";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useRouter } from "next/navigation";
import { SetLocation } from "../config/firebaseService";

const MISSIONS = [
  { id: 1, position: { left: 80, top: 510 }, reward: "ハンターが5秒間叫ぶ" },
  { id: 2, position: { left: 190, top: 550 }, reward: "捕まった逃走者が1組解放" },
  { id: 3, position: { left: 130, top: 120 }, reward: "ハンターが15秒間拘束" },
];

const MAILBOX_STYLES = {
  closed: { width: '150px', height: '65px', borderRadius: '32.5px 0 0 32.5px' },
  open: { width: '300px', height: '1000px', borderRadius: '20px 0 0 20px' },
};

export default function Tousousya() {
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isMailClosing, setIsMailClosing] = useState(false);
  const [missions, setMissions] = useState<boolean[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    onSnapshot(collection(db,"mission"), (snapshot) => {
      const m = snapshot.docs.sort((a, b) => parseInt(a.id) - parseInt(b.id)).map(doc => doc.data().isCleared);
      setMissions(m);
    });

    onSnapshot(collection(db,"message"), (snapshot) => {
      const m = snapshot.docs.map(doc => doc.data().text);
      setMessages(m);
    });

    const timer2 = setTimeout(() => {
        setInterval(() => {
          if(missions.every(mission => mission === false)){
            SetLocation();
          }
        }, 60000); // 1分 = 60000ms
    }, 120000); // 2分 = 120000ms

    // ページに入って10分経ったら/GameEndに遷移する
    const timer = setTimeout(() => {
      router.push('/GameEnd');
    }, 600000); // 10分 = 600000ms

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2);
    };
  }, []);

  const handleMainClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
      setTimeout(() => {
        setSelectedLocation(null);
        setIsClosing(false);
      }, 300);
    }
  };

  const handleMailboxToggle = () => {
    if (isMailboxOpen) {
      setIsMailClosing(true);
      setTimeout(() => {
        setIsMailboxOpen(false);
        setIsMailClosing(false);
      }, 500);
    } else {
      setIsMailboxOpen(true);
      setIsClosing(true);
      setTimeout(() => {
        setSelectedLocation(null);
        setIsClosing(false);
      }, 300);
    }
  };

  const LocationMarker = ({ mission, onClick }: { mission: typeof MISSIONS[0], onClick: () => void }) => (
    <div 
      onClick={onClick}
      className="absolute cursor-pointer"
      style={{ left: mission.position.left, top: mission.position.top }}
    >
      <Image
        src="/img/location_orange.png"
        alt={`Location ${mission.id}`}
        width={30}
        height={30}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );

  const MissionDetails = ({ missionId }: { missionId: number }) => {
    const mission = MISSIONS.find(m => m.id === missionId);
    if (!mission) return null;

    return (
      <>
        <h2 className="text-2xl font-bold">ミッション {mission.id}</h2>
        <div className="flex items-center mt-5 ml-4">
          <Image
            src="/img/reward.png"
            alt="Reward"
            width={35}
            height={35}
            className="mr-2"
          />
          <p className="text-2xl">{mission.reward}</p>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--foreground)' }}>
      {(isMailboxOpen || isMailClosing) && (
        <div 
          className="fixed top-20" 
          style={{ 
            fontSize: '120px', 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: '#D07320',
            animation: isMailClosing 
              ? 'slideOutToTop 0.5s ease-out forwards'
              : 'slideInFromTop 0.5s ease-out'
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
            onClick={handleMailboxToggle}
            className="bg-[#2B2B2B] p-2 rounded-l-full rounded-r-none flex items-center justify-center relative"
            style={{ 
              ...isMailboxOpen ? MAILBOX_STYLES.open : MAILBOX_STYLES.closed,
              transition: 'all 0.3s ease',
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
                  {messages.map((message)=>(
                    <li key={Math.random()} className="text-2xl hover:text-gray-600 cursor-pointer flex items-center">
                      <div className="w-4 h-4 bg-[#D07320] mr-3"></div>
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
        <Image 
          src="/img/map_black.png" 
          alt="Map" 
          width={360} 
          height={360} 
          onClick={(e) => {
            e.stopPropagation();
            handleMainClick(e);
          }}
        />

        {/* Location markers */}
        {MISSIONS.map(mission => (
          <LocationMarker
            key={mission.id}
            mission={mission}
            onClick={() => setSelectedLocation(mission.id)}
          />
        ))}

        {selectedLocation && (
          <div 
            className="fixed bottom-0 left-0 right-0 bg-[#2B2B2B] h-36 text-white px-6 pt-4 rounded-t-[20px]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosing 
                ? 'slideDown 0.3s ease-out forwards'
                : 'slideUp 0.3s ease-out',
            }}
          >
            {missions[selectedLocation - 1] && (
              <Image
                src="/img/missionclear.png"
                alt="Mission Cleared"
                width={200}
                height={0}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 top-5"
              />
            )}
            <MissionDetails missionId={selectedLocation} />
          </div>
        )}
      </main>
    </div>
  );
}
