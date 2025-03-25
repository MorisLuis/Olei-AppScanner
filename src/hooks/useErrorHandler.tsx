import {useContext} from 'react';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';

import {AuthContext} from '../context/auth/AuthContext';
import {sendError} from '../services/errors';
import {CustomAxiosError, ErrorCustum} from '../interface/error';

const isAxiosError = (error: unknown): error is CustomAxiosError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as {isAxiosError: boolean}).isAxiosError === true
  );
};

const useErrorHandler = () => {
  const {user, logOutServer} = useContext(AuthContext);

  /**
   * Procesa errores recibidos, principalmente de llamadas Axios.
   * Envía logs, muestra notificaciones y maneja acciones de logout o redirección según corresponda.
   *
   * @param error - Error recibido (puede ser de Axios o cualquier otro).
   * @param avoidAPI - Si es true, evita enviar el error a la API.
   * @param avoidToast - Si es true, evita mostrar la notificación (Toast).
   */
  const handleError = async (
    error: unknown,
    save?: boolean,
    avoidToast?: boolean,
  ): Promise<void> => {
    if (isAxiosError(error)) {
      // Extrae información relevante del error de Axios.
      const status = error.response?.status;
      const method = error.response?.config?.method;

      const message =
        error.response?.data?.error ??
        error.response?.data?.message ??
        'Error desconocido';

      console.log(`${status}-${method}-${message}`);

      if (status === 401) {
        logOutServer?.();
      }

      if (save) {
        await sendError({
          From: `mobil/${user?.Id_Usuario?.trim()}`,
          Message: message,
          Id_Usuario: user?.Id_Usuario?.trim(),
          Metodo: method || '',
          code: status ? status.toString() : '500',
        });
      }

      if (!avoidToast) {
        Toast.show({
          type: 'tomatoError',
          text1: message,
        });
      }

      if (status === 500) {
        logOutServer?.();
        return;
      }
    } else {
      console.error('Unknown error:', error);
    }
  };

  const handleErrorCustum = async (error: ErrorCustum) => {
    const {status, Message, Metodo} = error ?? {};

    console.log({handleErrorCustum: true, status, Metodo, Message});

    if (status === 401) {
      logOutServer?.();
    }

    await sendError({
      From: `mobil/${user?.Id_Usuario?.trim()}`,
      Message: Message || Message,
      Id_Usuario: user?.Id_Usuario?.trim(),
      Metodo: Metodo || '',
      code: status.toString(),
    });

    Toast.show({
      type: 'tomatoError',
      text1: Message,
    });

    if (status === 500) {
      logOutServer?.();
      return;
    }
  };

  const handleErrorApi = async (error: AxiosError) => {
    console.log({errorAPI: error});
  };

  return {
    handleError,
    handleErrorCustum,
    handleErrorApi,
  };
};

export default useErrorHandler;
