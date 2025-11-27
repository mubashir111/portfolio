import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Menu, X, Code2, Github, Linkedin, Mail, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, auth } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Contact', path: '/#contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (path: string) => {
    if (path === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      scrollToSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 font-sans selection:bg-brand-500/30 selection:text-brand-200">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark-900/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-brand-500" />
              <span className="text-xl font-display font-bold text-white tracking-tight">
                MUBASHIR<span className="text-brand-500">.DEV</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => {
                        // Prevent default anchor behavior if it is a hash link on the same page
                        if(link.path.startsWith('/#') || link.path === '/') {
                             e.preventDefault();
                             handleNavClick(link.path);
                        }
                    }}
                    className="text-slate-300 hover:text-brand-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href={data.profile.socials.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={data.profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              {auth.isAuthenticated ? (
                <Link to="/admin">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/login">
                   <Button variant="ghost" size="sm"><LogIn size={18} /></Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-800 border-b border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                   onClick={(e) => {
                        if(link.path.startsWith('/#') || link.path === '/') {
                             e.preventDefault();
                             handleNavClick(link.path);
                        }
                    }}
                  className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex items-center space-x-4 px-3">
                 {auth.isAuthenticated ? (
                  <Link to="/admin" className="text-brand-400">Admin Dashboard</Link>
                 ) : (
                  <Link to="/login" className="text-slate-400">Login</Link>
                 )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {children}

      {/* Footer */}
      <footer className="bg-dark-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="h-6 w-6 text-brand-500" />
                <span className="text-lg font-bold text-white">MUBASHIR T</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs">
                Building secure, scalable, and user-centric digital solutions for businesses worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Web Application Development</li>
                <li>Mobile App Development</li>
                <li>E-Commerce Solutions</li>
                <li>API Integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>{data.profile.email}</span>
                </li>
                <li>{data.profile.phone}</li>
                <li>{data.profile.address}</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Mubashir T. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};