import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from './appTheme';

export const almacenStyles = (theme: Theme) =>
  StyleSheet.create({
    AlmacenScreen: {
      flex: 1,
    },
    content: {
      height: '100%',
      backgroundColor: theme.background_color,
      padding: globalStyles().globalPadding.padding,
      paddingBottom: hp('20%'),
    },
    header: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    headerTitle: {
      fontSize: globalFont.font_med,
      textAlign: 'center',
      color: theme.text_color,
      fontFamily: 'Rubik-Bold',
    },
  });
