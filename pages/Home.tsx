import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { UrbikCanvas, VisualPreset } from '../components/UrbikCanvas';
import { UrbikNavDock } from '../components/UrbikNavDock';
import { MediaViewerModal } from '../components/MediaViewerModal';
import { 
  X, 
  ExternalLink, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Globe, 
  Smartphone, 
  Database, 
  ShoppingCart, 
  Code2, 
  Calendar,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';

import heroImage from '../assets/images/mubashir2.webp';
import cvFile from '../assets/images/MUBASHIRT.pdf';

export const Home: React.FC = () => {
  const { data } = useData();
  const [activeTab, setActiveTab] = useState<'general' | 'developer' | 'projects' | 'contact'>('general');
  const [visualPreset, setVisualPreset] = useState<VisualPreset>('particles');
  const [isContentClosed, setIsContentClosed] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{
    src: string;
    title: string;
    caption?: string;
    link?: string;
    tags?: string[];
  } | null>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe size={22} className="text-[var(--ds-color-accent)]" />;
      case 'Smartphone': return <Smartphone size={22} className="text-[var(--ds-color-accent)]" />;
      case 'Database': return <Database size={22} className="text-[var(--ds-color-accent)]" />;
      case 'ShoppingCart': return <ShoppingCart size={22} className="text-[var(--ds-color-accent)]" />;
      default: return <Code2 size={22} className="text-[var(--ds-color-accent)]" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--ds-color-bg)] text-[var(--ds-color-text)] overflow-hidden">
      {/* 1. Fullscreen Interactive Generative Canvas */}
      <UrbikCanvas preset={visualPreset} />

      {/* 2. Urbik Fixed Header */}
      <header className="header">
        <div className="header__wrap">
          <h1 className="header__headline">{data.profile.name}</h1>
          <h2 className="header__sub">
            Full Stack Developer | Laravel & React | System Architect
          </h2>
        </div>

        {/* Glow Circular Close/Toggle Button */}
        <button
          type="button"
          tabIndex={0}
          className="header__close"
          onClick={() => setIsContentClosed(!isContentClosed)}
          title={isContentClosed ? "Show Content" : "Hide Content / View Visual Canvas"}
          aria-label={isContentClosed ? "Show Content" : "Hide Content"}
        >
          {isContentClosed ? (
            <Maximize2 size={20} className="text-[#080909]" />
          ) : (
            <X size={22} className="text-[#080909]" />
          )}
        </button>
      </header>

      {/* 3. Main Content Area with slide transitions */}
      <main className={`content ${isContentClosed ? 'content--closed' : ''}`}>
        <div className="content__wrap">
          
          {/* ==================== TAB 00: GENERAL ==================== */}
          {activeTab === 'general' && (
            <div className="ds-article animate-fadeIn">
              {/* Quick Links Bar */}
              <nav className="ds-link-bar" aria-label="Links">
                <span className="ds-link-bar__label">Links</span>
                <ul className="ds-link-bar__list">
                  <li className="ds-link-bar__item">
                    <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={data.profile.socials.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer">
                      LinkedIn Profile
                    </a>
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={data.profile.socials.github || "https://github.com"} target="_blank" rel="noreferrer">
                      GitHub Repos
                    </a>
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={`tel:${data.profile.phone}`}>{data.profile.phone}</a>
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={cvFile} download="MUBASHIRT.pdf" className="text-[var(--ds-color-accent)] font-semibold flex items-center gap-1">
                      Download CV <Download size={12} />
                    </a>
                  </li>
                </ul>
              </nav>

              {/* 00 / ABOUT SECTION */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">00 / ABOUT</div>
                  <h2 className="ds-heading ds-heading--h3">Full-Stack Engineer & System Architect</h2>
                </header>

                <div className="ds-article__body">
                  <div className="ds-media-row">
                    <div className="ds-media-row__body">
                      <p className="ds-text ds-text--lead">
                        Hello, I’m Mubashir T — a Kerala-based Full-Stack Web and Mobile Developer specializing in robust backend architectures, ERP systems, and modern web applications.
                      </p>
                      <p className="ds-text ds-text--body">
                        {data.profile.summary}
                      </p>
                      <p className="ds-text ds-text--body">
                        With over 5 years of professional experience across diverse industry domains, I build platforms that bridge complex enterprise workflows with fast, intuitive user experiences — spanning Laravel backends, React applications, ERPNext automation, and cross-platform Flutter deployments.
                      </p>
                    </div>

                    <div className="ds-media-row__figure">
                      <figure className="ds-figure">
                        <div 
                          className="ds-figure__img-wrap cursor-pointer group relative"
                          onClick={() => setSelectedMedia({
                            src: heroImage,
                            title: 'Mubashir T',
                            caption: 'Full-stack developer & software engineer based in Kerala, India.',
                          })}
                        >
                          <img 
                            className="ds-figure__img" 
                            src={heroImage} 
                            alt="Mubashir T" 
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="font-mono text-xs uppercase text-[var(--ds-color-accent)] tracking-widest flex items-center gap-1">
                              <Maximize2 size={14} /> Enlarge
                            </span>
                          </div>
                        </div>
                        <figcaption className="ds-figure__caption">
                          Mubashir T / Full Stack Engineer
                        </figcaption>
                      </figure>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="ds-stats" style={{ '--ds-stats-columns': 4 } as React.CSSProperties}>
                    <div className="ds-stats__item">
                      <div className="ds-stats__value">Kerala</div>
                      <div className="ds-stats__label">
                        <strong>Base</strong>India
                      </div>
                    </div>
                    <div className="ds-stats__item">
                      <div className="ds-stats__value">5+</div>
                      <div className="ds-stats__label">
                        <strong>Experience</strong>Years Professionally
                      </div>
                    </div>
                    <div className="ds-stats__item">
                      <div className="ds-stats__value">Full-Stack</div>
                      <div className="ds-stats__label">
                        <strong>Primary Field</strong>Laravel & React
                      </div>
                    </div>
                    <div className="ds-stats__item">
                      <div className="ds-stats__value">20+</div>
                      <div className="ds-stats__label">
                        <strong>Delivered</strong>Systems & Platforms
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 01 / PROFILE SECTION */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">01 / PROFILE</div>
                  <h2 className="ds-heading ds-heading--h3">Three Pillars of My Technical Practice</h2>
                </header>

                <div className="ds-article__body">
                  <div className="ds-card-grid">
                    <article className="ds-card">
                      <div className="ds-mono ds-mono--label">01</div>
                      <h3 className="ds-heading ds-heading--h4">Scalable Backend Architecture</h3>
                      <p className="ds-text ds-text--body">
                        Expertise in Laravel, PHP, RESTful APIs, MySQL optimization, and microservice patterns. Designing database schemas and high-throughput background processing for reliability.
                      </p>
                    </article>

                    <article className="ds-card">
                      <div className="ds-mono ds-mono--label">02</div>
                      <h3 className="ds-heading ds-heading--h4">Modern Frontend & UI Engineering</h3>
                      <p className="ds-text ds-text--body">
                        Building reactive, high-performance interfaces using React.js, TypeScript, and modern styling architectures. Focused on smooth interactions, clean state modeling, and responsiveness.
                      </p>
                    </article>

                    <article className="ds-card">
                      <div className="ds-mono ds-mono--label">03</div>
                      <h3 className="ds-heading ds-heading--h4">ERPNext & Enterprise Solutions</h3>
                      <p className="ds-text ds-text--body">
                        Custom administrative dashboards, CRM systems, HRM portals, and ERPNext implementations that automate end-to-end business workflows and eliminate operational bottlenecks.
                      </p>
                    </article>
                  </div>
                </div>
              </section>

              {/* 02 / PHILOSOPHY SECTION */}
              <section className="ds-article__section">
                <div className="ds-article__body">
                  <div className="ds-media-row ds-media-row--reverse">
                    <div className="ds-media-row__body">
                      <div className="ds-mono ds-mono--index">CORE PRINCIPLE</div>
                      <h2 className="ds-heading ds-heading--h3">Resilient Code & Pragmatic Delivery</h2>
                      <p className="ds-text ds-text--body">
                        I believe in software that performs reliably under real-world loads. Code should be clean, modular, and easy to maintain by teams long after the initial commit.
                      </p>
                      <blockquote className="ds-quote">
                        "Great engineering is about <em className="ds-quote__accent">making complex systems feel effortless</em> to the people using them every single day."
                      </blockquote>
                    </div>
                    <div className="ds-media-row__figure">
                      <div className="p-6 bg-[#101212] border border-[var(--ds-color-line)] text-left font-mono text-xs">
                        <div className="text-[var(--ds-color-accent)] font-bold mb-3">// ARCHITECTURE CHECKLIST</div>
                        <ul className="space-y-2 text-zinc-400">
                          <li className="flex items-center gap-2">
                            <span className="text-[var(--ds-color-accent)]">✓</span> REST / GraphQL API Design
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[var(--ds-color-accent)]">✓</span> Database Indexing & Query Tuning
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[var(--ds-color-accent)]">✓</span> Payment Gateways (Stripe, Razorpay)
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[var(--ds-color-accent)]">✓</span> Robust Error Boundaries & Logging
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[var(--ds-color-accent)]">✓</span> Cross-Platform Mobile Sync
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==================== TAB 01: DEVELOPER ==================== */}
          {activeTab === 'developer' && (
            <div className="ds-article animate-fadeIn">
              {/* Quick Links Bar */}
              <nav className="ds-link-bar" aria-label="Links">
                <span className="ds-link-bar__label">Developer Links</span>
                <ul className="ds-link-bar__list">
                  <li className="ds-link-bar__item">
                    <a href={data.profile.socials.github || "https://github.com"} target="_blank" rel="noreferrer">
                      Git Repositories
                    </a>
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={data.profile.socials.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer">
                      LinkedIn Experience
                    </a>
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={cvFile} download="MUBASHIRT.pdf">Download PDF Resume</a>
                  </li>
                  <li className="ds-link-bar__item">
                    <button onClick={() => setActiveTab('contact')} className="text-[var(--ds-color-accent)] hover:underline">
                      Inquire for Hire
                    </button>
                  </li>
                </ul>
              </nav>

              {/* 01 / TECH SPECIFICATION */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">01 / STACK & CAPABILITIES</div>
                  <h2 className="ds-heading ds-heading--h3">Technical Capabilities & Tooling</h2>
                </header>

                <div className="ds-article__body">
                  <p className="ds-text ds-text--body">
                    My core foundation centers on the PHP/Laravel ecosystem for scalable backends alongside modern TypeScript/React and Flutter for engaging client experiences. I frequently engineer RESTful APIs, third-party integrations, database optimizations, and administrative portals.
                  </p>

                  <div className="mt-6">
                    <div className="font-mono text-xs uppercase text-[var(--ds-color-accent)] tracking-widest mb-3">
                      PRIMARY TECHNOLOGIES & FRAMEWORKS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill) => (
                        <div
                          key={skill}
                          className="px-3.5 py-1.5 bg-[#101212] border border-[var(--ds-color-line)] text-zinc-300 font-mono text-xs hover:border-[var(--ds-color-accent)] hover:text-[var(--ds-color-accent)] transition-all cursor-default"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 02 / CAREER TIMELINE */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">02 / CAREER PATH</div>
                  <h2 className="ds-heading ds-heading--h3">Professional Experience Timeline</h2>
                </header>

                <div className="ds-article__body">
                  <div className="ds-record-list">
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="ds-record flex flex-col p-5">
                        <div className="w-full flex items-center justify-between flex-wrap gap-2 mb-2">
                          <div className="flex items-center gap-3">
                            <span className="ds-record__dot" />
                            <strong className="ds-record__title text-base text-white">{exp.role}</strong>
                            <span className="font-mono text-xs text-[var(--ds-color-accent)] px-2 py-0.5 border border-zinc-700 bg-black/40">
                              {exp.company}
                            </span>
                          </div>
                          <span className="ds-record__meta flex items-center gap-1">
                            <Calendar size={13} /> {exp.period}
                          </span>
                        </div>
                        <ul className="w-full space-y-1.5 pl-5 list-disc text-zinc-400 text-sm">
                          {exp.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 03 / SERVICES */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">03 / SERVICES & SOLUTIONS</div>
                  <h2 className="ds-heading ds-heading--h3">What I Build For Clients & Companies</h2>
                </header>

                <div className="ds-article__body">
                  <div className="ds-card-grid">
                    {data.services.map((service) => (
                      <article key={service.id} className="ds-card">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2.5 bg-[#0b0d0d] border border-[var(--ds-color-line)]">
                            {getServiceIcon(service.icon)}
                          </div>
                          <span className="font-mono text-xs text-zinc-500 uppercase">{service.id}</span>
                        </div>
                        <h3 className="ds-heading ds-heading--h4">{service.title}</h3>
                        <p className="ds-text ds-text--body">{service.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {/* 04 / EDUCATION */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">04 / BACKGROUND</div>
                  <h2 className="ds-heading ds-heading--h3">Education & Credentials</h2>
                </header>

                <div className="ds-article__body">
                  <div className="ds-record-list">
                    <div className="ds-record flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="ds-record__dot" />
                        <div>
                          <strong className="ds-record__title">Bachelor of Computer Science (B.Sc)</strong>
                          <div className="text-xs text-zinc-400">Calicut University</div>
                        </div>
                      </div>
                      <span className="ds-record__meta">2017 – 2020</span>
                    </div>

                    <div className="ds-record flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="ds-record__dot" />
                        <div>
                          <strong className="ds-record__title">MCSE & CCNA Training</strong>
                          <div className="text-xs text-zinc-400">Soften Technologies (System & Network Engineering)</div>
                        </div>
                      </div>
                      <span className="ds-record__meta">2020 – 2021</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==================== TAB 02: PROJECTS ==================== */}
          {activeTab === 'projects' && (
            <div className="ds-article animate-fadeIn">
              {/* Quick Links Bar */}
              <nav className="ds-link-bar" aria-label="Links">
                <span className="ds-link-bar__label">Project Registry</span>
                <ul className="ds-link-bar__list">
                  <li className="ds-link-bar__item">
                    <span className="text-zinc-400">Total Live Deployments:</span> {data.projects.length}
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={data.profile.socials.github || "https://github.com"} target="_blank" rel="noreferrer">
                      View Code Repositories
                    </a>
                  </li>
                </ul>
              </nav>

              {/* 01 / FEATURED PROJECTS */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">01 / PRODUCTION SYSTEMS</div>
                  <h2 className="ds-heading ds-heading--h3">Featured Projects & Web Deployments</h2>
                </header>

                <div className="ds-article__body">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {data.projects.map((project, idx) => (
                      <article 
                        key={project.id} 
                        className="ds-card flex flex-col justify-between group"
                      >
                        <div>
                          {/* Image preview with hover zoom */}
                          <div 
                            className="aspect-video w-full mb-4 overflow-hidden border border-[var(--ds-color-line)] bg-black relative cursor-pointer"
                            onClick={() => setSelectedMedia({
                              src: project.image,
                              title: project.title,
                              caption: project.description,
                              link: project.link,
                              tags: project.tags,
                            })}
                          >
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="font-mono text-xs uppercase text-[var(--ds-color-accent)] tracking-widest flex items-center gap-1.5 bg-black/80 px-3 py-1.5 border border-[var(--ds-color-accent)]">
                                <Maximize2 size={13} /> INSPECT PREVIEW
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs text-[var(--ds-color-accent)] font-semibold">
                              0{idx + 1} / {project.tags[0] || 'SYSTEM'}
                            </span>
                          </div>

                          <h3 className="ds-heading ds-heading--h4 text-xl">{project.title}</h3>
                          <p className="ds-text ds-text--body mb-4">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="font-mono text-[10px] uppercase px-2 py-0.5 bg-[#0b0d0d] border border-zinc-800 text-zinc-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action link */}
                        {project.link && (
                          <div className="pt-4 border-t border-[var(--ds-color-line)] flex items-center justify-between">
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="terminal-btn-ghost text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
                            >
                              VISIT SITE <ExternalLink size={12} />
                            </a>
                            <button
                              type="button"
                              onClick={() => setSelectedMedia({
                                src: project.image,
                                title: project.title,
                                caption: project.description,
                                link: project.link,
                                tags: project.tags,
                              })}
                              className="font-mono text-[11px] text-zinc-400 hover:text-white"
                            >
                              VIEW MEDIA
                            </button>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==================== TAB 03: CONTACT ==================== */}
          {activeTab === 'contact' && (
            <div className="ds-article animate-fadeIn">
              {/* Quick Links Bar */}
              <nav className="ds-link-bar" aria-label="Links">
                <span className="ds-link-bar__label">Direct Access</span>
                <ul className="ds-link-bar__list">
                  <li className="ds-link-bar__item">
                    <button 
                      onClick={() => copyToClipboard(data.profile.email, 'email')}
                      className="hover:text-[var(--ds-color-accent)]"
                    >
                      {copiedText === 'email' ? '✓ Copied Email' : data.profile.email}
                    </button>
                  </li>
                  <li className="ds-link-bar__item">
                    <button 
                      onClick={() => copyToClipboard(data.profile.phone, 'phone')}
                      className="hover:text-[var(--ds-color-accent)]"
                    >
                      {copiedText === 'phone' ? '✓ Copied Phone' : data.profile.phone}
                    </button>
                  </li>
                  <li className="ds-link-bar__item">
                    <a href={cvFile} download="MUBASHIRT.pdf">Get Curriculum Vitae</a>
                  </li>
                </ul>
              </nav>

              {/* 01 / INITIATE CONTACT */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">01 / INITIATE CONTACT</div>
                  <h2 className="ds-heading ds-heading--h3">Let's Build Something Exceptional</h2>
                </header>

                <div className="ds-article__body">
                  <p className="ds-text ds-text--lead">
                    Have an upcoming project, system architecture inquiry, or looking to hire a full-stack engineer? Send a direct dispatch below.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                    {/* Form Column */}
                    <div className="lg:col-span-2">
                      <form 
                        action="https://api.web3forms.com/submit" 
                        method="POST"
                        onSubmit={() => setFormSubmitted(true)}
                        className="space-y-4"
                      >
                        <input type="hidden" name="access_key" value="72f1fc99-6f53-40f8-ac3c-b1665887aaf8" />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                              01 // Your Name
                            </label>
                            <input 
                              type="text" 
                              name="name" 
                              required 
                              placeholder="Alex Mercer"
                              className="terminal-input"
                            />
                          </div>

                          <div>
                            <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                              02 // Email Address
                            </label>
                            <input 
                              type="email" 
                              name="email" 
                              required 
                              placeholder="alex@example.com"
                              className="terminal-input"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                            03 // Subject
                          </label>
                          <input 
                            type="text" 
                            name="subject" 
                            required 
                            placeholder="Full Stack Platform Inquiry"
                            className="terminal-input"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                            04 // Message Details
                          </label>
                          <textarea 
                            name="message" 
                            rows={5} 
                            required 
                            placeholder="Describe your technical requirements, scope, or timeline..."
                            className="terminal-input resize-none"
                          />
                        </div>

                        <button type="submit" className="terminal-btn w-full justify-center">
                          {formSubmitted ? (
                            <>
                              <Check size={16} /> DISPATCH TRANSMITTED
                            </>
                          ) : (
                            <>
                              TRANSMIT MESSAGE <Send size={15} />
                            </>
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Coordinates Column */}
                    <div className="space-y-4">
                      <div className="p-5 bg-[#101212] border border-[var(--ds-color-line)] text-left">
                        <div className="flex items-center gap-2 text-[var(--ds-color-accent)] font-mono text-xs uppercase mb-2">
                          <Mail size={14} /> Electronic Mail
                        </div>
                        <div className="text-white font-mono text-sm break-all">{data.profile.email}</div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(data.profile.email, 'email-card')}
                          className="mt-2 text-xs font-mono text-zinc-400 hover:text-[var(--ds-color-accent)]"
                        >
                          {copiedText === 'email-card' ? '✓ Copied' : 'Copy address'}
                        </button>
                      </div>

                      <div className="p-5 bg-[#101212] border border-[var(--ds-color-line)] text-left">
                        <div className="flex items-center gap-2 text-[var(--ds-color-accent)] font-mono text-xs uppercase mb-2">
                          <Phone size={14} /> Direct Telephone
                        </div>
                        <div className="text-white font-mono text-sm">{data.profile.phone}</div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(data.profile.phone, 'phone-card')}
                          className="mt-2 text-xs font-mono text-zinc-400 hover:text-[var(--ds-color-accent)]"
                        >
                          {copiedText === 'phone-card' ? '✓ Copied' : 'Copy number'}
                        </button>
                      </div>

                      <div className="p-5 bg-[#101212] border border-[var(--ds-color-line)] text-left">
                        <div className="flex items-center gap-2 text-[var(--ds-color-accent)] font-mono text-xs uppercase mb-2">
                          <MapPin size={14} /> Station Location
                        </div>
                        <div className="text-zinc-300 font-mono text-xs leading-relaxed">{data.profile.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 02 / TESTIMONIALS */}
              <section className="ds-article__section">
                <header className="ds-article__header">
                  <div className="ds-mono ds-mono--index">02 / ENDORSEMENTS</div>
                  <h2 className="ds-heading ds-heading--h3">Client & Leadership Testimonials</h2>
                </header>

                <div className="ds-article__body">
                  <div className="ds-card-grid">
                    {data.testimonials.map((t) => (
                      <article key={t.id} className="ds-card">
                        <blockquote className="ds-quote border-l-2 border-[var(--ds-color-accent)] pl-4 py-1 my-2 bg-transparent text-sm text-zinc-200">
                          "{t.text}"
                        </blockquote>
                        <div className="mt-4 pt-3 border-t border-[var(--ds-color-line)] flex items-center gap-3">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-zinc-700" />
                          <div>
                            <div className="font-bold text-white text-sm capitalize">{t.name}</div>
                            <div className="font-mono text-xs text-zinc-500">{t.role}, {t.company}</div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

        </div>
      </main>

      {/* 4. Fixed Urbik Bottom Dock Navigation */}
      <UrbikNavDock
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
        visualPreset={visualPreset}
        onVisualPresetChange={(preset) => setVisualPreset(preset)}
        isContentClosed={isContentClosed}
        onToggleContent={() => setIsContentClosed(!isContentClosed)}
      />

      {/* 5. Lightbox Media Viewer Modal */}
      <MediaViewerModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />
    </div>
  );
};
