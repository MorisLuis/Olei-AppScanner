import {StyleSheet} from 'react-native';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const LoaderStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      marginTop: 10,
      width: globalFont.font_sm / 2,
      height: globalFont.font_sm / 2,
      borderRadius: 5,
      backgroundColor: theme.background_color_tertiary,
      marginHorizontal: globalStyles().globalMarginBottom.marginBottom / 4,
    },
  });
