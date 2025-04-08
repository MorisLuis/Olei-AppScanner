import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const counterStyles = (theme: Theme) =>
  StyleSheet.create({
    counter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    input: {
      textAlign: 'center',
      marginHorizontal: globalStyles().globalMarginBottom.marginBottom / 2,
      backgroundColor: theme.background_color_secondary,
      paddingHorizontal: wp('7.5%'),
      paddingVertical: 10,
      borderRadius: globalStyles().borderRadius.borderRadius,
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    counterButton: {
      backgroundColor: theme.background_color_secondary,
      padding: globalStyles().globalPadding.padding / 5,
      borderRadius: globalStyles().borderRadius.borderRadius,
      minWidth: '20%',
      display: 'flex',
      alignItems: 'center',
    },
  });
