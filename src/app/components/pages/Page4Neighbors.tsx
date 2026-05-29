import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sam } from '../animals/Sam';
import { Hoppy } from '../animals/Hoppy';
import { Chipmunk } from '../animals/Chipmunk';
import { Salamander } from '../animals/Salamander';
import { Bird } from '../animals/Bird';
import { useAudio } from '../../hooks/useAudio';

interface Page4NeighborsProps {
  audioEnabled: boolean;
}

export default function Page4Neighbors({ audioEnabled }: Page4NeighborsProps) {
  const [activeAnimal, setActiveAnimal] = useState<string | null>(null);
  const { play, playLoop, stopAll } = useAudio(audioEnabled);

  useEffect(() => {
    playLoop('morning-birds', 0.12);
    return () => stopAll();
  }, [playLoop, stopAll]);

  const animalSounds: Record<string, () => void> = {
    rabbit: () => play('collect-chime', { volume: 0.05 }),
    salamander: () => play('collect-chime', { volume: 0.05 }),
    chipmunk: () => play('collect-chime', { volume: 0.05 }),
    bird: () => play('bird-chirp', { volume: 0.5 }),
  };

  const animals = [
    { id: 'rabbit', name: 'Rabbit', sound: 'hop hop', x: 20, y: 60, color: '#a07855' },
    { id: 'salamander', name: 'Salamander', sound: 'blip', x: 70, y: 70, color: '#e89f71' },
    { id: 'chipmunk', name: 'Chipmunk', sound: 'chitter chitter', x: 45, y: 50, color: '#c9a66b' },
    { id: 'bird', name: 'Bird', sound: 'tweet tweet', x: 60, y: 25, color: '#e8a8a8' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          He had lots of neighbors — rabbits, salamanders, chipmunks, and many beautiful birds. Some birds just came to the beautiful garden to sing their songs. The garden seemed to be a gathering place for all these animals and birds.
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Tap each animal to meet them!
        </p>
      </div>

      <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}>
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden background */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <circle cx="650" cy="150" r="45" fill="#f0a8c8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Sam in his hollow */}
          <ellipse cx="100" cy="420" rx="60" ry="30" fill="#6a5a3a" />
          <ellipse cx="100" cy="410" rx="40" ry="20" fill="#3a2a1a" />
          <Sam x={100} y={365} scale={0.7} expression="neutral" />
        </svg>

        {/* Interactive animals */}
        {animals.map((animal) => (
          <motion.button
            key={animal.id}
            onClick={() => { setActiveAnimal(animal.id); animalSounds[animal.id]?.(); }}
            className="absolute cursor-pointer"
            style={{ left: `${animal.x}%`, top: `${animal.y}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={activeAnimal === animal.id ? { y: [-5, 0, -5] } : {}}
            transition={{ duration: 0.5 }}
          >
            {animal.id === 'rabbit' && (
              <svg width="80" height="100" viewBox="-40 -50 80 100">
                <Hoppy x={0} y={0} scale={0.5} />
              </svg>
            )}
            {animal.id === 'chipmunk' && (
              <svg width="70" height="70" viewBox="-35 -35 70 70">
                <Chipmunk x={0} y={0} scale={0.6} />
              </svg>
            )}
            {animal.id === 'salamander' && (
              <svg width="80" height="50" viewBox="-40 -25 80 50">
                <Salamander x={0} y={0} scale={0.7} />
              </svg>
            )}
            {animal.id === 'bird' && (
              <svg width="50" height="50" viewBox="-25 -25 50 50">
                <Bird x={0} y={0} scale={1} color={animal.color} />
              </svg>
            )}
          </motion.button>
        ))}

        {/* Sound effect display */}
        {activeAnimal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg"
            style={{ background: 'rgba(255, 255, 255, 0.9)' }}
          >
            <p className="text-xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
              {animals.find(a => a.id === activeAnimal)?.name}: "{animals.find(a => a.id === activeAnimal)?.sound}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
