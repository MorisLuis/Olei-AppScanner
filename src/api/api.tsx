import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.13:5001',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para agregar el token a los headers
api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor para manejar errores de token expirado y refrescarlo
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        console.log("ERROR", error?.response?.status);

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');

                if (!refreshToken) {
                    throw new Error('No hay refresh token');
                }

                // Pedir un nuevo access token enviando el refresh token en el body
                const { data } = await axios.post('http://192.168.1.13:5001/api/auth/refresh', {
                    refreshToken
                });

                // Guardar los nuevos tokens en AsyncStorage
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('refreshToken', data.refreshToken);

                originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
