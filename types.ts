
export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface TechItem {
  _id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}
