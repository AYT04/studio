'use client';
import { GUIDE_START_HOUR, GUIDE_END_HOUR, PIXELS_PER_MINUTE } from '@/data/constants';

export default function TimeBar() {
  const timeSlots = [];
  for (let hour = GUIDE_START_HOUR; hour < GUIDE_END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const date = new Date();
      date.setHours(hour, minute);
      const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      timeSlots.push(timeString);
    }
  }

  const slotWidth = PIXELS_PER_MINUTE * 30;

  return (
    <div className="sticky top-0 z-30 h-10 flex bg-card border-b-2 border-border shadow-md">
      <div className="sticky left-0 z-40 w-48 flex-shrink-0 bg-card border-r border-border"></div>
      <div className="flex">
        {timeSlots.map((time, index) => (
          <div key={index} className="flex-shrink-0 text-sm font-medium text-muted-foreground p-2 border-l border-border" style={{ width: slotWidth }}>
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}
