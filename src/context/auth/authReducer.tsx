import UserInterface, { ID_TIPO_MOVIMIENTO } from '../../interface/user';
import { AuthState } from './AuthProvider';

type AuthAction =
  | { type: '[Auth] - SET_LOADING', payload: boolean }
  | { type: '[Auth] - LOGIN_SERVER'; payload: { tokenServer: string, user: UserInterface } }
  | { type: '[Auth] - LOGIN_CLIENT'; payload: { token: string, user: UserInterface } }
  | { type: '[Auth] - REFRESH'; payload: { token: string, user: UserInterface } }
  | { type: '[Auth] - RESTORE'; payload: { tokenServer: string | null, token: string | null } }
  | { type: '[Auth] - LOGOUT_SERVER' }
  | { type: '[Auth] - LOGOUT_CLIENT', payload: { user: UserInterface } }
  | { type: '[Auth] - TYPE_OF_MOVEMENT', payload: { tipoMovimiento: ID_TIPO_MOVIMIENTO } }
  | { type: '[Auth] - UPDATE_USER', payload: { user: Partial<UserInterface> } }


export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {

  switch (action.type) {

    case '[Auth] - LOGIN_SERVER':
      return {
        ...state,
        tokenServer: action.payload.tokenServer,
        user: action.payload.user,
      };

    case '[Auth] - LOGIN_CLIENT':
      return {
        ...state,
        token: action.payload.token,
        user: {
          ...state.user!,
          ...action.payload.user
        },
      };

    case '[Auth] - REFRESH':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case '[Auth] - RESTORE':
      return {
        ...state,
        tokenServer: action.payload.tokenServer,
        token: action.payload.token,
        isLoading: false,
      };


    case '[Auth] - LOGOUT_SERVER':
      return {
        ...state,
        tokenServer: null,
        token: null,
        user: null,
      };

    case '[Auth] - LOGOUT_CLIENT':
      return {
        ...state,
        token: null,
        user: action.payload.user
      };

    case '[Auth] - TYPE_OF_MOVEMENT':
      if (!state.user) return state;

      return {
        ...state,
        user: {
          ...state.user,
          Id_TipoMovInv: action.payload.tipoMovimiento
        }
      };

    case '[Auth] - UPDATE_USER':
      if (!state.user) return state;

      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }

    case '[Auth] - SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload
      }
    }

    default:
      return state;
  }
};
