import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const styles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    title: {
      fontSize: globalFont.font_med,
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    productInventoryCard: {
      display: 'flex',
      flexDirection: 'row',
      borderWidth: 0.5,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_tertiary
          : theme.color_border_tertiary,
      backgroundColor: theme.background_color_secondary,
      borderRadius: globalStyles().borderRadius.borderRadius,
      padding: globalStyles().globalPadding.padding / 2,
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    productInventoryCard__Image: {
      width: wp('15%'),
      minHeight: wp('17.5%'),
      marginRight: globalStyles().globalMarginBottom.marginBottom,
      borderRadius: globalStyles().borderRadius.borderRadius / 2,
    },
    productInventoryCard__data: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: '100%',
    },
    dataItem: {
      display: 'flex',
      flexDirection: 'row',
    },
    dataItemText: {
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    label: {
      fontWeight: 'bold',
      marginRight: globalStyles().globalMarginBottomSmall.marginBottom,
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    information: {
      maxWidth: '80%',
    },
    description: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
      marginBottom:
        globalStyles().globalMarginBottomSmall.marginBottom / 2,
      color: theme.text_color,
    },
    stock: {
      backgroundColor: theme.background_color,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.background_color,
      borderWidth: 1,
      borderRadius: globalStyles().borderRadius.borderRadius,
      padding: globalStyles().globalPadding.padding / 2,
      minWidth: hp('6%'),
      height: hp('6%'),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    delete: {
      color: 'red',
      paddingVertical: globalStyles().globalPadding.padding / 2,
    },

    notImage: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      minHeight: 70,
      marginRight: 10,
      borderRadius: 5,
      backgroundColor: theme.background_color_tertiary,
      borderWidth: 1,
      borderColor: theme.color_border,
    },
    notImageText: {
      fontWeight: 'bold',
      fontSize: 8,
      textAlign: 'center',
      lineHeight: 8,
      maxHeight: 40,
      overflow: 'hidden',
      paddingHorizontal: 2,
    },
  });

export const EmptyMessageCardStyles = (theme: Theme, typeTheme: string) =>
  StyleSheet.create({
    EmptyMessageCard: {
      backgroundColor: theme.background_color,
      borderWidth: 1,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.color_border_tertiary,
      width: '100%',
      padding: globalStyles().globalPadding.padding,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: globalFont.font_med,
      marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
      color: theme.text_color,
    },
    iconContainer: {
      backgroundColor: theme.background_color_secondary,
      borderWidth: 1,
      borderColor: theme.color_border,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    icon: {
      textAlign: 'center',
    },
    message: {
      color: theme.text_color,
    },
  });

export const ProductItemSearchStyles = (theme: Theme, typeTheme: string) =>
  StyleSheet.create({
    ProductItemSearch: {
      marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
      borderWidth: 1,
      paddingVertical: globalStyles().globalPadding.padding / 2,
      paddingHorizontal: globalStyles().globalPadding.padding / 2,

      borderRadius: globalStyles().borderRadius.borderRadius,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.background_color_secondary,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.color_border_tertiary,
    },
    productInventoryCard__Image: {
      width: wp('17.5%'),
      minHeight: wp('17.5%'),
      marginRight: globalStyles().globalMarginBottom.marginBottom,
      borderRadius: globalStyles().borderRadius.borderRadius,
    },
    information: {
      alignItems: 'flex-start',
    },
    description: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    otherInformation: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
    },
    otherInformationText: {
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },
    codebarAvailable: {
      backgroundColor:
        typeTheme === 'light'
          ? theme.color_border_tertiary + '23'
          : theme.color_border_secondary + '23',
      padding: globalStyles().globalPadding.padding / 5,
      paddingHorizontal: globalStyles().globalPadding.padding / 2,
      borderRadius: globalStyles().borderRadius.borderRadius,
      marginVertical: globalStyles().globalMarginBottomSmall.marginBottom,
    },
    textAvailable: {
      color:
        typeTheme === 'light'
          ? theme.color_border_tertiary
          : theme.color_border_secondary,
      fontSize: globalFont.font_normal,
    },
    codebarNotAvailable: {
      backgroundColor: theme.color_red + '13',
      padding: globalStyles().globalPadding.padding / 3,
      paddingHorizontal: globalStyles().globalPadding.padding / 2,
      borderRadius: globalStyles().borderRadius.borderRadius,
      marginVertical:
        globalStyles().globalMarginBottomSmall.marginBottom / 2,
    },
    textNotAvailable: {
      color: theme.color_red,
      fontSize: globalFont.font_normal,
    },
    notImage: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: wp('17.5%'),
      minHeight: wp('17.5%'),
      marginRight: globalStyles().globalMarginBottom.marginBottom,
      borderRadius: globalStyles().borderRadius.borderRadius,
      backgroundColor: theme.background_color_tertiary,
      borderWidth: 1,
      borderColor: theme.color_border,
    },
    notImageText: {
      fontWeight: 'bold',
      fontSize: globalFont.font_normal / 2,
      textAlign: 'center',
      lineHeight: 8,
      maxHeight: 40,
      overflow: 'hidden',
      paddingHorizontal: 2,
    },
  });

export const ProductInventoryConfirmationCardTheme = (
  theme: Theme,
  typeTheme?: string,
) =>
  StyleSheet.create({
    title: {
      fontSize: globalFont.font_med,
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    ProductInventoryConfirmationCard: {
      display: 'flex',
      flexDirection: 'row',
      borderWidth: 0.5,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.color_border_tertiary,
      backgroundColor: theme.background_color_secondary,
      borderRadius: globalStyles().borderRadius.borderRadius,
      paddingHorizontal: globalStyles().globalPadding.padding,
      paddingVertical: globalStyles().globalPadding.padding / 2,
      //marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
      //marginHorizontal: globalStyles().globalMarginBottom.marginBottom
    },
    data: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: '100%',
    },
    dataItem: {
      display: 'flex',
      flexDirection: 'row',
    },
    dataItemText: {
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },
    label: {
      marginRight: globalStyles().globalMarginBottomSmall.marginBottom / 2,
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },
    information: {
      maxWidth: '80%',
    },
    description: {
      fontSize: globalFont.font_sm,
      color: theme.text_color,
      fontWeight: 'bold',
    },
    edit: {
      backgroundColor: theme.background_color_tertiary,
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal:
        globalStyles().globalMarginBottomSmall.marginBottom / 2,
      borderWidth: 1,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.color_border_tertiary,
      borderRadius: globalStyles().borderRadius.borderRadius,
    },
  });

export const ProductCardSelectTheme = (theme: Theme) =>
  StyleSheet.create({
    CardSelect: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: globalStyles().globalPadding.padding,
      backgroundColor: 'transparent',
      borderRadius: globalStyles().borderRadius.borderRadius,
      borderWidth: 0.3,
      borderColor: theme.color_border,
    },
    CardSelectInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '90%',
    },
    CardSelectMessage: {
      fontSize: globalFont.font_normal,
      color: theme.text_color,
      fontFamily: 'Rubik-Regular',
    },
    CardSelectSubMessage: {
      fontSize: globalFont.font_sm,
      fontFamily: 'Rubik-Regular',
    },
    optionCheck: {
      width: 20,
      height: 20,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.text_color,
    },
  });
