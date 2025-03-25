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
    | { type: '[Auth] - logInServer', payload: { user: UserInterface, token: string } }
    | { type: '[Auth] - logIn', payload: { user: UserInterface } }
    | { type: '[Auth] - logOutServer' }
    | { type: '[Auth] - logOutUser', payload: { user: UserInterface } }
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


        case '[Auth] - logInServer':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }

        case '[Auth] - logIn':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                user: action.payload.user
            }

        case '[Auth] - logOutServer':
            return clearAuthState();

        case '[Auth] - logOutUser':
            return {
                ...state,
                errorMessage: '',
                user: action.payload.user
            }


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
