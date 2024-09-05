import { createContext } from 'react';
import { LoginData } from './DbAuthProvider';
import UserInterface from '../../interface/user';

type ContextProps = {
    errorMessage: string;
    tokenDB: string | null;
    user: UserInterface | null;
    status: 'dbChecking' | 'dbAuthenticated' | 'dbNot-authenticated';
    loggingIn: boolean;
    signInDB: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}


export const DbAuthContext = createContext({} as ContextProps );