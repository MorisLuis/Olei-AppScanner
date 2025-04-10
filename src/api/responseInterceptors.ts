// responseInterceptors.ts
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerClientLogout, triggerUnauthorized } from './apiCallbacks';
import { getIsLoggingOut } from '../context/auth/AuthService';
// Importamos el servicio global o módulo donde tenés el flag

const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
};

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

export const errorResponseInterceptor = async (error: AxiosError): Promise<never> => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const status = error?.response?.status;

    if (status === HTTP_STATUS.UNAUTHORIZED) {
        triggerUnauthorized();
        return Promise.reject(error);
    }

    // Verificamos el flag global para evitar loops
    if (getIsLoggingOut()) {
        return Promise.reject(error);
    };

    if (status === HTTP_STATUS.FORBIDDEN && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (!refreshToken) {
                triggerClientLogout();
                return Promise.reject(new Error('No hay refresh token'));
            }

            const { data } = await axios.post(`http://192.168.100.126:5001/api/auth/refresh`, {
                refreshToken,
            });

            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('refreshToken', data.refreshToken);

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
            return axios(originalRequest);
        } catch (refreshError) {
            triggerClientLogout();
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
};

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}
