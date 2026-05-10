import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { Clem } from '../animals/Clem';
import { useAudio } from '../../hooks/useAudio';

interface Page16YikesCatProps {
  audioEnabled: boolean;
}

export default function Page16YikesCat({ audioEnabled }: Page16YikesCatProps) {
  const [samHiding, setSamHiding] = useState(false);
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
          "Maybe he could be my friend," Sam thought. Then: "But cats love to catch mice! Yikes, I'd better hide!" So Sam jumped into his hollow as fast as he could! The cat saw him and said, "Excuse me? I'm looking for someone to be my friend!"
        </p>
      </motion.div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <circle cx="650" cy="150" r="45" fill="#f0a8c8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Sam's hollow */}
          <ellipse cx="250" cy="420" rx="80" ry="40" fill="#6a5a3a" />
          <ellipse cx="250" cy="410" rx="50" ry="30" fill="#3a2a1a" />

          {/* Sam diving into hollow or peeking */}
          {!samHiding ? (
            <motion.g
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              <Sam x={250} y={360} scale={1} expression="surprised" />
            </motion.g>
          ) : (
            <motion.g
              initial={{ y: 0 }}
              animate={{ y: 30, opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            >
              <ellipse cx="250" cy="405" rx="15" ry="12" fill="#a07855" />
            </motion.g>
          )}

          {/* Hollow entrance wiggling */}
          {samHiding && (
            <motion.ellipse
              cx="250"
              cy="410"
              rx="50"
              ry="30"
              fill="#3a2a1a"
              animate={{ rx: [50, 52, 48, 50] }}
              transition={{ duration: 0.3, repeat: 3 }}
            />
          )}

          {/* Clem the cat emerging */}
          <motion.g
            initial={{ x: 800 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <Clem x={550} y={335} scale={1.3} expression="curious" />
          </motion.g>

          {/* Clem's head tilt when Sam hides */}
          {samHiding && (
            <motion.text
              x="520"
              y="280"
              fontSize="35"
              fill="#2c5a6e"
              animate={{ rotate: [0, -15, 0] }}
              transition={{ duration: 1.5 }}
            >
              ?
            </motion.text>
          )}
        </svg>

        {/* Clem's speech bubble */}
        {samHiding && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-[20%] top-[45%] px-6 py-3 rounded-2xl shadow-lg"
            style={{ background: 'rgba(255, 255, 255, 0.95)' }}
          >
            <p className="text-lg" style={{ color: '#2c5a6e' }}>
              Excuse me?…<br />I'm looking for someone to be my friend!
            </p>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => { setSamHiding(!samHiding); play('cat-meow', { volume: 0.5 }); }}
          className="px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
          style={{ background: 'linear-gradient(to bottom, #f0d4a8, #e8c590)', fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}
        >
          {samHiding ? 'Show Sam' : 'Sam Hides!'}
        </button>
      </div>
    </div>
  );
}
