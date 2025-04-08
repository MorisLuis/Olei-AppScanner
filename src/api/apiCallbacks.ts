// authCallbacks.ts

let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (callback: () => void): void => {
    onUnauthorized = callback;
};

let handleClientLogout: (() => void) | null = null;
export const setClientLogoutHandler = (callback: () => void): void => {
    handleClientLogout = callback;
};

// También exportas las funciones de los callbacks en caso de que las necesites directamente
export const triggerUnauthorized = () : void => {
    if (onUnauthorized) {
        onUnauthorized();
    }
};

export const triggerClientLogout = () : void  => {
    if (handleClientLogout) {
        handleClientLogout();
    }
};
