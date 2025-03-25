import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const inputStyles = (theme: Theme, typeTheme?: string) =>
  StyleSheet.create({
    input: {
      height: hp('5%'),
      minHeight: 50,
      borderWidth: 1,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.color_border_tertiary,
      borderRadius: globalStyles(theme).borderRadius.borderRadius,
      fontSize: globalFont.font_normal,
      paddingHorizontal: globalStyles(theme).globalPadding.padding,
      backgroundColor: theme.background_color_secondary,
      gap: 10,
      color: theme.text_color,
    },

    inputicon: {
      marginLeft: 20,
    },

    focusedInput: {
      borderWidth: 1,
      borderColor: 'transparent',
    },

    //Input password
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: theme.text_color,
      //borderBottomWidth: 1,
    },
    passwordInput: {
      flex: 1,
    },
    passwordToggle: {
      padding: 10,
      position: 'absolute',
      right: 0,
    },
  });

export const selectStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      fontSize: globalFont.font_normal,
      paddingVertical: globalStyles(theme).globalPadding.padding,
      paddingHorizontal: globalStyles(theme).globalPadding.padding,
      borderWidth: 1,
      borderColor: theme.color_border,
      borderRadius: globalStyles(theme).borderRadius.borderRadius,
      color: theme.text_color,
      paddingRight: globalStyles(theme).globalPadding.padding,
      backgroundColor: theme.background_color,
    },
  });

export const toggleStyles = (theme: Theme, typeTheme: string) =>
  StyleSheet.create({
    Toggle: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    toggleText: {},
    togglelabel: {
      fontSize: globalFont.font_normal,
      fontWeight: 'bold',
      color: theme.text_color,
    },
    togglemessage: {
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },

    //Switch styles
    SwitchTrackColorTrue: {
      backgroundColor:
        typeTheme === 'light' ? theme.color_green : theme.color_white,
    },
    SwitchTrackColorFalse: {
      backgroundColor:
        typeTheme === 'light' ? theme.color_gray : theme.color_gray,
    },
    SwitchThumbColorAndroidEnabled: {
      backgroundColor:
        typeTheme === 'light' ? theme.color_white : theme.color_green,
    },
    SwitchThumbColorAndroidNotEnabled: {
      backgroundColor:
        typeTheme === 'light'
          ? theme.background_color_tertiary
          : theme.background_color_tertiary,
    },
    SwitchThumbColorIOSdEnabled: {
      backgroundColor:
        typeTheme === 'light' ? theme.color_white : theme.color_green,
    },
    SwitchThumbColorIOSdNotEnabled: {
      backgroundColor:
        typeTheme === 'light'
          ? theme.background_color_tertiary
          : theme.background_color_tertiary,
    },
  });
