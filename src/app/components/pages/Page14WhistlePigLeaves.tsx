import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { WhistlePig } from '../animals/WhistlePig';
import { useAudio } from '../../hooks/useAudio';

interface Page14WhistlePigLeavesProps {
  audioEnabled: boolean;
}

export default function Page14WhistlePigLeaves({ audioEnabled }: Page14WhistlePigLeavesProps) {
  const [whistled, setWhistled] = useState(false);
  const { play } = useAudio(audioEnabled);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          The animal answered, "My name is Whistle Pig. My home is in the wooded areas. If you see my kid, tell him his dad is looking for him!" Sam was disappointed. Whistle Pig could've been his friend.
        </p>
      </motion.div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden transitioning to woods */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Trees in background */}
          <rect x="650" y="100" width="30" height="350" fill="#6a5a3a" />
          <ellipse cx="665" cy="90" rx="60" ry="80" fill="#5a7a4a" opacity="0.7" />
          <rect x="720" y="120" width="25" height="330" fill="#6a5a3a" />
          <ellipse cx="732" cy="110" rx="50" ry="70" fill="#5a7a4a" opacity="0.7" />

          {/* Sam */}
          <Sam x={200} y={360} scale={1} expression="sad" />

          {/* Whistle Pig walking toward woods */}
          <motion.g
            animate={{ x: [0, 400] }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            <WhistlePig x={400} y={340} scale={0.65} />
            {/* Kid following */}
            <WhistlePig x={340} y={355} scale={0.35} baby={true} />
          </motion.g>

          {/* Nod/tip hat animation for Whistle Pig */}
          {whistled && (
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -15, 0] }}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: '400px 340px' }}
            >
              <path d="M370 308 Q385 300 400 308 L415 308 Q400 295 385 308 Z" fill="#6a5a3a" />
            </motion.g>
          )}
        </svg>

        {/* Whistle effect */}
        {whistled && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 1.5 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl"
          >
            🎵
          </motion.div>
        )}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => { setWhistled(true); play('whistle', { volume: 0.5 }); }}
          className="px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          style={{ background: 'linear-gradient(to bottom, #f0d4a8, #e8c590)', fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}
        >
          Hear Whistle Pig Whistle
        </button>
      </div>
    </div>
  );
}
