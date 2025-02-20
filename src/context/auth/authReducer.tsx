import UserInterface from "../../interface/user";
import { AUTH_INITIAL_STATE } from "./AuthProvider";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: UserInterface;
    codeBar?: string;
}

type AuthAction =
    | { type: '[Auth] - signUp', payload: { token: string, user: UserInterface } }
    | { type: '[Auth] - logout' }
    | { type: '[Auth] - notAuthenticated' }
    | { type: '[Auth] - addError', payload: string }
    | { type: '[Auth] - removeError' }
    | { type: '[Auth] - typeOfMovement', payload: { user: UserInterface } }
    | { type: '[Auth] - updateUser', payload: Partial<UserInterface> }

const clearAuthState = (): AuthState => ({
    status: 'not-authenticated',
    token: null,
    user: AUTH_INITIAL_STATE.user,
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

        case '[Auth] - updateUser':
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            };

        default:
            return state;
    }
}
