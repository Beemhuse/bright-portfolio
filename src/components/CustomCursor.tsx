import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);
    
    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      // Fast, responsive cursor following
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

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, {
        scale: 2,
        borderColor: '#ff0000',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: '#ff0000',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);

    // Track interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-red rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-red rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
