import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';

export const useErrorHandler = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const { logOut } = useContext(DbAuthContext);

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

        if (status === 401) {
            console.log("session ended");
            navigation.navigate('sessionExpired');
            return logOut?.();
        }

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

        // Verifica si es posible ir hacia atrás
        setTimeout(() => {
            if (navigation?.canGoBack()) {
                navigation.goBack();
            }
        }, 300);
    };
    return { handleError };
};


export default useErrorHandler;
