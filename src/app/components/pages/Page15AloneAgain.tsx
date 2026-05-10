import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sam } from '../animals/Sam';
import { Bird } from '../animals/Bird';
import { useAudio } from '../../hooks/useAudio';

interface Page15AloneAgainProps {
  audioEnabled: boolean;
}

export default function Page15AloneAgain({ audioEnabled }: Page15AloneAgainProps) {
  const [bushRustled, setBushRustled] = useState(false);
  const { play, playLoop, stopAll } = useAudio(audioEnabled);

  useEffect(() => {
    playLoop('morning-birds', 0.15);
    return () => stopAll();
  }, [playLoop, stopAll]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          Sam continued to admire the beautiful flowers in the garden and the beautiful songs the birds were singing. "Woe is me," said Sam to himself. "I need a friend." Suddenly, from behind a bush, he saw a beautiful cat.
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Tap the bush to see what's hiding!
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Beautiful garden scene */}
          <circle cx="120" cy="110" r="55" fill="#e89fc8" opacity="0.7" />
          <circle cx="680" cy="140" r="50" fill="#f0a8c8" opacity="0.7" />
          <circle cx="400" cy="90" r="45" fill="#c8a8e8" opacity="0.6" />
          <circle cx="250" cy="130" r="40" fill="#f0d4a8" opacity="0.6" />
          <circle cx="550" cy="120" r="48" fill="#e8c8d8" opacity="0.6" />

          {/* Birds singing */}
          <motion.g
            animate={{ y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bird x={300} y={170} scale={1.2} color="#e8a8a8" singing={true} />
          </motion.g>

          <motion.g
            animate={{ y: [0, -8, 0], rotate: [0, -5, 0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Bird x={500} y={190} scale={1.2} color="#e8a8a8" singing={true} />
          </motion.g>

          {/* Musical notes */}
          <motion.text
            x="320"
            y="150"
            fontSize="24"
            fill="#4a6f82"
            animate={{ opacity: [0, 1, 0], y: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♪
          </motion.text>
          <motion.text
            x="520"
            y="170"
            fontSize="24"
            fill="#4a6f82"
            animate={{ opacity: [0, 1, 0], y: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          >
            ♫
          </motion.text>

          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Sam admiring */}
          <Sam x={200} y={360} scale={1} expression="neutral" />

          {/* Bush with cat tail peeking */}
          <motion.g
            animate={bushRustled ? { x: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <ellipse cx="600" cy="380" rx="100" ry="80" fill="#6a8a5a" opacity="0.8" />
            <ellipse cx="650" cy="350" rx="60" ry="70" fill="#7a9a6a" opacity="0.8" />

            {/* Cat tail peeking out */}
            {bushRustled && (
              <motion.path
                d="M650 350 Q670 320 680 340"
                stroke="#f5f5f0"
                strokeWidth="8"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </motion.g>
        </svg>

        {/* Interactive bush */}
        <button
          onClick={() => { setBushRustled(!bushRustled); play('leaves-rustle', { volume: 0.5 }); }}
          className="absolute right-[25%] top-[70%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <div className="w-32 h-32" />
        </button>

        {bushRustled && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg"
            style={{ background: 'rgba(255, 255, 255, 0.95)' }}
          >
            <p className="text-xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
              What could it be? 🐱
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
