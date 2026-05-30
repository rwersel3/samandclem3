import { motion } from 'motion/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Hoppy } from '../animals/Hoppy';
import { useAudio } from '../../hooks/useAudio';

const PATH_START = 12.5;
const PATH_END = 87.5;
const PATH_RANGE = PATH_END - PATH_START;

interface Page7HoppyBusyProps {
  audioEnabled: boolean;
  onComplete: () => void;
}

export default function Page7HoppyBusy({ audioEnabled, onComplete }: Page7HoppyBusyProps) {
  const { play } = useAudio(audioEnabled);
  const [pathProgress, setPathProgress] = useState(0);
  const [tracing, setTracing] = useState(false);
  const completed = useRef(false);

  const updateProgress = useCallback((clientX: number, rect: DOMRect) => {
    if (!tracing) return;
    const rawX = ((clientX - rect.left) / rect.width) * 100;
    const normalized = Math.max(0, Math.min(100, ((rawX - PATH_START) / PATH_RANGE) * 100));
    setPathProgress(prev => {
      if (normalized > prev && normalized <= prev + 20) {
        if (normalized >= 85 && !completed.current) {
          completed.current = true;
          play('success-chime', { volume: 0.04 });
          setTimeout(onComplete, 500);
        }
        return normalized;
      }
      return prev;
    });
  }, [tracing, onComplete]);

  const startTracing = useCallback((clientX: number, rect: DOMRect) => {
    const rawX = ((clientX - rect.left) / rect.width) * 100;
    const normalized = ((rawX - PATH_START) / PATH_RANGE) * 100;
    if (normalized >= -5 && normalized <= pathProgress + 20) {
      setTracing(true);
    }
  }, [pathProgress]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #d4e8f5 0%, #c8daa8 50%, #b8c998 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-3xl p-6 md:p-10 mb-6 shadow-xl text-center"
        style={{ background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(8px)' }}
      >
        <p className="text-lg md:text-2xl leading-relaxed" style={{ color: '#2c5a6e' }}>
          "Sure," said Hoppy, "but I'm too busy right now. Gotta go!" Well, I have to tell you, Sam was disappointed. He wanted a friend to enjoy the beauty of the garden and the singing of the birds.
        </p>
      </motion.div>

      <div className="text-center mb-4 px-4 py-2 rounded-full" style={{ background: 'rgba(240, 212, 168, 0.9)' }}>
        <p className="text-lg" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
          {pathProgress >= 85
            ? 'Path complete! 🐰'
            : pathProgress > 0
              ? `Keep going! ${Math.round(pathProgress)}%`
              : 'Tap the start of the path and drag to follow Hoppy!'}
        </p>
      </div>

      <div
        className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-crosshair select-none"
        style={{ background: 'linear-gradient(to bottom, #c8daa8, #a8ba88)', touchAction: 'none' }}
        onMouseMove={(e) => updateProgress(e.clientX, e.currentTarget.getBoundingClientRect())}
        onMouseDown={(e) => startTracing(e.clientX, e.currentTarget.getBoundingClientRect())}
        onMouseUp={() => setTracing(false)}
        onMouseLeave={() => setTracing(false)}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          startTracing(touch.clientX, e.currentTarget.getBoundingClientRect());
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          const touch = e.touches[0];
          updateProgress(touch.clientX, e.currentTarget.getBoundingClientRect());
        }}
        onTouchEnd={() => setTracing(false)}
      >
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Garden scene */}
          <circle cx="150" cy="120" r="50" fill="#e89fc8" opacity="0.5" />
          <circle cx="650" cy="150" r="45" fill="#f0a8c8" opacity="0.5" />
          <path d="M0 450 Q100 430 200 450 T400 450 T600 450 T800 450 L800 500 L0 500 Z" fill="#8aaa6a" />

          {/* Path to trace */}
          <path
            d="M 100 400 Q 250 350 400 380 T 700 400"
            stroke="#f0d4a8"
            strokeWidth="40"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />

          {/* Progress path */}
          <path
            d="M 100 400 Q 250 350 400 380 T 700 400"
            stroke="#e8c590"
            strokeWidth="40"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="600"
            strokeDashoffset={600 - (pathProgress / 100) * 600}
          />

          {/* Start indicator */}
          {pathProgress < 5 && (
            <motion.circle
              cx="100" cy="400" r="18"
              fill="#e8c590"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}

          {/* Hoppy following the progress */}
          <g transform={`translate(${(pathProgress / 100) * 600}, 0)`}>
            <Hoppy x={100} y={365} scale={0.6} />
          </g>
        </svg>

        {pathProgress >= 85 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-3xl shadow-2xl"
            style={{ background: 'rgba(240, 212, 168, 0.95)' }}
          >
            <p className="text-2xl" style={{ fontFamily: "'Caveat Brush', cursive", color: '#2c5a6e' }}>
              Path complete! 🐰
            </p>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-4 text-sm" style={{ color: '#4a6f82' }}>
        Click and drag (or touch and drag) to follow Hoppy's path
      </div>
    </div>
  );
}
