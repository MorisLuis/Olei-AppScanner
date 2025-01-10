import React, { useContext } from 'react';
import { useReducer, useEffect, useState } from 'react';

import { api } from '../../api/api';
import UserInterface from '../../interface/user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DbAuthContext } from '../dbAuth/DbAuthContext';
import { Id_TipoMovInvInterface } from '../../services/typeOfMovement';
import useErrorHandler, { useCatchError } from '../../hooks/useErrorHandler';
import { AppNavigationProp } from '../../interface/navigation';
import { ApiError } from '../../interface/error';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface;
    codeBar?: string;
    codeBarStatus?: boolean
}

export interface LoginData {
    Id_Usuario: string;
    password: string;
}

export const AUTH_INITIAL_STATE: AuthState = {
    status: 'not-authenticated',
    token: null,
    user: {
        serverclientes: '',
        baseclientes: '',
        PasswordSQL: '',
        UsuarioSQL: '',
        IdUsuarioOLEI: '',
        RazonSocial: '',
        SwImagenes: '',
        Vigencia: '',
        from: 'mobil',
        Id_TipoMovInv: {
            Id_TipoMovInv: 0,
            Accion: 0,
            Descripcion: '',
            Id_AlmDest: 0
        },
        Id_Almacen: 0,
        Id_Usuario: ''
    },
    errorMessage: '',
    codeBar: "",
    codeBarStatus: false
};


export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const { addListener, reset, navigate } = useNavigation<AppNavigationProp>();
    const { status } = useContext(DbAuthContext);
    const [currentScreen, setCurrentScreen] = React.useState('');
    const { handleError } = useErrorHandler()

    useEffect(() => {
        const unsubscribe = addListener('state', () => {
            //setCurrentScreen(navigation.getCurrentRoute().name); // MODIFY
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const statusLogin = state.status;
        const statusLoginDatabase = status;

        if (statusLoginDatabase == 'dbChecking' || statusLogin == 'checking') {
            return;
        }

        if (statusLoginDatabase == 'dbNot-authenticated' && statusLogin == 'not-authenticated') {
            if (currentScreen === 'LoginDatabaseScreen') return;

            return reset({
                index: 0,
                routes: [{ name: 'LoginDatabaseScreen' }],
            })
        }

        if (statusLoginDatabase == 'dbAuthenticated' && statusLogin == 'authenticated') {
            return navigate('typeOfMovementScreen')
        }

        if (statusLoginDatabase == 'dbAuthenticated' && statusLogin == 'not-authenticated') {
            reset({
                index: 0,
                routes: [{ name: 'LoginPage' }],
            })
            return;
        }

    }, [state.status, status])

    useEffect(() => {
        checkToken();
    }, [])

    const signIn = async ({ Id_Usuario, password }: LoginData) => {
        setLoggingIn(true)

        try {
            state.status = "checking"
            const { data } = await api.post('/api/auth/login', { Id_Usuario, password });

            dispatch({
                type: '[Auth] - signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });
            await AsyncStorage.setItem('token', data.token);

        } catch (error) {
            const { errorMessage } = useCatchError(error);

            dispatch({ type: '[Auth] - addError', payload: errorMessage })
        } finally {
            setLoggingIn(false)
        }
    };

    const checkToken = async () => {

        try {
            const token = await AsyncStorage.getItem('token');

            // No token, no autenticado
            if (!token) return dispatch({ type: '[Auth] - notAuthenticated' });

            // Hay token
            const resp = await api.get('/api/auth/renewLogin', {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token || ''
                }
            });

            if (resp.status !== 200) {
                return dispatch({ type: '[Auth] - notAuthenticated' });
            }

            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({
                type: '[Auth] - signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.user
                }
            });

        } catch (error) {
            dispatch({ type: '[Auth] - notAuthenticated' });
            return;
        }
    }

    const logOut = async (findSession?: boolean) => {
        setLoggingIn(false);
        if (findSession) {
            await api.get('/api/auth/logoutApp');
        }
        await AsyncStorage.removeItem('token');
        dispatch({ type: '[Auth] - logout' });
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
            handleError(error)
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

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            loggingIn,
            logOut,
            removeError,
            updateTypeOfMovements,
            getTypeOfMovementsName
        }}>
            {children}
        </AuthContext.Provider>

    )
};