
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Trash2, Mail, Phone, Calendar, User, Search, RefreshCw, 
  Briefcase, LayoutGrid, MessageSquare, Plus, Edit3, X, 
  Cpu, Layers, Settings, Globe, Upload, Image as ImageIcon, Loader2, ShieldCheck
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { 
  fetchLeads, deleteLead, 
  fetchProjects, saveProject, deleteProject,
  fetchServices, saveService, deleteService,
  fetchTechStack, saveTechItem, deleteTechItem,
  uploadImageSimulation
} from '../services/api';
import { Lead, Project, Service, TechItem } from '../types';

interface Props {
  setIsAdmin: (val: boolean) => void;
}

type Tab = 'leads' | 'projects' | 'services' | 'tech';

const AdminDashboard: React.FC<Props> = ({ setIsAdmin }) => {
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [data, setData] = useState<{ 
    leads: Lead[], 
    projects: Project[], 
    services: Service[],
    tech: TechItem[] 
  }>({ leads: [], projects: [], services: [], tech: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    toast.success('Session Terminated Successfully');
    navigate('/admin/login');
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [leads, projects, services, tech] = await Promise.all([
        fetchLeads(),
        fetchProjects(),
        fetchServices(),
        fetchTechStack()
      ]);
      setData({ leads, projects, services, tech });
    } catch (err) {
      toast.error('Sync Error: Failed to fetch CMS data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAllData(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('IRREVERSIBLE ACTION: Permanently delete this entry?')) return;
    try {
      if (activeTab === 'leads') await deleteLead(id);
      if (activeTab === 'projects') await deleteProject(id);
      if (activeTab === 'services') await deleteService(id);
      if (activeTab === 'tech') await deleteTechItem(id);
      toast.success('Database entry removed');
      loadAllData();
    } catch (err) {
      toast.error('System Error: Delete operation failed');
    }
  };

  const openForm = (item: any = null) => {
    setEditingItem(item);
    setPreviewImage(item?.image || item?.icon || null);
    setModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Quota Error: File exceeds 2MB limit');
        return;
      }
      setUploading(true);
      try {
        const base64 = await uploadImageSimulation(file);
        setPreviewImage(base64);
        toast.success('Asset uploaded successfully');
      } catch (err) {
        toast.error('I/O Error: Image processing failed');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const obj: any = Object.fromEntries(formData.entries());
    
    if (activeTab === 'projects') obj.image = previewImage;
    if (activeTab === 'services' || activeTab === 'tech') obj.icon = previewImage;

    try {
      if (activeTab === 'projects') {
        obj.tags = obj.tags.split(',').map((t: string) => t.trim());
        if (editingItem) obj._id = editingItem._id;
        await saveProject(obj);
      } else if (activeTab === 'services') {
        if (editingItem) obj._id = editingItem._id;
        await saveService(obj);
      } else if (activeTab === 'tech') {
        if (editingItem) obj._id = editingItem._id;
        await saveTechItem(obj);
      }

      toast.success('CMS State Synchronized');
      setModalOpen(false);
      loadAllData();
    } catch (err) {
      toast.error('Write Error: Failed to save changes');
    }
  };

  const currentList = activeTab === 'leads' ? data.leads 
                   : activeTab === 'projects' ? data.projects 
                   : activeTab === 'services' ? data.services
                   : data.tech;

  const filteredList = (currentList as any[]).filter(item => 
    (item.name || item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold flex items-center gap-4">
            AmbaTech <span className="text-cyan-400">Solutions CMS</span>
          </h1>
          <p className="text-gray-500 mt-2 text-xs uppercase tracking-[0.2em]">Enterprise Control Center</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass rounded-xl text-[10px] text-green-400 font-bold border-green-500/20">
            <ShieldCheck size={14} /> SECURE LINK ACTIVE
          </div>
          <button onClick={loadAllData} className="p-3 glass rounded-xl text-gray-400 hover:text-cyan-400 transition-all">
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-all text-xs">
            <LogOut size={16} /> TERMINATE SESSION
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <TabButton active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} icon={<MessageSquare size={16} />} label="Leads" count={data.leads.length} />
        <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<Briefcase size={16} />} label="Portfolio" count={data.projects.length} />
        <TabButton active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={<LayoutGrid size={16} />} label="Services" count={data.services.length} />
        <TabButton active={activeTab === 'tech'} onClick={() => setActiveTab('tech')} icon={<Layers size={16} />} label="Stack Control" count={data.tech.length} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 glass p-2 rounded-2xl border-white/10 flex items-center">
          <div className="relative w-full">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent rounded-xl pl-12 pr-4 py-3 focus:outline-none text-sm"
              placeholder={`Query ${activeTab}...`}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
        {activeTab !== 'leads' && (
          <button onClick={() => openForm()} className="px-8 py-4 bg-cyan-500 rounded-2xl font-bold flex items-center gap-2 hover:bg-cyan-600 shadow-lg shadow-cyan-500/20 transition-all">
            <Plus size={20} /> CREATE NEW
          </button>
        )}
      </div>

      {/* List Content */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? <LoadingPulse /> : (
          <AnimatePresence mode="popLayout">
            {filteredList.map((item: any) => (
              <motion.div 
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex items-center gap-6 flex-1">
                    {(activeTab !== 'leads') && (
                      <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center p-2 shrink-0 overflow-hidden border border-white/10">
                        {item.image || item.icon ? (
                          <img src={item.image || item.icon} alt="" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <ImageIcon className="text-gray-600" />
                        )}
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-xl font-bold text-white font-orbitron">{item.name || item.title}</span>
                        {(item.category) && <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-lg font-bold border border-cyan-500/20">{item.category}</span>}
                        {item.email && <span className="text-sm text-gray-400 flex items-center gap-2"><Mail size={14}/>{item.email}</span>}
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">{item.message || item.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 h-fit">
                    {activeTab !== 'leads' && (
                      <button onClick={() => openForm(item)} className="p-3 bg-white/5 rounded-xl text-cyan-400 hover:bg-white/10">
                        <Edit3 size={18} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item._id)} className="p-3 bg-red-500/10 rounded-xl text-red-500 hover:bg-red-500/20">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* CMS Form Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass w-full max-w-lg p-8 md:p-10 rounded-3xl border-white/10 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold font-orbitron tracking-tight">{editingItem ? 'PATCH' : 'CREATE'} {activeTab.toUpperCase()}</h3>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-6">
                {/* Image Upload Zone */}
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                    ASSET SPECIFICATION
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-full h-48 rounded-2xl border-2 border-dashed border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer flex flex-col items-center justify-center group overflow-hidden"
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    
                    {uploading ? (
                      <Loader2 className="animate-spin text-cyan-500" size={32} />
                    ) : previewImage ? (
                      <>
                        <img src={previewImage} alt="Preview" className="w-full h-full object-contain p-4 rounded-2xl" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                          <span className="text-white font-bold text-xs">REPLACE ASSET</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <Upload size={32} className="mb-2" />
                        <span className="text-xs uppercase tracking-widest font-bold">Upload Source Image</span>
                      </div>
                    )}
                  </div>
                  {previewImage && (
                    <button 
                      type="button" 
                      onClick={() => setPreviewImage(null)} 
                      className="text-[10px] text-red-500 hover:underline uppercase tracking-widest font-bold"
                    >
                      Purge Image
                    </button>
                  )}
                </div>

                {activeTab === 'projects' ? (
                  <>
                    <Field label="Project Title" name="title" defaultValue={editingItem?.title} required />
                    <Field label="Category" name="category" defaultValue={editingItem?.category} required />
                    <Field label="Description" name="description" defaultValue={editingItem?.description} textarea required />
                    <Field label="Tech Stack (comma separated)" name="tags" defaultValue={editingItem?.tags?.join(', ')} />
                  </>
                ) : activeTab === 'services' ? (
                  <>
                    <Field label="Service Name" name="title" defaultValue={editingItem?.title} required />
                    <Field label="Description" name="description" defaultValue={editingItem?.description} textarea required />
                    <Field label="Tailwind Gradient" name="color" defaultValue={editingItem?.color} placeholder="from-blue-500 to-cyan-400" />
                  </>
                ) : (
                  <>
                    <Field label="Technology Name" name="name" defaultValue={editingItem?.name} required />
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Category</label>
                      <select name="category" defaultValue={editingItem?.category || "Languages"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm">
                        <option value="Languages">Languages</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="AI & Agentic Systems">AI & Agentic Systems</option>
                        <option value="Databases">Databases</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                    </div>
                    <Field label="Tailwind Color Class" name="color" defaultValue={editingItem?.color} placeholder="text-cyan-400" />
                  </>
                )}
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="w-full py-4 bg-cyan-500 rounded-xl font-bold text-white hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 uppercase tracking-widest"
                >
                  {editingItem ? 'Synchronize Updates' : 'Publish to AmbaTech'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label, count }: any) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all min-w-fit border ${active ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'glass border-white/5 text-gray-500 hover:text-gray-200'}`}>
    {icon} <span className="text-xs whitespace-nowrap uppercase tracking-widest">{label}</span> <span className="px-1.5 py-0.5 rounded bg-black/20 text-[10px]">{count}</span>
  </button>
);

const Field = ({ label, name, textarea, ...props }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">{label}</label>
    {textarea ? (
      <textarea name={name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm" rows={3} {...props}></textarea>
    ) : (
      <input name={name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm" {...props} />
    )}
  </div>
);

const LoadingPulse = () => (
  <div className="space-y-4">
    {[1, 2, 3].map(i => <div key={i} className="h-32 glass rounded-3xl animate-pulse" />)}
  </div>
);

export default AdminDashboard;
