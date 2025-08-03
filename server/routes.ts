import type { Express, Request } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertAudioPairSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import { sendWelcomeEmail, sendContactEmail } from "./email";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Auth schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().optional(),
});

const updateProfileSchema = z.object({
  displayName: z.string().optional(),
  avatar: z.string().url().optional(),
});

const videoJobSchema = z.object({
  audioUrl: z.string().url(),
  imageUrl: z.string().url().optional(),
  settings: z.object({
    quality: z.enum(['720p', '1080p']).default('1080p'),
    duration: z.number().optional(),
  }).optional(),
});

// JWT middleware
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Helper function to generate tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  return { accessToken, refreshToken };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication API
  app.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user || !await bcrypt.compare(password, user.passwordHash)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { accessToken, refreshToken } = generateTokens(user.id);
      
      // Store refresh token
      await storage.storeRefreshToken(user.id, refreshToken);
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/auth/register", async (req, res) => {
    try {
      const { email, password, displayName } = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await storage.createUser({
        email,
        passwordHash,
        displayName: displayName || email.split('@')[0],
      });

      const { accessToken, refreshToken } = generateTokens(user.id);
      
      // Store refresh token
      await storage.storeRefreshToken(user.id, refreshToken);
      
      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/auth/refresh", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
      }

      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      const storedToken = await storage.getRefreshToken(decoded.userId);
      
      if (!storedToken || storedToken !== refreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);
      
      // Update refresh token
      await storage.storeRefreshToken(decoded.userId, newRefreshToken);
      
      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  });

  app.post("/auth/logout", authenticateToken, async (req: any, res) => {
    try {
      await storage.removeRefreshToken(req.user.id);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to logout" });
    }
  });

  // User Profile API
  app.get("/user/profile", authenticateToken, async (req: any, res) => {
    try {
      res.json({
        id: req.user.id,
        email: req.user.email,
        displayName: req.user.displayName,
        avatar: req.user.avatar,
        createdAt: req.user.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.patch("/user/profile", authenticateToken, async (req: any, res) => {
    try {
      const updates = updateProfileSchema.parse(req.body);
      const updatedUser = await storage.updateUser(req.user.id, updates);
      
      res.json({
        id: updatedUser.id,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        avatar: updatedUser.avatar,
        createdAt: updatedUser.createdAt,
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  // Video Generation API
  app.get("/user/videos", authenticateToken, async (req: any, res) => {
    try {
      const videos = await storage.getUserVideos(req.user.id);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.post("/videos", authenticateToken, async (req: any, res) => {
    try {
      const jobData = videoJobSchema.parse(req.body);
      const video = await storage.createVideoJob({
        userId: req.user.id,
        audioUrl: jobData.audioUrl,
        imageUrl: jobData.imageUrl,
        settings: jobData.settings || { quality: '1080p' },
        status: 'pending',
      });
      
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ message: "Invalid video job data" });
    }
  });

  app.get("/videos/:id/status", authenticateToken, async (req: any, res) => {
    try {
      const video = await storage.getVideoJob(req.params.id);
      
      if (!video || video.userId !== req.user.id) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json({
        id: video.id,
        status: video.status,
        progress: video.progress,
        resultUrl: video.resultUrl,
        error: video.error,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video status" });
    }
  });

  // Projects API
  app.get("/api/projects", async (req, res) => {
    try {
      // For now, return all projects (in production, filter by authenticated user)
      const projects = await storage.getUserProjects("demo-user");
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse({
        ...req.body,
        userId: "demo-user", // In production, get from authenticated user
      });
      const project = await storage.createProject(data);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Audio pairs API
  app.get("/api/projects/:projectId/pairs", async (req, res) => {
    try {
      const pairs = await storage.getProjectAudioPairs(req.params.projectId);
      res.json(pairs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audio pairs" });
    }
  });

  app.post("/api/projects/:projectId/pairs", upload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const audioFile = files?.audioFile?.[0];
      const imageFile = files?.imageFile?.[0];

      if (!audioFile) {
        return res.status(400).json({ message: "Audio file is required" });
      }

      // Create URLs for the uploaded files (in production, use cloud storage)
      const audioUrl = `/uploads/${audioFile.filename}`;
      const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : null;

      const pairData = {
        projectId: req.params.projectId,
        audioFileName: audioFile.originalname,
        audioFileUrl: audioUrl,
        audioFileSize: audioFile.size,
        audioDuration: null, // Would be calculated in production
        imageFileName: imageFile?.originalname || null,
        imageFileUrl: imageUrl,
        imageFileSize: imageFile?.size || null,
        isGenerated: false,
        generatedVideoUrl: null,
        generatedVideoSize: null,
      };

      const pair = await storage.createAudioPair(pairData);
      res.json(pair);
    } catch (error) {
      res.status(500).json({ message: "Failed to create audio pair" });
    }
  });

  app.patch("/api/pairs/:id", async (req, res) => {
    try {
      const updates = req.body;
      const pair = await storage.updateAudioPair(req.params.id, updates);
      res.json(pair);
    } catch (error) {
      res.status(500).json({ message: "Failed to update audio pair" });
    }
  });

  app.delete("/api/pairs/:id", async (req, res) => {
    try {
      await storage.deleteAudioPair(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete audio pair" });
    }
  });

  // Email endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const result = await sendContactEmail(email, name, message);
      
      if (result.success) {
        res.json({ message: "Message sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email, name } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const result = await sendWelcomeEmail(email, name);
      
      if (result.success) {
        res.json({ message: "Successfully subscribed to newsletter" });
      } else {
        res.status(500).json({ message: "Failed to subscribe" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Auth callback route for Supabase
  app.get('/auth/callback', async (req, res) => {
    const { code, error } = req.query;
    
    if (error) {
      console.error('Auth error:', error);
      return res.redirect('/?error=auth_failed');
    }
    
    if (code) {
      // In a full implementation, you'd exchange the code for tokens here
      // For now, just redirect to the main app
      res.redirect('/');
    } else {
      res.redirect('/?error=no_code');
    }
  });

  // Handle password reset redirects - let React app handle the route
  app.get('/auth/reset-complete', async (req, res) => {
    // Forward all query params and hash to the client
    const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
    res.redirect(`/#/auth/reset-complete${queryString ? '?' + queryString : ''}`);
  });

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));

  const httpServer = createServer(app);
  return httpServer;
}
