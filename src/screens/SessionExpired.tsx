import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { Theme, globalFont, globalStyles } from '../theme/appTheme';
import ButtonCustum from '../components/Ui/ButtonCustum';
import { AuthContext } from '../context/auth/AuthContext';

export const SessionExpiredScreen = (): JSX.Element => {
  const { theme } = useTheme();
  const { logOutUser } = useContext(AuthContext);

  const handleBack = (): void => {
    logOutUser?.();
  };

  return (
    <View style={loadingStyles(theme).SessionExpiredScreen}>
      <Text style={loadingStyles().text}>
        La sentimos por las molestias pero la sesión término, es necesario volver iniciar sesión.
      </Text>

      <ButtonCustum
        title={'Volver'}
        onPress={handleBack}
        disabled={false}
        loading={false}
      />
    </View>
  );
};


/* eslint-disable react-native/no-unused-styles */
const loadingStyles = (theme?: Theme): ReturnType<typeof StyleSheet.create> => StyleSheet.create({
  SessionExpiredScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: globalStyles().globalPadding.padding,
    backgroundColor: theme?.background_color,
    height: '100%'
  },
  text: {
    color: theme?.text_color,
    marginBottom: globalStyles().globalMarginBottom.marginBottom,
    fontSize: globalFont.font_med,
  }
})