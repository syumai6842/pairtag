"use client"
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {

  return (
    <div className={`min-h-screen flex items-center justify-center`} style={{ backgroundColor: 'var(--primary)' }}>
      <img src="img/pairtaglogo.png" alt="Logo" className="h-auto w-72" />
    </div>
  );
}
