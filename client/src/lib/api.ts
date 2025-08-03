
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

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // Load tokens from localStorage
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth header if we have a token
    if (this.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.accessToken}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      // If token expired, try to refresh
      if (response.status === 401 && this.refreshToken) {
        const refreshResult = await this.refreshTokens();
        if (refreshResult.data) {
          // Retry the original request with new token
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${this.accessToken}`,
          };
          const retryResponse = await fetch(url, config);
          const retryData = await retryResponse.json();
          return { data: retryData };
        }
      }

      const data = await response.json();
      
      if (!response.ok) {
        return { error: data.message || 'Request failed' };
      }

      return { data };
    } catch (error) {
      return { error: 'Network error' };
    }
  }

  // Auth methods
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const result = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (result.data) {
      this.setTokens(result.data.accessToken, result.data.refreshToken);
    }

    return result;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const result = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (result.data) {
      this.setTokens(result.data.accessToken, result.data.refreshToken);
    }

    return result;
  }

  async refreshTokens(): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const result = await this.request<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    if (result.data) {
      this.setTokens(result.data.accessToken, result.data.refreshToken);
    }

    return result;
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await this.request('/auth/logout', {
      method: 'POST',
    });

    this.clearTokens();
    return result;
  }

  // Profile methods
  async getProfile(): Promise<ApiResponse<AuthResponse['user']>> {
    return this.request('/user/profile');
  }

  async updateProfile(updates: { displayName?: string; avatar?: string }): Promise<ApiResponse<AuthResponse['user']>> {
    return this.request('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Video methods
  async getUserVideos(): Promise<ApiResponse<VideoJob[]>> {
    return this.request('/user/videos');
  }

  async createVideoJob(jobData: CreateVideoJobRequest): Promise<ApiResponse<VideoJob>> {
    return this.request('/videos', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async getVideoStatus(videoId: string): Promise<ApiResponse<{
    id: string;
    status: string;
    progress?: number;
    resultUrl?: string;
    error?: string;
  }>> {
    return this.request(`/videos/${videoId}/status`);
  }

  // Token management
  private setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return Boolean(this.accessToken);
  }
}

export const apiClient = new ApiClient();
export type { VideoJob, CreateVideoJobRequest, AuthResponse };
