import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from './appTheme';

export const SuccesMessageScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    SuccesMessage: {
      display: 'flex',
      height: '100%',
      width: '100%',
      backgroundColor: theme.background_color,
      zIndex: 9999,
      padding: globalStyles(theme).globalPadding.padding,
      justifyContent: 'center',
    },
    header: {
      position: 'absolute',
      top: hp('5%'),
      left: globalStyles(theme).globalPadding.padding,
      backgroundColor: theme.background_color_tertiary,
      borderWidth: 1,
      borderColor: theme.color_border_secondary,
      borderRadius: 100,
      padding: 8,
    },
    content: {
      padding: globalStyles(theme).globalPadding.padding,
    },
    title: {
      fontSize: globalFont.font_big,
      width: '80%',
      color: theme.color_tertiary,
      fontWeight: 'bold',
      marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    text: {
      fontSize: globalFont.font_normal,
      width: '80%',
      color: theme.color_tertiary,
      marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    actions: {
      width: '40%',
    },
  });
