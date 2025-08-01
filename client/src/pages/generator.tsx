import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Play, Pause, Download, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Project, AudioPair } from "@shared/schema";

export default function Generator() {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Fetch audio pairs for current project
  const { data: audioPairs = [] } = useQuery<AudioPair[]>({
    queryKey: ["/api/projects", currentProjectId, "pairs"],
    enabled: !!currentProjectId,
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (name: string): Promise<Project> => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to create project");
      return response.json();
    },
    onSuccess: (project: Project) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setCurrentProjectId(project.id);
      setNewProjectName("");
      toast({
        title: "Project created",
        description: `${project.name} is ready for your beats!`,
      });
    },
  });

  // Upload files mutation
  const uploadFilesMutation = useMutation({
    mutationFn: async ({ audioFile, imageFile }: { audioFile: File; imageFile?: File }) => {
      const formData = new FormData();
      formData.append("audioFile", audioFile);
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await fetch(`/api/projects/${currentProjectId}/pairs`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/projects", currentProjectId, "pairs"],
      });
      toast({
        title: "Files uploaded",
        description: "Your audio and image have been paired successfully!",
      });
    },
  });

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      if (!currentProjectId) {
        toast({
          title: "No project selected",
          description: "Please create or select a project first.",
          variant: "destructive",
        });
        return;
      }

      const files = Array.from(e.dataTransfer.files);
      const audioFile = files.find((f) => f.type.startsWith("audio/"));
      const imageFile = files.find((f) => f.type.startsWith("image/"));

      if (!audioFile) {
        toast({
          title: "No audio file found",
          description: "Please drop at least one audio file.",
          variant: "destructive",
        });
        return;
      }

      uploadFilesMutation.mutate({ audioFile, imageFile });
    },
    [currentProjectId, uploadFilesMutation, toast]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TB</span>
              </div>
              <h1 className="text-2xl font-bold text-white">TypeBeat Video Generator</h1>
            </div>
            
            {/* Project selector */}
            <div className="flex items-center space-x-4">
              {projects.length > 0 && (
                <select
                  value={currentProjectId || ""}
                  onChange={(e) => setCurrentProjectId(e.target.value || null)}
                  className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white backdrop-blur-sm"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id} className="text-black">
                      {project.name}
                    </option>
                  ))}
                </select>
              )}
              
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="New project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Button
                  onClick={() => createProjectMutation.mutate(newProjectName)}
                  disabled={!newProjectName || createProjectMutation.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentProjectId ? (
          // Welcome/Empty state
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white">
                Create Professional Type Beat Videos
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Drop your audio files and images to generate stunning type beat videos
                with our advanced video creation engine.
              </p>
              {projects.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-lg p-8 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">Get Started</h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter project name"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    />
                    <Button
                      onClick={() => createProjectMutation.mutate(newProjectName)}
                      disabled={!newProjectName || createProjectMutation.isPending}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Create Your First Project
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-white/50">Select a project above to continue</p>
              )}
            </motion.div>
          </div>
        ) : (
          // Main generator interface
          <div className="space-y-8">
            {/* Drop zone */}
            <Card
              className={`border-2 border-dashed transition-all duration-300 ${
                dragOver
                  ? "border-purple-400 bg-purple-500/10"
                  : "border-white/20 bg-white/5"
              } backdrop-blur-sm`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <CardContent className="p-12 text-center">
                <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Drop your files here
                </h3>
                <p className="text-white/70 mb-6">
                  Support for MP3, WAV audio files and PNG, JPG images
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Audio Files
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Images
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Audio pairs grid */}
            {audioPairs.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Audio Pairs</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {audioPairs.map((pair) => (
                    <AudioPairCard key={pair.id} pair={pair} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Audio pair component
function AudioPairCard({ pair }: { pair: AudioPair }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group"
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg truncate">
            {pair.audioFileName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image preview */}
          {pair.imageFileUrl && (
            <div className="aspect-video rounded-lg overflow-hidden bg-black/20">
              <img
                src={pair.imageFileUrl}
                alt={pair.imageFileName || ""}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Audio controls */}
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-0 transition-all duration-300" />
            </div>
          </div>

          {/* File info */}
          <div className="text-sm text-white/70">
            <p>Audio: {Math.round(pair.audioFileSize / 1024)} KB</p>
            {pair.imageFileSize && (
              <p>Image: {Math.round(pair.imageFileSize / 1024)} KB</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={!!pair.isGenerated}
            >
              {pair.isGenerated ? "Generated" : "Generate Video"}
            </Button>
            {pair.generatedVideoUrl && (
              <Button size="sm" variant="outline" className="border-white/20">
                <Download className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}