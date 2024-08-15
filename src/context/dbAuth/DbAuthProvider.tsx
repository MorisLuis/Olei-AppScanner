import React, { useReducer, useEffect, useState } from 'react';
import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { dbAuthReducer } from './dbAuthReducer';
import { DbAuthContext } from './DbAuthContext';
import UserInterface from '../../interface/user';

export interface userDB {
    servidor: string;
    database: string;
    user: UserInterface
}

export interface DbAuthState {
    status: 'dbChecking' | 'dbAuthenticated' | 'dbNot-authenticated';
    tokenDB: string | null;
    errorMessage: string;
    userDB: userDB | null;
    user: UserInterface | null
}

export interface LoginResponse {
    userDB: userDB;
    tokenDB: string;
}

export interface LoginData {
    IdUsuarioOLEI: string;
    PasswordOLEI: string;
}

export interface RegisterData {
    servidor: string;
    database: string;
    nombre: string;
}

const AUTH_INITIAL_STATE: DbAuthState = {
    status: 'dbChecking',
    tokenDB: null,
    userDB: null,
    errorMessage: '',
    user: null
}

export const DbAuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(dbAuthReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {

        try {
            const token = await AsyncStorage.getItem('tokenDB');

            // No token, no autenticado
            if (!token) return dispatch({ type: 'notAuthenticated' });

            // Hay token
            const resp = await api.get('/api/auth/renew', {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token || ''
                }
            });
    
            if (resp.status !== 200) {
                return dispatch({ type: 'notAuthenticated' });
            }
    
            await AsyncStorage.setItem('tokenDB', resp.data.token);
            dispatch({
                type: 'signUp',
                payload: {
                    tokenDB: resp.data.tokenDB,
                    userDB: resp.data.userDB,
                    user: resp.data.user
                }
            });

        } catch (error) {
            console.log({ errorDBToken: error })
            return dispatch({ type: 'notAuthenticated' });
        }
    }


    const signInDB = async ({ IdUsuarioOLEI, PasswordOLEI }: LoginData) => {
        setLoggingIn(true)
        try {
            state.status = "dbChecking"
            const { data } = await api.post('/api/auth/loginDB', { IdUsuarioOLEI, PasswordOLEI });

            dispatch({
                type: 'signUp',
                payload: {
                    tokenDB: data.tokenDB,
                    userDB: data.userDB,
                    user: data.user
                }
            });

            await AsyncStorage.setItem('tokenDB', data.tokenDB);
            setLoggingIn(false)


        } catch (error: any) {
            setLoggingIn(false)

            dispatch({
                type: 'addErrorDB',
                payload: (error.response ? error.response.data.error : error.message )|| 'Información incorrecta'
            })
        }
    };

    const logOut = async () => {
        setLoggingIn(false);
        await AsyncStorage.removeItem('tokenDB');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };


    return (
        <DbAuthContext.Provider value={{
            ...state,
            signInDB,
            loggingIn,
            logOut,
            removeError
        }}>
            {children}
        </DbAuthContext.Provider>

    )
};