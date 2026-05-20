import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices or screens that do not support hover pointer
    const checkTouch = window.matchMedia('(pointer: coarse)').matches || 
                       !window.matchMedia('(hover: hover)').matches ||
                       window.innerWidth < 768;
                       
    setIsDisabled(checkTouch);
    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Responsive mouse move tracking
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none',
      });
    };

    // High-performance event delegation for hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor-hover], input, textarea, select');
      if (interactive) {
        gsap.to(cursor, {
          scale: 1.8,
          borderColor: '#C5A880',
          backgroundColor: 'rgba(197, 168, 128, 0.08)',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 2,
          backgroundColor: '#C5A880',
          duration: 0.2,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor-hover], input, textarea, select');
      if (interactive) {
        gsap.to(cursor, {
          scale: 1,
          borderColor: '#C5A880',
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: '#C5A880',
          duration: 0.2,
        });
      }
    };

    // Add listeners on the window
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  if (isDisabled) return null;

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-red rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{ willChange: 'transform, border-color, background-color' }}
      />
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-red rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform, background-color' }}
      />
    </>
  );
};

export default CustomCursor;
