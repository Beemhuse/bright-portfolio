import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      id: 1,
      title: 'VPS Hub',
      category: 'Deployment Platform',
      description: 'VPSHub is a small control panel for deploying and previewing applications on remote VPS servers.',
      image: '/vpshub.png',
      tech: ['React', 'TypeScript', 'Prisma', 'Nest.js', 'PostgreSQL', 'Docker', ],
      liveUrl: '#',
      githubUrl: 'https://github.com/Beemhuse/vpshub.git',
    },
    {
      id: 2,
      title: 'Gadget Cartel',
      category: 'E-commerce Platform',
      description: 'A gadget e-commerce experience with seamless checkout, personalized recommendations, and immersive product showcases.',
      image: '/gadget-cartel.png',
      tech: ['Next.js', 'paystack', 'PostgreSQL', 'Tailwind', 'Nest js'],
      liveUrl: 'https://gadgetcartel.com',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Waelng Portfolio',
      category: 'Energy Company Website',
      description: 'An award-winning portfolio site featuring WebGL animations, smooth transitions, and bold typography.',
      image: '/waelng.png',
      tech: ['Framer', 'Next js', 'Sanity', 'Tailwind'],
      liveUrl: 'https://waelng.com/',
      githubUrl: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation with more drama
      gsap.from('.projects-header > *', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Project cards with more dynamic entrance
      projects.forEach((_, index) => {
        const card = document.querySelector(`#project-${index}`);
        const title = document.querySelector(`#project-title-${index}`);
        const content = document.querySelector(`#project-content-${index}`);

        if (card && title && content) {
          // Background title parallax - faster
          gsap.to(title, {
            x: '30%',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          });

          // Image reveal with scale
          gsap.fromTo(
            card.querySelector('.project-image'),
            { scale: 1.2, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'center center',
                scrub: 1,
              },
            }
          );

          // Content slide in
          gsap.from(content, {
            x: index % 2 === 0 ? 80 : -80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // View all button bounce in
      gsap.from('.view-all-btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.view-all-btn',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="projects-header flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
          <div>
            <span className="font-body text-sm uppercase tracking-[0.3em] text-red mb-4 block">
              Selected Works
            </span>
            <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl font-bold">
              Featured
              <br />
              <span className="text-red">Projects</span>
            </h2>
          </div>
          <p className="font-body text-lg text-white/60 max-w-md mt-6 lg:mt-0">
            A curated selection of projects that showcase my expertise in design, 
            development, and problem-solving.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-32 lg:space-y-40">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${index}`}
              className="relative"
            >
              {/* Background Title - Large outlined number */}
              <div
                id={`project-title-${index}`}
                className="absolute -top-20 left-0 pointer-events-none select-none z-0"
              >
                <span className="font-display text-[20vw] font-bold outline-text opacity-20">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Project Card */}
              <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image */}
                <div
                  className={`relative overflow-hidden rounded-2xl group ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Animated Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4">
                    <a
                      href={project.liveUrl}
                      className="w-14 h-14 bg-white rounded-full flex items-center justify-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:scale-110 hover:bg-red"
                    >
                      <ExternalLink className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="w-14 h-14 bg-white rounded-full flex items-center justify-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:scale-110 hover:bg-red"
                    >
                      <Github className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                    </a>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-red transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" 
                       style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                </div>

                {/* Content */}
                <div 
                  id={`project-content-${index}`}
                  className={index % 2 === 1 ? 'lg:order-1' : ''}
                >
                  <span className="font-body text-sm uppercase tracking-[0.2em] text-red mb-4 block">
                    {project.category}
                  </span>
                  <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 group-hover:text-red transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-lg text-white/60 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-4 py-2 bg-white/5 rounded-full font-body text-sm text-white/70 hover:bg-red/20 hover:text-red transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-3 font-body text-sm uppercase tracking-widest text-white hover:text-red transition-colors duration-300 group/link"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-5 h-5 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-32">
          <Link
            to="/projects"
            className="view-all-btn magnetic-btn inline-flex items-center gap-4 px-10 py-5 border-2 border-white/30 rounded-full font-body text-sm uppercase tracking-widest hover:border-red hover:bg-red transition-all duration-500 group"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
