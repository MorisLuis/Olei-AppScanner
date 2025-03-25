import {createContext} from 'react';

import {LoginData} from './AuthProvider';
import UserInterface from '../../interface/user';
import {Id_TipoMovInvInterface} from '../../services/typeOfMovement';

interface ContextProps {
  errorMessage: string;
  token: string | null;
  user: UserInterface;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  loggingIn: boolean;
  loginServer: (loginData: LoginData) => void;
  login: (loginData: LoginData) => void;
  logOutUser: () => void;
  logOutServer: () => void;
  removeError: () => void;
  updateTypeOfMovements: (value: Id_TipoMovInvInterface) => void;
  getTypeOfMovementsName: () => string;
  updateUser: (user: Partial<UserInterface>) => void;
}

export const AuthContext = createContext({} as ContextProps);
