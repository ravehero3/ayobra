import { type User, type InsertUser, type Project, type InsertProject, type AudioPair, type InsertAudioPair } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
  private projects: Map<string, Project>;
  private audioPairs: Map<string, AudioPair>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.audioPairs = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
