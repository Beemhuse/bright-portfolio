import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Server, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code2, label: 'Frontend Development', desc: 'React, Next js, TypeScript' },
    { icon: Server, label: 'Backend Architecture', desc: 'Node.js, Python, Nest.js, PostgresSql' },
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
          toggleActions: 'play none none reverse',
        },
      });

      // Image reveal with diagonal wipe
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

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
          toggleActions: 'play none none reverse',
        },
      });

      // Stats counter animation with bounce
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat, index) => {
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          delay: index * 0.2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function () {
            const currentValue = Math.ceil(this.targets()[0].textContent || 0);
            stat.textContent = currentValue.toString();
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
          toggleActions: 'play none none reverse',
        },
      });

      // Floating element animation
      gsap.to('.floating-element', {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
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
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red/5 rounded-full blur-[150px] pointer-events-none" />

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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative"
            style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="/about-portrait.jpg"
                alt="Bright working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Element */}
            <div className="floating-element absolute -bottom-6 -right-6 glass-card p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-body text-sm text-white/70">Passion</p>
                  <p className="font-display text-xl font-bold">For Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="font-body text-lg lg:text-xl text-white/80 leading-relaxed mb-8">
              With over 5 years of experience in fullstack development, I specialize in 
              building scalable web applications that combine cutting-edge technology with 
              intuitive design. My journey began with a curiosity for how things work, which 
              evolved into a passion for creating digital solutions that make a difference.
            </p>
            <p className="font-body text-lg text-white/60 leading-relaxed mb-10">
              I believe that great software is born at the intersection of technical excellence 
              and user-centric design. Every project I undertake is an opportunity to push 
              boundaries and deliver something extraordinary.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
            >
              <div className="group cursor-default">
                <span
                  className="stat-number font-display text-4xl lg:text-5xl font-bold text-red block group-hover:scale-110 transition-transform duration-300"
                  data-target="5"
                >
                  5
                </span>
                <span className="font-body text-sm text-white/50">Years Experience</span>
              </div>
              <div className="group cursor-default">
                <span
                  className="stat-number font-display text-4xl lg:text-5xl font-bold text-red block group-hover:scale-110 transition-transform duration-300"
                  data-target="50"
                >
                  10
                </span>
                <span className="font-body text-sm text-white/50">Projects Done</span>
              </div>
              <div className="group cursor-default">
                <span
                  className="stat-number font-display text-4xl lg:text-5xl font-bold text-red block group-hover:scale-110 transition-transform duration-300"
                  data-target="30"
                >
                  10+
                </span>
                <span className="font-body text-sm text-white/50">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card glass-card p-6 rounded-xl hover:border-red/50 hover:bg-red/5 transition-all duration-500 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-red/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red group-hover:scale-110 transition-all duration-300">
                <skill.icon className="w-6 h-6 text-red group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-red transition-colors duration-300">{skill.label}</h3>
              <p className="font-body text-sm text-white/50">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
