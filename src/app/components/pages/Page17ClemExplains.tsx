import { motion } from 'motion/react';
import { useState } from 'react';
import { Sam } from '../animals/Sam';
import { Clem } from '../animals/Clem';
import { useAudio } from '../../hooks/useAudio';

interface Page17ClemExplainsProps {
  audioEnabled: boolean;
}

export default function Page17ClemExplains({ audioEnabled }: Page17ClemExplainsProps) {
  const { play } = useAudio(audioEnabled);
  const [dialogueStep, setDialogueStep] = useState(0);

  const dialogues = [
    { speaker: 'sam', text: 'What? I was afraid you might want to eat me!', emergence: 0.2 },
    { speaker: 'clem', text: 'No, silly mouse, I am in need of a friend. Will you be my friend?', emergence: 0.4 },
    { speaker: 'sam', text: 'Yes! What is your name?', emergence: 0.8 },
  ];

  const nextDialogue = () => {
    if (dialogueStep < dialogues.length - 1) {
      play('collect-chime', { volume: 0.15 });
      setDialogueStep(dialogueStep + 1);
    }
  };

  const currentDialogue = dialogues[dialogueStep];
  const samEmergence = currentDialogue.emergence;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          "What?" said Sam. "I was afraid you might want to eat me!" "No, silly mouse, I am in need of a friend. Will you be my friend?" "Yes," answered Sam. "What is your name?"
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          Tap to continue the conversation ({dialogueStep + 1}/3)
        </p>
      </div>

      <div
        className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
        style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)' }}
        onClick={nextDialogue}
      >
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <circle cx="650" cy="150" r="45" fill="#f0a8c8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Sam's hollow */}
          <ellipse cx="250" cy="420" rx="80" ry="40" fill="#6a5a3a" />
          <ellipse cx="250" cy="410" rx="50" ry="30" fill="#3a2a1a" />

          {/* Sam emerging progressively */}
          <motion.g
            animate={{ y: [20 - samEmergence * 50, 15 - samEmergence * 50] }}
            transition={{ duration: 0.6 }}
          >
            {samEmergence > 0.2 && (
              <Sam
                x={250}
                y={360 - (1 - samEmergence) * 30}
                scale={0.6 + samEmergence * 0.4}
                expression={samEmergence >= 0.8 ? "happy" : "surprised"}
              />
            )}
          </motion.g>

          {/* Clem sitting gently */}
          <Clem x={550} y={335} scale={1.3} expression="happy" />
        </svg>

        {/* Speech bubble */}
        <motion.div
          key={dialogueStep}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute px-6 py-4 rounded-2xl shadow-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            left: currentDialogue.speaker === 'sam' ? '15%' : '55%',
            top: currentDialogue.speaker === 'sam' ? '50%' : '45%',
          }}
        >
          <p className="text-lg" style={{ color: '#2c5a6e', maxWidth: '200px' }}>
            {currentDialogue.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
