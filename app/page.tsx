"use client"
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 500);

    const routeTimer = setTimeout(() => {
      router.push("/Entrance");
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(routeTimer);
    };
  }, [router]);

  return (
    <div 
      className={`min-h-screen flex items-center justify-center`} 
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <img 
        src="img/pairtaglogo.png" 
        alt="Logo" 
        className="h-auto w-64" 
        style={{
          opacity: opacity,
          transition: 'opacity 1s ease-out'
        }}
      />
    </div>
  );
}
