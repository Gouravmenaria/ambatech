
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTechStack } from '../services/api';
import { TechItem } from '../types';

const TechStack: React.FC = () => {
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTechStack();
        setTechStack(data);
      } catch (err) {
        console.error("Failed to load tech stack", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const categories = ["Languages", "Frontend", "Backend", "AI & Automation", "Databases", "DevOps & Cloud"];

  if (loading) return null;

  return (
    <section id="tech-stack" className="py-24 px-6 overflow-hidden bg-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-4">Our Technology Arsenal</h4>
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">Cutting-Edge Tech for High Impact</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We leverage an industry-leading stack of traditional and AI-first technologies 
              to architect scalable, modern solutions.
            </p>
          </motion.div>
        </div>

        <div className="space-y-16">
          {categories.map((category, catIdx) => {
            const items = techStack.filter(t => t.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-10"
                >
                  <h3 className="text-sm font-orbitron font-bold text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
                    {category}
                  </h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {items.map((tech, idx) => (
                    <motion.div
                      key={tech._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group flex flex-col items-center gap-4"
                    >
                      <div className="relative w-full aspect-square glass rounded-2xl border-white/5 flex items-center justify-center p-6 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                        <img 
                          src={tech.icon} 
                          alt={tech.name} 
                          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                          loading="lazy"
                        />
                        {/* Interactive Glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-cyan-400 blur-2xl -z-10 rounded-full"></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className={`text-[11px] font-bold tracking-widest uppercase transition-colors ${tech.color || 'text-white'} opacity-60 group-hover:opacity-100`}>
                          {tech.name}
                        </span>
                        <div className="w-0 h-[1px] bg-cyan-500 group-hover:w-full transition-all duration-300 mt-1"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
