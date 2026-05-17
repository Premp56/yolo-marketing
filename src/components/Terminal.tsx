import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  lines: string[];
  onComplete?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ lines, onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const line = lines[currentLineIndex];
      if (currentText.length < line.length) {
        const timeout = setTimeout(() => {
          setCurrentText(line.slice(0, currentText.length + 1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentText('');
          if (currentLineIndex === lines.length - 1) {
            setIsTyping(false);
            onComplete?.();
          }
        }, 400);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentLineIndex, currentText, lines, onComplete]);

  return (
    <div className="mono" style={{ fontSize: '0.9rem', color: 'var(--accent-color)', lineHeight: '1.6' }}>
      {lines.slice(0, currentLineIndex).map((line, i) => (
        <div key={i} style={{ marginBottom: '4px' }}>
          <span style={{ marginRight: '8px', opacity: 0.5 }}>$</span>
          {line}
        </div>
      ))}
      {isTyping && (
        <div>
          <span style={{ marginRight: '8px', opacity: 0.5 }}>$</span>
          {currentText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              display: 'inline-block',
              width: '8px',
              height: '1.2em',
              backgroundColor: 'var(--accent-color)',
              verticalAlign: 'middle',
              marginLeft: '4px'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Terminal;
