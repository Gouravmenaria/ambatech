
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronLeft, ShieldAlert } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { adminLogin } from '../services/api';

interface Props {
  setIsAdmin: (val: boolean) => void;
}

const AdminLogin: React.FC<Props> = ({ setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fix: Authenticate the user and store the returned session token upon success
      const response = await adminLogin(email, password);
      if (response.success) {
        localStorage.setItem('adminToken', response.token);
        setIsAdmin(true);
        toast.success('Access Granted. Welcome back.');
        navigate('/admin/dashboard');
      } else {
        toast.error('Unauthorized: Invalid Credentials');
      }
    } catch (err) {
      toast.error('Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-3xl border-white/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft size={14} /> Back to Site
          </button>
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={32} className="text-cyan-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold">AmbaTech Solutions</h2>
          <p className="text-gray-500 text-sm mt-2 font-orbitron uppercase tracking-widest">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Admin Email</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                placeholder="admin@ambatech.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl font-bold text-white shadow-lg hover:shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            End-to-End Encryption Enabled
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
