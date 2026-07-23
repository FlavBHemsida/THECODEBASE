import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MUSIC_SRC = '/audio/bg-music.opus';
const TARGET_VOLUME = 0.35;
const MUTE_STORAGE_KEY = 'fb-music-muted';
const INACTIVITY_MUTE_MS = 15000;

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(() => sessionStorage.getItem(MUTE_STORAGE_KEY) === 'true');
  const [needsGesture, setNeedsGesture] = useState(false);
  const userMutedRef = useRef(muted);
  const scheduleAutoMuteRef = useRef<() => void>(() => {});

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

    // Mobile browsers (esp. iOS/Android Chrome) keep <audio> playing when the tab
    // is backgrounded or the screen is locked. Pause on hide, resume on return.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.dataset.wasPlaying = 'true';
          audio.pause();
        }
      } else if (audio.dataset.wasPlaying === 'true' && !userMutedRef.current) {
        delete audio.dataset.wasPlaying;
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Auto-mute after 15s of no scroll/touch/click/key activity so the music
    // doesn't play on unattended forever. This only mutes (not pauses) and only
    // sets React state — it never touches sessionStorage, so it's not treated
    // as a real user preference and won't survive a refresh. The mute button
    // reflects it immediately so the visitor can see why it's silent and undo it.
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleAutoMute = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!audio.muted) {
          audio.muted = true;
          setMuted(true);
        }
      }, INACTIVITY_MUTE_MS);
    };
    scheduleAutoMuteRef.current = scheduleAutoMute;

    const handleActivity = () => {
      // Once silenced (by the user or by this same timer), leave it alone —
      // only the button un-silences it. Otherwise every scroll would restart
      // the clock and it would never actually go quiet.
      if (audio.muted) return;
      scheduleAutoMute();
    };
    const activityEvents: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown', 'mousemove'];
    activityEvents.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));
    scheduleAutoMute();

    return () => {
      interactionEvents.forEach((evt) => window.removeEventListener(evt, start));
      window.removeEventListener('flavorboss:hero-video-started', start);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      activityEvents.forEach((evt) => window.removeEventListener(evt, handleActivity));
      if (inactivityTimer) clearTimeout(inactivityTimer);
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
      scheduleAutoMuteRef.current();
      return;
    }

    if (muted) {
      userMutedRef.current = false;
      audio.muted = false;
      // Some mobile browsers silently pause a muted <audio> element in the
      // background. Re-calling play() (without touching currentTime) guarantees
      // playback actually resumes from where it was instead of staying paused.
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      setMuted(false);
      sessionStorage.setItem(MUTE_STORAGE_KEY, 'false');
      scheduleAutoMuteRef.current();
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
