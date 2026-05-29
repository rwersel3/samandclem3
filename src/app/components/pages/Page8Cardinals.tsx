import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Cardinal } from '../animals/Cardinal';
import { useAudio } from '../../hooks/useAudio';

interface Page8CardinalsProps {
  audioEnabled: boolean;
  onComplete: () => void;
}

export default function Page8Cardinals({ audioEnabled, onComplete }: Page8CardinalsProps) {
  const { play, playLoop, stopAll } = useAudio(audioEnabled);

  useEffect(() => {
    playLoop('robin-song', 0.2);
    return () => stopAll();
  }, [playLoop, stopAll]);
  const [twigsPlaced, setTwigsPlaced] = useState<number[]>([]);
  const twigPositions = [
    { id: 1, startX: 15, startY: 75 },
    { id: 2, startX: 25, startY: 80 },
    { id: 3, startX: 75, startY: 78 },
    { id: 4, startX: 85, startY: 73 },
    { id: 5, startX: 50, startY: 85 },
  ];

  const placeTwig = (id: number) => {
    if (!twigsPlaced.includes(id)) {
      play('collect-chime', { volume: 0.05 });
      const newPlaced = [...twigsPlaced, id];
      setTwigsPlaced(newPlaced);
      if (newPlaced.length === 5) {
        play('success-chime', { volume: 0.08 });
        setTimeout(onComplete, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          Then he saw Mr. and Mrs. Cardinal. He greeted them: "Hi there! Will you be my friend?" The Cardinals replied, "Sure, we'll be your friend, but not now. We only have time to build a nest for our family."
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Help build the nest! ({twigsPlaced.length}/5 twigs)
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Tree branch */}
          <path d="M 300 150 Q 400 180 500 150" stroke="#6a5a3a" strokeWidth="15" fill="none" />

          {/* Cardinals */}
          <motion.g animate={{ x: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
            <Cardinal x={350} y={135} scale={1.2} facing="right" />
          </motion.g>

          <motion.g animate={{ x: [5, -5, 5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
            <Cardinal x={450} y={140} scale={1.2} facing="left" />
          </motion.g>

          {/* Nest being built */}
          {twigsPlaced.length > 0 && (
            <g>
              <ellipse cx="400" cy="165" rx={25 + twigsPlaced.length * 5} ry={15 + twigsPlaced.length * 3} fill="#8a6845" opacity="0.6" />
              {twigsPlaced.map((_, i) => (
                <motion.line
                  key={i}
                  x1={390 + i * 5}
                  y1={160}
                  x2={405 + i * 3}
                  y2={170}
                  stroke="#6a5a3a"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ))}
            </g>
          )}

          {/* Baby birds appear when complete */}
          {twigsPlaced.length === 5 && (
            <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
              <circle cx="395" cy="165" r="4" fill="#f0d4a8" />
              <circle cx="405" cy="165" r="4" fill="#f0d4a8" />
              <text x="400" y="190" textAnchor="middle" fontSize="20">🐣🐣</text>
            </motion.g>
          )}
        </svg>

        {/* Twigs to collect */}
        {twigPositions.map((twig) => (
          !twigsPlaced.includes(twig.id) && (
            <motion.button
              key={twig.id}
              onClick={() => placeTwig(twig.id)}
              className="absolute cursor-grab hover:scale-125 transition-transform"
              style={{ left: `${twig.startX}%`, top: `${twig.startY}%` }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="40" height="10" viewBox="0 0 40 10">
                <line x1="0" y1="5" x2="40" y2="5" stroke="#6a5a3a" strokeWidth="4" />
              </svg>
            </motion.button>
          )
        ))}

        {twigsPlaced.length === 5 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg"
            style={{ background: 'rgba(255, 255, 255, 0.95)' }}
          >
            <p className="text-xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
              Peep peep! Nest complete! 🪺
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
