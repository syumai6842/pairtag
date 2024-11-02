"use client"
import { motion, AnimatePresence } from 'framer-motion';
import "../globals.css";

export default function Entrance() {
  return (
    <AnimatePresence>
      <motion.div
        key="entrance"
        className="min-h-screen flex flex-col items-center justify-center translate-y-[-2vh]"
        style={{ backgroundColor: 'var(--primary)' }}
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-[#2B2B2B] text-white px-24 py-3 mb-8 rounded-3xl">
          <p className="text-4xl font-bold tracking-tighter">選ぶ</p>
        </div>
        <div className="flex items-center w-full whitespace-nowrap">
          <div className="h-[1px] bg-white w-[35vw]"></div>
          <h1 className="text-5xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:0.75px_white] mx-4">役職はどっち？</h1>
          <div className="h-[1px] bg-white w-[35vw]"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}