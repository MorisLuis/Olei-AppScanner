import {StyleSheet} from 'react-native';

import {Theme, globalFont, globalStyles} from './appTheme';

export const CodebarUpdateScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    CodebarUpdateScreen: {
      backgroundColor: theme.background_color,
      padding: globalStyles().globalPadding.padding,
      height: '100%',
    },
    selectorCodebarType: {
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    actualCodebarType: {
      display: 'flex',
      marginBottom: globalStyles().globalMarginBottom.marginBottom,
    },
    actualCodebarTypeText: {
      fontSize: globalFont.font_sm,
      color: theme.text_color,
    },
    actualCodebarTypeChange: {
      fontSize: globalFont.font_sm,
      color: theme.color_blue,
    },
    optionCodebarText: {
      color: typeTheme === 'light' ? theme.text_color : theme.text_color,
    },
    optionCodebarTextActive: {
      color:
        typeTheme === 'light' ? theme.text_color : theme.text_color_secondary,
    },
  });
