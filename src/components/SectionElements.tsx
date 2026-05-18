import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { playHoverSound } from '../utils/audio';

interface FadeSectionProps {
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

export const FadeSection: React.FC<FadeSectionProps> = ({ children, id, style }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      style={{ 
        ...style, 
        opacity,
        scale,
        y,
      }}
    >
      {children}
    </motion.section>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div style={{ marginBottom: '60px' }}>
      <div
        className="mono"
        style={{ color: 'var(--accent-color)', marginBottom: '10px', fontSize: '0.9rem' }}
      >
        /{title.toLowerCase().replace(/\s+/g, '-')}
      </div>
      <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', maxWidth: '800px', lineHeight: '1.1' }}>
        {subtitle || title}
      </h2>
    </div>
  );
};

interface ProjectCardProps {
  index: number;
  title: string;
  category: string;
  image?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ index, title, category }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={playHoverSound}
      whileHover={{ 
        backgroundColor: 'var(--accent-color)',
        color: 'black',
        paddingLeft: '30px',
        paddingRight: '30px'
      }}
      style={{
        borderTop: '1px solid var(--grid-color)',
        paddingTop: '20px',
        paddingBottom: '60px',
        cursor: 'pointer',
        transition: 'all 0.1s linear',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Fast Passing Color Block */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={isInView ? { x: '100%' } : { x: '-100%' }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15, 
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
          delay: (index * 0.15) + 0.3,
          ease: "easeOut" 
        }}
        style={{ position: 'relative', zIndex: 1, color: 'inherit' }}
      >
        <div className="mono" style={{ fontSize: '0.8rem', color: 'inherit', marginBottom: '15px', opacity: 0.7 }}>
          [{String(index + 1).padStart(2, '0')}]
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '15px' }}>
          <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'inherit' }}>{title}</h3>
          <span className="mono" style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5, color: 'inherit' }}>
            {category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SwipeRevealLine: React.FC<{ children: React.ReactNode, delay?: number, style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', display: 'block', width: 'fit-content', ...style }}>
      {/* Passing Color Block */}
      <motion.div
        initial={{ x: '-101%' }}
        animate={{ x: '101%' }}
        transition={{ 
          duration: 1.2, // SLOWER: Increased from 0.8s
          delay: delay,
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

      {/* Revealed Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3, // SLOWER: Increased from 0.1s
          delay: delay + 0.6, // Adjusted for longer swipe
          ease: "easeOut" 
        }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
