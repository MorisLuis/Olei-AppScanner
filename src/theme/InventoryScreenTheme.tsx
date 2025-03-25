import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from './appTheme';

export const InventoryScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    Inventory: {
      backgroundColor: theme.background_color,
    },
    content: {
      paddingHorizontal: globalStyles(theme).globalPadding.padding,
      backgroundColor: theme.background_color,
      height: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp('2.5%'),
      marginTop: hp('7.5%'),
    },
    title: {
      display: 'flex',
      fontSize: globalFont.font_med,
      color: theme.text_color,
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
    },
    iconSearch: {
      marginLeft: 15,
    },
    footerContent: {
      paddingVertical: globalStyles(theme).globalPadding.padding,
    },
    footerMessage: {
      fontSize: globalFont.font_normal,
    },
  });
