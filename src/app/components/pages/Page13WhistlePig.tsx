import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { WhistlePig } from '../animals/WhistlePig';
import { useAudio } from '../../hooks/useAudio';

interface Page13WhistlePigProps {
  audioEnabled: boolean;
  onComplete: () => void;
}

export default function Page13WhistlePig({ audioEnabled, onComplete }: Page13WhistlePigProps) {
  const { play } = useAudio(audioEnabled);
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });
  const [found, setFound] = useState(false);
  const [distance, setDistance] = useState(100);

  const targetX = 70;
  const targetY = 65;

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTapPosition({ x, y });

    const dist = Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2));
    setDistance(dist);

    play('leaves-rustle', { volume: 0.3 });
    if (dist < 8) {
      setFound(true);
      play('success-chime', { volume: 0.2 });
      setTimeout(onComplete, 1000);
    }
  };

  const getHotColdText = () => {
    if (distance < 10) return '🔥 Very Hot!';
    if (distance < 20) return '🌡️ Hot!';
    if (distance < 35) return '😊 Warm';
    if (distance < 50) return '😐 Cool';
    return '🥶 Cold';
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
          The animal heard him and answered, "I am looking for one of my kids. I don't live around here, but my kid wandered off!" Sam, being a friendly sort, said, "Welcome to my beautiful garden! What is your name?"
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          {distance < 100 ? getHotColdText() : 'Help find Whistle Pig\'s kid!'}
        </p>
      </div>

      <div
        className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
        style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}
        onClick={handleTap}
      >
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene with hiding spots */}
          <circle cx="150" cy="120" r="55" fill="#e89fc8" opacity="0.6" />
          <circle cx="650" cy="150" r="50" fill="#f0a8c8" opacity="0.6" />
          <circle cx="400" cy="100" r="45" fill="#c8a8e8" opacity="0.5" />

          {/* Bushes and grass */}
          <ellipse cx="560" cy="350" rx="80" ry="60" fill="#6a8a5a" opacity="0.7" />
          <ellipse cx="100" cy="380" rx="70" ry="50" fill="#7a9a6a" opacity="0.7" />
          <ellipse cx="700" cy="400" rx="60" ry="45" fill="#6a8a5a" opacity="0.7" />

          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Whistle Pig (parent) */}
          <WhistlePig x={250} y={340} scale={0.65} />

          {/* Sam */}
          <Sam x={350} y={360} scale={1} expression="happy" />

          {/* Baby Whistle Pig hidden in bush */}
          {found && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <WhistlePig x={560} y={325} scale={0.35} baby={true} />
            </motion.g>
          )}
        </svg>

        {found && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-3xl shadow-2xl"
            style={{ background: 'rgba(240, 212, 168, 0.95)' }}
          >
            <p className="text-2xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
              Found! 🦫
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
