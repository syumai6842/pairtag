"use client"
import { motion, AnimatePresence } from 'framer-motion';

export default function Entrance() {
  return (
    <AnimatePresence>
      <motion.div
        key="entrance"
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--primary)' }}
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-white text-4xl">Welcome to the Entrance Page</h1>
      </motion.div>
    </AnimatePresence>
  );
}