const API_BASE_URL = import.meta.env.VITE_API_URL || '';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    displayName: string;
    avatar?: string;
    createdAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface VideoJob {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

interface CreateVideoJobRequest {
  audioUrl: string;
  imageUrl?: string;
  settings?: {
    quality: '720p' | '1080p';
    duration?: number;
  };
}

// API client for desktop app integration
class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token');
      this.refreshToken = localStorage.getItem('refresh_token');
    }
  }

  private saveTokensToStorage() {
    if (typeof window !== 'undefined') {
      if (this.accessToken) {
        localStorage.setItem('access_token', this.accessToken);
      }
      if (this.refreshToken) {
        localStorage.setItem('refresh_token', this.refreshToken);
      }
    }
  }

  private clearTokensFromStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.saveTokensToStorage();
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.clearTokensFromStorage();
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401 && this.refreshToken) {
        // Try to refresh token
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry original request with new token
          headers['Authorization'] = `Bearer ${this.accessToken}`;
          return fetch(url, { ...options, headers });
        } else {
          // Refresh failed, clear tokens
          this.clearTokens();
          throw new Error('Authentication failed');
        }
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.access_token;
        this.saveTokensToStorage();
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      this.setTokens(data.access_token, data.refresh_token);
      return data;
    }

    throw new Error('Login failed');
  }

  async logout() {
    this.clearTokens();
  }

  // User methods
  async getUserProfile() {
    const response = await this.request('/user/profile');
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch user profile');
  }

  async updateUserProfile(updates: any) {
    const response = await this.request('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to update user profile');
  }

  // Video methods
  async getUserVideos(page: number = 1, limit: number = 20, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) {
      params.append('status', status);
    }

    const response = await this.request(`/user/videos?${params.toString()}`);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch user videos');
  }

  async createVideo(videoData: {
    title: string;
    description?: string;
    settings?: any;
    audioFile?: string;
  }) {
    const response = await this.request('/videos', {
      method: 'POST',
      body: JSON.stringify(videoData),
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to create video job');
  }

  async getVideoStatus(videoId: string) {
    const response = await this.request(`/videos/${videoId}/status`);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to get video status');
  }

  async getVideoDownloadLink(videoId: string) {
    const response = await this.request(`/videos/${videoId}/download`);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to get download link');
  }

  async deleteVideo(videoId: string) {
    const response = await this.request(`/videos/${videoId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to delete video');
  }

  // Health check
  async getHealth() {
    const response = await this.request('/health');
    if (response.ok) {
      return response.json();
    }
    throw new Error('Health check failed');
  }

  // API documentation
  async getApiDocs() {
    const response = await this.request('/docs');
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch API documentation');
  }
}

export const apiClient = new ApiClient();

// React hooks for API integration
export const useApiClient = () => {
  return apiClient;
};

// Types for TypeScript
export interface Video {
  id: string;
  userId: string;
  title: string;
  description: string;
  settings: {
    resolution: string;
    frameRate: number;
    duration: number;
    waveformStyle: string;
    backgroundColor: string;
    textColor: string;
  };
  audioFile?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  downloadUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  estimatedCompletion?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    theme: string;
    notifications: boolean;
    videoQuality: string;
    autoSync: boolean;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
export type { VideoJob, CreateVideoJobRequest, AuthResponse };