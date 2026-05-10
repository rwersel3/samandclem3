import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Volume2, VolumeX, Flower2 } from 'lucide-react';
import { useAudio } from './hooks/useAudio';
import Page1Cover from './components/pages/Page1Cover';
import Page2Dedication from './components/pages/Page2Dedication';
import Page3MeetSam from './components/pages/Page3MeetSam';
import Page4Neighbors from './components/pages/Page4Neighbors';
import Page5SamGreets from './components/pages/Page5SamGreets';
import Page6Hoppy from './components/pages/Page6Hoppy';
import Page7HoppyBusy from './components/pages/Page7HoppyBusy';
import Page8Cardinals from './components/pages/Page8Cardinals';
import Page9SamSadness from './components/pages/Page9SamSadness';
import Page10HoppyLeaves from './components/pages/Page10HoppyLeaves';
import Page11Mystery from './components/pages/Page11Mystery';
import Page12SamCalls from './components/pages/Page12SamCalls';
import Page13WhistlePig from './components/pages/Page13WhistlePig';
import Page14WhistlePigLeaves from './components/pages/Page14WhistlePigLeaves';
import Page15AloneAgain from './components/pages/Page15AloneAgain';
import Page16YikesCat from './components/pages/Page16YikesCat';
import Page17ClemExplains from './components/pages/Page17ClemExplains';
import Page18MakingMusic from './components/pages/Page18MakingMusic';
import Page19FriendsForever from './components/pages/Page19FriendsForever';
import Page20Credits from './components/pages/Page20Credits';

const TOTAL_PAGES = 20;

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('samAndClemProgress');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [direction, setDirection] = useState(0);
  const { play } = useAudio(audioEnabled);
  const prevPage = useRef(currentPage);

  useEffect(() => {
    localStorage.setItem('samAndClemProgress', currentPage.toString());
    if (prevPage.current !== currentPage) {
      play('page-turn', { volume: 0.3 });
      prevPage.current = currentPage;
    }
  }, [currentPage, play]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToPage(currentPage + 1);
      if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  const pages = [
    <Page1Cover onBegin={() => goToPage(2)} audioEnabled={audioEnabled} />,
    <Page2Dedication />,
    <Page3MeetSam audioEnabled={audioEnabled} onComplete={() => goToPage(4)} />,
    <Page4Neighbors audioEnabled={audioEnabled} />,
    <Page5SamGreets audioEnabled={audioEnabled} />,
    <Page6Hoppy audioEnabled={audioEnabled} />,
    <Page7HoppyBusy audioEnabled={audioEnabled} onComplete={() => goToPage(8)} />,
    <Page8Cardinals audioEnabled={audioEnabled} onComplete={() => goToPage(9)} />,
    <Page9SamSadness audioEnabled={audioEnabled} />,
    <Page10HoppyLeaves audioEnabled={audioEnabled} />,
    <Page11Mystery audioEnabled={audioEnabled} />,
    <Page12SamCalls audioEnabled={audioEnabled} />,
    <Page13WhistlePig audioEnabled={audioEnabled} onComplete={() => goToPage(14)} />,
    <Page14WhistlePigLeaves audioEnabled={audioEnabled} />,
    <Page15AloneAgain audioEnabled={audioEnabled} />,
    <Page16YikesCat audioEnabled={audioEnabled} />,
    <Page17ClemExplains audioEnabled={audioEnabled} />,
    <Page18MakingMusic audioEnabled={audioEnabled} onComplete={() => goToPage(19)} />,
    <Page19FriendsForever />,
    <Page20Credits onReadAgain={() => goToPage(1)} />,
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: "'Fraunces', serif", background: 'linear-gradient(to bottom, #b8d4e8, #e8f0f6)' }}>
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center gap-1.5 py-3 px-4 bg-white/30 backdrop-blur-sm">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className="transition-all duration-300"
            aria-label={`Go to page ${i + 1}`}
          >
            <Flower2
              size={16}
              className={`transition-all duration-300 ${
                i < currentPage ? 'fill-[#e89f71] stroke-[#d17c4a]' : 'fill-transparent stroke-gray-400'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Home Button */}
      <button
        onClick={() => goToPage(1)}
        className="absolute top-16 left-4 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
        aria-label="Go to home"
      >
        <Home size={20} className="text-[#5a7c8f]" />
      </button>

      {/* Audio Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-16 right-4 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
        aria-label={audioEnabled ? 'Mute audio' : 'Unmute audio'}
      >
        {audioEnabled ? (
          <Volume2 size={20} className="text-[#5a7c8f]" />
        ) : (
          <VolumeX size={20} className="text-gray-400" />
        )}
      </button>

      {/* Page Content */}
      <div className="w-full h-full flex items-center justify-center pt-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, rotateY: direction > 0 ? 10 : -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100, rotateY: direction > 0 ? -10 : 10 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-full max-w-5xl mx-auto"
          >
            {pages[currentPage - 1]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {currentPage > 1 && (
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/60 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/80 transition-all duration-300"
          aria-label="Previous page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {currentPage < TOTAL_PAGES && (
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/60 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/80 transition-all duration-300"
          aria-label="Next page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
