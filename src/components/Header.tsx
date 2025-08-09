
'use client';

import { useState, useEffect } from 'react';
import Link from "next/link"

export default function Header() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // USVI is in the Atlantic Time Zone (UTC-4)
      const usviTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/St_Thomas' }));
      const timeString = usviTime.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(timeString);
    };

    // Update immediately
    updateTime();
    
    // Update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="py-4 relative z-50">
      <div className="px-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between sm:px-10">
        <Link href='/' className="font-kiante text-2xl leading-tight tracking-wide uppercase">Blooms Universe</Link>
        <p className="flex items-center gap-1 text-sm sm:text-base font-extrabold leading-7 tracking-wide md:tracking-wider uppercase">{time} <span className="!text-2xl">🇻🇮</span></p>
      </div>
    </header>
  );
}
