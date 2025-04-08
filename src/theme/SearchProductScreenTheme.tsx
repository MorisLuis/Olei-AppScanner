import {StyleSheet} from 'react-native';

import {Theme, globalFont, globalStyles} from './appTheme';

export const SearchProductScreenStyles = (theme: Theme, typeTheme?: string) =>
  StyleSheet.create({
    SearchProductScreen: {
      flex: 1,
      backgroundColor: theme.background_color,
    },
    content: {
      paddingHorizontal: globalStyles().globalPadding.padding,
      marginTop: globalStyles().globalPadding.padding,
    },
    searchAdvice: {},
    adviceHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    titleHeader: {
      fontSize: globalFont.font_normal,
      color: typeTheme === 'light' ? theme.color_red : theme.text_color,
      fontWeight: 'bold',
    },
    adviceMessage1: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
    adviceMessage1_bold:{
      fontWeight: 'bold'
    },
    adviceMessage2: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
      fontSize: globalFont.font_normal,
      color: theme.text_color,
    },
  });
