
import { Lead, Project, Service, TechItem } from '../types';

// Simulation helper
const simulateAsync = <T,>(data: T, delay = 600): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

// Image Upload Helper (Simulates Backend Upload)
export const uploadImageSimulation = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- PERSISTENCE SIMULATION (Mocking MongoDB) ---
const INITIAL_PROJECTS: Project[] = [
  { _id: '1', title: "Nexus AI Agent Platform", category: "AI & Automation", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", tags: ["LangGraph", "FastAPI"], description: "A multi-agent autonomous system for supply chain optimization." },
  { _id: '2', title: "FinStream Analytics", category: "Web Application", image: "https://images.unsplash.com/photo-1611974714658-66d2df9d3742?auto=format&fit=crop&w=800&q=80", tags: ["Next.js", "PostgreSQL"], description: "Real-time financial tracking and predictive market forecasting." }
];

const INITIAL_SERVICES: Service[] = [
  { _id: '1', title: "Agentic AI Systems", description: "Developing autonomous AI agents capable of complex decision-making and tool use.", icon: "Bot", color: "from-blue-600 to-cyan-400" },
  { _id: '2', title: "Custom Web Apps", description: "High-performance full-stack applications built with modern frameworks like React & Next.js.", icon: "Globe", color: "from-purple-600 to-indigo-500" },
  { _id: '3', title: "Workflow Automation", description: "Intelligent automation using n8n and LangChain to eliminate repetitive tasks.", icon: "Zap", color: "from-green-500 to-emerald-400" }
];

const INITIAL_TECH_STACK: TechItem[] = [
  // Languages
  { _id: 't1', name: 'Java', category: 'Languages', color: 'text-orange-500', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { _id: 't2', name: 'Python', category: 'Languages', color: 'text-blue-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { _id: 't3', name: 'TypeScript', category: 'Languages', color: 'text-blue-600', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { _id: 't4', name: 'C++', category: 'Languages', color: 'text-blue-700', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  
  // Frontend
  { _id: 't5', name: 'React.js', category: 'Frontend', color: 'text-cyan-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { _id: 't6', name: 'Next.js', category: 'Frontend', color: 'text-white', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { _id: 't7', name: 'Tailwind CSS', category: 'Frontend', color: 'text-sky-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  
  // Backend
  { _id: 't8', name: 'Node.js', category: 'Backend', color: 'text-green-500', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { _id: 't9', name: 'FastAPI', category: 'Backend', color: 'text-teal-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { _id: 't10', name: 'Spring Boot', category: 'Backend', color: 'text-green-600', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  
  // AI & Agentic
  { _id: 't11', name: 'LangChain', category: 'AI & Agentic Systems', color: 'text-green-400', icon: 'https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/favicon.png' },
  { _id: 't12', name: 'LangGraph', category: 'AI & Agentic Systems', color: 'text-purple-400', icon: 'https://raw.githubusercontent.com/langchain-ai/langgraph/main/docs/static/img/favicon.png' },
  { _id: 't13', name: 'n8n', category: 'AI & Agentic Systems', color: 'text-red-500', icon: 'https://raw.githubusercontent.com/n8n-io/n8n/master/packages/cli/assets/n8n-logo.png' },
  { _id: 't14', name: 'Pinecone', category: 'AI & Agentic Systems', color: 'text-blue-300', icon: 'https://raw.githubusercontent.com/pinecone-io/pinecone-python-client/main/docs/assets/pinecone-logo.png' },
  
  // Databases
  { _id: 't15', name: 'MongoDB', category: 'Databases', color: 'text-green-500', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { _id: 't16', name: 'PostgreSQL', category: 'Databases', color: 'text-blue-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { _id: 't17', name: 'MySQL', category: 'Databases', color: 'text-blue-600', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  
  // DevOps
  { _id: 't18', name: 'Docker', category: 'DevOps', color: 'text-blue-500', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { _id: 't19', name: 'GitHub', category: 'DevOps', color: 'text-white', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { _id: 't20', name: 'AWS', category: 'DevOps', color: 'text-orange-400', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' }
];

const getStored = <T>(key: string, initial: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStored = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- API METHODS ---

export const adminLogin = async (email: string, pass: string): Promise<{ success: boolean; token: string }> => {
  if (email === 'gouravmenaria667@gmail.com' && pass === 'gouravmenaria667@2210') {
    return simulateAsync({ success: true, token: 'mock-jwt-token-xyz' });
  }
  return simulateAsync({ success: false, token: '' });
};

export const submitLead = async (data: Partial<Lead>) => {
  const leads = getStored<Lead[]>('leads', []);
  const newLead = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() } as Lead;
  setStored('leads', [newLead, ...leads]);
  return simulateAsync({ success: true });
};

export const fetchLeads = async (): Promise<Lead[]> => {
  return simulateAsync(getStored<Lead[]>('leads', []));
};

export const deleteLead = async (id: string) => {
  const leads = getStored<Lead[]>('leads', []);
  setStored('leads', leads.filter(l => l._id !== id));
  return simulateAsync({ success: true });
};

// --- PROJECTS ---
export const fetchProjects = async (): Promise<Project[]> => {
  return simulateAsync(getStored<Project[]>('projects', INITIAL_PROJECTS));
};

export const saveProject = async (project: Partial<Project>) => {
  const projects = getStored<Project[]>('projects', INITIAL_PROJECTS);
  if (project._id) {
    const updated = projects.map(p => p._id === project._id ? { ...p, ...project } as Project : p);
    setStored('projects', updated);
  } else {
    const newProject = { ...project, _id: Date.now().toString() } as Project;
    setStored('projects', [newProject, ...projects]);
  }
  return simulateAsync({ success: true });
};

export const deleteProject = async (id: string) => {
  const projects = getStored<Project[]>('projects', INITIAL_PROJECTS);
  setStored('projects', projects.filter(p => p._id !== id));
  return simulateAsync({ success: true });
};

// --- SERVICES ---
export const fetchServices = async (): Promise<Service[]> => {
  return simulateAsync(getStored<Service[]>('services', INITIAL_SERVICES));
};

export const saveService = async (service: Partial<Service>) => {
  const services = getStored<Service[]>('services', INITIAL_SERVICES);
  if (service._id) {
    const updated = services.map(s => s._id === service._id ? { ...s, ...service } as Service : s);
    setStored('services', updated);
  } else {
    const newService = { ...service, _id: Date.now().toString() } as Service;
    setStored('services', [newService, ...services]);
  }
  return simulateAsync({ success: true });
};

export const deleteService = async (id: string) => {
  const services = getStored<Service[]>('services', INITIAL_SERVICES);
  setStored('services', services.filter(s => s._id !== id));
  return simulateAsync({ success: true });
};

// --- TECH STACK ---
export const fetchTechStack = async (): Promise<TechItem[]> => {
  return simulateAsync(getStored<TechItem[]>('techStack', INITIAL_TECH_STACK));
};

export const saveTechItem = async (item: Partial<TechItem>) => {
  const stack = getStored<TechItem[]>('techStack', INITIAL_TECH_STACK);
  if (item._id) {
    const updated = stack.map(i => i._id === item._id ? { ...i, ...item } as TechItem : i);
    setStored('techStack', updated);
  } else {
    const newItem = { ...item, _id: Date.now().toString() } as TechItem;
    setStored('techStack', [...stack, newItem]);
  }
  return simulateAsync({ success: true });
};

export const deleteTechItem = async (id: string) => {
  const stack = getStored<TechItem[]>('techStack', INITIAL_TECH_STACK);
  setStored('techStack', stack.filter(i => i._id !== id));
  return simulateAsync({ success: true });
};
