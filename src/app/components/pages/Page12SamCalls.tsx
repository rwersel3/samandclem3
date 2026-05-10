import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { WhistlePig } from '../animals/WhistlePig';
import { useAudio } from '../../hooks/useAudio';

interface Page12SamCallsProps {
  audioEnabled: boolean;
}

export default function Page12SamCalls({ audioEnabled }: Page12SamCallsProps) {
  const { play } = useAudio(audioEnabled);
  const [holdTime, setHoldTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const handleMouseDown = () => {
    setIsHolding(true);
    play('whistle', { volume: 0.3 });
    const interval = setInterval(() => {
      setHoldTime(prev => Math.min(prev + 100, 2000));
    }, 100);

    const handleMouseUp = () => {
      setIsHolding(false);
      clearInterval(interval);
      setHoldTime(0);
    };

    window.addEventListener('mouseup', handleMouseUp, { once: true });
    window.addEventListener('touchend', handleMouseUp, { once: true });
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
          "Hey there!" yelled Sam. "Who are you and what are you doing here?" Sam was a little scared; that animal looked like a bear, or an overgrown rabbit! Once again he yelled, "Who ARE you? And what are you doing here?"
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Hold down on Sam to make him yell!
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <circle cx="650" cy="150" r="45" fill="#f0a8c8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Whistle Pig */}
          <WhistlePig x={600} y={340} scale={0.7} />

          {/* Sam calling out */}
          <motion.g
            animate={isHolding ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3, repeat: isHolding ? Infinity : 0 }}
          >
            <Sam x={200} y={360} scale={1} expression="surprised" />
            {/* Cupped paws around mouth */}
            <ellipse cx="200" cy="375" rx="6" ry="8" fill="#a07855" opacity="0.6" />
          </motion.g>
        </svg>

        {/* Interactive Sam */}
        <button
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="absolute left-[25%] top-[75%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <div className="w-24 h-24" />
        </button>

        {/* Speech bubble growing */}
        {holdTime > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: holdTime / 2000,
              x: (holdTime / 2000) * 200
            }}
            className="absolute left-[30%] top-[60%] px-8 py-4 rounded-full shadow-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              fontSize: `${16 + (holdTime / 2000) * 16}px`
            }}
          >
            <p style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
              HEY THERE!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
