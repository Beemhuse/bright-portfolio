import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Beemhuse' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/bright-awah-59b707223/' },
    { name: 'Twitter', href: 'https://twitter.com/D3_lores' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative py-20 lg:py-32 border-t border-white/5 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 mb-20">
            {/* Brand */}
            <div className="lg:col-span-1">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="font-display text-5xl lg:text-6xl font-bold  hover:text-red transition-colors duration-300 inline-block mb-6"
              >
                BRIGHT
              </a>
              <p className="font-body  leading-relaxed max-w-sm">
                Fullstack Software Engineer crafting digital experiences that 
                combine stunning design with powerful functionality.
              </p>
            </div>

            {/* Navigation */}
              <h4 className="font-display text-lg uppercase tracking-wider font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const lenis = (window as any).lenis;
                        if (lenis) {
                          lenis.scrollTo(link.href);
                        } else {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="font-body text-xs  hover:text-red transition-colors duration-300 link-underline uppercase tracking-wider"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

            {/* Social */}
            <div>
              <h4 className="font-display text-lg uppercase tracking-wider font-semibold mb-6">Connect</h4>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs  hover:text-red transition-colors duration-300 link-underline uppercase tracking-wider"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
            <p className="font-body text-xs  flex items-center gap-2 uppercase tracking-wider">
              Made with <Heart className="w-3.5 h-3.5 text-red fill-red" /> by Bright
            </p>

            <p className="font-body text-xs  uppercase tracking-wider">
              © {new Date().getFullYear()} Bright. All rights reserved.
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-red hover:bg-red transition-all duration-500 group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-white/40 group-hover:text-dark transition-colors duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none z-0">
        <span className="font-display text-[15vw] sm:text-[18vw] lg:text-[20vw] font-bold text-white/[0.02] whitespace-nowrap block text-center leading-none">
          BRIGHT
        </span>
      </div>
    </footer>
  );
};

export default Footer;
