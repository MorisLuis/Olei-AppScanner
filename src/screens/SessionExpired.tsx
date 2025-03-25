import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {useTheme} from '../context/ThemeContext';
import {globalFont, globalStyles} from '../theme/appTheme';
import ButtonCustum from '../components/Ui/ButtonCustum';
import {AuthContext} from '../context/auth/AuthContext';

export const SessionExpiredScreen = () => {
  const {theme} = useTheme();
  const {logOut} = useContext(AuthContext);

  const handleBack = () => {
    logOut?.();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color,
        height: '100%',
      }}>
      <Text
        style={{
          color: theme.text_color,
          marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
          fontSize: globalFont.font_med,
        }}>
        La sentimos por las molestias pero la sesión término, es necesario
        volver iniciar sesión.
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
