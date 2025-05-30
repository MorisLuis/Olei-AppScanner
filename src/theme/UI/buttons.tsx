import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Theme, globalFont, globalStyles } from '../appTheme';

export const buttonStyles = (theme: Theme, typeTheme?: string) =>
  StyleSheet.create({
    // Button size
    button: {
      height: hp('5%'),
      backgroundColor: theme.color_tertiary,
      borderWidth: 1,
      borderColor: theme.color_border_tertiary,
      borderRadius: globalStyles().borderRadius.borderRadius,
      paddingHorizontal: globalStyles().globalPadding.padding,
      width: '100%',
      color: theme.text_color_secondary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: globalStyles().globalMarginBottomSmall.marginBottom / 2,
    },

    button_secondary: {
      borderWidth: 0,
      backgroundColor: theme.background_color,
    },

    button_small: {
      flexDirection: 'row',
      backgroundColor: theme.background_color_secondary,
      borderWidth: 1,
      borderColor: theme.color_border,
      borderRadius: globalStyles().borderRadius.borderRadius,
      paddingHorizontal: globalStyles().globalPadding.padding,
      paddingVertical: globalStyles().globalPadding.padding / 2,
      width: '100%',
      color: theme.text_color,
      display: 'flex',
      gap: globalStyles().globalMarginBottomSmall.marginBottom / 2,
    },

    // Button text
    buttonText: {
      color:
        typeTheme === 'light' ? theme.text_color_secondary : theme.text_color_secondary,
      fontSize: globalFont.font_normal,
      fontFamily: 'Rubik-Regular',
    },

    buttonTextSecondary: {
      color:
        typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
      fontSize: globalFont.font_normal,
      fontFamily: 'Rubik-Regular',
    },

    buttonTextTertiary: {
      color: typeTheme === 'light' ? theme.text_color : theme.text_color,
      fontSize: globalFont.font_normal,
      fontFamily: 'Rubik-Regular',
    },

    buttonTextRed: {
      color: theme.color_red,
      fontSize: globalFont.font_normal,
    },

    buttonTextClear: {
      color: theme.text_color_light,
      fontSize: globalFont.font_sm,
      width: '100%',
      textAlign: 'center',
    },

    // Others
    button_line: {
      height: 36,
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
      borderRadius: globalStyles().borderRadius.borderRadius,
      paddingHorizontal: globalStyles().globalPadding.padding,
      width: '100%',
      color: theme.text_color_secondary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    button_line_text: {
      textDecorationLine: 'underline',
    },

    svg: {
      marginRight: 8,
    },

    search: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.color_border,
      color: theme.text_color,
    },

    // Colors
    white: {
      backgroundColor: 'transparent',
      color: theme.text_color,
      borderWidth: 1,
      borderColor: theme.color_border,
    },

    purple: {
      backgroundColor: theme.color_blue,
      color: theme.text_color_secondary,
    },

    green: {
      backgroundColor: theme.color_tertiary,
      color: theme.text_color_secondary,
    },

    yellow: {
      backgroundColor: theme.color_tertiary,
      color: theme.text_color,
    },

    red: {
      backgroundColor: theme.color_red_light,
      color: theme.color_red_light,
    },

    light: {
      backgroundColor: theme.background_color_secondary,
      textDecorationLine: 'underline',
      borderWidth: 0,
    },
  });

export const scanButtonStyles = (theme: Theme) => StyleSheet.create({
  scanButton: {
    backgroundColor: theme.color_yellow,
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    position: 'absolute',
    bottom: 50,
    left: '50%',
    marginLeft: -37.5,
    zIndex: 9999,
  },
  scanButton_touch: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})