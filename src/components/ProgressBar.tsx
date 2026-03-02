import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    // Use GSAP for smooth progress animation
    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-red via-red-light to-red-dark shadow-glow"
        style={{
          width: `${progress}%`,
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.3)',
        }}
      />
      {/* Glow effect */}
      <div
        className="absolute top-0 h-full bg-red/30 blur-sm"
        style={{
          width: `${progress}%`,
          transition: 'width 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default ProgressBar;
