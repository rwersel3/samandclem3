import { motion } from 'motion/react';
import { useState } from 'react';
import { Clem } from '../animals/Clem';
import { Sam } from '../animals/Sam';
import { Bird } from '../animals/Bird';
import { useAudio } from '../../hooks/useAudio';

interface Page18MakingMusicProps {
  audioEnabled: boolean;
  onComplete: () => void;
}

export default function Page18MakingMusic({ audioEnabled, onComplete }: Page18MakingMusicProps) {
  const { play } = useAudio(audioEnabled);
  const [activeBirds, setActiveBirds] = useState<number[]>([]);
  const [complete, setComplete] = useState(false);

  const birds = [
    { id: 1, x: 200, y: 150, color: '#e8a8a8', note: '♪' },
    { id: 2, x: 350, y: 180, color: '#e8c8a8', note: '♫' },
    { id: 3, x: 500, y: 160, color: '#c8a8e8', note: '♪' },
    { id: 4, x: 650, y: 190, color: '#a8c8e8', note: '♬' },
  ];

  const birdSounds = ['bird-chirp', 'robin-song', 'bird-chirp-2', 'bird-chirp'] as const;

  const tapBird = (id: number) => {
    if (!activeBirds.includes(id)) {
      play(birdSounds[id - 1], { volume: 0.5 });
      const newActive = [...activeBirds, id];
      setActiveBirds(newActive);

      if (newActive.length === birds.length) {
        setTimeout(() => {
          setComplete(true);
          play('success-chime', { volume: 0.7 });
          setTimeout(onComplete, 2000);
        }, 500);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f0d4a8 0%, #e8c590 50%, #f0d4a8 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          The cat replied, "My name is Clem, and I am in need of a friend. I won't eat you! I see you love the flowers in this garden and love to hear the birds sing! So do I! Just jump on my back, and we can make music together with all the birds out there. You can conduct the singing!"
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Conduct the bird orchestra! ({activeBirds.length}/{birds.length})
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #d4e8f5, #c8daa8)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Beautiful garden scene */}
          <circle cx="120" cy="110" r="55" fill="#e89fc8" opacity="0.7" />
          <circle cx="680" cy="140" r="50" fill="#f0a8c8" opacity="0.7" />
          <circle cx="400" cy="90" r="45" fill="#c8a8e8" opacity="0.6" />

          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Clem sitting proud */}
          <Clem x={400} y={335} scale={1.4} expression="happy" />

          {/* Sam on Clem's back conducting */}
          <motion.g
            animate={complete ? { y: [0, -5, 0], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 1, repeat: complete ? Infinity : 0 }}
          >
            <Sam x={450} y={240} scale={0.8} expression="happy" />

            {/* Conducting baton */}
            <motion.line
              x1="468"
              y1="248"
              x2="488"
              y2="233"
              stroke="#6a5a3a"
              strokeWidth="3"
              strokeLinecap="round"
              animate={activeBirds.length > 0 ? { rotate: [-25, 25, -25] } : {}}
              style={{ transformOrigin: '468px 248px' }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.g>
        </svg>

        {/* Birds */}
        {birds.map((bird, index) => (
          <motion.button
            key={bird.id}
            onClick={() => tapBird(bird.id)}
            className="absolute cursor-pointer"
            style={{ left: bird.x, top: bird.y }}
            animate={activeBirds.includes(bird.id) ? {
              scale: [1, 1.2, 1],
              y: [0, -10, 0]
            } : {}}
            transition={{
              duration: 0.6,
              repeat: activeBirds.includes(bird.id) ? Infinity : 0,
              delay: index * 0.15
            }}
            whileHover={{ scale: 1.15 }}
          >
            <svg width="50" height="50" viewBox="-25 -25 50 50">
              <Bird x={0} y={0} scale={1.3} color={bird.color} singing={activeBirds.includes(bird.id)} />

              {activeBirds.includes(bird.id) && (
                <motion.text
                  x="25"
                  y="10"
                  fontSize="16"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [1, 0], y: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {bird.note}
                </motion.text>
              )}
            </svg>
          </motion.button>
        ))}

        {/* Celebration when complete */}
        {complete && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 0],
                  x: Math.cos((i / 12) * Math.PI * 2) * 100,
                  y: Math.sin((i / 12) * Math.PI * 2) * 100,
                }}
                transition={{ duration: 1.5 }}
                className="absolute text-3xl"
              >
                ⭐
              </motion.div>
            ))}
            <div className="text-6xl">🎶</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
