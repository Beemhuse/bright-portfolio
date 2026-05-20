import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Database,
  Paintbrush,
  Cloud,
  ArrowUpRight,
} from "lucide-react";

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const services = [
    {
      icon: Layers,
      title: "Frontend Development",
      description:
        "Building responsive, interactive user interfaces with modern frameworks like React, Vue, and Next.js.",
      features: [
        "React & Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Animation & Motion",
      ],
      color: "#C5A880",
    },
    {
      icon: Database,
      title: "Backend Architecture",
      description:
        "Designing robust APIs and server-side solutions that scale with your business needs.",
      features: [
        "Node.js & Express",
        "Nest.js",
        "Python & Django",
        "PostgreSQL & MongoDB",
        "GraphQL",
      ],
      color: "#DFCBAC",
    },
    {
      icon: Paintbrush,
      title: "UI/UX Design",
      description:
        "Creating intuitive, visually stunning designs that delight users and drive engagement.",
      features: [
        "Figma Prototyping",
        "Design Systems",
        "User Research",
        "Motion Design",
      ],
      color: "#A68B63",
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      description:
        "Streamlining deployment and infrastructure management for optimal performance.",
      features: [
        "AWS & Render",
        "Docker",
        "VPS",
        "CI/CD Pipelines",
        "Monitoring",
      ],
      color: "#BCA27E",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".services-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Cards entrance (keep visible even if ScrollTrigger doesn't fire)
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: {
            each: 0.12,
            from: "start",
          },
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Background glow pulse
      gsap.to(".services-glow", {
        scale: 1.2,
        opacity: 0.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on mobile and touchscreens to prevent scroll jumping/lag
    const isTouch = window.matchMedia("(pointer: coarse)").matches || 
                    !window.matchMedia("(hover: hover)").matches ||
                    window.innerWidth < 768;
    if (isTouch) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: -rotateY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    setHoveredCard(null);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Animated Background Glow */}
      <div className="services-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-red/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="services-header text-center mb-20">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-red mb-4 block">
            My Expertise
          </span>
          <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl font-bold mb-6">
            Services I Offer
          </h2>
          <p className="font-body text-lg text-neutral-600 max-w-2xl mx-auto">
            From concept to deployment, I provide end-to-end solutions that help
            businesses thrive in the digital landscape.
          </p>
        </div>

        {/* Services Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          style={{ perspective: "1500px" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-neutral-50 border border-neutral-200/60 p-6 lg:p-8 rounded-none cursor-pointer group relative overflow-hidden transition-all duration-500 hover:bg-neutral-100/50 hover:border-red/40"
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Animated Border Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${service.color}10 0%, transparent 60%, ${service.color}05 100%)`,
                }}
              />

              {/* Card Header */}
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500"
                  style={{
                    borderColor: hoveredCard === index ? service.color : "rgba(0, 0, 0, 0.08)",
                    background: hoveredCard === index ? `${service.color}15` : "transparent",
                  }}
                >
                  <service.icon
                    className="w-5 h-5 transition-colors duration-500"
                    style={{
                      color: hoveredCard === index ? service.color : "rgba(0, 0, 0, 0.4)",
                    }}
                  />
                </div>
                <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-red group-hover:bg-red group-hover:text-white transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-500" />
                </div>
              </div>

              {/* Card Content */}
              <h3 className="font-display text-xl uppercase tracking-wider font-semibold mb-4 group-hover:text-red transition-colors duration-500 relative z-10">
                {service.title}
              </h3>
              <p className="font-body text-xs text-neutral-500 mb-8 leading-relaxed relative z-10">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 relative z-10">
                {service.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-center gap-3 group/item"
                  >
                    <div className="w-1.5 h-1.5 bg-red/40 rounded-full flex-shrink-0 group-hover/item:bg-red group-hover/item:scale-125 transition-all duration-300" />
                    <span className="font-body text-xs text-neutral-600 group-hover/item:text-black transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Corner Accent */}
              <div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${service.color}08 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
