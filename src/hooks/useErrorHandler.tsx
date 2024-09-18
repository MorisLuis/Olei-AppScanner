import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { sendError } from '../services/errors';

export const useErrorHandler = () => {
    const { user } = useContext(AuthContext);

    const handleError = async (error: any) => {

        const { status: statusCode, Message, Metodo } = error ?? {}
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

       /*  if (status) {
            switch (status) {
                case 404:
                    router.push('/404');
                    break;
                case 401:
                case 403:
                    router.push('/login');
                    break;
                case 500:
                    router.push('/500');
                    break;
                default:
                    router.push('/404');
                    break;
            }
        } else {
            toast.error("Algo salió mal!");
        } */
    };

    return { handleError };
}


export default useErrorHandler;
