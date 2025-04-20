import {createContext} from 'react';
import UserInterface, {ID_TIPO_MOVIMIENTO} from '../../interface/user';
import {
  postLoginClientInterface,
  postLoginServerInterface,
} from '../../services/auth';

interface ContextProps {
  loginServer: (_info: postLoginServerInterface) => void;
  loginClient: (_info: postLoginClientInterface) => void;
  logOutServer: () => void;
  logOutClient: () => void;

  user: UserInterface | null;
  token: string | null;
  tokenServer: string | null;
  isLoading: boolean;
  isRestoringAuth: boolean;

  getTypeOfMovementsName: () => string;
  updateTypeOfMovements: (_value: ID_TIPO_MOVIMIENTO) => void;
  updateUser: (_user: Partial<UserInterface>) => void;
}

export const AuthContext = createContext({} as ContextProps);
