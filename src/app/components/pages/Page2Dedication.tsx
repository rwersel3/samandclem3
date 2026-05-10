import { motion } from 'motion/react';
import { useState } from 'react';

export default function Page2Dedication() {
  const [petals, setPetals] = useState<{ id: number; x: number; y: number; spinning: boolean }[]>([]);

  const addPetal = (e: React.MouseEvent) => {
    const newPetal = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      spinning: false,
    };
    setPetals([...petals, newPetal]);
  };

  const spinPetal = (id: number) => {
    setPetals(petals.map(p => p.id === id ? { ...p, spinning: true } : p));
    setTimeout(() => {
      setPetals(petals.filter(p => p.id !== id));
    }, 1000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 relative" onClick={addPetal} style={{ background: 'linear-gradient(to bottom, #d4e8f5, #e8f0f6)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl p-12 rounded-3xl shadow-2xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(10px)' }}
      >
        <p className="text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          This is a story about how being helpful and kind to one another can create harmony and happiness in friendships. Even at the oddest of times, in unexpected places.
        </p>
      </motion.div>

      {/* Floating petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`float-${i}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: ['0vh', '100vh'],
            x: [0, Math.sin(i) * 100, 0],
            rotate: [0, 360 * 2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
          className="absolute pointer-events-auto cursor-pointer"
          style={{ left: `${10 + i * 11}%`, top: '-5%' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <ellipse cx="15" cy="12" rx="8" ry="12" fill="#f0a8c8" opacity="0.8" transform="rotate(45 15 15)" />
            <ellipse cx="15" cy="18" rx="8" ry="12" fill="#e89fc8" opacity="0.8" transform="rotate(-45 15 15)" />
          </svg>
        </motion.div>
      ))}

      {/* Clicked petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={petal.spinning ? { opacity: 0, scale: 2, rotate: 720 } : {}}
          style={{ position: 'absolute', left: petal.x, top: petal.y, pointerEvents: 'none' }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <ellipse cx="15" cy="12" rx="8" ry="12" fill="#f0a8c8" opacity="0.8" transform="rotate(45 15 15)" />
            <ellipse cx="15" cy="18" rx="8" ry="12" fill="#e89fc8" opacity="0.8" transform="rotate(-45 15 15)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
