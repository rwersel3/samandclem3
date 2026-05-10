import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sam } from '../animals/Sam';
import { Bird } from '../animals/Bird';
import { Chipmunk } from '../animals/Chipmunk';
import { useAudio } from '../../hooks/useAudio';

interface Page5SamGreetsProps {
  audioEnabled: boolean;
}

export default function Page5SamGreets({ audioEnabled }: Page5SamGreetsProps) {
  const { play, playLoop, stopAll } = useAudio(audioEnabled);

  useEffect(() => {
    playLoop('garden-ambience', 0.15);
    return () => stopAll();
  }, [playLoop, stopAll]);
  const [samWaving, setSamWaving] = useState(false);
  const [showSigh, setShowSigh] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSigh(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          Sam would greet them all and welcome them when they came to the garden. But then they all went their way. And once again, Sam would feel alone. Everyone had a purpose in their life: places to go and things to see.
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
            <Sam x={400} y={360} scale={1} expression="neutral" />
            <motion.line
              x1="420"
              y1="368"
              x2="438"
              y2="363"
              stroke="#a07855"
              strokeWidth="4"
              strokeLinecap="round"
              animate={samWaving ? { rotate: [0, 25, -25, 0] } : {}}
              style={{ transformOrigin: '420px 368px' }}
              transition={{ duration: 0.6 }}
            />
          </g>

          {/* Animals passing by */}
          <motion.g animate={{ x: [0, 400, 800] }} transition={{ duration: 8, repeat: Infinity, repeatDelay: 2 }}>
            <Bird x={100} y={335} scale={1.2} color="#e8a8a8" />
          </motion.g>

          <motion.g animate={{ x: [800, 400, 0] }} transition={{ duration: 10, repeat: Infinity, repeatDelay: 3 }}>
            <Chipmunk x={700} y={355} scale={0.7} />
          </motion.g>
        </svg>

        {/* Interactive Sam */}
        <button
          onClick={() => setSamWaving(true)}
          onAnimationEnd={() => setSamWaving(false)}
          className="absolute left-1/2 top-[75%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <div className="w-20 h-20" />
        </button>

        {/* Sigh animation */}
        {showSigh && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -30] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute left-1/2 top-[70%] transform -translate-x-1/2"
          >
            <p className="text-4xl">😔</p>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Tap Sam to make him wave
        </p>
      </div>
    </div>
  );
}
