import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MUSIC_SRC = '/audio/bg-music-fast.mp3';
const TARGET_VOLUME = 0.35;

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useLayoutEffect(() => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'audio';
    preload.href = MUSIC_SRC;
    preload.type = 'audio/mpeg';
    preload.setAttribute('fetchpriority', 'high');
    document.head.appendChild(preload);

    return () => {
      preload.remove();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    audio.volume = 0;
    audio.muted = false;

    const fadeIn = () => {
      if (audio.dataset.fading === 'true') return;
      audio.dataset.fading = 'true';
      let vol = 0;
      const interval = setInterval(() => {
        vol = Math.min(vol + 0.05, TARGET_VOLUME);
        audio.volume = vol;
        if (vol >= TARGET_VOLUME) clearInterval(interval);
      }, 35);
    };

    const tryStart = () => {
      audio.muted = false;
      audio.volume = 0.01;
      return audio.play().then(fadeIn);
    };

    const startAfterHeaderVideo = () => {
      tryStart().catch(() => {});
    };

    const onFirstGesture = () => {
      tryStart().catch(() => {});
    };

    window.addEventListener('flavorboss:hero-video-started', startAfterHeaderVideo, { once: true });
    const fallbackTimer = window.setTimeout(startAfterHeaderVideo, 700);

    // If the browser blocks sound without a gesture, this starts on the very first interaction.
    const opts = { passive: true } as AddEventListenerOptions;
    document.addEventListener('pointerdown', onFirstGesture, opts);
    document.addEventListener('touchstart', onFirstGesture, opts);
    document.addEventListener('keydown', onFirstGesture, opts);

    return () => {
      window.removeEventListener('flavorboss:hero-video-started', startAfterHeaderVideo);
      window.clearTimeout(fallbackTimer);
      document.removeEventListener('pointerdown', onFirstGesture);
      document.removeEventListener('touchstart', onFirstGesture);
      document.removeEventListener('keydown', onFirstGesture);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.muted = false;
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" autoPlay playsInline />
      <button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-surface-dark flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-primary/30"
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? (
          <VolumeX className="w-5 h-5 text-primary" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary" />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;
