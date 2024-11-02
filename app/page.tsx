"use client"
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // ページ読み込み後、自動的に遷移
    const timer = setTimeout(() => {
      router.push("/Entrance");
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div 
      className={`min-h-screen flex items-center justify-center`} 
      style={{ backgroundColor: 'var(--primary)' }}
    >
      <img src="img/pairtaglogo.png" alt="Logo" className="h-auto w-64" />
    </div>
  );
}
