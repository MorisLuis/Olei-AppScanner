import {Text, View} from 'react-native';
import React from 'react';

import {productDetailsStyles} from '../../theme/productDetailsTheme';
import {Theme} from '../../theme/appTheme';

interface ProductDetailItem {
  label: string;
  value: string | number;
  theme: Theme;
  isLastChild?: boolean;
}

export const ProductDetailItem = React.memo(
  ({label, value, theme, isLastChild = false}: ProductDetailItem) => (
    <View style={productDetailsStyles(theme).data}>
      <Text style={productDetailsStyles(theme).label}>{label}</Text>
      <Text style={productDetailsStyles(theme).dataValue}>{value}</Text>
      {!isLastChild && <View style={productDetailsStyles(theme).separator} />}
    </View>
  ),
);
