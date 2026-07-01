import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { PingResponse, HealthResponse } from '../types/api';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service methods
export const apiService = {
  // Get ping response
  async getPing(): Promise<PingResponse> {
    try {
      const response: AxiosResponse<PingResponse> = await apiClient.get('/ping');
      return response.data;
    } catch (error) {
      console.error('Error fetching ping:', error);
      throw error;
    }
  },

  // Get health status
  async getHealth(): Promise<HealthResponse> {
    try {
      const response: AxiosResponse<HealthResponse> = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error fetching health:', error);
      throw error;
    }
  },

  // Combined status check (both ping and health)
  async getStatus() {
    try {
      const [ping, health] = await Promise.all([
        this.getPing(),
        this.getHealth()
      ]);
      return { ping, health };
    } catch (error) {
      console.error('Error fetching combined status:', error);
      throw error;
    }
  }
};

export default apiService;
