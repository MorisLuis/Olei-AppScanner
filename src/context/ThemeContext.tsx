import React, {createContext, useReducer, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Theme, darkTheme, lightTheme} from '../theme/appTheme';

interface ThemeContextProps {
  theme: Theme;
  typeTheme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  typeTheme: 'light',
  toggleTheme: () => {},
});

type ThemeAction =
  | {type: 'SET_THEME'; payload: {theme: Theme; typeTheme: string}}
  | {type: 'TOGGLE_THEME'};

interface ThemeState {
  theme: Theme;
  typeTheme: string;
}

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME': {
      const {theme, typeTheme} = action.payload;
      return {
        ...state,
        theme,
        typeTheme,
      };
    }
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === lightTheme ? darkTheme : lightTheme;
      const newTypeTheme = state.theme === lightTheme ? 'dark' : 'light';
      return {
        ...state,
        theme: newTheme,
        typeTheme: newTypeTheme,
      };
    }
    default:
      return state;
  }
};

export const ThemeProvider = ({children}: {children: JSX.Element}): JSX.Element => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: lightTheme,
    typeTheme: 'light',
  });

  useEffect(() => {
    const loadTheme = async (): Promise<void> => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        const selectedTheme = storedTheme === 'dark' ? darkTheme : lightTheme;
        dispatch({
          type: 'SET_THEME',
          payload: {
            theme: selectedTheme,
            typeTheme: storedTheme,
          },
        });
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async (): Promise<void> => {
    dispatch({type: 'TOGGLE_THEME'});
    const newType = state.typeTheme === 'light' ? 'dark' : 'light';
    await AsyncStorage.setItem('theme', newType);
  };

  return (
    <ThemeContext.Provider
      value={{theme: state.theme, toggleTheme, typeTheme: state.typeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => useContext(ThemeContext);
