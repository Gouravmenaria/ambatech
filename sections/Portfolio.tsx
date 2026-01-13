
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ZoomIn } from 'lucide-react';
import { fetchProjects } from '../services/api';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const categories = ["All", ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) return null;

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">Our Portfolio</h2>
            <p className="text-gray-400">Discover some of the flagship projects we've delivered for global clients.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'glass text-gray-400 hover:text-white border-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-3xl glass border-white/5"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image || "https://picsum.photos/600/400?grayscale"} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                    <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors">
                      <ExternalLink size={24} />
                    </button>
                    <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors">
                      <Github size={24} />
                    </button>
                    <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors">
                      <ZoomIn size={24} />
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{project.category}</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 rounded border border-white/10 text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
