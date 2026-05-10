import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { Hoppy } from '../animals/Hoppy';
import { useAudio } from '../../hooks/useAudio';

interface Page10HoppyLeavesProps {
  audioEnabled: boolean;
}

export default function Page10HoppyLeaves({ audioEnabled }: Page10HoppyLeavesProps) {
  const { play } = useAudio(audioEnabled);
  const [waved, setWaved] = useState(false);
  const [hoppyWaving, setHoppyWaving] = useState(false);

  const handleWave = () => {
    setWaved(true);
    setHoppyWaving(true);
    play('footsteps-grass', { volume: 0.4 });
    setTimeout(() => setHoppyWaving(false), 1000);
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
          "Wish I could help you, but I have things to take care of," said Hoppy. And Hoppy hopped away to continue his munching.
        </p>
      </motion.div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <circle cx="650" cy="150" r="45" fill="#f0a8c8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Sam waving */}
          <g>
            <Sam x={200} y={360} scale={1} expression="neutral" />
            <motion.line
              x1="218"
              y1="368"
              x2="235"
              y2="363"
              stroke="#a07855"
              strokeWidth="4"
              strokeLinecap="round"
              animate={waved ? { rotate: [0, 25, -25, 25, 0] } : {}}
              style={{ transformOrigin: '218px 368px' }}
              transition={{ duration: 1 }}
            />
          </g>

          {/* Hoppy hopping away */}
          <motion.g
            animate={waved ? { x: [0, 200, 400, 600] } : { x: 300 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <motion.g
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <Hoppy x={100} y={330} scale={0.7} />
              {hoppyWaving && (
                <motion.line
                  x1="120"
                  y1="338"
                  x2="138"
                  y2="333"
                  stroke="#a07855"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{ rotate: [0, 25, -25, 0] }}
                  style={{ transformOrigin: '120px 338px' }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.g>
          </motion.g>
        </svg>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleWave}
          disabled={waved}
          className="px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #f0d4a8, #e8c590)', fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}
        >
          {waved ? 'Goodbye, Hoppy!' : 'Wave Goodbye'}
        </button>
      </div>
    </div>
  );
}
