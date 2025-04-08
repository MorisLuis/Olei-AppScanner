import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from './appTheme';

export const productDetailsStyles = (theme: Theme, typeTheme?: string) =>
  StyleSheet.create({
    ProductDetailsPage: {},
    content: {
      padding: globalStyles().globalPadding.padding,
    },
    imageContainer: {
      minHeight: 300,
      backgroundColor: theme.background_color_secondary,
      borderWidth: 1,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.background_color_tertiary,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    image: {
      position: 'absolute',
      height: hp('30%'),
      width: wp('50%'),
      resizeMode: 'contain',
      backgroundColor: theme.background_color_secondary,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 1,
      shadowRadius: 5,
    },
    notImage: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    notImageText: {
      fontWeight: 'bold',
      fontSize: globalFont.font_med,
      textAlign: 'center',
      lineHeight: globalFont.font_med,
      overflow: 'hidden',
      paddingHorizontal: globalStyles().globalPadding.padding,
    },
    header: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    description: {
      fontSize: globalFont.font_med,
      fontWeight: 'bold',
      color: theme.text_color,
    },
    price: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
    },
    priceValue: {
      fontSize: globalFont.font_normal,
    },
    information: {
      paddingVertical: globalStyles().globalPadding.padding / 2,
      paddingHorizontal: globalStyles().globalPadding.padding,
      backgroundColor: theme.background_color_secondary,
      borderWidth: 1,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.background_color_tertiary,
      borderRadius: 5,
    },
    codebarIdentify: {
      paddingBottom: globalStyles().globalPadding.padding / 2,
    },
    data: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: globalStyles().globalPadding.padding / 2,
      position: 'relative',
    },
    label: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
      marginRight: globalStyles().globalMarginBottom.marginBottom / 2,
      color: theme.text_color,
    },
    dataValue: {
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    separator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 1,
      borderBottomWidth: 1,
      borderBottomColor: theme.color_border_secondary,
      backgroundColor: theme.color_border,
    },
    optionsContent: {},
    optionCodebar: {
      backgroundColor: theme.background_color_secondary,
      padding: globalStyles().globalPadding.padding,
      borderRadius: globalStyles().borderRadius.borderRadius,
      borderWidth: 1,
      borderColor: theme.color_border_tertiary,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
    },
    optionCodebar_icon: {
      marginRight: globalStyles().globalMarginBottomSmall.marginBottom,
    },
    selectedOption: {
      backgroundColor: theme.color_yellow,
      borderColor: theme.color_border_tertiary,
      display: 'flex',
    },
    //Footer
    footer: {
      //position: "absolute",
      bottom: 0,
      height: 100,
      width: '100%',
      backgroundColor: theme.background_color_secondary,
      borderTopWidth: 0.75,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.color_border_tertiary,
      padding: globalStyles().globalPadding.padding,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
