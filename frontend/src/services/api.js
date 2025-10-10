// API service to replace Wails bindings
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for searches
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  // Health check
  async health() {
    const response = await apiClient.get('/health');
    return response.data;
  },

  // Get websites by categories
  async getWebsitesWithCategories(categories) {
    const response = await apiClient.post('/websites/by-categories', { categories });
    return response.data;
  },

  // Get websites that require login
  async getWebsitesWithLogin() {
    const response = await apiClient.get('/websites/with-login');
    return response.data;
  },

  // Perform search
  async search(query, websites, categories) {
    const response = await apiClient.post('/search', {
      query,
      websites,
      categories
    });
    return response.data;
  }
};

// Event emitter for websiteDone events (simulated)
export class SearchEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }
}

export const searchEvents = new SearchEventEmitter();
