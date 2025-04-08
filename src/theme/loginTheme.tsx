import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from './appTheme';

export const loginStyles = (theme: Theme) =>
  StyleSheet.create({
    LoginScreen: {
      flex: 1,
      backgroundColor: theme.background_color,
    },
    LoginDBScreen: {
      flex: 1,
      backgroundColor: theme.background_color_secondary,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: globalStyles().globalPadding.padding,
      justifyContent: 'center',
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: hp('10%'),
      maxHeight: hp('20%'),
      marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
    },
    logo: {
      objectFit: 'scale-down',
      height: '100%',
    },
    logoHorizontal: {
      maxWidth: hp('60%'),
      objectFit: 'cover',
      height: '100%',
    },
    logoActived: {
      maxWidth: wp('100%'),
      objectFit: 'contain',
      height: hp('15%'),
    },
    title: {
      color: theme.text_color,
      fontSize: globalFont.font_big,
      fontWeight: 'bold',
    },
    textLogin: {
      fontSize: globalFont.font_normal,
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      color: theme.text_color,
    },
    titleDB: {
      color: theme.text_color,
      fontSize: globalFont.font_med,
      fontWeight: 'bold',
      marginTop: globalStyles().globalMarginBottom.marginBottom,
      textTransform: 'uppercase',
      width: hp('80%'),
    },

    buttonContainer: {
      alignItems: 'center',
      marginTop: globalStyles().globalMarginBottom.marginBottom,
    },
    buttonContainerDB: {
      alignItems: 'center',
      marginTop: globalStyles().globalMarginBottom.marginBottom,
    },
    footer: {
      paddingHorizontal: globalStyles().globalPadding.padding,
      paddingVertical: globalStyles().globalPadding.padding,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    footerText: {
      marginRight: 5,
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },
  });

export const loginDBStyles = (theme: Theme) =>
  StyleSheet.create({
    LoginScreen: {
      flex: 1,
      backgroundColor: theme.background_color,
    },
    LoginDBScreen: {
      flex: 1,
      backgroundColor: theme.background_color,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: globalStyles().globalPadding.padding,
      justifyContent: 'center',
      height: '100%',
      marginBottom: hp('7.5%'),
    },
    logoContainer: {
      height: '20%',
      width: '100%',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: hp('20%'),
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    imageContainerActive: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: hp('15%'),
    },
    headers: {
      height: hp('20%'),
      width: '100%',
    },
    headersActive: {
      height: hp('15%'),
      width: '100%',
      marginBottom: globalStyles().globalMarginBottomSmall.marginBottom,
    },
    logo: {
      maxWidth: '40%',
      objectFit: 'cover',
      height: '100%',
    },
    logoHorizontal: {
      maxWidth: '60%',
      objectFit: 'cover',
      height: '100%',
    },
    logoActived: {
      maxWidth: '30%',
      objectFit: 'cover',
      height: '80%',
    },
    titleDB: {
      color: theme.text_color,
      fontSize: hp('3%'),
      fontWeight: 'bold',
      textTransform: 'uppercase',
      width: '85%',
    },
    titleDBActive: {
      color: theme.text_color,
      fontSize: hp('2.5%'),
      fontWeight: 'bold',
      marginTop: 20,
      textTransform: 'uppercase',
      width: '95%',
    },
    textDB: {
      color: theme.text_color,
      fontSize: hp('2%'),
    },
    textDBActive: {
      color: theme.text_color,
      fontSize: hp('2%'),
      width: '100%',
    },
    inputsContainer: {
      height: '25%',
      width: '100%',
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 50,
    },
    buttonContainerDB: {
      alignItems: 'center',
      marginTop: 20,
    },
  });
