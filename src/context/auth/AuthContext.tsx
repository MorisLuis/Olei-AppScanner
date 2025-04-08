import { createContext } from 'react';
import UserInterface, { ID_TIPO_MOVIMIENTO } from '../../interface/user';
import { postLoginClientInterface, postLoginServerInterface } from '../../services/auth';

interface ContextProps {
  loginServer: (_info: postLoginServerInterface) => void;
  loginClient: (_info: postLoginClientInterface) => void;
  logOutServer: () => void;
  logOutClient: () => void;

  user: UserInterface | null;
  token: string | null;
  tokenServer: string | null;


  getTypeOfMovementsName: () => string;
  updateTypeOfMovements: (_value: ID_TIPO_MOVIMIENTO) => void;
  updateUser: (_user: Partial<UserInterface>) => void;

  /*   errorMessage: string;
    token: string | null;
    tokenServer: string | null;
    user: UserInterface;
    serverstatus: 'checking-server' | 'server-authenticated' | 'server-not-authenticated';
    status: 'checking' | 'authenticated' | 'not-authenticated'
    loggingIn: boolean;
    loginServer: (_loginData: LoginData) => void;
    login: (_loginData: LoginData) => void;
    logOutUser: () => void;
    logOutServer: () => void;
    removeError: () => void;
    updateTypeOfMovements: (_value: Id_TipoMovInvInterface) => void;
    getTypeOfMovementsName: () => string;
    updateUser: (_user: Partial<UserInterface>) => void; */
}

export const AuthContext = createContext({} as ContextProps);
