import UserInterface from "../../interface/user";
import { Id_TipoMovInvInterface } from "../../services/typeOfMovement";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface | null;
    codeBar?: string;
}

type AuthAction =
    | { type: '[Auth] - signUp', payload: { token: string, user: UserInterface } }
    | { type: '[Auth] - logout' }
    | { type: '[Auth] - notAuthenticated' }
    | { type: '[Auth] - addError', payload: string }
    | { type: '[Auth] - removeError' }
    | { type: '[Auth] - typeOfMovement', payload: { user: UserInterface } }

const clearAuthState = (): AuthState => ({
    status: 'not-authenticated',
    token: null,
    user: null,
    errorMessage: '',
    codeBar: ''
});

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case '[Auth] - addError':
            return {
                ...clearAuthState(),
                errorMessage: action.payload
            }

        case '[Auth] - removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case '[Auth] - signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case '[Auth] - logout':
            return clearAuthState();

        case '[Auth] - notAuthenticated':
            return {
                ...clearAuthState()
            }

        case '[Auth] - typeOfMovement':
            return {
                ...state,
                user: action.payload.user
            }

        default:
            return state;
    }
}
