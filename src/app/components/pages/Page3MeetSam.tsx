import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sam } from '../animals/Sam';
import { useAudio } from '../../hooks/useAudio';

interface Page3MeetSamProps {
  audioEnabled: boolean;
  onComplete: () => void;
}

export default function Page3MeetSam({ audioEnabled, onComplete }: Page3MeetSamProps) {
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const { play, playLoop, stopAll } = useAudio(audioEnabled);

  useEffect(() => {
    playLoop('morning-birds', 0.15);
    return () => stopAll();
  }, [playLoop, stopAll]);
  const snacks = [
    { id: 1, type: 'acorn', x: 15, y: 60 },
    { id: 2, type: 'acorn', x: 75, y: 45 },
    { id: 3, type: 'acorn', x: 85, y: 75 },
    { id: 4, type: 'seed', x: 25, y: 35 },
    { id: 5, type: 'seed', x: 60, y: 70 },
  ];

  const collectSnack = (id: number) => {
    if (!foundItems.includes(id)) {
      play('collect-chime', { volume: 0.15 });
      setFoundItems([...foundItems, id]);
      if (foundItems.length + 1 === snacks.length) {
        play('success-chime', { volume: 0.2 });
        setTimeout(onComplete, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-4 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          Once upon a time, there was a lonely field mouse that lived in a beautiful flower garden. He lived in a small hollow and ate nuts and seeds. He was content, but he was lonely. Who would make friends with a field mouse?
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Help Sam find his snacks! ({foundItems.length}/{snacks.length})
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        {/* Garden scene */}
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Background flowers */}
          <circle cx="100" cy="150" r="40" fill="#e89fc8" opacity="0.6" />
          <circle cx="700" cy="180" r="35" fill="#f0a8c8" opacity="0.6" />
          <circle cx="600" cy="100" r="45" fill="#c8a8e8" opacity="0.5" />

          {/* Sam's hollow */}
          <ellipse cx="400" cy="420" rx="80" ry="40" fill="#6a5a3a" />
          <ellipse cx="400" cy="410" rx="50" ry="30" fill="#3a2a1a" />

          {/* Sam peeking out */}
          <motion.g animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Sam x={400} y={360} scale={0.9} expression="happy" />
          </motion.g>

          {/* Grass and flowers */}
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />
          <circle cx="150" cy="440" r="15" fill="#f0a8c8" />
          <circle cx="650" cy="430" r="18" fill="#e89fc8" />
        </svg>

        {/* Snacks to find */}
        {snacks.map((snack) => (
          !foundItems.includes(snack.id) && (
            <motion.button
              key={snack.id}
              onClick={() => collectSnack(snack.id)}
              className="absolute cursor-pointer hover:scale-125 transition-transform"
              style={{ left: `${snack.x}%`, top: `${snack.y}%` }}
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.8 }}
            >
              {snack.type === 'acorn' ? (
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <ellipse cx="15" cy="20" rx="7" ry="9" fill="#8a6845" />
                  <path d="M8 15 Q15 10 22 15 L22 18 Q15 13 8 18 Z" fill="#6a5a3a" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <ellipse cx="10" cy="10" rx="4" ry="6" fill="#d4a574" />
                </svg>
              )}
            </motion.button>
          )
        ))}
      </div>

      {foundItems.length === snacks.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-8 py-4 rounded-3xl shadow-2xl"
          style={{ background: 'rgba(240, 212, 168, 0.95)' }}
        >
          <p className="text-3xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
            Nom nom! All found! 🌰
          </p>
        </motion.div>
      )}
    </div>
  );
}
