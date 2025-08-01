import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: varchar("user_id").references(() => users.id),
});

export const audioPairs = pgTable("audio_pairs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id).notNull(),
  audioFileName: text("audio_file_name").notNull(),
  audioFileUrl: text("audio_file_url").notNull(),
  audioFileSize: integer("audio_file_size").notNull(),
  audioDuration: integer("audio_duration"), // in seconds
  imageFileName: text("image_file_name"),
  imageFileUrl: text("image_file_url"),
  imageFileSize: integer("image_file_size"),
  isGenerated: boolean("is_generated").default(false),
  generatedVideoUrl: text("generated_video_url"),
  generatedVideoSize: integer("generated_video_size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  userId: true,
});

export const insertAudioPairSchema = createInsertSchema(audioPairs).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertAudioPair = z.infer<typeof insertAudioPairSchema>;
export type AudioPair = typeof audioPairs.$inferSelect;

// Extended schemas for form validation
export const fileUploadSchema = z.object({
  audioFile: z.instanceof(File).refine(
    (file) => file.type.startsWith('audio/'),
    'Must be an audio file'
  ),
  imageFile: z.instanceof(File).optional().refine(
    (file) => !file || file.type.startsWith('image/'),
    'Must be an image file'
  ),
});

export type FileUpload = z.infer<typeof fileUploadSchema>;
