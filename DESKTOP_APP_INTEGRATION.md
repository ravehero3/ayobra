
# Desktop App Integration Guide

## Overview

Your TypeBeatz landing page now has a complete API backend that your desktop app can integrate with for cross-platform sync. Here's everything you need to know.

## API Endpoints

### Base URL
- Development: `https://your-replit-url.repl.co/api`
- Production: `https://typebeatz.voodoo808.com/api`

### Authentication

#### Login (POST /api/auth/login)
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

Response:
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "expires_in": 3600,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

#### Refresh Token (POST /api/auth/refresh)
```json
{
  "refresh_token": "eyJ..."
}
```

### User Profile

#### Get Profile (GET /api/user/profile)
Headers: `Authorization: Bearer {access_token}`

#### Update Profile (PATCH /api/user/profile)
```json
{
  "name": "New Name",
  "preferences": {
    "theme": "dark",
    "videoQuality": "high",
    "autoSync": true
  }
}
```

### Video Management

#### Get User Videos (GET /api/user/videos)
Query params: `?page=1&limit=20&status=completed`

#### Create Video Job (POST /api/videos)
```json
{
  "title": "My Type Beat Video",
  "description": "Optional description",
  "settings": {
    "resolution": "1920x1080",
    "frameRate": 30,
    "waveformStyle": "bars",
    "backgroundColor": "#000000"
  },
  "audioFile": "path/to/audio.mp3"
}
```

#### Check Video Status (GET /api/videos/{id}/status)
#### Download Video (GET /api/videos/{id}/download)
#### Delete Video (DELETE /api/videos/{id})

## Desktop App Implementation

### 1. Token Storage (Secure)

For your desktop app, store tokens securely in the OS keychain:

**Electron (Node.js):**
```javascript
const keytar = require('keytar');

// Store tokens
await keytar.setPassword('typebeatz', 'access_token', accessToken);
await keytar.setPassword('typebeatz', 'refresh_token', refreshToken);

// Retrieve tokens
const accessToken = await keytar.getPassword('typebeatz', 'access_token');
const refreshToken = await keytar.getPassword('typebeatz', 'refresh_token');
```

**Windows (C#):**
```csharp
// Using Windows Credential Manager
var credential = new NetworkCredential("typebeatz_access", accessToken);
// Store securely using CredentialManager API
```

**macOS (Swift):**
```swift
// Using Keychain Services
let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrService as String: "typebeatz",
    kSecAttrAccount as String: "access_token",
    kSecValueData as String: accessToken.data(using: .utf8)!
]
SecItemAdd(query as CFDictionary, nil)
```

### 2. HTTP Client Implementation

**JavaScript/Node.js Example:**
```javascript
class TypeBeatzAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.accessToken = null;
    this.refreshToken = null;
  }

  async loadTokens() {
    this.accessToken = await keytar.getPassword('typebeatz', 'access_token');
    this.refreshToken = await keytar.getPassword('typebeatz', 'refresh_token');
  }

  async saveTokens(accessToken, refreshToken) {
    await keytar.setPassword('typebeatz', 'access_token', accessToken);
    await keytar.setPassword('typebeatz', 'refresh_token', refreshToken);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    let response = await fetch(url, { ...options, headers });

    // Handle token refresh
    if (response.status === 401 && this.refreshToken) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${this.accessToken}`;
        response = await fetch(url, { ...options, headers });
      }
    }

    return response;
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      await this.saveTokens(data.access_token, data.refresh_token);
      return data;
    }

    throw new Error('Login failed');
  }

  async createVideoJob(title, audioFilePath, settings = {}) {
    const videoData = {
      title,
      settings: {
        resolution: '1920x1080',
        frameRate: 30,
        waveformStyle: 'bars',
        ...settings
      },
      audioFile: audioFilePath
    };

    const response = await this.request('/videos', {
      method: 'POST',
      body: JSON.stringify(videoData)
    });

    return response.json();
  }

  async pollVideoStatus(videoId, callback) {
    const poll = async () => {
      try {
        const response = await this.request(`/videos/${videoId}/status`);
        const status = await response.json();
        
        callback(status);

        if (status.status === 'completed' || status.status === 'failed') {
          return status;
        }

        // Poll every 5 seconds
        setTimeout(poll, 5000);
      } catch (error) {
        console.error('Polling error:', error);
        setTimeout(poll, 10000); // Retry after 10 seconds on error
      }
    };

    poll();
  }

  async syncVideos() {
    const response = await this.request('/user/videos?limit=100');
    return response.json();
  }
}
```

### 3. Desktop App Integration Flow

1. **First Launch:**
   - Show login screen
   - User enters credentials
   - Store tokens securely
   - Sync existing videos from server

2. **Subsequent Launches:**
   - Load tokens from secure storage
   - Refresh token if needed
   - Sync video history

3. **Video Generation:**
   - User creates video locally
   - Upload job to server via API
   - Show progress from server
   - Download completed video

4. **Sync Strategy:**
   - Periodic sync every 5-10 minutes
   - Sync on app focus/resume
   - Sync after local video generation

### 4. Error Handling

```javascript
try {
  const videos = await api.syncVideos();
  // Update local video list
} catch (error) {
  if (error.message.includes('Authentication failed')) {
    // Redirect to login
    showLoginScreen();
  } else {
    // Show offline mode or retry later
    console.error('Sync failed:', error);
  }
}
```

## Environment Variables for Desktop App

Create a `.env` file in your desktop app:

```
TYPEBEATZ_API_URL=https://typebeatz.voodoo808.com/api
TYPEBEATZ_APP_NAME=TypeBeatz Desktop
TYPEBEATZ_VERSION=1.0.0
```

## Testing the Integration

1. Test the API endpoints using your browser's dev tools
2. Use tools like Postman to test authentication flow
3. Create a simple Node.js script to test video creation

Example test script:
```javascript
const api = new TypeBeatzAPI('https://your-repl-url.repl.co/api');

async function test() {
  // Login
  await api.login('test@example.com', 'password');
  
  // Create video
  const job = await api.createVideoJob('Test Video', '/path/to/audio.mp3');
  console.log('Job created:', job);
  
  // Poll status
  api.pollVideoStatus(job.id, (status) => {
    console.log('Status update:', status);
  });
}

test().catch(console.error);
```

This gives you a complete backend API that your desktop app can integrate with for seamless cross-platform sync!
