import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage-adapter';
import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// DEBUG: Ver todas las variables disponibles
console.log('Variables de entorno:', Constants.expoConfig?.extra);

const STAGE = Constants.expoConfig?.extra?.EXPO_PUBLIC_STAGE || 'dev';

export const API_URL = 'http://192.168.1.5:4000/api'
  // STAGE === 'prod' 
  //   ? Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL
  //   : Platform.OS === 'ios'
  //   ? Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL_IOS
  //   : Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL_ANDROID;

console.log({STAGE, OS: Platform.OS, API_URL});

const bancoApi = axios.create({
  baseURL: API_URL,
  timeout: 10000, // ← Agrega timeout
});

// Interceptors
bancoApi.interceptors.request.use(async (config) => {
  const token = await SecureStorageAdapter.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuestas para debug
bancoApi.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.log('❌ Error API:', error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export { bancoApi };

