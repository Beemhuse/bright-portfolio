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
      author: 'Sarah Mitchell',
      role: 'CEO, TechVentures Inc.',
      avatar: 'SM',
      rating: 5,
    },
    {
      id: 2,
      quote: "Working with Bright was an absolute pleasure. He understood our requirements perfectly and delivered a scalable solution that has significantly improved our operations. Highly recommended!",
      author: 'Michael Chen',
      role: 'CTO, DataFlow Systems',
      avatar: 'MC',
      rating: 5,
    },
    {
      id: 3,
      quote: "The level of professionalism and creativity Bright brings to every project is outstanding. He doesn't just write code; he crafts experiences that users love.",
      author: 'Emily Rodriguez',
      role: 'Product Director, InnovateLab',
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
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="testimonials-header text-center mb-20">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-red mb-4 block">
            Client Voices
          </span>
          <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl font-bold">
            What They Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-card max-w-5xl mx-auto">
          <div className="relative glass-card rounded-3xl p-8 lg:p-16 overflow-hidden">
            {/* Decorative Quote */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-32 h-32 text-red" />
            </div>

            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 lg:left-16 w-12 h-12 bg-red rounded-xl flex items-center justify-center shadow-glow">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Testimonial Content */}
            <div ref={quoteRef} className="relative min-h-[280px] pt-6">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-red fill-red" />
                ))}
              </div>

              <blockquote className="font-body text-xl lg:text-2xl xl:text-3xl text-white/90 leading-relaxed mb-10">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-red/20 rounded-full flex items-center justify-center border-2 border-red/30">
                  <span className="font-display text-xl font-bold text-red">
                    {testimonials[activeIndex].avatar}
                  </span>
                </div>
                <div>
                  <p className="font-display text-xl font-bold">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="font-body text-sm text-white/50">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
              {/* Dots */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating && index !== activeIndex) {
                        setIsAnimating(true);
                        gsap.to(quoteRef.current, {
                          opacity: 0,
                          y: 20,
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
                    className={`h-3 rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? 'bg-red w-10'
                        : 'bg-white/20 hover:bg-white/40 w-3'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-red hover:bg-red transition-all duration-300 group hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-red hover:bg-red transition-all duration-300 group hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" />
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
            <div key={index} className="text-center group">
              <span className="font-display text-4xl lg:text-5xl font-bold text-red block mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="font-body text-sm text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
