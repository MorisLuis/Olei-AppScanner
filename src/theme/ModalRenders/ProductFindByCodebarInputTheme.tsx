import {StyleSheet} from 'react-native';

import {Theme, globalFont, globalStyles} from '../appTheme';

export const ProductFindByCodebarInputStyles = (theme: Theme) =>
  StyleSheet.create({
    ProductFindByCodeBar: {
      width: 'auto',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
      color: theme.text_color,
    },
    productStyles: {
      backgroundColor: 'beige',
      height: 30,
      color: 'black',
    },
  });
