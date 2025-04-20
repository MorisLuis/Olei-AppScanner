// AuthService.ts
let isLoggingOut = false;
let isLogginOutClient = false;

export const getIsLoggingOut = (): boolean => isLoggingOut;

export const setIsLoggingOut = (value: boolean): void => {
  isLoggingOut = value;
};

export const getIsLogginOutClient = (): boolean => isLogginOutClient;

export const setIsLoggingOutClient = (value: boolean): void => {
  isLogginOutClient = value;
};
