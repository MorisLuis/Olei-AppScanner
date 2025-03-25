import React from 'react';
import { useReducer, useEffect, useState } from 'react';

import { api } from '../../api/api';
import UserInterface from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Id_TipoMovInvInterface } from '../../services/typeOfMovement';
import useErrorHandler from '../../hooks/useErrorHandler';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface;
    codeBar?: string;
    codeBarStatus?: boolean
}

export interface LoginData {
    usuario: string;
    password: string;
}

export const AUTH_INITIAL_STATE: AuthState = {
    status: 'checking',
    token: null,
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

        TodosAlmacenes: 0,
        Id_Almacen: 0,
        AlmacenNombre: '',

        SalidaSinExistencias: 0,

        Id_TipoMovInv: {
            Id_TipoMovInv: 0,
            Accion: 0,
            Descripcion: '',
            Id_AlmDest: 0
        },

        Id_Usuario: '',
        serverConected: false,
        userConected: false
    },
    errorMessage: '',
    codeBar: "",
    codeBarStatus: false,
};


export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const { handleError } = useErrorHandler()

    useEffect(() => {
        refreshToken();
    }, [])

    const loginServer = async ({ usuario, password }: LoginData) => {
        setLoggingIn(true)

        try {
            state.status = "checking"
            const { data } = await api.post('/api/auth/loginServer', { IdUsuarioOLEI: usuario, PasswordOLEI: password });

            dispatch({
                type: '[Auth] - logInServer',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('refreshToken', data.refreshToken);

        } catch (error) {
            handleError(error);
        } finally {
            setLoggingIn(false)
        }
    };

    const login = async ({ usuario, password }: LoginData) => {
        setLoggingIn(true)

        try {
            state.status = "checking"
            const { data } = await api.post('/api/auth/login', { Id_Usuario: usuario, password });

            dispatch({
                type: '[Auth] - logIn',
                payload: {
                    user: data.user
                }
            });
        } catch (error) {
            handleError(error);
        } finally {
            setLoggingIn(false)
        }
    };

    const refreshToken = async () => {

        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (!refreshToken) return dispatch({ type: '[Auth] - notAuthenticated' });

            // Hay token
            const resp = await api.post('/api/auth/refresh',
                { refreshToken },
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

            if (resp.status !== 200) {
                return dispatch({ type: '[Auth] - notAuthenticated' });
            };

            if (resp.data.userConected === false) {
                return dispatch({ type: '[Auth] - notAuthenticated' });
            }

            await AsyncStorage.setItem('token', resp.data.token);
            await AsyncStorage.setItem('refreshToken', resp.data.refreshToken);

            dispatch({
                type: '[Auth] - logIn',
                payload: {
                    user: resp.data.user
                }
            });

        } catch (error) {
            handleError(error, true, true)
            return dispatch({ type: '[Auth] - notAuthenticated' });
        }
    }

    const logOutServer = async () => {
        console.log("logOutServer!")
        try {
            setLoggingIn(false);
            await api.get('/api/auth/logoutServer');
            await AsyncStorage.removeItem('token');
            dispatch({ type: '[Auth] - logOutServer' });
        } catch (error) {
            handleError(error);
        };
    };

    const logOutUser = async () => {
        try {
            setLoggingIn(false);
            const user = await api.get('/api/auth/logoutUser');

            dispatch({
                type: '[Auth] - logOutUser',
                payload: {
                    user: user.data.user
                }
            });
        } catch (error) {
            handleError(error);
        }
    };

    const removeError = () => {
        dispatch({ type: '[Auth] - removeError' });
    };

    const updateTypeOfMovements = async (value: Id_TipoMovInvInterface) => {
        try {
            dispatch({
                type: '[Auth] - typeOfMovement',
                payload: {
                    user: {
                        ...state.user!,
                        Id_TipoMovInv: {
                            Id_TipoMovInv: value.Id_TipoMovInv,
                            Accion: value.Accion,
                            Descripcion: value.Descripcion,
                            Id_AlmDest: value.Id_AlmDest
                        }
                    }
                }
            });
        } catch (error) {
            handleError(error, true)
        }
    }

    const getTypeOfMovementsName = () => {
        let name;
        if (state.user?.Id_TipoMovInv?.Accion === 1 && state.user?.Id_TipoMovInv?.Id_TipoMovInv === 0) { // Inventario fisico
            name = "Inventario"
        } else if (state.user?.Id_TipoMovInv?.Accion === 1) {
            name = "Entrada"
        } else if (state.user?.Id_TipoMovInv?.Accion === 2) {
            name = "Salida"
        } else {
            name = "Traspaso"
        }
        return name
    }

    const updateUser = (user: Partial<UserInterface>) => {
        dispatch({ type: '[Auth] - updateUser', payload: user })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginServer,
            loggingIn,
            login,
            logOutUser,
            logOutServer,
            removeError,
            updateTypeOfMovements,
            getTypeOfMovementsName,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>

    )
};