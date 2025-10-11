import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CursorAnimation: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);

  useEffect(() => {
    const updateCursor = () => {
      if (!cursorRef.current || !cursorDotRef.current) return;

      // Smooth cursor following with different speeds for outer ring and inner dot
      const speed = 0.15;
      const dotSpeed = 0.8;

      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * speed;
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * speed;

      cursorRef.current.style.transform = `translate(${cursorPosition.current.x - 20}px, ${cursorPosition.current.y - 20}px)`;
      cursorDotRef.current.style.transform = `translate(${mousePosition.current.x - 4}px, ${mousePosition.current.y - 4}px)`;

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
      
      if (!isMoving.current) {
        isMoving.current = true;
        setTimeout(() => {
          isMoving.current = false;
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.opacity = '1';
        cursorDotRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.opacity = '0';
        cursorDotRef.current.style.opacity = '0';
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform += ' scale(0.8)';
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = cursorRef.current.style.transform.replace(' scale(0.8)', '');
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation loop
    updateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
        style={{
          mixBlendMode: 'difference',
        }}
      >
        <div className="w-full h-full border-2 border-white rounded-full animate-pulse" />
        <motion.div
          className="absolute inset-0 border border-purple-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Inner cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
      >
        <motion.div
          className="w-full h-full bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </>
  );
};

export default CursorAnimation;