import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';
import { AppNavigationProp } from '../interface/navigation';
import { AxiosError } from 'axios';
import { ShowToastMessage } from '../components/ToastMesage';

const useErrorHandler = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<AppNavigationProp>();
    const { logOut } = useContext(DbAuthContext);

    const handleError = async (error: any) => {

        const { status: statusCode, Message, Metodo } = error ?? {}

        const status = error?.response?.status || statusCode;
        const method = error?.response?.config?.method;

        let message;

        if (error instanceof AxiosError && error.response) {
            let erroBadRequest = error.response.data.errors[0].message
            message = error.response.data.error || erroBadRequest || 'Error en el servidor';
        } else {
            message = error?.response?.data?.message ??
                error?.message ??
                error;
        }

        if (status === 401) {
            navigation.navigate('sessionExpired');
            return logOut?.();
        };

        await sendError({
            From: `mobil/${user?.Id_Usuario?.trim()}`,
            Message: message || Message,
            Id_Usuario: user?.Id_Usuario?.trim(),
            Metodo: method || Metodo || '',
            code: status.toString()
        });

        Toast.show({
            type: 'tomatoError',
            text1: message
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
        let erroBadRequest = errorValue.response.data.errors[0].message
        errorMessage = errorValue.response.data.error || erroBadRequest || 'Error en el servidor';
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


