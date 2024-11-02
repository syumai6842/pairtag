"use client"
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        router.push("/Entrance");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isExiting, router]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ y: 0 }} 
          animate={{ y: 0 }} 
          exit={{ y: -1000 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen flex items-center justify-center`} 
          style={{ backgroundColor: 'var(--primary)' }}
          onAnimationComplete={() => setIsExiting(true)}
        >
          <img src="img/pairtaglogo.png" alt="Logo" className="h-auto w-64" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
