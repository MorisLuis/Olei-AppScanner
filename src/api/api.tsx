import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/* export const api = axios.create(
    {
        baseURL: 'https://seahorse-app-spuvc.ondigitalocean.app/',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)
 */


export const api = axios.create(
    {
        baseURL: 'http://10.223.94.163:5001',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)


// Interceptor to add the token to headers
api.interceptors.request.use(
    async config => {
        const tokenDB = await AsyncStorage.getItem('tokenDB');
        const token = await AsyncStorage.getItem('token');

        if (tokenDB) {
            config.headers['Authorization'] = `Bearer ${tokenDB}`;
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);