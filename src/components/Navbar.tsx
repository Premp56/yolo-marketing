import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isNearTop, setIsNearTop] = useState(true);

  // Direct scroll-linked values for the very start of the page
  const opacityAtTop = useTransform(scrollY, [0, 150], [1, 0]);
  const yAtTop = useTransform(scrollY, [0, 150], [0, -20]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Check if we are in the 'initial' zone at the top of the page
    setIsNearTop(latest < 150);

    // Directional logic for the rest of the page
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      // Use directional animation if we are deep in the page
      // Use direct scroll-linked values if we are at the very top
      animate={!isNearTop ? (hidden ? "hidden" : "visible") : "visible"}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px var(--section-padding-x)',
        zIndex: 1000,
        mixBlendMode: 'difference',
        // Apply the direct scroll transforms only when at the top
        opacity: isNearTop ? opacityAtTop : undefined,
        y: isNearTop ? yAtTop : undefined,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
    >
      <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        YOLO<span style={{ color: 'var(--accent-color)' }}>.</span>
      </div>
      <div style={{ display: 'flex', gap: '30px' }} className="mono desktop-nav">
        {['capabilities', 'works', 'team', 'contact'].map((item) => (
          <a key={item} href={`#${item}`} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            /{item}
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
