import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { PublicLayout } from '../components/Layout';
import { Button } from '../components/Button';
import { ArrowRight, Download, Globe, Smartphone, Database, ShoppingCart, Send, Code, ExternalLink, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const { data } = useData();
  
  // Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="h-8 w-8 text-brand-400" />;
      case 'Smartphone': return <Smartphone className="h-8 w-8 text-brand-400" />;
      case 'Database': return <Database className="h-8 w-8 text-brand-400" />;
      case 'ShoppingCart': return <ShoppingCart className="h-8 w-8 text-brand-400" />;
      default: return <Code className="h-8 w-8 text-brand-400" />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/muba4shir@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formState,
          _subject: `New Portfolio Message: ${formState.subject || 'No Subject'}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-brand-500/10 text-brand-300 font-medium text-sm mb-4 border border-brand-500/20">
                  Available for Hire
                </span>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                  I Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-500">Digital Experiences</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-lg mt-6 leading-relaxed">
                  {data.profile.summary}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
                  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download CV <Download className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="pt-8 border-t border-slate-800">
                <p className="text-slate-500 text-sm mb-4">Tech Stack</p>
                <div className="flex flex-wrap gap-3">
                  {data.skills.slice(0, 6).map(skill => (
                    <span key={skill} className="text-slate-300 bg-slate-800 px-3 py-1 rounded-md text-sm border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-slate-800 relative z-10">
                 {/* Placeholder for Profile Image - using a generic dev image */}
                <img 
                  src="https://picsum.photos/seed/mubashirdev/800/800" 
                  alt="Mubashir T" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80"></div>
              </div>
              {/* Decorative Card */}
              <div className="absolute -bottom-10 -left-10 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-2xl z-20 w-64 glass-panel">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-400">
                    <Code className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">5+ Years</h4>
                    <p className="text-slate-400 text-sm">Experience</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-500 h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-400 font-medium tracking-wide uppercase text-sm mb-2">What I Do</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white">Services & Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.services.map((service) => (
              <div key={service.id} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/50 hover:bg-slate-800/50 transition-all duration-300 group">
                <div className="h-14 w-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-500/20 transition-colors">
                  {getIcon(service.icon)}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-brand-400 font-medium tracking-wide uppercase text-sm mb-2">Career Path</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">Professional Experience</h3>
              <p className="text-slate-400 mb-12">
                My journey involves working with diverse teams and technologies to build scalable solutions for various industries.
              </p>
              
              <div className="space-y-8">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="relative pl-8 border-l border-slate-700">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-dark-900"></div>
                    <div className="mb-1 text-slate-500 text-sm flex items-center">
                       <Calendar className="w-4 h-4 mr-2" /> {exp.period}
                    </div>
                    <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                    <p className="text-brand-400 text-sm mb-2">{exp.company}</p>
                    <ul className="space-y-1 text-slate-400 text-sm list-disc pl-4">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="sticky top-28 bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700">
                 <h4 className="text-xl font-bold text-white mb-6">Technical Skills</h4>
                 <div className="flex flex-wrap gap-2">
                    {data.skills.map(skill => (
                        <span key={skill} className="px-3 py-2 bg-slate-900 text-slate-300 rounded border border-slate-700 text-sm hover:border-brand-500 hover:text-white transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                 </div>

                 <div className="mt-8 pt-8 border-t border-slate-700">
                    <h4 className="text-xl font-bold text-white mb-4">Education</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-white font-medium">Bachelor of Computer Science</p>
                            <p className="text-slate-500 text-sm">Calicut University (2017-2020)</p>
                        </div>
                        <div>
                            <p className="text-white font-medium">MCSE and CCNA Training</p>
                            <p className="text-slate-500 text-sm">Soften Technologies (2020-2021)</p>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-brand-400 font-medium tracking-wide uppercase text-sm mb-2">Portfolio</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white">Featured Projects</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.slice(0, 4).map((project) => (
              <div key={project.id} className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-brand-500/50 transition-all">
                <div className="aspect-video overflow-hidden bg-slate-800 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-brand-300 bg-brand-900/50 px-2 py-1 rounded backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-slate-300 text-sm line-clamp-2 mb-4 group-hover:line-clamp-none transition-all">
                    {project.description}
                  </p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-white hover:text-brand-400">
                      Visit Site <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Testimonials */}
       <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-display font-bold text-white mb-12">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.testimonials.map(t => (
                    <div key={t.id} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 relative">
                        <div className="text-brand-500 text-4xl font-serif absolute top-6 left-6">"</div>
                        <p className="text-slate-300 italic mb-6 relative z-10 pt-4 pl-2">{t.text}</p>
                        <div className="flex items-center space-x-4">
                            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <h5 className="text-white font-bold">{t.name}</h5>
                                <p className="text-slate-500 text-sm">{t.role}, {t.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
       </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-dark-950 to-brand-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-brand-400 font-medium tracking-wide uppercase text-sm mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Let's Work Together</h3>
          <p className="text-xl text-slate-400 mb-10">
            Have a project in mind? Looking to hire a full-stack developer? 
            Let's discuss how we can help your business grow.
          </p>
          
          <div className="bg-slate-900 p-8 md:p-12 rounded-2xl border border-slate-800 shadow-2xl text-left">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                  <input 
                    type="text"
                    name="name" 
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" 
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" 
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                <input 
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" 
                  placeholder="Project Inquiry"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" 
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              
              {status === 'success' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center text-green-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center text-red-400">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Something went wrong. Please try again later.
                </div>
              )}

              <Button size="lg" className="w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'} 
                {!status && <Send className="ml-2 w-4 h-4" />}
              </Button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
               <div>
                  <p className="text-slate-500 text-sm">Email Me</p>
                  <p className="text-white font-medium">{data.profile.email}</p>
               </div>
               <div>
                  <p className="text-slate-500 text-sm">Call Me</p>
                  <p className="text-white font-medium">{data.profile.phone}</p>
               </div>
               <div>
                  <p className="text-slate-500 text-sm">Location</p>
                  <p className="text-white font-medium">Kerala, India</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
