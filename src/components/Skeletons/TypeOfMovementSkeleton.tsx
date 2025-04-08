import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { globalStyles } from '../../theme/appTheme';
import { useTheme } from '../../context/ThemeContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const TypeOfMovementSkeleton = (): JSX.Element => {
  /* 26282C */
  /* eaeaea */
  const { theme } = useTheme();
  const shimmerColors = [
    theme.color_primary,
    theme.color_secondary,
    theme.color_primary,
  ];

  return (
    <View style={extraStyles().TypeOfMovementSkeleton}>
      <ShimmerPlaceHolder
        style={extraStyles().shimmer}
        shimmerColors={shimmerColors}
        LinearGradient={LinearGradient}></ShimmerPlaceHolder>
    </View>
  );
};

const extraStyles = (): ReturnType<typeof StyleSheet.create> => ({
  TypeOfMovementSkeleton: {
    width: '100%'
  },
  shimmer: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    marginBottom: globalStyles().globalMarginBottom.marginBottom,
  }
})
