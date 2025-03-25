import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

import {globalStyles} from '../../theme/appTheme';
import {useTheme} from '../../context/ThemeContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const TypeOfMovementSkeleton = () => {
  /* 26282C */
  /* eaeaea */
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
      }}>
      <ShimmerPlaceHolder
        style={{
          height: 40,
          width: '100%',
          borderRadius: 5,
          marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        }}
        shimmerColors={shimmerColors}
        LinearGradient={LinearGradient}></ShimmerPlaceHolder>
    </View>
  );
};
