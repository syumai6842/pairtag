"use client"
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        window.location.href = '/Entrance';
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center ${fadeOut ? 'fade-out-active' : 'fade-out'}`} style={{ backgroundColor: 'var(--primary)' }}>
      <img src="img/pairtaglogo.png" alt="Logo" className="h-auto w-80" />
    </div>
  );
}
