
import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { ChevronRight, Rocket, Layers, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            Next-Gen Agentic AI & Web Solutions
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-black leading-tight mb-6 tracking-wider">
            {/* Desktop View */}
            <span className="hidden lg:block">AmbaTech Solutions</span>
            
            {/* Tablet View */}
            <span className="hidden md:block lg:hidden">AmbaTech</span>
            
            {/* Mobile View */}
            <span className="md:hidden flex flex-col">
              <span>AmbaTech</span>
              <span className="text-cyan-400">Solutions</span>
            </span>
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Modern Engineering
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed tracking-wide">
            From autonomous AI agents to scalable enterprise platforms, 
            AmbaTech Solutions delivers future-ready engineering for the modern web.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all group tracking-widest uppercase text-sm">
                Hire AmbaTech <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollLink>
            <ScrollLink
              to="portfolio"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button className="flex items-center justify-center gap-2 px-8 py-4 glass rounded-xl font-bold text-white hover:bg-white/10 transition-all border border-white/20 tracking-widest uppercase text-sm">
                View Portfolio
              </button>
            </ScrollLink>
          </div>

          <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm font-medium tracking-wide">
            <div className="flex items-center gap-2"><Rocket size={16} /> Elite Tech Talent</div>
            <div className="flex items-center gap-2"><Layers size={16} /> Autonomous AI Agents</div>
          </div>
        </motion.div>

        {/* Right Illustration/Image - HIDDEN ON MOBILE/TABLET */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 glass p-3 rounded-[2.5rem] border-white/10 shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" 
              alt="Professional IT Workspace" 
              className="rounded-[2rem] w-full h-[520px] object-cover mix-blend-lighten opacity-90 transition-transform duration-1000 hover:scale-105"
            />
            {/* Professional Coding Overlay */}
            <div className="absolute top-8 right-8 p-5 glass rounded-2xl border-white/20 shadow-xl backdrop-blur-md animate-bounce-slow">
              <div className="flex gap-2 items-center mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <code className="text-cyan-400 text-[10px] font-mono leading-relaxed block">
                const agent = new AmbaTechAgent();<br/>
                agent.optimize(workflow);<br/>
                return result;
              </code>
            </div>
            
            <div className="absolute bottom-8 left-8 p-4 glass rounded-2xl border-white/20 shadow-xl backdrop-blur-md">
              <div className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-1">System Load</div>
              <div className="flex gap-1 items-end h-6">
                {[30, 60, 45, 80, 55, 90, 40].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
                    className="w-1.5 bg-cyan-500 rounded-full" 
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Decorative Animated Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-cyan-500/20 rounded-full animate-spin-slow -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] border border-dashed border-purple-500/10 rounded-full animate-spin-slow-reverse -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
