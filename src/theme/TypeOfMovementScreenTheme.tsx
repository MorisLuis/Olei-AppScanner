import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Theme, globalFont, globalStyles} from './appTheme';

export const TypeOfMovementScreenStyles = (theme: Theme, typeTheme?: string) =>
  StyleSheet.create({
    TypeOfMovementScreen: {
      flex: 1,
    },
    content: {
      height: '100%',
      padding: globalStyles().globalPadding.padding,
      paddingBottom: hp('20%'),
    },
    header: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      width: wp('80%'),
    },
    title: {
      paddingTop: globalStyles().globalPadding.padding,
      fontSize: globalFont.font_med,
      color: theme.text_color,
    },
    optionContainer: {
      padding: globalStyles().globalPadding.padding / 1.5,
      borderWidth: 0.7,
      borderRadius: globalStyles().borderRadius.borderRadius,
      borderColor: theme.color_border_tertiary,
    },
    optionText: {
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },
    optionTextSelected: {
      fontSize: globalFont.font_sm,
      color:
        typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
    },
    selectedOption: {
      backgroundColor: theme.color_yellow,
    },
    footer: {
      padding: globalStyles().globalPadding.padding,
      paddingBottom: globalStyles().globalPadding.padding,
      backgroundColor: theme.background_color_secondary,
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: Dimensions.get('window').width,
      borderTopWidth: 0.75,
      borderColor:
        typeTheme === 'light'
          ? theme.color_border_secondary
          : theme.color_border_tertiary,
    },
  });
