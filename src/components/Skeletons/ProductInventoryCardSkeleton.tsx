import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

import {useTheme} from '../../context/ThemeContext';
import {globalStyles} from '../../theme/appTheme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const ProductInventoryCardSkeleton = () => {
  const {theme} = useTheme();
  const shimmerColors = [
    theme.color_primary,
    theme.color_secondary,
    theme.color_primary,
  ];

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
      }}>
      <ShimmerPlaceHolder
        style={{
          height: 70,
          width: '100%',
          borderRadius: 10,
          marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        }}
        shimmerColors={shimmerColors}
        LinearGradient={LinearGradient}></ShimmerPlaceHolder>
    </View>
  );
};
