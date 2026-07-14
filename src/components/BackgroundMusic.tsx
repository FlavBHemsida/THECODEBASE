import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/bg-music.opus`;
const TARGET_VOLUME = 0.35;
const MUTE_STORAGE_KEY = 'fb-music-muted';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(() => sessionStorage.getItem(MUTE_STORAGE_KEY) === 'true');
  const [needsGesture, setNeedsGesture] = useState(false);
  const userMutedRef = useRef(muted);

  useLayoutEffect(() => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'audio';
    preload.href = MUSIC_SRC;
    preload.type = 'audio/ogg';
    preload.setAttribute('fetchpriority', 'high');
    document.head.appendChild(preload);

    return () => {
      preload.remove();
    };
  }, []);

  const fadeIn = (audio: HTMLAudioElement) => {
    if (audio.dataset.fading === 'true') return;
    audio.dataset.fading = 'true';
    let vol = 0;
    const interval = setInterval(() => {
      vol = Math.min(vol + 0.05, TARGET_VOLUME);
      audio.volume = vol;
      if (vol >= TARGET_VOLUME) clearInterval(interval);
    }, 35);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    audio.volume = 0;
    audio.muted = false;

    let started = false;
    const start = () => {
      if (started || userMutedRef.current) return;
      started = true;
      audio.muted = false;
      audio.volume = 0.01;
      audio.play().then(() => fadeIn(audio)).catch(() => {
        started = false;
        setNeedsGesture(true);
      });
    };

    // Try immediately (works if browser allows autoplay), then fall back to
    // the hero video's playing event, then to the very first user interaction.
    start();

    const interactionEvents: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
    interactionEvents.forEach((evt) => window.addEventListener(evt, start, { once: true, passive: true }));
    window.addEventListener('flavorboss:hero-video-started', start, { once: true });

    return () => {
      interactionEvents.forEach((evt) => window.removeEventListener(evt, start));
      window.removeEventListener('flavorboss:hero-video-started', start);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (needsGesture) {
      // Autoplay was blocked — this click is a real user gesture, guaranteed to work.
      audio.muted = false;
      audio.volume = 0.01;
      audio.play().then(() => fadeIn(audio)).catch(() => {});
      setNeedsGesture(false);
      userMutedRef.current = false;
      setMuted(false);
      sessionStorage.setItem(MUTE_STORAGE_KEY, 'false');
      return;
    }

    if (muted) {
      userMutedRef.current = false;
      audio.muted = false;
      setMuted(false);
      sessionStorage.setItem(MUTE_STORAGE_KEY, 'false');
    } else {
      userMutedRef.current = true;
      audio.muted = true;
      setMuted(true);
      sessionStorage.setItem(MUTE_STORAGE_KEY, 'true');
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" playsInline />
      <button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-surface-dark flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-primary/30"
        aria-label={muted || needsGesture ? 'Unmute music' : 'Mute music'}
      >
        {muted || needsGesture ? (
          <VolumeX className="w-5 h-5 text-primary" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary" />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;
