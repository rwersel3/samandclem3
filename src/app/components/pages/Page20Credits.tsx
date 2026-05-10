import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { Clem } from '../animals/Clem';
import { Hoppy } from '../animals/Hoppy';
import { Cardinal } from '../animals/Cardinal';
import { WhistlePig } from '../animals/WhistlePig';

interface Page20CreditsProps {
  onReadAgain: () => void;
}

export default function Page20Credits({ onReadAgain }: Page20CreditsProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);

  const characters = [
    { id: 1, name: 'Sam', bio: 'A lonely field mouse looking for friendship in a beautiful garden.' },
    { id: 2, name: 'Clem', bio: 'A friendly calico cat who loves flowers, birds, and making new friends.' },
    { id: 3, name: 'Hoppy', bio: 'A busy brown rabbit who loves munching on greenery.' },
    { id: 4, name: 'Cardinals', bio: 'Mr. and Mrs. Cardinal, building a cozy nest for their family.' },
    { id: 5, name: 'Whistle Pig', bio: 'A groundhog from the woods, searching for his wandering kid.' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5, #e8f0f6)' }}>
      {!showGallery ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-3xl text-center"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-12"
          >
            <h2 className="mb-6" style={{ fontFamily: "'Caveat Brush', cursive", fontSize: '3rem', color: '#2c5a6e' }}>
              Sam & Clem
            </h2>
            <div className="space-y-3 text-xl" style={{ color: '#4a6f82' }}>
              <p>Written by</p>
              <p style={{ fontFamily: "'Caveat Brush', cursive", fontSize: '2rem', color: '#2c5a6e' }}>
                Ginny Cisneros
              </p>
              <p className="mt-6">Illustrations by</p>
              <p style={{ fontFamily: "'Caveat Brush', cursive", fontSize: '2rem', color: '#2c5a6e' }}>
                Bella Southard
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onReadAgain}
              className="px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105"
              style={{ background: 'linear-gradient(to bottom, #f0d4a8, #e8c590)', fontFamily: "'Caveat Brush', cursive", fontSize: '1.5rem', color: '#2c5a6e' }}
            >
              Read Again 📖
            </button>

            <button
              onClick={() => setShowGallery(true)}
              className="px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105"
              style={{ background: 'linear-gradient(to bottom, #e89fc8, #d88fb8)', fontFamily: "'Caveat Brush', cursive", fontSize: '1.5rem', color: '#fff' }}
            >
              Meet the Characters 🌸
            </button>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 opacity-30">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="#e89fc8" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 opacity-30">
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="30" fill="#f0a8c8" />
            </svg>
          </div>
          <div className="absolute top-40 right-20 opacity-30">
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="#c8a8e8" />
            </svg>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-8">
            <h3 style={{ fontFamily: "'Caveat Brush', cursive", fontSize: '2.5rem', color: '#2c5a6e' }}>
              Meet the Characters
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {characters.map((char, index) => (
              <motion.button
                key={char.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCharacter(char.id)}
                className="p-6 rounded-2xl shadow-lg transition-all hover:scale-105 cursor-pointer"
                style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}
              >
                <div className="mb-3">
                  {char.id === 1 && (
                    <svg width="80" height="80" viewBox="-20 -20 80 80" className="mx-auto">
                      <Sam x={20} y={10} scale={1} expression="happy" />
                    </svg>
                  )}
                  {char.id === 2 && (
                    <svg width="100" height="100" viewBox="-20 -30 100 120" className="mx-auto">
                      <Clem x={30} y={20} scale={0.7} expression="happy" />
                    </svg>
                  )}
                  {char.id === 3 && (
                    <svg width="90" height="90" viewBox="-20 -25 90 90" className="mx-auto">
                      <Hoppy x={25} y={15} scale={0.7} />
                    </svg>
                  )}
                  {char.id === 4 && (
                    <svg width="80" height="70" viewBox="-10 -10 80 70" className="mx-auto">
                      <Cardinal x={15} y={25} scale={2} facing="right" />
                      <Cardinal x={45} y={25} scale={2} facing="left" />
                    </svg>
                  )}
                  {char.id === 5 && (
                    <svg width="100" height="90" viewBox="-20 -20 100 100" className="mx-auto">
                      <WhistlePig x={30} y={20} scale={0.6} />
                    </svg>
                  )}
                </div>
                <p className="text-xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
                  {char.name}
                </p>
              </motion.button>
            ))}
          </div>

          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl shadow-xl text-center mb-6"
              style={{ background: 'rgba(255, 255, 255, 0.9)' }}
            >
              <p className="text-lg" style={{ color: '#2c5a6e' }}>
                {characters.find(c => c.id === selectedCharacter)?.bio}
              </p>
            </motion.div>
          )}

          <div className="text-center">
            <button
              onClick={() => setShowGallery(false)}
              className="px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(to bottom, #f0d4a8, #e8c590)', fontFamily: "'Caveat Brush', cursive", fontSize: '1.2rem', color: '#2c5a6e' }}
            >
              Back to Credits
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
