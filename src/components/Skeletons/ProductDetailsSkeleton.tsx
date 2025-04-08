import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

import {ProductDetailsSkeletonStyles} from '../../theme/UI/skeletons';
import {useTheme} from '../../context/ThemeContext';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const ProductDetailsSkeleton = () : JSX.Element => {
  const {theme} = useTheme();
  const shimmerColors = [
    theme.color_primary,
    theme.color_secondary,
    theme.color_primary,
  ];

  return (
    <View style={ProductDetailsSkeletonStyles(theme).ProductDetailsPage}>
      <ShimmerPlaceHolder
        style={ProductDetailsSkeletonStyles(theme).imageContainer}
        shimmerColors={shimmerColors}
        LinearGradient={LinearGradient}></ShimmerPlaceHolder>

      <View style={ProductDetailsSkeletonStyles(theme).header}>
        <ShimmerPlaceHolder
          style={ProductDetailsSkeletonStyles(theme).description}
          shimmerColors={shimmerColors}
          LinearGradient={LinearGradient}></ShimmerPlaceHolder>
        <View>
          <ShimmerPlaceHolder
            style={ProductDetailsSkeletonStyles(theme).price}
            shimmerColors={shimmerColors}
            LinearGradient={LinearGradient}></ShimmerPlaceHolder>
          <ShimmerPlaceHolder
            style={ProductDetailsSkeletonStyles(theme).priceSecond}
            shimmerColors={shimmerColors}
            LinearGradient={LinearGradient}></ShimmerPlaceHolder>
        </View>
      </View>

      <ShimmerPlaceHolder
        style={ProductDetailsSkeletonStyles(theme).information}
        shimmerColors={shimmerColors}
        LinearGradient={LinearGradient}></ShimmerPlaceHolder>
    </View>
  );
};
