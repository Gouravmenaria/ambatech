
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { submitLead } from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, this calls the backend
      const response = await submitLead(formData);
      if (response.success) {
        setIsSubmitted(true);
        toast.success('Your message has been sent!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast.error('Could not send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-cyan-950/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8">Let's Build Something <br /><span className="text-cyan-400">Extraordinary</span></h2>
            <p className="text-gray-400 text-lg mb-12">
              Ready to start your next digital journey? Reach out for a free consultation 
              and quote. Our team responds within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="p-4 glass rounded-2xl border-white/10 text-cyan-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Email Us</h4>
                  <p className="text-gray-400 text-sm">hello@novatech.com</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="p-4 glass rounded-2xl border-white/10 text-purple-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Call Us</h4>
                  <p className="text-gray-400 text-sm">+1 (555) 000-TECH</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-4 glass rounded-2xl border-white/10 text-green-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Visit Us</h4>
                  <p className="text-gray-400 text-sm">Silicon Valley, Tech Plaza 404, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-3xl border-white/10 shadow-2xl relative z-10"
            >
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mb-6 flex justify-center">
                    <CheckCircle2 size={64} className="text-cyan-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Received!</h3>
                  <p className="text-gray-400 mb-8">One of our technical architects will reach out to you shortly.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Project Details *</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Submit Inquiry"} <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>
            
            {/* Background Blur decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/30 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
