
/**
 * BACKEND IMPLEMENTATION (EXPRESS + MONGO + IMAGE UPLOAD)
 * 
 * Instructions:
 * 1. Create a folder 'backend'
 * 2. Run 'npm init -y'
 * 3. Run 'npm install express mongoose dotenv cors bcrypt jsonwebtoken multer cloudinary'
 * 4. Paste this code into 'index.js'
 */

/*
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'novatech_uploads',
    allowed_formats: ['jpg', 'png', 'svg', 'webp'],
  },
});
const upload = multer({ storage: storage });

// Unified Schemas
const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String, // Cloudinary URL
  tags: [String],
});

const Project = mongoose.model('Project', ProjectSchema);

// Admin Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // Verify JWT logic...
  next();
};

// Routes with Image Support
app.post('/api/projects', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      image: req.file ? req.file.path : req.body.image
    };
    const newProject = new Project(projectData);
    await newProject.save();
    res.status(201).json({ success: true, project: newProject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.image = req.file.path;
    const updated = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, project: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Repeat similar patterns for Services and Tech Stack...

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`NovaTech Server running on ${PORT}`)))
  .catch(err => console.error(err));
*/
