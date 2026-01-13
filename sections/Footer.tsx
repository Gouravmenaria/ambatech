
import React from 'react';
import { Code2, Linkedin, Instagram, Twitter, Heart } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-20 pb-10 px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shrink-0 h-fit shadow-lg shadow-cyan-500/20">
                <Code2 size={24} className="text-white" />
              </div>
              <div className="font-orbitron text-xl md:text-2xl font-bold tracking-wider text-white flex flex-col lg:flex-row lg:items-center leading-tight">
                <span>AmbaTech</span>
                <span className="text-cyan-400 block md:hidden lg:inline-block lg:ml-2 opacity-90">Solutions</span>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm tracking-wide">
              Architecting the next generation of digital excellence. 
              AmbaTech Solutions blends elite engineering with cutting-edge AI.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/50 transition-all"><Twitter size={18} /></a>
              <a 
                href="https://www.instagram.com/gouravmenaria__?igsh=MW1ldWZ1bjJ3eW96cA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com/company/ambatech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-orbitron text-xs tracking-[0.2em] uppercase">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <ScrollLink 
                    to={item.toLowerCase()} 
                    spy={true} 
                    smooth={true} 
                    duration={500}
                    className="text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer text-xs tracking-wide font-medium"
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 font-orbitron text-xs tracking-[0.2em] uppercase">Expertise</h4>
            <ul className="space-y-4">
              {['Agentic AI', 'Web Architecture', 'Mobile Apps', 'Cloud Security', 'UI/UX Lab'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-xs tracking-wide font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 font-orbitron text-xs tracking-[0.2em] uppercase">Stay Informed</h4>
            <p className="text-gray-500 text-xs mb-6 tracking-wide">Get technical insights and AI news delivered to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs w-full focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button className="px-4 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-colors text-white shadow-lg shadow-cyan-500/20">
                <Code2 size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase font-bold text-center md:text-left">
            © {new Date().getFullYear()} AmbaTech Solutions. All rights reserved.
          </p>
          <p className="text-gray-600 text-[10px] flex items-center gap-2 uppercase tracking-widest font-bold">
            Engineered with <Heart size={10} className="text-red-500" /> by AmbaTech Elite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
