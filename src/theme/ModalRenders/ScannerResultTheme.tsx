import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from '../appTheme';
const {height} = Dimensions.get('window');

export const modalRenderstyles = (theme: Theme) =>
  StyleSheet.create({
    ScannerResult: {
      paddingBottom: globalStyles(theme).globalMarginBottom.marginBottom,
      backgroundColor: theme.background_color,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      height: height / 3,
      backgroundColor: theme.background_color,
    },
    product: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    productText: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    productMessage: {},
    code: {
      marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    codeLabel: {
      fontSize: globalFont.font_normal,
      marginRight: globalStyles(theme).globalMarginBottomSmall.marginBottom,
      color: theme.text_color,
    },
    codeValue: {
      fontSize: globalFont.font_med,
      fontWeight: 'bold',
      color: theme.text_color,
    },
    otherInfo: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
    },
    productIcon: {
      width: 50,
      height: 50,
    },
    counter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    productNotFound: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    productNotFoundText: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      width: '50%',
    },
    productNotFoundMessage: {
      marginLeft: 10,
    },
    productNotFoundTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    seeProduct: {
      fontSize: globalFont.font_normal,
    },
    counterContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: wp('5%'),
    },
    doNotAllowProductOutputs: {
      backgroundColor: 'red',
      padding: globalStyles(theme).globalPadding.padding,
    },
  });
