import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { Theme } from '../theme/appTheme';

interface LoadingScreenInterface {
  message?: string;
  state?: boolean;
  loading?: boolean;
}

export const LoadingScreen = ({ message }: LoadingScreenInterface): JSX.Element => {
  const { theme } = useTheme();
  const iconColor = theme.color_tertiary;

  return (
    <View style={loadingStyles(theme).LoadingScreen}>
      <ActivityIndicator
        size="large"
        color={iconColor}
        style={loadingStyles().indicator}
      />
      <Text style={{ color: theme.text_color }}>{message}</Text>
    </View>
  );
};

/* eslint-disable react-native/no-unused-styles */
const loadingStyles = (theme?: Theme) : ReturnType<typeof StyleSheet.create>  => StyleSheet.create({
  LoadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme?.background_color,
    height: '100%'
  },
  indicator: {
    marginBottom: 10
  }
})