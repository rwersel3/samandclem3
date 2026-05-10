import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Clem } from '../animals/Clem';
import { Sam } from '../animals/Sam';
import { useAudio } from '../../hooks/useAudio';

interface Page1CoverProps {
  onBegin: () => void;
  audioEnabled: boolean;
}

export default function Page1Cover({ onBegin, audioEnabled }: Page1CoverProps) {
  const { play, playLoop, stopAll } = useAudio(audioEnabled);

  useEffect(() => {
    playLoop('garden-ambience', 0.15);
    return () => stopAll();
  }, [playLoop, stopAll]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8" style={{ background: 'linear-gradient(to bottom, #b8d4e8, #d4e8f5)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="mb-4" style={{ fontFamily: "'Caveat Brush', cursive", fontSize: '4.5rem', color: '#2c5a6e', lineHeight: 1.1 }}>
          Sam & Clem
        </h1>
        <p className="text-xl opacity-80" style={{ color: '#4a6f82' }}>
          By Ginny Cisneros · Illustrations by Bella Southard
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative"
      >
        <div className="w-80 h-80 rounded-full bg-[#5a7c8f] flex items-center justify-center shadow-2xl relative overflow-hidden">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            {/* Clem the cat */}
            <Clem x={250} y={280} scale={2.2} expression="happy" />

            {/* Sam on Clem's shoulder */}
            <motion.g
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Sam x={360} y={190} scale={0.85} expression="happy" />
            </motion.g>
          </svg>
        </div>
      </motion.div>

      <motion.button
        onClick={onBegin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-12 py-4 rounded-full text-xl shadow-xl transition-all duration-300"
        style={{
          background: 'linear-gradient(to bottom, #f0d4a8, #e8c590)',
          color: '#2c5a6e',
          fontFamily: "'Caveat Brush', cursive"
        }}
      >
        Begin Story
      </motion.button>
    </div>
  );
}
