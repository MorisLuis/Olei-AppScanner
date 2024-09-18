import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export const useErrorHandler = () => {
    const { user } = useContext(AuthContext);

    const handleError = async (error: any) => {

        console.log({error})

        const { status: statusCode, Message, Metodo } = error ?? {}
        const navigation = useNavigation<any>();

        // Verifica que error y error.response existan antes de acceder a error.response.status
        const status = error?.response?.status || statusCode;
        const method = error?.response?.config?.method;

        const message = error.response.data.error ? error.response.data.error :
            error.response.data.message ? error.response.data.message :
                error.message ? error.message : error;

        await sendError({
            From: `mobil/${user?.IdUsuarioOLEI?.trim()}`,
            Message: message || Message,
            Id_Usuario: user?.IdUsuarioOLEI?.trim(),
            Metodo: method || Metodo || '',
            code: status.toString()
        })
        

        Toast.show({
            type: 'error',
            text1: 'Algo salio mal!'
        })

        setTimeout(() => {
            navigation?.goBack();
        }, 300);
    };

    return { handleError };
}


export default useErrorHandler;
