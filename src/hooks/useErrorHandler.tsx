import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';
import { AppNavigationProp } from '../interface/navigation';
import { AxiosError } from 'axios';

const useErrorHandler = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<AppNavigationProp>();
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

const useCatchError = (errorValue: unknown) => {

    let errorMessage;

    if (errorValue instanceof AxiosError && errorValue.response) {
        errorMessage = errorValue.response.data.error || 'Error en el servidor';
    } else if (errorValue instanceof Error) {
        errorMessage = errorValue.message;
    } else {
        errorMessage = 'Error desconocido';
    }

    return {
        errorMessage
    }
}

export default useErrorHandler;

export {
    useCatchError
}


