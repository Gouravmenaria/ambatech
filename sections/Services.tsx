
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Database, Palette, Server, Cpu, Brain, Bot, Zap, MessageSquare, Network, Sparkles } from 'lucide-react';
import { fetchServices } from '../services/api';
import { Service } from '../types';

const IconMap: Record<string, any> = { 
  Globe, 
  Smartphone, 
  Database, 
  Palette, 
  Server, 
  Cpu, 
  Brain, 
  Bot, 
  Zap, 
  MessageSquare, 
  Network, 
  Sparkles 
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-24 px-6 bg-black/30">
        <div className="container mx-auto text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 px-6 bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4">What We Excel At</h4>
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">Innovative AI & Tech Solutions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We leverage Agentic AI and cutting-edge software engineering to build autonomous, 
              scalable, and highly intelligent digital products.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const StaticIcon = IconMap[service.icon] || Cpu;
            
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 glass rounded-3xl border-white/5 hover:border-white/10 transition-all hover:-translate-y-2"
              >
                {/* Decorative Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color || 'from-cyan-500 to-blue-500'} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`}></div>
                
                <div className={`mb-6 p-5 rounded-2xl bg-gradient-to-br ${service.color || 'from-cyan-500 to-blue-500'} bg-opacity-10 text-white w-20 h-20 flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform overflow-hidden`}>
                  {service.icon?.startsWith('data:image') || service.icon?.startsWith('http') ? (
                    <img src={service.icon} alt="" className="w-full h-full object-contain" />
                  ) : (
                    <StaticIcon size={36} />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6 h-20 overflow-hidden line-clamp-3">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:gap-4 transition-all">
                  EXPLORE TECHNOLOGY <span className="text-xs">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
