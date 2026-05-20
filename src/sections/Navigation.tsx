import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.from('.nav-link', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.7,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  // Mobile menu stagger animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scroll when mobile menu is open
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';

      gsap.fromTo(
        '.mobile-menu-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.mobile-menu-drawer',
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.mobile-link',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      gsap.fromTo(
        '.mobile-footer',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.45,
        }
      );
    } else {
      // Re-enable scroll when mobile menu is closed
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
      document.body.style.overflow = '';

      gsap.to('.mobile-menu-overlay', { opacity: 0, duration: 0.4, ease: 'power2.in' });
      gsap.to('.mobile-menu-drawer', { xPercent: 100, duration: 0.5, ease: 'power3.in' });
    }

    return () => {
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Tiny delay to allow menu animation to close before scrolling
    setTimeout(() => {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 350);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'nav-blur py-4 border-b border-black/5 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="relative z-50">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="font-display text-3xl lg:text-4xl font-bold tracking-wider text-neutral-900 hover:text-red transition-colors duration-300"
            >
              BRIGHT
            </a>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="nav-link link-underline font-body text-[11px] uppercase tracking-widest text-neutral-600 hover:text-black transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="nav-link magnetic-btn px-6 py-2.5 border border-red/40 text-red font-body text-[11px] uppercase tracking-widest hover:bg-red hover:text-white hover:border-red transition-colors duration-300"
            >
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-800" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-800" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay fixed inset-0 z-40 bg-black/20 backdrop-blur-md md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Slide-in Drawer */}
      <div
        className={`mobile-menu-drawer fixed top-0 right-0 bottom-0 w-full sm:w-[480px] z-45 bg-white border-l border-neutral-100 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 sm:p-12 pt-32 shadow-xl ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="mobile-link font-display text-4xl sm:text-5xl tracking-wider text-neutral-700 hover:text-red hover:translate-x-2 transition-all duration-300 block"
            >
              {link.name}
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="mobile-link w-full text-center py-4 border border-red/40 text-red font-body text-xs uppercase tracking-widest hover:bg-red hover:text-white hover:border-red transition-all duration-300 mt-8 block"
          >
            Hire Me
          </a>
        </div>
        
        <div className="mobile-footer font-body text-[12px] text-neutral-400 pt-10 border-t border-neutral-100">
          <p>Enugu, Nigeria</p>
          <p className="mt-1">© {new Date().getFullYear()} Bright. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Navigation;
