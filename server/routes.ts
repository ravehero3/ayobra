import type { Express, Request } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertAudioPairSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));

  const httpServer = createServer(app);
  return httpServer;
}
