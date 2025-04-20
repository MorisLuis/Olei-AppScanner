import AsyncStorage from '@react-native-async-storage/async-storage';
import { InternalAxiosRequestConfig } from 'axios';
import { trackApiRequest } from '../utils/sentryConfig';

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {

  const { method, url } = config;
  trackApiRequest(config)

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('[📡 API REQUEST]', method?.toUpperCase(), url);
  };

  const token = await AsyncStorage.getItem('token');
  const tokenServer = await AsyncStorage.getItem('tokenServer');

  config.headers = config.headers || {};

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (tokenServer) {
    config.headers['X-Server-Token'] = `Bearer ${tokenServer}`;
  }

  return config;
};
