import React, { useContext } from 'react';
import { Image, View } from 'react-native';

import { StartupScreenTheme } from '../../theme/UI/StartupScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { NavigatePageType, useProtectPage } from '../../hooks/useProtectPage';
import logo from '../../assets/logo01.png';

const TODOS_ALMACENES_ON = 1;

export const StartupScreen = (): JSX.Element => {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
/* 
  const middlewareStartupScreen = (): {
    condition: boolean,
    navigatePage: NavigatePageType
  } => {
    let condition = false;
    let navigatePage: NavigatePageType = 'LoginPage';

    if (status === 'checking') {
      condition = true;
      navigatePage = 'StartupScreen';

      return {
        condition,
        navigatePage
      };
    }

    if (status === 'authenticated' && user.userConected === true) {
      condition = true;
      navigatePage =
        user.TodosAlmacenes === TODOS_ALMACENES_ON ? 'almacenScreen' : 'typeOfMovementScreen';
    } else if (status === 'not-authenticated') {
      condition = true;
      navigatePage = 'LoginPage';
    } else if (user.userConected === false) {
      condition = true;
      navigatePage = 'LoginDatabaseScreen';
    }

    return {
      condition,
      navigatePage,
    };
  };

  useProtectPage(middlewareStartupScreen());
 */
  return (
    <View style={StartupScreenTheme(theme).StartupScreen}>
      <View style={StartupScreenTheme(theme).imageContainer}>
        <Image
          style={StartupScreenTheme(theme).logo}
          source={logo}
        />
      </View>
    </View>
  );
};
