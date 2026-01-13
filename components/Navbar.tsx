
import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Linkedin, Instagram } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Services', to: 'services' },
    { name: 'Projects', to: 'portfolio' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl group-hover:rotate-12 transition-transform h-fit shadow-lg shadow-cyan-500/20">
            <Code2 size={24} className="text-white" />
          </div>
          <div className="font-orbitron text-lg md:text-xl font-bold tracking-wider flex flex-col lg:flex-row lg:items-center leading-tight">
            <span className="text-white">AmbaTech</span>
            {/* 
              Responsive Rules for "Solutions":
              - block: visible on mobile (creates 2nd line due to flex-col)
              - md:hidden: hidden on tablet
              - lg:inline-block: visible on desktop (same line)
            */}
            <span className="text-cyan-400 block md:hidden lg:inline-block lg:ml-2 opacity-90">Solutions</span>
          </div>
        </RouterLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {isLandingPage ? (
            navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 cursor-pointer transition-colors tracking-wide"
              >
                {link.name}
              </ScrollLink>
            ))
          ) : (
            <RouterLink to="/" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors tracking-wide">
              Return Home
            </RouterLink>
          )}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            <a 
              href="https://www.instagram.com/gouravmenaria__?igsh=MW1ldWZ1bjJ3eW96cA==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://linkedin.com/company/ambatech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
          <RouterLink to="/admin/login" className="px-5 py-2 glass rounded-full text-sm font-semibold hover:bg-white/10 transition-all border border-white/10">
            Admin
          </RouterLink>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-300 ml-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {isLandingPage ? (
                navLinks.map((link) => (
                  <ScrollLink
                    key={link.to}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-300 tracking-wide"
                  >
                    {link.name}
                  </ScrollLink>
                ))
              ) : (
                <RouterLink to="/" className="text-lg font-medium text-gray-300 tracking-wide">Return Home</RouterLink>
              )}
              <RouterLink 
                to="/admin/login" 
                className="w-full text-center py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-lg shadow-cyan-500/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Panel
              </RouterLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
