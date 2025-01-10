import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Theme, darkTheme, lightTheme } from '../theme/appTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext({
    theme: lightTheme,
    typeTheme: "light",
    toggleTheme: () => {},
});

type ThemeAction = 
  | { type: 'SET_THEME'; payload: { theme: Theme; typeTheme: string } }
  | { type: 'TOGGLE_THEME' };

interface ThemeState {
    theme: Theme;
    typeTheme: string;
}

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload.theme,
                typeTheme: action.payload.typeTheme,
            };
        case 'TOGGLE_THEME':
            const newTheme = state.theme === lightTheme ? darkTheme : lightTheme;
            const newTypeTheme = state.theme === lightTheme ? 'dark' : 'light';
            return {
                ...state,
                theme: newTheme,
                typeTheme: newTypeTheme,
            };
        default:
            return state;
    }
};

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
    const [state, dispatch] = useReducer(themeReducer, {
        theme: lightTheme,
        typeTheme: 'light',
    });

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme) {
                    dispatch({
                        type: 'SET_THEME',
                        payload: {
                            theme: storedTheme === 'dark' ? darkTheme : lightTheme,
                            typeTheme: storedTheme,
                        },
                    });
                }
            } catch (error) {
                console.error('Error loading theme from AsyncStorage:', error);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        try {
            dispatch({ type: 'TOGGLE_THEME' });
            await AsyncStorage.setItem('theme', state.typeTheme === 'light' ? 'dark' : 'light');
        } catch (error) {
            console.error('Error saving theme to AsyncStorage:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme: state.theme, toggleTheme, typeTheme: state.typeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
