import { useRef, useCallback, useEffect } from 'react';

type SoundName =
  | 'garden-ambience'
  | 'morning-birds'
  | 'robin-song'
  | 'bird-chirp'
  | 'bird-chirp-2'
  | 'page-turn'
  | 'collect-chime'
  | 'success-chime'
  | 'cat-meow'
  | 'leaves-rustle'
  | 'whistle';

const MAX_PLAY_SECONDS = 3;

const audioCache = new Map<string, HTMLAudioElement>();

function getAudio(name: SoundName): HTMLAudioElement {
  if (!audioCache.has(name)) {
    const audio = new Audio(`/audio/${name}.mp3`);
    audio.preload = 'auto';
    audioCache.set(name, audio);
  }
  return audioCache.get(name)!;
}

export function useAudio(enabled: boolean) {
  const loopingRef = useRef<HTMLAudioElement[]>([]);

  const play = useCallback((name: SoundName, options?: { volume?: number; loop?: boolean }) => {
    if (!enabled) return;
    const audio = getAudio(name);
    const clone = audio.cloneNode(true) as HTMLAudioElement;
    clone.volume = options?.volume ?? 0.5;
    clone.loop = options?.loop ?? false;
    clone.play().catch(() => {});
    if (options?.loop) {
      loopingRef.current.push(clone);
    } else {
      setTimeout(() => { clone.pause(); clone.currentTime = 0; }, MAX_PLAY_SECONDS * 1000);
    }
    return clone;
  }, [enabled]);

  const playLoop = useCallback((name: SoundName, volume = 0.3) => {
    return play(name, { volume, loop: true });
  }, [play]);

  const stopAll = useCallback(() => {
    loopingRef.current.forEach(a => {
      a.pause();
      a.currentTime = 0;
    });
    loopingRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      loopingRef.current.forEach(a => {
        a.pause();
        a.currentTime = 0;
      });
      loopingRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      loopingRef.current.forEach(a => a.pause());
    } else {
      loopingRef.current.forEach(a => a.play().catch(() => {}));
    }
  }, [enabled]);

  return { play, playLoop, stopAll };
}
