
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MessageSquare } from 'lucide-react';

const Sidebar: React.FC = () => {
  const socialLinks = [
    { 
      icon: <Instagram size={20} />, 
      href: "https://www.instagram.com/gouravmenaria__?igsh=MW1ldWZ1bjJ3eW96cA==", 
      color: "hover:text-pink-500 hover:shadow-pink-500/20",
      label: "Instagram"
    },
    { 
      icon: <MessageSquare size={20} />, 
      href: "https://wa.me/918619213167", 
      color: "hover:text-green-500 hover:shadow-green-500/20",
      label: "WhatsApp"
    },
    { 
      icon: <Mail size={20} />, 
      href: "mailto:gouravmenaria667@gmail.com", 
      color: "hover:text-yellow-500 hover:shadow-yellow-500/20",
      label: "Email"
    },
  ];

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed right-4 bottom-6 md:right-8 md:bottom-8 z-[60] flex flex-col items-center gap-4"
    >
      <div className="flex flex-col gap-4 md:gap-5 glass p-2.5 md:p-3 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
        {socialLinks.map((link, idx) => (
          <motion.a 
            key={idx} 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`relative text-gray-400 transition-all duration-300 flex items-center justify-center p-2 rounded-xl hover:bg-white/5 ${link.color} group`}
          >
            {link.icon}
            
            {/* Tooltip for Desktop */}
            <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 hidden lg:block">
              {link.label}
            </span>

            {/* Subtle Pulse/Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-xl bg-current opacity-0 blur-lg group-hover:opacity-20 transition-opacity -z-10"></div>
          </motion.a>
        ))}
      </div>
      
      {/* Visual connection line */}
      <div className="w-[1.5px] h-8 md:h-12 bg-gradient-to-b from-cyan-500 to-transparent opacity-40"></div>
    </motion.div>
  );
};

export default Sidebar;
