import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from './appTheme';

export const almacenStyles = (theme: Theme) =>
  StyleSheet.create({
    AlmacenScreen: {
      flex: 1,
      backgroundColor: theme.background_color
    },
    content: {
      height: '100%',
      padding: globalStyles().globalPadding.padding,
      paddingBottom: hp('20%'),
    },
    header: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      width: "100%"
    },
    headerTitle: {
      fontSize: globalFont.font_med,
      textAlign: 'center',
      color: theme.text_color,
      fontFamily: 'Rubik-Bold',
    },
  });
