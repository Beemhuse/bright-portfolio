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
      title: 'Neon Dashboard',
      category: 'Analytics',
      description: 'A real-time analytics dashboard with dark mode, interactive charts, and AI-powered insights for enterprise clients.',
      image: '/project-dashboard.jpg',
      tech: ['React', 'TypeScript', 'D3.js', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      year: '2024',
    },
    {
      id: 2,
      title: 'Ethereal Commerce',
      category: 'E-commerce',
      description: 'A luxury e-commerce experience with seamless checkout, personalized recommendations, and immersive product showcases.',
      image: '/project-ecommerce.jpg',
      tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      year: '2024',
    },
    {
      id: 3,
      title: 'Kinetic Portfolio',
      category: 'Creative',
      description: 'An award-winning portfolio site featuring WebGL animations, smooth transitions, and bold typography.',
      image: '/project-portfolio.jpg',
      tech: ['Three.js', 'GSAP', 'React', 'Vite'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      year: '2023',
    },
    {
      id: 4,
      title: 'CloudSync API',
      category: 'Backend',
      description: 'High-performance REST API with real-time WebSocket connections, handling millions of requests daily.',
      image: '/project-dashboard.jpg',
      tech: ['Node.js', 'Redis', 'Docker', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      year: '2023',
    },
    {
      id: 5,
      title: 'HealthTrack App',
      category: 'Mobile',
      description: 'Cross-platform health tracking application with wearable device integration and personalized insights.',
      image: '/project-ecommerce.jpg',
      tech: ['React Native', 'Firebase', 'GraphQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      year: '2023',
    },
    {
      id: 6,
      title: 'AI Content Studio',
      category: 'AI/ML',
      description: 'AI-powered content generation platform with natural language processing and image generation capabilities.',
      image: '/project-portfolio.jpg',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      year: '2024',
    },
    {
      id: 7,
      title: 'CryptoTrader Pro',
      category: 'Fintech',
      description: 'Cryptocurrency trading platform with real-time market data, portfolio tracking, and automated trading bots.',
      image: '/project-dashboard.jpg',
      tech: ['Vue.js', 'Web3.js', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      year: '2023',
    },
    {
      id: 8,
      title: 'Design System Kit',
      category: 'UI/UX',
      description: 'Comprehensive design system with 200+ components, tokens, and documentation for enterprise teams.',
      image: '/project-ecommerce.jpg',
      tech: ['Figma', 'Storybook', 'React', 'TypeScript'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      year: '2024',
    },
  ];

  const categories = ['all', 'Analytics', 'E-commerce', 'Creative', 'Backend', 'Mobile', 'AI/ML', 'Fintech', 'UI/UX'];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

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
      gsap.from('.project-card-item', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  // 3D tilt effect for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: -rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredProject(null);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur py-4">
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-3xl font-bold tracking-wider text-white hover:text-red transition-colors duration-300"
          >
            BRIGHT
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 font-body text-sm uppercase tracking-widest text-white/70 hover:text-red transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 lg:px-12">
        {/* Header */}
        <div className="projects-page-header max-w-7xl mx-auto mb-16">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-red mb-4 block">
            Portfolio
          </span>
          <h1 className="font-display text-6xl lg:text-8xl xl:text-9xl font-bold mb-6">
            All Projects
          </h1>
          <p className="font-body text-lg text-white/60 max-w-2xl">
            A comprehensive collection of my work across various technologies and industries. 
            Each project represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="filter-bar max-w-7xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-red mr-2" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full font-body text-sm capitalize transition-all duration-300 ${
                    filter === category
                      ? 'bg-red text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 pl-12 pr-4 py-3 bg-white/5 rounded-full font-body text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red transition-all duration-300"
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
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="relative glass-card rounded-2xl overflow-hidden cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red/80 rounded-full">
                    <span className="font-body text-xs text-white">{project.year}</span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                      <span className="font-body text-xs text-white">Featured</span>
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a
                      href={project.liveUrl}
                      className="w-14 h-14 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 hover:bg-red hover:scale-110"
                    >
                      <ExternalLink className="w-6 h-6 text-black" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="w-14 h-14 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200 hover:bg-red hover:scale-110"
                    >
                      <Github className="w-6 h-6 text-black" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="font-body text-xs uppercase tracking-widest text-red mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-red transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-3 py-1 bg-white/5 rounded-full font-body text-xs text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: hoveredProject === project.id
                      ? 'radial-gradient(600px circle at 50% 50%, rgba(255, 0, 0, 0.1), transparent 40%)'
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
            <p className="font-body text-xl text-white/50">
              No projects found matching your criteria.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: projects.length, label: 'Total Projects' },
              { value: projects.filter(p => p.featured).length, label: 'Featured' },
              { value: '15+', label: 'Technologies' },
              { value: '100%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <span className="font-display text-4xl lg:text-5xl font-bold text-red block mb-2">
                  {stat.value}
                </span>
                <span className="font-body text-sm text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="font-body text-sm text-white/40">
            © {new Date().getFullYear()} Bright. All rights reserved.
          </p>
          <Link
            to="/"
            className="font-body text-sm text-white/40 hover:text-red transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
