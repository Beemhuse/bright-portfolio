import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      quote: "Bright transformed our vision into reality. His technical expertise combined with an eye for design resulted in a product that exceeded our expectations. The attention to detail is remarkable.",
      author: 'Otun Hamed',
      role: 'CEO, TechVentures Inc.',
      avatar: 'SM',
      rating: 5,
    },
    {
      id: 2,
      quote: "Working with Bright was an absolute pleasure. He understood our requirements perfectly and delivered a scalable solution that has significantly improved our operations. Highly recommended!",
      author: 'Ekemini',
      role: 'Project Manager',
      avatar: 'MC',
      rating: 5,
    },
    {
      id: 3,
      quote: "The level of professionalism and creativity Bright brings to every project is outstanding. He doesn't just write code; he crafts experiences that users love.",
      author: 'Etiudo',
      role: 'Project Manager',
      avatar: 'ER',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Animate out
    gsap.to(quoteRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        // Animate in
        gsap.fromTo(quoteRef.current, 
          { opacity: 0, x: 50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        );
      }
    });
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Animate out
    gsap.to(quoteRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        // Animate in
        gsap.fromTo(quoteRef.current, 
          { opacity: 0, x: -50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        );
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.testimonial-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonial-card',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stats animation
      gsap.from('.stats-row > div', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-row',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden bg-dark"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="testimonials-header text-center mb-20">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-red mb-4 block">
            Client Voices
          </span>
          <h2 className="font-display text-4xl lg:text-6xl text-white xl:text-7xl font-bold tracking-tight">
            What They Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-card max-w-5xl mx-auto">
          <div className="relative bg-dark-light border border-white/5 p-8 sm:p-10 lg:p-16 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
            {/* Decorative Quote */}
            <div className="absolute top-8 right-8 opacity-5">
              <Quote className="w-24 h-24 sm:w-32 sm:h-32 text-red" />
            </div>

            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 lg:left-16 w-12 h-12 bg-red flex items-center justify-center shadow-glow">
              <Quote className="w-5 h-5 text-dark" />
            </div>

            {/* Testimonial Content */}
            <div ref={quoteRef} className="relative min-h-[220px] sm:min-h-[160px] md:min-h-[130px] pt-6 flex flex-col justify-between">
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-red fill-red" />
                  ))}
                </div>

                <blockquote className="font-body text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed mb-8">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red/5 flex items-center justify-center border border-red/20">
                  <span className="font-display text-base sm:text-lg font-bold text-red">
                    {testimonials[activeIndex].avatar}
                  </span>
                </div>
                <div>
                  <p className="font-display text-base sm:text-lg font-bold text-white">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="font-body text-xs text-white/50">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/5">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating && index !== activeIndex) {
                        setIsAnimating(true);
                        gsap.to(quoteRef.current, {
                          opacity: 0,
                          y: 10,
                          duration: 0.3,
                          onComplete: () => {
                            setActiveIndex(index);
                            gsap.to(quoteRef.current, {
                              opacity: 1,
                              y: 0,
                              duration: 0.5,
                              onComplete: () => setIsAnimating(false)
                            });
                          }
                        });
                      }
                    }}
                    className={`h-1 transition-all duration-500 ${
                      index === activeIndex
                        ? 'bg-red w-8'
                        : 'bg-white/10 hover:bg-white/30 w-3'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 border border-white/5 bg-dark flex items-center justify-center hover:border-red hover:bg-red transition-all duration-300 group"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-white/50 group-hover:text-dark transition-colors duration-300" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 border border-white/5 bg-dark flex items-center justify-center hover:border-red hover:bg-red transition-all duration-300 group"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-dark transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { value: '100%', label: 'Client Satisfaction' },
            { value: '50+', label: 'Projects Completed' },
            { value: '30+', label: 'Happy Clients' },
            { value: '5+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center group border border-white/5 bg-dark-light/50 p-6">
              <span className="font-display text-3xl lg:text-4xl font-bold text-red block mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="font-body text-xs text-white/40 tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
