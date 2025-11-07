'use client';
import { useState, useEffect } from 'react';
import { GUIDE_START_HOUR, PIXELS_PER_MINUTE } from '@/data/constants';

export default function CurrentTimeIndicator() {
  const [position, setPosition] = useState(-1);

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const guideStartMinutes = GUIDE_START_HOUR * 60;
      const minutesFromStart = currentMinutes - guideStartMinutes;
      setPosition(minutesFromStart * PIXELS_PER_MINUTE);
    };

    updatePosition();
    const interval = setInterval(updatePosition, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (position < 0) return null;

  return (
    <div className="absolute top-0 bottom-0 z-30 pointer-events-none" style={{ left: `${position}px` }}>
      <div className="w-0.5 h-full bg-primary/80"></div>
      <div className="absolute -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background"></div>
    </div>
  );
}
