import React, { useCallback, useState } from 'react';
import { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInterface, { ID_TIPO_MOVIMIENTO } from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import {
  postLogOutClient,
  postLoginClient,
  postLoginClientInterface,
  postLoginServer,
  postLoginServerInterface,
  postRefreshAuthServer,
  postRefreshToken,
} from '../../services/auth';
import {
  setClientLogoutHandler,
  setUnauthorizedHandler,
} from '../../api/apiCallbacks';
import { getIsLogginOutClient, getIsLoggingOut, setIsLoggingOut, setIsLoggingOutClient } from './AuthService';
import { queryClient } from '../../../App';

export interface AuthState {
  tokenServer: string | null;
  token: string | null;
  user: UserInterface | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  status: 'checking' | 'authenticated' | 'not-authenticated';

  errorMessage: string;
  codeBar?: string;
  codeBarStatus?: boolean;
}

export interface LoginData {
  usuario: string;
  password: string;
}

export const AUTH_INITIAL_USER_STATE = {
  TodosAlmacenes: 0,
  SalidaSinExistencias: 0,
  Id_Almacen: 0,
  AlmacenNombre: '',
}

export const AUTH_INITIAL_STATE: AuthState = {
  tokenServer: null,
  token: null,
  isLoading: false,
  isLoggingOut: false,
  user: {
    ServidorSQL: '',
    BaseSQL: '',
    PasswordSQL: '',
    UsuarioSQL: '',

    IdUsuarioOLEI: '',
    RazonSocial: '',
    SwImagenes: '',
    Vigencia: '',
    from: 'mobil',
    Id_Usuario: '',

    Id_TipoMovInv: {
      Id_TipoMovInv: 0,
      Accion: 0,
      Descripcion: '',
      Id_AlmDest: 0,
    },

    serverConected: false,
    userConected: false,

    ...AUTH_INITIAL_USER_STATE
  },
  status: 'checking',

  errorMessage: '',
  codeBar: '',
  codeBarStatus: false,
};

const ID_MOVEMENT_0 = 0;
const ID_MOVEMENT_1 = 1;
const ID_MOVEMENT_2 = 2;

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [isRestoringAuth, setIsRestoringAuth] = useState(true);

  const { handleError } = useErrorHandler();

  const restoreAuthServer = useCallback(async (): Promise<void> => {
    try {
      const tokenServer = await AsyncStorage.getItem('tokenServer');
      const token = await AsyncStorage.getItem('token');

      const { user } = await postRefreshAuthServer();

      dispatch({
        type: '[Auth] - RESTORE',
        payload: { token, tokenServer, user },
      });

    } catch (error) {
      handleError(error, true, true);
    }
  }, [handleError]);

  const loginServer = async ({
    usuario,
    password,
  }: postLoginServerInterface): Promise<void> => {

    dispatch({ type: '[Auth] - SET_LOADING', payload: true });
    try {
      const { user, tokenServer } = await postLoginServer({ usuario, password });
      await AsyncStorage.setItem('tokenServer', tokenServer);
      dispatch({ type: '[Auth] - LOGIN_SERVER', payload: { user, tokenServer } });
    } catch (error) {
      handleError(error);
    } finally {
      dispatch({ type: '[Auth] - SET_LOADING', payload: false });
    }
  };

  const loginClient = async ({
    Id_Usuario,
    password,
  }: postLoginClientInterface): Promise<void> => {
    dispatch({ type: '[Auth] - SET_LOADING', payload: true });

    try {
      const { user, token, refreshToken } = await postLoginClient({
        Id_Usuario,
        password,
      });

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      dispatch({ type: '[Auth] - LOGIN_CLIENT', payload: { user, token } });
    } catch (error) {
      handleError(error);
    } finally {
      dispatch({ type: '[Auth] - SET_LOADING', payload: false });
    }
  };

  const logOutClient = useCallback(async (): Promise<void> => {
    if (getIsLogginOutClient() || getIsLoggingOut()) return;
    dispatch({ type: '[Auth] - SET_LOADING', payload: true });
    setIsLoggingOutClient(true);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        await restoreAuthServer()
      } else {
        const { user } = await postLogOutClient();
        dispatch({ type: '[Auth] - LOGOUT_CLIENT', payload: { user: user } });
      }
      
      AsyncStorage.removeItem('token');
    } catch (error) {
      handleError(error);
    } finally {
      queryClient.clear() 
      dispatch({ type: '[Auth] - SET_LOADING', payload: false });
      setIsLoggingOutClient(false);
    }
  }, [handleError, restoreAuthServer]);

  const logOutServer = useCallback((): void => {

    if (getIsLogginOutClient() || getIsLoggingOut()) return; // Previene loop
    dispatch({ type: '[Auth] - SET_LOADING', payload: true });
    setIsLoggingOut(true);

    try {
      AsyncStorage.removeItem('tokenServer');
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('refreshToken');

      dispatch({ type: '[Auth] - LOGOUT_SERVER' });

    } catch (error) {
      handleError(error);
    } finally {
      queryClient.clear()
      dispatch({ type: '[Auth] - SET_LOADING', payload: false });
      setIsLoggingOut(false);
    }
  }, [handleError]);

  const refreshAuthToken = useCallback(async (): Promise<void | null> => {

    setIsRestoringAuth(true);
    dispatch({ type: '[Auth] - SET_LOADING', payload: true });

    try {
      const refreshToken_prop = await AsyncStorage.getItem('refreshToken');
      const tokenServer = await AsyncStorage.getItem('tokenServer');

      dispatch({ type: '[Auth] - RESTORE', payload: { token: null, tokenServer, user: null } });

      if (!refreshToken_prop) {
        return logOutClient();
      }

      const { token, refreshToken, user } = await postRefreshToken({
        refreshToken_prop,
      });

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      dispatch({ type: '[Auth] - REFRESH', payload: { token, user } });
    } catch (error) {
      handleError(error);
    } finally {
      dispatch({ type: '[Auth] - SET_LOADING', payload: false });
      setIsRestoringAuth(false);
    }
  }, [handleError, logOutClient]);

  const getTypeOfMovementsName = useCallback((): string => {
    let name;
    if (
      state.user?.Id_TipoMovInv?.Accion === ID_MOVEMENT_1 &&
      state.user?.Id_TipoMovInv?.Id_TipoMovInv === ID_MOVEMENT_0
    ) {
      // Inventario fisico
      name = 'Inventario';
    } else if (state.user?.Id_TipoMovInv?.Accion === ID_MOVEMENT_1) {
      name = 'Entrada';
    } else if (state.user?.Id_TipoMovInv?.Accion === ID_MOVEMENT_2) {
      name = 'Salida';
    } else {
      name = 'Traspaso';
    }
    return name;
  }, [
    state.user?.Id_TipoMovInv?.Accion,
    state.user?.Id_TipoMovInv?.Id_TipoMovInv,
  ]);

  const updateTypeOfMovements = async (
    value: ID_TIPO_MOVIMIENTO,
  ): Promise<void> => {
    try {
      dispatch({
        type: '[Auth] - TYPE_OF_MOVEMENT',
        payload: { tipoMovimiento: value },
      });
    } catch (error) {
      handleError(error);
    }
  };

  const updateUser = (user: Partial<UserInterface>): void => {
    dispatch({ type: '[Auth] - UPDATE_USER', payload: { user } });
  };

  useEffect(() => {
    if (!isStorageReady) {
      setIsStorageReady(true);
      return;
    };

    refreshAuthToken();
  }, [refreshAuthToken, isStorageReady]);

  useEffect(() => {
    setClientLogoutHandler(async () => {
      await logOutClient();
    });
  }, [logOutClient]);

  useEffect(() => {
    setUnauthorizedHandler(async () => {
      logOutServer();
    });
  }, [logOutServer]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginServer,
        loginClient,
        logOutServer,
        logOutClient,

        getTypeOfMovementsName,
        updateTypeOfMovements,
        updateUser,

        isRestoringAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
