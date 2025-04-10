import React from 'react';
import { Image, View } from 'react-native';

import { StartupScreenTheme } from '../../theme/UI/StartupScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/logo01.png';

export const StartupScreen = (): JSX.Element => {

  const { theme } = useTheme();
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
