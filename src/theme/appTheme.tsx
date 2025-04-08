import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// themeTypes.ts
export interface Theme {
  //primary?: string;
  color_primary: string;
  color_secondary: string;
  color_tertiary: string;
  color_cuaternary: string;
  color_white: string;
  color_red: string;
  color_blue: string;
  color_green: string;
  color_gray: string;
  color_yellow: string;
  color_black: string;
  color_red_light: string;
  color_border: string;
  color_border_secondary: string;
  color_border_tertiary: string;
  text_color: string;
  text_color_light: string;
  text_color_secondary: string;
  background_color: string;
  background_color_secondary: string;
  background_color_tertiary: string;
  background_color_blur: string;
}

export const lightTheme = {
  //primary: '#5856D6',
  color_primary: '#e4e4e4',
  color_secondary: '#eaeaea',
  color_tertiary: '#0E1727',
  color_cuaternary: '#F9FAFA',
  color_red: '#ff0000',
  color_white: 'white',
  color_blue: '#068FFF',
  color_green: 'yellowgreen',
  color_gray: 'gray',
  color_yellow: '#EDBD42',
  color_black: 'black',
  color_red_light: '#ff000056',
  color_border: '#26282C',
  color_border_secondary: '#cacaca',
  color_border_tertiary: '#6f7b94',
  text_color: '#1d2a36',
  text_color_light: '#657482',
  text_color_secondary: '#f9f9f9',
  background_color: '#f1f1f1',
  background_color_secondary: '#eaeaea',
  background_color_tertiary: '#f1f1f1',
  background_color_blur: 'rgba(0, 0, 0, 0.2)',
};

export const darkTheme = {
  //primary: '0D0F14',
  color_primary: '#26282C',
  color_secondary: '#3a3a3a',
  color_tertiary: '#f1f1f1',
  color_cuaternary: '#444444',
  color_red: '#ff0000',
  color_white: 'white',
  color_blue: '#068FFF',
  color_green: '#1F8A70',
  color_gray: 'gray',
  color_yellow: '#EDBD42',
  color_black: 'black',
  color_red_light: '#ff000056',
  color_border: '#f1f1f1',
  color_border_secondary: '#d6d6d6',
  color_border_tertiary: '#46484B',
  text_color: '#f9f9f9',
  text_color_light: '#657482',
  text_color_secondary: '#1d2a36',
  background_color: '#111111',
  background_color_secondary: '#222222',
  background_color_tertiary: '#26282C',
  background_color_blur: 'rgba(0, 0, 0, 0.2)',
};

export const globalStyles = () =>
  StyleSheet.create({
    flex: {
      flex: 1
    },
    opacity: {
      opacity: 0.5
    },
    globalPadding: {
      padding: wp('5%'),
    },
    globalMarginBottom: {
      marginBottom: hp('2.5%'),
    },
    globalMarginBottomSmall: {
      marginBottom: hp('1.75%'),
    },
    blur: {
      backgroundColor: ' rgba(255, 255, 255, 0.2)',
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: 'white',
    },
    disabled: {
      opacity: 50,
    },
    borderRadius: {
      borderRadius: hp('1%'),
    },
    ItemSeparator: {
      height: 15
  },
  });

export const globalFont = {
  //Font-size
  font_big: hp('4%'),
  font_med: hp('2.5%'),
  font_normal: hp('1.75%'),
  font_sm: hp('1.5%'),
};
