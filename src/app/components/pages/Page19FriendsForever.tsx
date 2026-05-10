import { motion } from 'motion/react';
import { useState } from 'react';
import { Clem } from '../animals/Clem';
import { Sam } from '../animals/Sam';

export default function Page19FriendsForever() {
  const [tapped, setTapped] = useState(false);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden cursor-pointer"
      style={{ background: 'linear-gradient(to bottom, #f0d4a8 0%, #e8c590 30%, #f0a8c8 70%, #e89fc8 100%)' }}
      onClick={() => setTapped(true)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl rounded-3xl p-8 md:p-12 mb-8 shadow-2xl text-center relative overflow-hidden"
        style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)' }}
      >
        <p className="text-2xl md:text-3xl leading-relaxed mb-4" style={{ color: '#2c5a6e' }}>
          Sam and Clem became friends forever.
        </p>
        <p className="text-2xl md:text-3xl leading-relaxed" style={{ color: '#2c5a6e', fontStyle: 'italic' }}>
          And that's what you call a harmony of friendship.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <p className="text-4xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
            The End
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative"
      >
        <div className="w-80 h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5a7c8f, #6a8c9f)' }}>
          <svg viewBox="0 0 400 400" className="w-full h-full p-6">
            {/* Flowers around */}
            <motion.circle
              cx="80"
              cy="100"
              r="25"
              fill="#e89fc8"
              opacity="0.7"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="320"
              cy="120"
              r="22"
              fill="#f0a8c8"
              opacity="0.7"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
              cx="100"
              cy="300"
              r="28"
              fill="#c8a8e8"
              opacity="0.7"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="300"
              cy="310"
              r="24"
              fill="#f0d4a8"
              opacity="0.7"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />

            {/* Clem */}
            <Clem x={200} y={215} scale={2} expression="happy" />

            {/* Sam on shoulder - happy and waving */}
            <motion.g
              animate={{ y: [0, -6, 0], rotate: [0, 3, 0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sam x={280} y={125} scale={0.9} expression="happy" />

              {/* Sam's paw waving */}
              <motion.line
                x1="298"
                y1="132"
                x2="315"
                y2="125"
                stroke="#a07855"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{ rotate: [0, 25, -25, 0] }}
                style={{ transformOrigin: '298px 132px' }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.g>
          </svg>
        </div>
      </motion.div>

      {/* Flower petals and hearts rain */}
      {tapped && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -50, x: Math.random() * window.innerWidth }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: window.innerHeight + 100,
            rotate: [0, 360 * 3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "linear"
          }}
          className="absolute pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: 0 }}
        >
          {i % 2 === 0 ? (
            <svg width="30" height="30" viewBox="0 0 30 30">
              <ellipse cx="15" cy="12" rx="8" ry="12" fill="#f0a8c8" opacity="0.8" transform="rotate(45 15 15)" />
              <ellipse cx="15" cy="18" rx="8" ry="12" fill="#e89fc8" opacity="0.8" transform="rotate(-45 15 15)" />
            </svg>
          ) : (
            <div className="text-3xl">💕</div>
          )}
        </motion.div>
      ))}

      <div className="text-center mt-6 px-4 py-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Tap anywhere for flower petals!
        </p>
      </div>
    </div>
  );
}
