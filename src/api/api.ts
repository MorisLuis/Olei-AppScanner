// api.ts

import axios from 'axios';
import { requestInterceptor } from './requestInterceptors';
import { responseInterceptor, errorResponseInterceptor } from './responseInterceptors';

/* https://seahorse-app-spuvc.ondigitalocean.app */

// Configuración básica de la conexión a la API.
export const api = axios.create({
  baseURL: 'http://192.168.1.16:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar interceptor de solicitud.
api.interceptors.request.use(
  requestInterceptor, // Aquí aplicamos la función de interceptor de solicitud.
  (error) => Promise.reject(error)
);

// Agregar interceptores de respuesta
api.interceptors.response.use(
  responseInterceptor,
  errorResponseInterceptor
);
