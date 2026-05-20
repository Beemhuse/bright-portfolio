import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ExternalLink, Github, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  year: string;
}

const ProjectsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'VPSHub',
      category: 'Backend',
      description: 'VPSHub is a small control panel for deploying and previewing applications on remote VPS servers.',
      image: '/vpshub.png',
      tech: ['React', 'TypeScript', 'Prisma', 'Nest.js', 'PostgreSQL', 'Docker', ],
      liveUrl: '#',
      githubUrl: 'https://github.com/Beemhuse/vpshub.git',
      featured: true,
      year: '2026',
    },
     {
      id: 2,
      title: 'Gadget Cartel',
      category: 'E-commerce',
      description: 'A gadget e-commerce experience with seamless checkout, personalized recommendations, and immersive product showcases.',
      image: '/gadget-cartel.png',
      tech: ['Next.js', 'paystack', 'PostgreSQL', 'Tailwind', 'Nest js'],
      liveUrl: 'https://gadgetcartel.com',
      githubUrl: '#',
      featured: true,
      year: '2026',
    },
   {
      id: 3,
      title: 'Waelng Portfolio',
      category: 'Website',
      description: 'An award-winning portfolio site featuring WebGL animations, smooth transitions, and bold typography.',
      image: '/waelng.png',
      tech: ['Framer', 'Next js', 'Sanity', 'Tailwind'],
      liveUrl: 'https://waelng.com/',
      githubUrl: '#',
      featured: true,
      year: '2025',
    },
    // {
    //   id: 4,
    //   title: 'Gly Engineering',
    //   category: 'Website',
    //   description: 'High-performance REST API with real-time WebSocket connections, handling millions of requests daily.',
    //   image: '/gly.png',
      // tech: ['Framer', 'Next js', 'Sanity', 'Tailwind'],
    //   liveUrl: '#',
    //   githubUrl: '#',
    //   featured: false,
    //   year: '2023',
    // },
    // {
    //   id: 5,
    //   title: 'HealthTrack App',
    //   category: 'Mobile',
    //   description: 'Cross-platform health tracking application with wearable device integration and personalized insights.',
    //   image: '/project-ecommerce.jpg',
    //   tech: ['React Native', 'Firebase', 'GraphQL'],
    //   liveUrl: '#',
    //   githubUrl: '#',
    //   featured: false,
    //   year: '2023',
    // },
    {
      id: 6,
      title: 'AI Transcriber',
      category: 'AI/ML',
      description: 'AI-powered content voice platform with natural language processing and image generation capabilities.',
      image: '/echo.png',
      tech: ['Nest js', 'PostgreSQL', 'React', 'Tailwind', 'Gemini API', 'Assembly AI', 'websockets'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      year: '2025',
    },
    // {
    //   id: 7,
    //   title: 'CryptoTrader Pro',
    //   category: 'Fintech',
    //   description: 'Cryptocurrency trading platform with real-time market data, portfolio tracking, and automated trading bots.',
    //   image: '/project-dashboard.jpg',
    //   tech: ['Vue.js', 'Web3.js', 'Node.js', 'MongoDB'],
    //   liveUrl: '#',
    //   githubUrl: '#',
    //   featured: false,
    //   year: '2023',
    // },
    // {
    //   id: 8,
    //   title: 'Design System Kit',
    //   category: 'UI/UX',
    //   description: 'Comprehensive design system with 200+ components, tokens, and documentation for enterprise teams.',
    //   image: '/project-ecommerce.jpg',
    //   tech: ['Figma', 'Storybook', 'React', 'TypeScript'],
    //   liveUrl: '#',
    //   githubUrl: '#',
    //   featured: false,
    //   year: '2024',
    // },
  ];

  const categories = ['all', 'Analytics', 'E-commerce', 'Creative', 'Backend', 'Mobile', 'AI/ML', 'Fintech', 'Website'];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    // Scroll to top on mount using Lenis if available
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.projects-page-header', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Filter bar animation
      gsap.from('.filter-bar', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });

      // Project cards stagger animation
      gsap.fromTo(
        '.project-card-item',
        { y: 60 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  // 3D tilt effect for cards




  return (
    <div ref={pageRef} className="min-h-screen bg-dark text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur py-4 border-b border-white/5">
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-2xl lg:text-3xl font-bold tracking-wider text-white hover:text-red transition-colors duration-300"
          >
            BRIGHT
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-36 pb-20 px-6 lg:px-12">
        {/* Header */}
        <div className="projects-page-header max-w-7xl mx-auto mb-16">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-red mb-4 block">
            Portfolio
          </span>
          <h1 className="font-display text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight">
            All Projects
          </h1>
          <p className="font-body text-base text-white/50 max-w-2xl leading-relaxed">
            A comprehensive collection of my work across various technologies and industries. 
            Each project represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="filter-bar max-w-7xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-red mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 font-body text-xs tracking-wider uppercase transition-all duration-300 ${
                    filter === category
                      ? 'bg-red text-dark font-semibold'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 pl-12 pr-4 py-2.5 bg-dark-light border border-white/10 font-body text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-red focus:ring-1 focus:ring-red/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-item group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className="relative bg-dark-light border border-white/5 overflow-hidden cursor-pointer shadow-lg hover:border-red/35 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-90" />
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red text-dark font-body text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-dark">{project.year}</span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/5">
                      <span className="font-body text-[10px] uppercase tracking-wider text-white">Featured</span>
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 bg-dark/70 backdrop-blur-sm transition-opacity duration-300">
                    <a
                      href={project.liveUrl}
                      className="w-12 h-12 bg-white flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-red hover:scale-105"
                    >
                      <ExternalLink className="w-5 h-5 text-dark" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="w-12 h-12 bg-white flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-red hover:scale-105"
                    >
                      <Github className="w-5 h-5 text-dark" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 border-t border-white/5">
                  <span className="font-body text-[10px] uppercase tracking-widest text-red mb-2 block font-semibold">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-red transition-colors duration-300 text-white">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-white/50 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-2.5 py-0.5 border border-white/10 font-body text-[10px] uppercase tracking-wider text-white/60 bg-dark/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: hoveredProject === project.id
                      ? 'radial-gradient(400px circle at 50% 50%, rgba(197, 168, 128, 0.05), transparent 50%)'
                      : 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-lg text-white/40">
              No projects found matching your criteria.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: projects.length, label: 'Total Projects' },
              { value: projects.filter(p => p.featured).length, label: 'Featured' },
              { value: '15+', label: 'Technologies' },
              { value: '100%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center border border-white/5 bg-dark-light/50 p-6">
                <span className="font-display text-3xl lg:text-4xl font-bold text-red block mb-2">
                  {stat.value}
                </span>
                <span className="font-body text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 bg-dark-light/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-white/40 tracking-wider">
            © {new Date().getFullYear()} Bright. All rights reserved.
          </p>
          <Link
            to="/"
            className="font-body text-xs text-white/40 uppercase tracking-wider hover:text-red transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
