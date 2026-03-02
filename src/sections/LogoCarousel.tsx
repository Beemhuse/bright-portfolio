import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LogoCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const logos = [
    { name: 'Google', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.74c-.93.66-2.15 1.06-3.51 1.06-3.51 0-6.01-2.35-6.01-6s2.5-6 6.01-6c1.95 0 3.61.86 4.71 2.24l-2.07 1.96c-.64-.86-1.71-1.46-2.64-1.46-2.14 0-3.86 1.79-3.86 4.26s1.71 4.26 3.86 4.26c1.93 0 3.21-1.14 3.5-2.71h-3.5v-2.71h5.86c.07.36.11.75.11 1.21 0 2.14-.79 4.29-2.56 5.18z' },
    { name: 'Microsoft', svg: 'M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z' },
    { name: 'Amazon', svg: 'M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.582l.315-.118c.138-.053.209-.053.276 0 .068.053.068.138-.034.276-.314.438-.686.86-1.118 1.265-.943.88-2.05 1.522-3.32 1.926-1.324.42-2.692.63-4.1.63-2.783 0-5.503-.686-8.16-2.058-.808-.42-1.582-.88-2.32-1.38-.146-.098-.23-.186-.23-.28 0-.093.038-.186.116-.28l.034-.043zm6.333-3.09c.05-.086.13-.1.24-.04.78.44 1.58.82 2.4 1.14 1.62.63 3.3.94 5.04.94 1.08 0 2.16-.12 3.24-.36.1-.02.18.02.22.1.04.08.02.16-.06.22-.58.46-1.24.84-1.98 1.14-1.22.48-2.5.72-3.84.72-1.86 0-3.64-.4-5.34-1.2-.78-.36-1.52-.8-2.22-1.32-.1-.08-.14-.16-.1-.24l.04-.08.34-.21zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
    { name: 'Meta', svg: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z' },
    { name: 'Apple', svg: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' },
    { name: 'Netflix', svg: 'M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden border-y border-white/5"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <span className="font-body text-sm uppercase tracking-[0.3em] text-white/50">
          Trusted By
        </span>
      </div>

      {/* Logo Track */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling Track */}
        <div
          ref={trackRef}
          className="flex animate-marquee"
          style={{ width: 'fit-content' }}
        >
          {/* First set */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center justify-center px-12 lg:px-20"
            >
              <div className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 fill-current text-white"
                >
                  <path d={logo.svg} />
                </svg>
                <span className="font-display text-2xl lg:text-3xl text-white whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center justify-center px-12 lg:px-20"
            >
              <div className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 fill-current text-white"
                >
                  <path d={logo.svg} />
                </svg>
                <span className="font-display text-2xl lg:text-3xl text-white whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
