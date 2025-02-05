import UserInterface from "../../interface/user";
import { DbAuthState } from "./DbAuthProvider";

type AuthAction =
    | { type: '[DBAuth] - signUp', payload: { tokenDB: string, user: UserInterface } }
    | { type: '[DBAuth] - addError', payload: string }
    | { type: '[DBAuth] - updateUser', payload: Partial<UserInterface> }
    | { type: '[DBAuth] - removeError' }
    | { type: '[DBAuth] - notAuthenticated' }
    | { type: '[DBAuth] - logout' }


    export const dbAuthReducer = (state: DbAuthState, action: AuthAction): DbAuthState => {
        switch (action.type) {
            case '[DBAuth] - addError':
                return {
                    ...state,
                    status: 'dbNot-authenticated',
                    tokenDB: null,
                    errorMessage: action.payload
                };
    
            case '[DBAuth] - removeError':
                return {
                    ...state,
                    errorMessage: ''
                };
    
            case '[DBAuth] - signUp':
                return {
                    ...state,
                    errorMessage: '',
                    status: 'dbAuthenticated',
                    tokenDB: action.payload.tokenDB,
                    user: action.payload.user
                };
    
            case '[DBAuth] - logout':
                return {
                    ...state,
                    status: 'dbNot-authenticated',
                    tokenDB: null,
                    user: null,
                    errorMessage: '',
                };
    
            case '[DBAuth] - notAuthenticated':
                return {
                    ...state,
                    status: 'dbNot-authenticated',
                    tokenDB: null
                };
    
            case '[DBAuth] - updateUser':
                return {
                    ...state,
                    user: state.user ? { ...state.user, ...action.payload } : { ...action.payload }
                };
    
            default:
                return state;
        }
    };
    


