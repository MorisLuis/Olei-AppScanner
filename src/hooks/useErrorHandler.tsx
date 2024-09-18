import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export const useErrorHandler = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleError = async (error: any) => {
        const { status: statusCode, Message, Metodo } = error ?? {}
        
        const status = error?.response?.status || statusCode;
        const method = error?.response?.config?.method;

        const message = error?.response?.data?.error 
            ? error?.response?.data?.error 
            : error?.response?.data?.message 
            ? error?.response?.data?.message 
            : error?.message 
            ? error?.message 
            : error;

        await sendError({
            From: `mobil/${user?.Id_Usuario?.trim()}`,
            Message: message || Message,
            Id_Usuario: user?.Id_Usuario?.trim(),
            Metodo: method || Metodo || '',
            code: status.toString()
        });

        Toast.show({
            type: 'error',
            text1: 'Algo salió mal!'
        });

        // Utiliza navigation.goBack() aquí
        setTimeout(() => {
            navigation?.goBack();
        }, 300);
    };

    return { handleError };
};


export default useErrorHandler;
