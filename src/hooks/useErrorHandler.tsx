import { useCallback, useContext } from 'react';
import Toast from 'react-native-toast-message';

import { ERROR_MESSAGES, ErrorResponse } from '../interface/error';
import { sendError } from '../services/errors';
import { ERROR_400, ERROR_401, ERROR_403, ERROR_404, ERROR_500 } from '../utils/globalConstants';
import { AuthContext } from '../context/auth/AuthContext';

const useErrorHandler = (): {
  handleError: (_error: unknown, _avoidAPI?: boolean, _avoidToast?: boolean) => Promise<void>;
} => {

  const handleError = useCallback(async (
    error: unknown,
    save?: boolean,
    avoidToast?: boolean,
  ): Promise<void> => {

    const { logOutClient } = useContext(AuthContext)

    const err = error as ErrorResponse;
    const status = err.response?.status;
    const message = err.response?.data?.error

    if (status) {
      switch (status) {
        case ERROR_400:
          Toast.show({
            type: 'tomatoError',
            text1: message ?? ERROR_MESSAGES[ERROR_400]
          });
          break;
        case ERROR_401:
          Toast.show({
            type: 'tomatoError',
            text1: message ?? ERROR_MESSAGES[ERROR_401]
          });
          // Lógica de refrescar el token o cerrar sesión:
          // Ej.: authContext.logout();
          break;
        case ERROR_403:
          Toast.show({
            type: 'tomatoError',
            text1: message ?? ERROR_MESSAGES[ERROR_403],
          });
          break;
        case ERROR_404:
          Toast.show({
            type: 'tomatoError',
            text1: message ?? ERROR_MESSAGES[ERROR_404],
          });
          logOutClient()
          break;
        case ERROR_500:
          Toast.show({
            type: 'tomatoError',
            text1: message ?? ERROR_MESSAGES[ERROR_500],
          });
          // Opcional: Si la petición es idempotente, podés implementar
          // lógica para reintentar con backoff exponencial.
          break;
        default:
          Toast.show({
            type: 'tomatoError',
            text1: ERROR_MESSAGES.GENERIC,
          });
          break;
      }
    } else {
      // Errores sin status, como problemas de red o errores en la configuración
      Toast.show({
        type: 'tomatoError',
        text1: err.message || ERROR_MESSAGES.GENERIC
      });
    }
    // eslint-disable-next-line no-console
    console.error("Error capturado:", error);

  }, []);

  return {
    handleError
  };
};

export default useErrorHandler;