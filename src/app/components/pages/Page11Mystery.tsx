import { motion } from 'motion/react';
import { useState } from 'react';
import { WhistlePig } from '../animals/WhistlePig';
import { Sam } from '../animals/Sam';
import { useAudio } from '../../hooks/useAudio';

interface Page11MysteryProps {
  audioEnabled: boolean;
}

export default function Page11Mystery({ audioEnabled }: Page11MysteryProps) {
  const { play } = useAudio(audioEnabled);
  const [peeked, setPeeked] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          Sam thought to himself, "That was neighborly of Hoppy to stop by and say hey!" As Sam admired the beautiful garden, a big brown animal walked right by him. He looked like he was on a mission!
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Tap the bushes to peek at the mystery animal!
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <circle cx="650" cy="150" r="45" fill="#f0a8c8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Mystery animal - Whistle Pig */}
          <motion.g
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <WhistlePig x={580} y={340} scale={0.7} />
          </motion.g>

          {/* Sam watching */}
          <Sam x={200} y={360} scale={1} expression="surprised" />
        </svg>

        {/* Foliage overlay that parts */}
        <motion.div
          animate={peeked ? { x: 150, opacity: 0.2 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute right-0 top-0 h-full w-2/5 cursor-pointer pointer-events-auto"
          style={{ zIndex: 10 }}
          onClick={() => { setPeeked(!peeked); play('leaves-rustle', { volume: 0.5 }); }}
        >
          <svg viewBox="0 0 400 500" className="w-full h-full" preserveAspectRatio="none">
            {/* Dense bushes */}
            <ellipse cx="200" cy="100" rx="120" ry="140" fill="#5a7a4a" opacity="0.85" />
            <ellipse cx="250" cy="200" rx="100" ry="120" fill="#6a8a5a" opacity="0.85" />
            <ellipse cx="150" cy="250" rx="110" ry="130" fill="#5a7a4a" opacity="0.85" />
            <ellipse cx="220" cy="350" rx="100" ry="110" fill="#6a8a5a" opacity="0.85" />
            <ellipse cx="180" cy="430" rx="95" ry="100" fill="#5a7a4a" opacity="0.85" />

            {/* Additional foliage detail */}
            <ellipse cx="300" cy="150" rx="80" ry="90" fill="#7a9a6a" opacity="0.7" />
            <ellipse cx="100" cy="180" rx="70" ry="80" fill="#6a8a5a" opacity="0.7" />
          </svg>
        </motion.div>

        {/* Suspense indicator */}
        {!peeked && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-6xl pointer-events-none"
            style={{ zIndex: 20 }}
          >
            👀
          </motion.div>
        )}

        {peeked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/4 left-1/3 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg pointer-events-none"
            style={{ background: 'rgba(255, 255, 255, 0.95)', zIndex: 20 }}
          >
            <p className="text-xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
              It's a big groundhog! 🦫
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
