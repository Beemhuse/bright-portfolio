import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [imgFailed, setImgFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  // Enhanced entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Greeting animation with bounce
      tl.from(greetingRef.current, {
        y: 60,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // Headline character animation with wave effect
      const headlineChars = headlineRef.current?.querySelectorAll('.char');
      if (headlineChars) {
        tl.from(
          headlineChars,
          {
            rotateX: 90,
            y: 80,
            duration: 0.8,
            stagger: {
              each: 0.03,
              from: 'start',
            },
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      // Subtext fade in with slide
      tl.from(
        subtextRef.current,
        {
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // CTA buttons elastic pop
      tl.from(
        ctaRef.current?.children || [],
        {
          scale: 0.9,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(2)',
        },
        '-=0.4'
      );

      // Image reveal with mask
      tl.from(
        imageRef.current,
        {
          clipPath: 'inset(100% 0 0 0)',
          scale: 1.3,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        '-=1'
      );

      // Floating badges
      tl.from(
        badgesRef.current?.children || [],
        {
          y: 20,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      );
    });

    return () => ctx.revert();
  }, []);

  // Split headline into characters
  const headlineText = "I'm Bright,";
  const subHeadlineText = 'A Fullstack Software Engineer';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1" style={{ transformStyle: 'preserve-3d' }}>
            {/* Greeting */}
            <span
              ref={greetingRef}
              className="inline-block font-body text-red text-lg uppercase tracking-[0.3em] mb-6"
            >
              Hello!
            </span>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-8xl font-bold leading-none mb-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {headlineText.split('').map((char, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <br />
              <span className="text-red">{subHeadlineText.split('').map((char, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}</span>
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="font-body text-lg lg:text-xl text-neutral-600 max-w-xl mb-10 leading-relaxed"
            >
              I bring ideas to life through code, creating seamless digital experiences 
              that combine stunning design with powerful functionality.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const lenis = (window as any).lenis;
                  if (lenis) {
                    lenis.scrollTo('#contact');
                  } else {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="magnetic-btn px-8 py-4 bg-red text-white font-body text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-full hover:scale-105"
              >
                <span>Hire Me</span>
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const lenis = (window as any).lenis;
                  if (lenis) {
                    lenis.scrollTo('#projects');
                  } else {
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="magnetic-btn px-8 py-4 border border-neutral-200 text-neutral-800 font-body text-xs uppercase tracking-widest hover:border-red hover:text-red transition-all duration-300 rounded-full hover:scale-105"
              >
                <span>View Work</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-12">
              {[
                { icon: Github, href: 'https://github.com/Beemhuse' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/bright-awah-59b707223/' },
                { icon: Twitter, href: 'https://twitter.com/D3_lores' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-red hover:text-red hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-red/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200/50 shadow-lg aspect-square bg-neutral-50">
                {!imgFailed ? (
                  <img
                    src="/bright.avif"
                    alt="Bright - Fullstack Software Engineer"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200">
                    <span className="font-display text-9xl font-light text-red select-none tracking-tighter">B</span>
                    <span className="font-body text-xs text-neutral-500 tracking-widest uppercase mt-2">Engineer</span>
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badges for Desktop & Grid/Inline Row for Mobile */}
              <div ref={badgesRef} className="flex sm:block justify-center gap-4 mt-6 sm:mt-0 relative w-full sm:w-auto">
                {/* Badge 1 */}
                <div className="relative sm:absolute bottom-0 left-0 sm:-bottom-4 sm:-left-4 lg:-bottom-8 lg:-left-8 bg-white/80 shadow-md backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full border border-neutral-200/50 flex items-center gap-3 animate-float flex-1 justify-center sm:justify-start">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-red">5+</span>
                  <p className="font-body text-[10px] sm:text-xs text-neutral-600 tracking-wider uppercase">Years Experience</p>
                </div>

                {/* Badge 2 */}
                <div
                  className="relative sm:absolute top-0 right-0 sm:-top-4 sm:-right-4 lg:-top-8 lg:-right-8 bg-white/80 shadow-md backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full border border-neutral-200/50 flex items-center gap-3 animate-float flex-1 justify-center sm:justify-start"
                  style={{ animationDelay: '1s' }}
                >
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-red">10+</span>
                  <p className="font-body text-[10px] sm:text-xs text-neutral-600 tracking-wider uppercase">Projects Done</p>
                </div>

                {/* Badge 3 */}
                <div
                  className="absolute bottom-20 -right-4 lg:bottom-32 lg:-right-12 bg-white/80 shadow-md backdrop-blur-md px-5 py-2.5 rounded-full border border-neutral-200/50 animate-float hidden sm:block"
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-body text-[10px] sm:text-xs text-neutral-600 tracking-wider uppercase">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-400">Scroll</span>
        <div className="w-5 h-8 border border-neutral-200 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-red rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-32 right-12 w-px h-32 bg-gradient-to-b from-transparent via-red/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-32 left-12 w-px h-32 bg-gradient-to-b from-transparent via-red/20 to-transparent hidden lg:block" />
    </section>
  );
};

export default Hero;
