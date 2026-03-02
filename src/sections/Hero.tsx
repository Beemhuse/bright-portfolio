import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  // Fluid Background Animation with more particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 120 + 60,
          color: Math.random() > 0.7 ? 'rgba(255, 0, 0, 0.04)' : 'rgba(25, 25, 25, 0.6)',
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.02;

        // Wrap around edges
        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;

        // Pulsing radius
        const pulsingRadius = particle.radius + Math.sin(particle.pulse) * 20;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          pulsingRadius
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulsingRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.03 * (1 - distance / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Enhanced entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Greeting animation with bounce
      tl.from(greetingRef.current, {
        y: 60,
        opacity: 0,
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
            opacity: 0,
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
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // CTA buttons elastic pop
      tl.from(
        ctaRef.current?.children || [],
        {
          scale: 0,
          opacity: 0,
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
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      );
    });

    return () => ctx.revert();
  }, []);

  // Enhanced scroll parallax effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline moves up faster
      gsap.to(headlineRef.current, {
        y: -250,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Image moves slower (parallax depth)
      gsap.to(imageRef.current, {
        y: 150,
        rotateY: 8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Subtext fades out
      gsap.to(subtextRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: '60% top',
          scrub: 1,
        },
      });

      // CTA fades out
      gsap.to(ctaRef.current, {
        opacity: 0,
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '30% top',
          end: '70% top',
          scrub: 1,
        },
      });
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
      {/* Fluid Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

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
              className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-4"
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
              className="font-body text-lg lg:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
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
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="magnetic-btn px-8 py-4 bg-red text-white font-body text-sm uppercase tracking-widest hover:bg-red-dark transition-all duration-300 animate-pulse-red hover:scale-105"
              >
                <span>Hire Me</span>
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="magnetic-btn px-8 py-4 border border-white/30 text-white font-body text-sm uppercase tracking-widest hover:border-red hover:text-red transition-all duration-300 hover:scale-105"
              >
                <span>View Work</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-12">
              {[
                { icon: Github, href: 'https://github.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Twitter, href: 'https://twitter.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-red hover:text-red hover:scale-110 transition-all duration-300"
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
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-red/20 rounded-full blur-[100px] animate-pulse" />
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/hero-portrait.jpg"
                  alt="Bright - Fullstack Software Engineer"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Badges */}
              <div ref={badgesRef}>
                {/* Badge 1 */}
                <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 glass-card px-6 py-4 rounded-xl animate-float">
                  <span className="font-display text-4xl lg:text-5xl font-bold text-red">5+</span>
                  <p className="font-body text-sm text-white/70">Years Experience</p>
                </div>

                {/* Badge 2 */}
                <div
                  className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 glass-card px-6 py-4 rounded-xl animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <span className="font-display text-4xl lg:text-5xl font-bold text-red">50+</span>
                  <p className="font-body text-sm text-white/70">Projects Completed</p>
                </div>

                {/* Badge 3 */}
                <div
                  className="absolute bottom-20 -right-8 lg:bottom-32 lg:-right-12 glass-card px-4 py-3 rounded-xl animate-float hidden lg:block"
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-body text-sm text-white/70">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="font-body text-xs uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-red rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-32 right-12 w-px h-32 bg-gradient-to-b from-transparent via-red/50 to-transparent hidden lg:block" />
      <div className="absolute bottom-32 left-12 w-px h-32 bg-gradient-to-b from-transparent via-red/50 to-transparent hidden lg:block" />
    </section>
  );
};

export default Hero;
