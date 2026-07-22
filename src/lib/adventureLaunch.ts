import { useEffect, useState } from 'react';

// Launch date — bump this when you want to shift the countdown.
export const ADVENTURE_LAUNCH_DATE = new Date('2026-07-22T12:00:00+02:00');

export const isAdventureLive = () => Date.now() >= ADVENTURE_LAUNCH_DATE.getTime();

// Route to send "Vårt Äventyr" links to: the coming-soon countdown page
// before launch, the real journey page once the timer has finished.
export const useAdventurePath = () => {
  const [live, setLive] = useState(isAdventureLive);

  useEffect(() => {
    if (live) return;
    const id = window.setInterval(() => setLive(isAdventureLive()), 1000);
    return () => window.clearInterval(id);
  }, [live]);

  return live ? '/var-resa' : '/aventyr-snart';
};
