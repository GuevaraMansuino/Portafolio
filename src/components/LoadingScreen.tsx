import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WORDS = ["Diseñar", "Crear", "Inspirar"];

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2700;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min((progress / duration) * 100, 100);
      setCount(Math.floor(percentage));
      
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };
    
    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-9999 bg-bg flex flex-col justify-between p-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portafolio
      </motion.div>
      
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col items-end w-full">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums mb-4">
          {String(count).padStart(3, "0")}
        </div>
        
        <div className="w-full h-[3px] bg-stroke/50 max-w-sm ml-auto overflow-hidden">
          <div 
            className="h-full accent-gradient origin-left"
            style={{ 
               transform: `scaleX(${count / 100})`,
               boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)'
            }}
          />
        </div>
      </div>
    </div>
  );
};
