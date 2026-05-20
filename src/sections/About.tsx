import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Server, Palette, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code2, label: 'Frontend Development', desc: 'React, Next.js, TypeScript' },
    { icon: Server, label: 'Backend Architecture', desc: 'Node.js, Python, Nest.js, PostgreSQL' },
    { icon: Palette, label: 'UI/UX Design', desc: 'Figma, Motion Design' },
    { icon: Sparkles, label: 'Performance', desc: 'Optimization, SEO' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.about-header > *', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Typographic Blockquote Animation
      gsap.from(imageRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Content slide animation with stagger
      gsap.from(contentRef.current?.children || [], {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      // Stats counter animation with smooth custom properties
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat, index) => {
        const targetValue = parseInt(stat.getAttribute('data-target') || '0', 10);
        const hasPlus = stat.getAttribute('data-plus') === 'true' || stat.textContent?.includes('+');
        
        const counter = { val: 0 };
        gsap.to(counter, {
          val: targetValue,
          duration: 2,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            const currentValue = Math.floor(counter.val);
            stat.textContent = currentValue.toString() + (hasPlus ? '+' : '');
          },
        });
      });

      // Skill cards stagger with rotation
      gsap.from('.skill-card', {
        y: 80,
        opacity: 0,
        rotateZ: (i) => (i % 2 === 0 ? -3 : 3),
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red/2 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="about-header mb-20">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-red mb-4 block">
            About Me
          </span>
          <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl font-bold">
            Crafting Digital
            <br />
            <span className="text-red">Experiences</span>
          </h2>
        </div>

        {/* Main Typographic Layout Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch mb-28">
          {/* Typographic Blockquote Column */}
          <div
            ref={imageRef}
            className="flex flex-col justify-center border-l-2 border-red/25 pl-6 sm:pl-8 py-4"
          >
            <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl font-light italic text-red/90 leading-tight tracking-tight">
              "I believe that great software is born at the intersection of technical excellence and user-centric design."
            </blockquote>
          </div>

          {/* Biography Content & Stats Column */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <p className="font-body text-lg lg:text-xl text-neutral-700 leading-relaxed mb-6">
              With over 5 years of experience in fullstack development, I specialize in 
              building scalable web applications that combine cutting-edge technology with 
              intuitive design. My journey began with a curiosity for how things work, which 
              evolved into a passion for creating digital solutions that make a difference.
            </p>
            <p className="font-body text-base text-neutral-500 leading-relaxed mb-10">
              Every project I undertake is an opportunity to push boundaries, craft robust 
              architectures, and deliver seamless, delightful digital experiences for users globally.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 sm:gap-8 border-t border-neutral-200 pt-8"
            >
              <div className="group cursor-default">
                <span
                  className="stat-number font-display text-4xl lg:text-5xl font-bold text-red block group-hover:scale-110 transition-transform duration-300"
                  data-target="5"
                  data-plus="true"
                >
                  0
                </span>
                <span className="font-body text-sm text-neutral-500">Years Experience</span>
              </div>
              <div className="group cursor-default">
                <span
                  className="stat-number font-display text-4xl lg:text-5xl font-bold text-red block group-hover:scale-110 transition-transform duration-300"
                  data-target="50"
                  data-plus="true"
                >
                  0
                </span>
                <span className="font-body text-sm text-neutral-500">Projects Done</span>
              </div>
              <div className="group cursor-default">
                <span
                  className="stat-number font-display text-4xl lg:text-5xl font-bold text-red block group-hover:scale-110 transition-transform duration-300"
                  data-target="30"
                  data-plus="true"
                >
                  0
                </span>
                <span className="font-body text-sm text-neutral-500">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card bg-neutral-50 p-8 border border-neutral-200/60 transition-all duration-500 group cursor-pointer hover:bg-neutral-100/50 hover:border-red/35"
            >
              <div className="w-10 h-10 border border-red/10 rounded-full flex items-center justify-center mb-6 group-hover:border-red group-hover:bg-red/5 transition-all duration-300">
                <skill.icon className="w-5 h-5 text-red transition-colors duration-300" />
              </div>
              <h3 className="font-display text-lg uppercase tracking-wider font-semibold mb-2 group-hover:text-red transition-colors duration-300">{skill.label}</h3>
              <p className="font-body text-xs text-neutral-500 tracking-wide leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

