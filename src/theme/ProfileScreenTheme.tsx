import {StyleSheet} from 'react-native';

import {Theme, globalFont, globalStyles} from './appTheme';

export const ProfileScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    ProfileScreen: {
      flex: 1,
      padding: globalStyles(theme).globalPadding.padding,
      backgroundColor: theme.background_color,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    section: {
      paddingVertical:
        globalStyles(theme).globalMarginBottom.marginBottom * 0.75,
      borderWidth: 1,
      borderColor: 'transparent',
      //borderBottomColor: theme.color_border,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.7,
    },
    title: {
      fontSize: globalFont.font_med,
      fontWeight: 'bold',
      paddingTop: globalStyles(theme).globalPadding.padding,
      color: theme.text_color,
    },
    logOutDB: {},
    logOutDBText: {
      textDecorationLine: 'underline',
      color: theme.text_color,
    },
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: theme.color_border,
      //marginVertical: globalStyles(theme).globalMarginBottom.marginBottom * 1
    },
  });
