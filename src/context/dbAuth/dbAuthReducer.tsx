import UserInterface, { UserDBInterface } from "../../interface/user";
import { DbAuthState } from "./DbAuthProvider";

type AuthAction =
    | { type: '[DBAuth] - signUp', payload: { tokenDB: string, user: UserDBInterface } }
    | { type: '[DBAuth] - addError', payload: string }
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

            default:
                return state;
        }
    };
    


