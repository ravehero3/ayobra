import { type User, type InsertUser, type Project, type InsertProject, type AudioPair, type InsertAudioPair } from "@shared/schema";
import { randomUUID } from "crypto";

export interface AppUser {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
}

export interface InsertAppUser {
  email: string;
  passwordHash: string;
  displayName: string;
  avatar?: string;
}

export interface VideoJob {
  id: string;
  userId: string;
  audioUrl: string;
  imageUrl?: string;
  settings: {
    quality: '720p' | '1080p';
    duration?: number;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  resultUrl?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsertVideoJob {
  userId: string;
  audioUrl: string;
  imageUrl?: string;
  settings: {
    quality: '720p' | '1080p';
    duration?: number;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  resultUrl?: string;
  error?: string;
}

export interface IStorage {
  // App User methods (for authentication)
  getUserById(id: string): Promise<AppUser | undefined>;
  getUserByEmail(email: string): Promise<AppUser | undefined>;
  createUser(user: InsertAppUser): Promise<AppUser>;
  updateUser(id: string, updates: Partial<AppUser>): Promise<AppUser>;
  
  // Token management
  storeRefreshToken(userId: string, token: string): Promise<void>;
  getRefreshToken(userId: string): Promise<string | undefined>;
  removeRefreshToken(userId: string): Promise<void>;
  
  // Video job management
  createVideoJob(job: InsertVideoJob): Promise<VideoJob>;
  getVideoJob(id: string): Promise<VideoJob | undefined>;
  getUserVideos(userId: string): Promise<VideoJob[]>;
  updateVideoJob(id: string, updates: Partial<VideoJob>): Promise<VideoJob>;
  
  // Legacy User methods (for backward compatibility)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  
  // Project methods
  getProject(id: string): Promise<Project | undefined>;
  getUserProjects(userId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Audio pair methods
  getAudioPair(id: string): Promise<AudioPair | undefined>;
  getProjectAudioPairs(projectId: string): Promise<AudioPair[]>;
  createAudioPair(pair: InsertAudioPair): Promise<AudioPair>;
  updateAudioPair(id: string, updates: Partial<AudioPair>): Promise<AudioPair>;
  deleteAudioPair(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private appUsers: Map<string, AppUser>;
  private refreshTokens: Map<string, string>;
  private videoJobs: Map<string, VideoJob>;
  private projects: Map<string, Project>;
  private audioPairs: Map<string, AudioPair>;

  constructor() {
    this.users = new Map();
    this.appUsers = new Map();
    this.refreshTokens = new Map();
    this.videoJobs = new Map();
    this.projects = new Map();
    this.audioPairs = new Map();
  }

  // App User methods
  async getUserById(id: string): Promise<AppUser | undefined> {
    return this.appUsers.get(id);
  }

  async getUserByEmail(email: string): Promise<AppUser | undefined> {
    return Array.from(this.appUsers.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertAppUser): Promise<AppUser> {
    const id = randomUUID();
    const user: AppUser = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.appUsers.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<AppUser>): Promise<AppUser> {
    const existing = this.appUsers.get(id);
    if (!existing) {
      throw new Error(`User ${id} not found`);
    }
    const updated = { ...existing, ...updates };
    this.appUsers.set(id, updated);
    return updated;
  }

  // Token management
  async storeRefreshToken(userId: string, token: string): Promise<void> {
    this.refreshTokens.set(userId, token);
  }

  async getRefreshToken(userId: string): Promise<string | undefined> {
    return this.refreshTokens.get(userId);
  }

  async removeRefreshToken(userId: string): Promise<void> {
    this.refreshTokens.delete(userId);
  }

  // Video job management
  async createVideoJob(insertJob: InsertVideoJob): Promise<VideoJob> {
    const id = randomUUID();
    const job: VideoJob = {
      id,
      ...insertJob,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.videoJobs.set(id, job);
    return job;
  }

  async getVideoJob(id: string): Promise<VideoJob | undefined> {
    return this.videoJobs.get(id);
  }

  async getUserVideos(userId: string): Promise<VideoJob[]> {
    return Array.from(this.videoJobs.values()).filter(
      (job) => job.userId === userId,
    );
  }

  async updateVideoJob(id: string, updates: Partial<VideoJob>): Promise<VideoJob> {
    const existing = this.videoJobs.get(id);
    if (!existing) {
      throw new Error(`Video job ${id} not found`);
    }
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.videoJobs.set(id, updated);
    return updated;
  }

  // Legacy User methods (for backward compatibility)
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  // Project methods
  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getUserProjects(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.userId === userId,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      id,
      name: insertProject.name,
      userId: insertProject.userId || null,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    this.projects.delete(id);
    // Also delete related audio pairs
    const projectPairs = Array.from(this.audioPairs.values()).filter(
      (pair) => pair.projectId === id,
    );
    projectPairs.forEach((pair) => this.audioPairs.delete(pair.id));
  }

  // Audio pair methods
  async getAudioPair(id: string): Promise<AudioPair | undefined> {
    return this.audioPairs.get(id);
  }

  async getProjectAudioPairs(projectId: string): Promise<AudioPair[]> {
    return Array.from(this.audioPairs.values()).filter(
      (pair) => pair.projectId === projectId,
    );
  }

  async createAudioPair(insertPair: InsertAudioPair): Promise<AudioPair> {
    const id = randomUUID();
    const pair: AudioPair = {
      id,
      projectId: insertPair.projectId,
      audioFileName: insertPair.audioFileName,
      audioFileUrl: insertPair.audioFileUrl,
      audioFileSize: insertPair.audioFileSize,
      audioDuration: insertPair.audioDuration || null,
      imageFileName: insertPair.imageFileName || null,
      imageFileUrl: insertPair.imageFileUrl || null,
      imageFileSize: insertPair.imageFileSize || null,
      isGenerated: insertPair.isGenerated || false,
      generatedVideoUrl: insertPair.generatedVideoUrl || null,
      generatedVideoSize: insertPair.generatedVideoSize || null,
      createdAt: new Date(),
    };
    this.audioPairs.set(id, pair);
    return pair;
  }

  async updateAudioPair(id: string, updates: Partial<AudioPair>): Promise<AudioPair> {
    const existing = this.audioPairs.get(id);
    if (!existing) {
      throw new Error(`Audio pair ${id} not found`);
    }
    const updated = { ...existing, ...updates };
    this.audioPairs.set(id, updated);
    return updated;
  }

  async deleteAudioPair(id: string): Promise<void> {
    this.audioPairs.delete(id);
  }
}

export const storage = new MemStorage();
