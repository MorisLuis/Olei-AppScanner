import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalStyles} from './appTheme';

export const InventoryBagScreenStyles = (theme: Theme, typeTheme: string) =>
  StyleSheet.create({
    InventoryBagScreen: {
      //flex:1,
      backgroundColor: theme.background_color,
      height: '100%',
    },
    searchBar: {
      marginHorizontal: globalStyles(theme).globalPadding.padding,
      marginTop: globalStyles(theme).globalMarginBottomSmall.marginBottom,
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
    },
    content: {
      minHeight: 'auto',
      height: '85%',
      padding: globalStyles(theme).globalPadding.padding,
      marginBottom: '37.5%',
    },
    message: {
      padding: globalStyles(theme).globalPadding.padding,
      color: theme.text_color,
    },
    footer: {
      backgroundColor: theme.background_color,
      padding: globalStyles(theme).globalPadding.padding,
      height: hp('20%'),
      width: '100%',
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      borderTopWidth: 1,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.background_color_secondary,
    },
  });
