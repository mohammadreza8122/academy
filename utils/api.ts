import axios from 'axios';
import { storage } from './storage';
import type { RequestOTPResponse, VerifyOTPResponse, User, UpdateProfileData } from '@/types/auth';

const BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    requestOTP: async (phoneNumber: string): Promise<RequestOTPResponse> => {
      const response = await axiosInstance.post('/user/auth/request-otp/', {
        phone_number: phoneNumber,
      });
      return response.data;
    },
    
    verifyOTP: async (phoneNumber: string, code: string): Promise<VerifyOTPResponse> => {
      const response = await axiosInstance.post('/user/auth/verify-otp/', {
        phone_number: phoneNumber,
        code: code,
      });
      
      // Save the access token from the response
      if (response.data.access) {
        await storage.setToken(response.data.access);
      }
      
      return response.data;
    },
  },
  
  user: {
    getProfile: async (): Promise<User> => {
      const response = await axiosInstance.get('/user/profile/');
      return response.data;
    },
    
    updateProfile: async (data: UpdateProfileData): Promise<User> => {
      const formData = new FormData();
      
      if (data.first_name) formData.append('first_name', data.first_name);
      if (data.last_name) formData.append('last_name', data.last_name);
      if (data.email) formData.append('email', data.email);
      
      const response = await axiosInstance.put('/user/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  },
}; 