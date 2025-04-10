import { api } from "../api/api";
import UserInterface from "../interface/user";

export interface postLoginServerInterface {
    usuario: string;
    password: string
}

const postLoginServer = async ({
    usuario,
    password
}: postLoginServerInterface): Promise<{ tokenServer: string, user: UserInterface }> => {

    const { data: { tokenServer, user } } = await api.post<{ tokenServer: string, user: UserInterface }>('/api/auth/loginServer', {
        IdUsuarioOLEI: usuario,
        PasswordOLEI: password,
    });

    return {
        tokenServer,
        user
    }
};

export interface postLoginClientInterface {
    Id_Usuario: string;
    password: string
}

const postLoginClient = async ({
    Id_Usuario,
    password
}: postLoginClientInterface): Promise<{ token: string, user: UserInterface, refreshToken: string }> => {

    const { data: { token, user, refreshToken } } = await api.post<{ token: string, user: UserInterface, refreshToken: string }>('/api/auth/login', {
        Id_Usuario,
        password
    });

    return {
        user,
        token,
        refreshToken
    }

};

export interface postRefreshTokenInterface {
    refreshToken_prop: string
}

const postRefreshToken = async ({
    refreshToken_prop
} : postRefreshTokenInterface ) : Promise<{ user: UserInterface, token: string, refreshToken: string }> => {

    const { data: { user, token, refreshToken } } = await api.post<{ token: string, refreshToken: string, user: UserInterface }>(
        '/api/auth/refresh',
        { refreshToken: refreshToken_prop },
        { headers: { 'Content-Type': 'application/json' } }
    );

    return {
        user,
        token, 
        refreshToken
    }
}

const postLogOutClient = async () : Promise<{ user: UserInterface }> => {
    const { data: { user } } = await api.get<{ user: UserInterface }>('/api/auth/logoutUser');
    return {
        user
    }
}


export {
    postLoginServer,
    postLoginClient,
    postRefreshToken,
    postLogOutClient
}