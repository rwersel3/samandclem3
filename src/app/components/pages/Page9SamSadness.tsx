import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sam } from '../animals/Sam';
import { Hoppy } from '../animals/Hoppy';
import { useAudio } from '../../hooks/useAudio';

interface Page9SamSadnessProps {
  audioEnabled: boolean;
}

export default function Page9SamSadness({ audioEnabled }: Page9SamSadnessProps) {
  const { playLoop, stopAll } = useAudio(audioEnabled);

  useEffect(() => {
    playLoop('garden-ambience', 0.1);
    return () => stopAll();
  }, [playLoop, stopAll]);
  const [showThought, setShowThought] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          As Hoppy was munching, he looked at Sam and said, "Why are you so quiet?" Sam replied, "I love living in this beautiful garden, but I have no friends to enjoy it with."
        </p>
      </motion.div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene with flowers */}
          <circle cx="120" cy="140" r="45" fill="#e89fc8" opacity="0.6" />
          <circle cx="680" cy="160" r="50" fill="#f0a8c8" opacity="0.6" />
          <circle cx="400" cy="120" r="40" fill="#c8a8e8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Hoppy munching */}
          <motion.g
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <Hoppy x={550} y={340} scale={0.8} munching={true} />
          </motion.g>

          {/* Greenery */}
          <path d="M510 400 L515 360 M520 400 L525 355 M530 400 L535 365 M540 400 L545 360" stroke="#6a8a5a" strokeWidth="5" strokeLinecap="round" />

          {/* Sam looking sad */}
          <motion.g
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sam x={250} y={360} scale={1} expression="sad" />
          </motion.g>
        </svg>

        {/* Interactive Sam */}
        <button
          onClick={() => setShowThought(!showThought)}
          className="absolute left-[31%] top-[75%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <div className="w-20 h-20" />
        </button>

        {/* Thought bubble */}
        {showThought && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-[25%] top-[50%] transform -translate-x-1/2 px-6 py-4 rounded-3xl shadow-xl"
            style={{ background: 'rgba(255, 255, 255, 0.95)', border: '3px dashed #c8daa8' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌸</span>
              <span className="text-3xl">❓</span>
              <span className="text-3xl">😔</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Tap Sam to see his thoughts
        </p>
      </div>
    </div>
  );
}
