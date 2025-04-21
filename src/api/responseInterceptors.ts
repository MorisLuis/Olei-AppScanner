// responseInterceptors.ts
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerClientLogout, triggerUnauthorized } from './apiCallbacks';
import { getIsLoggingOut } from '../context/auth/AuthService';
import { trackApiResponse } from '../utils/sentryConfig';
import { api, domain } from './api';
import { ERROR_500 } from '../utils/globalConstants';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
};

let isRefreshing = false;
let failedQueue: {
    resolve: (_value?: unknown) => void;
    reject: (_error: unknown) => void;
}[] = [];

function processQueue(error: unknown, token?: string): void {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
}


// Interceptor para respuestas exitosas (sin modificación, pero se mantiene para consistencia)
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

// Interceptor de errores – centralizamos el manejo de distintos status y casos especiales
export const errorResponseInterceptor = async (error: AxiosError): Promise<never> => {


    // Si ya se está ejecutando un proceso de logout, evitamos loops
    if (getIsLoggingOut()) {
        return Promise.reject(error);
    };

    // Guardar en sentry
    trackApiResponse(error)

    // Extraemos la configuración original y el status de la respuesta si existe
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Manejar errores específicos
    if (error.response) {
        const status = error.response?.status;
        const message = (error.response.data as { error?: string })?.error;

        if (status === ERROR_500) {
            return Promise.reject({
                response: {
                    data: { message: 'Error interno del servidor, no se pudo procesar el inventario' },
                },
            });
        }

        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log(`🚨 [${status}] - ${message}`);
        };

        // 🚨 Token1 ( tokenServer ) o sesión Redis expirados.
        if (message === 'SESSION_EXPIRADA' || message === 'TOKEN_EXPIRADO') {
            triggerUnauthorized();
            return Promise.reject(error);
        }

        // 🔁 Token2 ( token ) expirado pero refresheable.
        if (message === 'TOKEN_2_EXPIRADO' && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: unknown) => {
                            if (typeof token === 'string') {
                                originalRequest.headers = {
                                    ...originalRequest.headers,
                                    Authorization: `Bearer ${token}`,
                                };
                            }
                            resolve(api(originalRequest));
                        },
                        reject,
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (!refreshToken) {
                    triggerClientLogout();
                    return Promise.reject(error);
                }

                const { data } = await axios.post(`${domain}/api/auth/refresh`, { refreshToken });

                if (!data.token) {
                    triggerClientLogout();
                    return Promise.reject(error);
                };

                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('refreshToken', data.refreshToken);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

                processQueue(null, data.token);

                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${data.token}`,
                };

                return api(originalRequest);


            } catch (error) {

                processQueue(error);
                triggerClientLogout();
                return Promise.reject(error);

            } finally {
                isRefreshing = false;
            }
        };

        // 🧨 Refresh Token inválido o expirado
        if (message === 'REFRESH_TOKEN_EXPIRADO') {
            triggerClientLogout();
            return Promise.reject(error);
        }

        // ❌ Token2 inválido pero no expirado
        if (message === 'TOKEN_2_INVALIDO') {
            triggerClientLogout();
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
};