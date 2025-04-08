import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../theme/appTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const ProductInventoryCardSkeleton = (): JSX.Element => {
  const { theme } = useTheme();
  const shimmerColors = [
    theme.color_primary,
    theme.color_secondary,
    theme.color_primary,
  ];

  return (
    <View style={extraStyles().ProductInventoryCardSkeleton}>
      <ShimmerPlaceHolder
        style={extraStyles().shimmer}
        shimmerColors={shimmerColors}
        LinearGradient={LinearGradient}></ShimmerPlaceHolder>
    </View>
  );
};

const extraStyles = () : ReturnType<typeof StyleSheet.create> => ({
  ProductInventoryCardSkeleton: {
    width: '100%',
    flexDirection: 'row'
  },
  shimmer: {
    height: 70,
    width: '100%',
    borderRadius: 10,
    marginBottom: globalStyles().globalMarginBottom.marginBottom,
  }
})