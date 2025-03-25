import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const customHeaderStyles = (theme: Theme) =>
  StyleSheet.create({
    CustomHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: theme.background_color,
      backgroundColor: theme.background_color,
      borderBottomWidth: 1,
      position: 'relative',
      width: '100%',
      height: hp('6%'),
    },
    CustomHeaderSecondary: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: theme.background_color,
      backgroundColor: theme.background_color_secondary,
      borderBottomWidth: 1,
      position: 'relative',
      width: '100%',
      height: hp('6%'),
    },
    back: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      left: globalStyles(theme).globalMarginBottom.marginBottom / 2,
      bottom: hp('6%') * 0.5 - globalFont.font_normal / 2 - 3,
    },
    backText: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
      marginLeft: 3,
      color: theme.text_color,
    },
    titleHeader: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
      marginBottom: 0,
      padding: 0,
      height: globalFont.font_normal + 3,
      color: theme.text_color,
    },
    right: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: globalStyles(theme).globalMarginBottom.marginBottom,
      bottom: 0,
    },
    rightText: {
      fontWeight: 'bold',
      fontSize: 14,
      marginLeft: 3,
      color: theme.color_blue,
    },
  });
