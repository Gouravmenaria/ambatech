
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Zap } from 'lucide-react';

const About: React.FC = () => {
  const cards = [
    {
      icon: <Target className="text-cyan-400" size={32} />,
      title: "Mission",
      desc: "To empower visionary entrepreneurs by building robust, high-performance digital ecosystems that scale."
    },
    {
      icon: <Eye className="text-purple-400" size={32} />,
      title: "Vision",
      desc: "Becoming the global standard for modern software craftsmanship and UI/UX excellence."
    },
    {
      icon: <ShieldCheck className="text-green-400" size={32} />,
      title: "Quality First",
      desc: "We prioritize security, clean code, and exhaustive testing in every line of code we write."
    },
    {
      icon: <Zap className="text-yellow-400" size={32} />,
      title: "Agile Speed",
      desc: "Rapid prototyping and continuous deployment ensures your product hits the market faster."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="max-w-3xl mb-16">
          <h4 className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-4">The AmbaTech Legacy</h4>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">Redefining Code Efficiency & Design</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            AmbaTech Solutions started as a group of passionate developers tired of legacy bottlenecks. 
            We reimagined the software development lifecycle by integrating AI-driven tools, 
            high-performance frameworks, and human-centric design. Today, we're a powerhouse 
            for startups looking to make a dent in the digital universe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-cyan-500/10 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-3">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
