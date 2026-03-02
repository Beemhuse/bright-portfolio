import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Send, Linkedin, Github, Twitter } from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".contact-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Form animation
      gsap.from(".contact-form > *", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Info animation
      gsap.from(".contact-info > *", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Social icons animation
      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".social-icons",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_np1n3m9",
        "template_0pd08wg",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "UMmovUZrNiSEogzYu",
      );
    } catch (e: any) {
      setIsSubmitting(false);
      console.error(e.message)
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }

    // Simulate form submission
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-red/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="contact-header text-center mb-20">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-red mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl font-bold mb-6">
            Let's Build the
            <br />
            <span className="text-red">Future Together</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision
            to life. I'm always excited to work on new challenges.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Form */}
          <div className="contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="relative group">
                <label
                  htmlFor="name"
                  className={`absolute left-0 font-body transition-all duration-300 pointer-events-none ${
                    focusedField === "name" || formData.name
                      ? "-top-6 text-sm text-red"
                      : "top-4 text-white/50"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white font-body focus:outline-none focus:border-red transition-colors duration-300"
                />
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-500"
                  style={{ width: focusedField === "name" ? "100%" : "0%" }}
                />
              </div>

              {/* Email Field */}
              <div className="relative group">
                <label
                  htmlFor="email"
                  className={`absolute left-0 font-body transition-all duration-300 pointer-events-none ${
                    focusedField === "email" || formData.email
                      ? "-top-6 text-sm text-red"
                      : "top-4 text-white/50"
                  }`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white font-body focus:outline-none focus:border-red transition-colors duration-300"
                />
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-500"
                  style={{ width: focusedField === "email" ? "100%" : "0%" }}
                />
              </div>

              {/* Message Field */}
              <div className="relative group">
                <label
                  htmlFor="message"
                  className={`absolute left-0 font-body transition-all duration-300 pointer-events-none ${
                    focusedField === "message" || formData.message
                      ? "-top-6 text-sm text-red"
                      : "top-4 text-white/50"
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white font-body focus:outline-none focus:border-red transition-colors duration-300 resize-none"
                />
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-500"
                  style={{ width: focusedField === "message" ? "100%" : "0%" }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="magnetic-btn w-full py-5 bg-red text-white font-body text-sm uppercase tracking-widest hover:bg-red-dark transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    Message Sent!
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-10">
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">
                Contact Information
              </h3>
              <p className="font-body text-white/60 leading-relaxed">
                Feel free to reach out through any of these channels. I'm always
                open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-red/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6 text-red group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-body text-sm text-white/50 mb-1">Email</p>
                  <a
                    href="mailto:hello@bright.dev"
                    className="font-body text-lg text-white hover:text-red transition-colors duration-300"
                  >
                    hello@bright.dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-red/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-red group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-body text-sm text-white/50 mb-1">
                    Location
                  </p>
                  <p className="font-body text-lg text-white">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-body text-sm text-white/50 mb-4">Follow Me</p>
              <div className="social-icons flex gap-4">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Twitter, href: "https://twitter.com" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red hover:scale-110 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass-card p-6 rounded-xl group hover:border-red/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="font-body text-sm text-white/70">
                  Available for new projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
