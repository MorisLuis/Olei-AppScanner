import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';
import { AppNavigationProp } from '../interface/navigation';
import { AxiosError } from 'axios';
import { CustomAxiosError, ErrorCustum } from '../interface/error';

const isAxiosError = (error: unknown): error is CustomAxiosError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        (error as { isAxiosError: boolean }).isAxiosError === true
    );
};


const useErrorHandler = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<AppNavigationProp>();
    const { logOut, status: statusDB } = useContext(DbAuthContext);
    const { logOut: logOutAuth, status: statusAuth } = useContext(AuthContext)


    /**
     * Procesa errores recibidos, principalmente de llamadas Axios.
     * Envía logs, muestra notificaciones y maneja acciones de logout o redirección según corresponda.
     *
     * @param error - Error recibido (puede ser de Axios o cualquier otro).
     * @param avoidAPI - Si es true, evita enviar el error a la API.
     * @param avoidToast - Si es true, evita mostrar la notificación (Toast).
     */
    const handleError = async (error: unknown, save?: boolean, avoidToast?: boolean): Promise<void> => {

        if (isAxiosError(error)) {
            // Extrae información relevante del error de Axios.
            const status = error.response?.status;
            const method = error.response?.config?.method;

            const message =
                error.response?.data?.error ??
                error.response?.data?.message ??
                "Error desconocido";

            console.log({ status, method, message });

            // Si la sesión ha terminado, se maneja la redirección o logout.
            if (message === 'Sesion terminada') {

                // Si esta en loginDB > retorna, por que ya estan cerradas las sesiones.
                if (statusDB === undefined && statusAuth === undefined) return

                // Si esta en login > cierra sesion.
                if (statusAuth === undefined) {
                    logOut?.()
                    return;
                };

                return navigation.navigate('sessionExpired')
            }

            if (status === 401) {
                logOutAuth?.();
                logOut?.();
            };

            if (save) {
                await sendError({
                    From: `mobil/${user?.Id_Usuario?.trim()}`,
                    Message: message,
                    Id_Usuario: user?.Id_Usuario?.trim(),
                    Metodo: method || '',
                    code: status ? status.toString() : "500"
                });
            }

            if (!avoidToast) {
                Toast.show({
                    type: 'tomatoError',
                    text1: message
                });
            }

            if (status === 500) {
                logOutAuth?.();
                return;
            };

        } else {
            console.error("Unknown error:", error);
        }
    };

    const handleErrorCustum = async (error: ErrorCustum) => {
        const { status, Message, Metodo } = error ?? {};


        if (status === 401) {
            logOutAuth?.();
            logOut?.();
        };

        await sendError({
            From: `mobil/${user?.Id_Usuario?.trim()}`,
            Message: Message || Message,
            Id_Usuario: user?.Id_Usuario?.trim(),
            Metodo: Metodo || '',
            code: status.toString()
        });

        Toast.show({
            type: 'tomatoError',
            text1: Message
        });

        if (status === 500) {
            logOutAuth?.();
            return;
        };

    };

    const handleErrorApi = async (error: AxiosError) => {
        console.log({ errorAPI: error })
    };

    return {
        handleError,
        handleErrorCustum,
        handleErrorApi
    };
};

const useCatchError = (errorValue: unknown) => {
    let errorMessage = "Error desconocido";

    if (errorValue instanceof AxiosError && errorValue.response) {
        const { response } = errorValue;

        // Validamos que `response.data` existe antes de acceder a `errors`
        const errorsArray = response.data?.errors;
        const erroBadRequest = Array.isArray(errorsArray) && errorsArray.length > 0 ? errorsArray[0]?.message : null;

        // Si `response.data.error` o `erroBadRequest` existen, los usamos
        errorMessage = response.data?.error || erroBadRequest || "Error en el servidor";
    } else if (errorValue instanceof Error) {
        errorMessage = errorValue.message;
    }

    return { errorMessage };
};

export default useErrorHandler;

export {
    useCatchError
}


