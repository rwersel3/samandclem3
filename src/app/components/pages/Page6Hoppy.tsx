import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { Hoppy } from '../animals/Hoppy';
import { useAudio } from '../../hooks/useAudio';

interface Page6HoppyProps {
  audioEnabled: boolean;
}

export default function Page6Hoppy({ audioEnabled }: Page6HoppyProps) {
  const [munching, setMunching] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
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
          One day, his neighbor Hoppy, a brown rabbit that lived in the next hollow, was munching on some greenery. Sam was happy to see him and greeted him. "Hi!" he said. "Will you be my friend?"
        </p>
      </motion.div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Greenery for Hoppy to munch */}
          <path d="M450 420 L455 380 M460 420 L465 375 M470 420 L475 385 M480 420 L485 380" stroke="#6a8a5a" strokeWidth="5" strokeLinecap="round" />
          <circle cx="455" cy="375" r="8" fill="#7a9a6a" opacity="0.7" />
          <circle cx="465" cy="370" r="6" fill="#7a9a6a" opacity="0.7" />
          <circle cx="475" cy="380" r="7" fill="#7a9a6a" opacity="0.7" />

          {/* Hoppy the rabbit */}
          <motion.g
            animate={munching ? { y: [0, 3, 0] } : {}}
            transition={{ duration: 0.3, repeat: munching ? 3 : 0 }}
          >
            <Hoppy x={500} y={340} scale={0.9} munching={munching} />
          </motion.g>

          {/* Sam */}
          <Sam x={250} y={360} scale={1} expression="happy" />
        </svg>

        {/* Interactive Hoppy */}
        <button
          onClick={() => { setMunching(true); play('bunny-hutch', { volume: 0.4 }); }}
          onAnimationEnd={() => setMunching(false)}
          className="absolute left-[62%] top-[70%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <div className="w-32 h-32" />
        </button>

        {/* Sam's speech bubble */}
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-[31%] top-[60%] px-4 py-2 rounded-2xl shadow-lg"
            style={{ background: 'rgba(255, 255, 255, 0.95)' }}
          >
            <p className="text-lg" style={{ color: '#2c5a6e' }}>Hi! Will you be my friend?</p>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => setShowSpeech(!showSpeech)}
          className="px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          style={{ background: 'linear-gradient(to bottom, #f0d4a8, #e8c590)', fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}
        >
          {showSpeech ? 'Hide Speech' : 'Ask Hoppy'}
        </button>
      </div>
    </div>
  );
}
