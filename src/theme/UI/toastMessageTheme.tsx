import {StyleSheet} from 'react-native';

import {Theme, globalFont} from '../appTheme';

export const ToastMessageStyles = (theme: Theme) =>
  StyleSheet.create({
    ToastMessage: {
      minHeight: 50,
      //width: f,
      backgroundColor: theme.background_color,
      borderWidth: 1,
      borderColor: theme.color_border,
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      maxWidth: '90%',
    },
    icon: {
      marginRight: 5,
    },
    message: {
      fontSize: globalFont.font_normal,
      //flex: 1
    },
  });
