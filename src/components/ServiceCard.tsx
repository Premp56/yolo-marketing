import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { playHoverSound } from '../utils/audio';

interface ServiceCardProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ index, icon, title, description, tags }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={playHoverSound}
      whileHover={{ 
        y: -10,
        backgroundColor: 'rgba(0, 255, 65, 0.05)', // SUBTLE GLOW RESTORED
        borderColor: 'var(--accent-color)',
        transition: { duration: 0.1, ease: "linear" }
      }}
      style={{ 
        background: '#0a0a0a', 
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: '100%',
        border: '1px solid var(--grid-color)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        color: 'var(--text-primary)'
      }}
    >
      {/* Fast Passing Color Block */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={isInView ? { x: '100%' } : { x: '-100%' }}
        transition={{ 
          duration: 0.6, 
          delay: (index % 3) * 0.15, 
          ease: [0.77, 0, 0.175, 1] 
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--accent-color)',
          zIndex: 10
        }}
      />

      {/* Content Revealed from Tail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ 
          duration: 0.2, 
          delay: ((index % 3) * 0.15) + 0.3,
          ease: "easeOut" 
        }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', gap: '24px' }}
      >
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 5 }}
          style={{ color: 'var(--accent-color)', transition: '0.3s ease' }}
        >
          {icon}
        </motion.div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 500 }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem' }}>
          {description}
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {tags.map(tag => (
            <span key={tag} className="mono" style={{ 
              fontSize: '0.65rem', 
              padding: '4px 10px', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
