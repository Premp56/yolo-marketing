import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LogoSplitLoaderProps {
  onComplete: () => void;
}

const LogoSplitLoader: React.FC<LogoSplitLoaderProps> = ({ onComplete }) => {
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    // Wait 2s then split automatically
    const timer = setTimeout(() => {
      setIsSplitting(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const halfStyle: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: '50.1svh', // Use svh for more consistent mobile height
    left: 0,
    backgroundColor: '#0a0a0a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 10000,
  };

  const logoStyle: React.CSSProperties = {
    fontSize: 'clamp(3rem, 15vw, 15vw)', // Smaller minimum font size
    fontWeight: 900,
    letterSpacing: '-0.05em',
    color: 'white',
    position: 'absolute',
    margin: 0,
    lineHeight: 1,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none' }}>
      {/* TOP HALF */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isSplitting ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1] }}
        style={{ ...halfStyle, top: 0, alignItems: 'flex-end' }}
      >
        <div style={{ position: 'relative', height: '50svh', width: '100%' }}>
           <h1 style={{ ...logoStyle, bottom: 'clamp(-7.5vw, -4vw, -4vw)', left: '50%', transform: 'translateX(-50%)' }}>
             YOLO
           </h1>
        </div>
      </motion.div>

      {/* BOTTOM HALF */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isSplitting ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1] }}
        style={{ ...halfStyle, bottom: 0, alignItems: 'flex-start' }}
      >
        <div style={{ position: 'relative', height: '50svh', width: '100%' }}>
           <h1 style={{ ...logoStyle, top: 'clamp(-7.5vw, -4vw, -4vw)', left: '50%', transform: 'translateX(-50%)' }}>
             YOLO
           </h1>
        </div>
      </motion.div>

      {/* Center Line Detail */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isSplitting ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '10%',
          right: '10%',
          height: '1px',
          backgroundColor: 'var(--accent-color)',
          zIndex: 10001,
          opacity: 0.3
        }}
      />
    </div>
  );
};

export default LogoSplitLoader;
