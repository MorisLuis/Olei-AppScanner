import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Animated,
  StyleSheet,
} from 'react-native';
import { Route, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { customTabBarStyles } from '../../theme/UI/customTabBarTheme';
import { useTheme } from '../../context/ThemeContext';
import { AppNavigationProp } from '../../interface/navigation';

const SCALE_ACTIVE = 1.2;
const SCALE_DEFAULT = 1;

const styles = StyleSheet.create({
  noMarginRight: {
    marginRight: 0,
  },
});

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps): ReactNode => {

  const { getTypeOfMovementsName } = useContext(AuthContext);
  const { numberOfItems, productAdded } = useContext(InventoryBagContext);
  const { handleCameraAvailable, startScanning } = useContext(SettingsContext);
  const { navigate } = useNavigation<AppNavigationProp>();
  const { theme, typeTheme } = useTheme();

  if (!state) return null;

  const handleOpenBagInventory = (): void => {
    handleCameraAvailable(false);
    navigate('bagInventoryScreen');
  };

  const renderTabButton = (route: Route<string>, index: number): ReactNode => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;
    const isFocused = state.index === index;

    const onPress = (): void => {
      handleCameraAvailable(false);

      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const labelColor =
      isFocused && typeTheme === 'dark'
        ? theme.text_color_secondary
        : isFocused
        ? theme.text_color
        : !isFocused && typeTheme === 'dark'
        ? theme.text_color_secondary
        : theme.text_color;

    const labelContent =
      typeof label === 'string'
        ? label
        : label({ focused: isFocused, color: theme.text_color, children: '' });

    const backgroundColor = isFocused
      ? theme.color_yellow
      : Platform.OS === 'android'
      ? theme.background_color_blur
      : 'transparent';

    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        disabled={startScanning}
        style={[
          customTabBarStyles(theme, typeTheme).navButton,
          { backgroundColor },
        ]}>
        {Platform.OS === 'android' ? (
          <View style={customTabBarStyles(theme).blurContainer}>
            <Text style={[customTabBarStyles(theme).sectionTitle, { color: labelColor }]}>
              {labelContent}
            </Text>
          </View>
        ) : (
          <BlurView
            style={customTabBarStyles(theme).blurContainer}
            blurType="light"
            blurAmount={10}>
            <Text style={[customTabBarStyles(theme).sectionTitle, { color: labelColor }]}>
              {labelContent}
            </Text>
          </BlurView>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={customTabBarStyles(theme).customTabBar}>
      <View style={customTabBarStyles(theme).content}>
        <View style={customTabBarStyles(theme).navigation}>
          {state.routes.map(renderTabButton)}
        </View>

        {Platform.OS === 'android' ? (
          <TouchableOpacity
            style={[customTabBarStyles(theme).navButton, styles.noMarginRight]}
            onPress={handleOpenBagInventory}
            disabled={startScanning}>
            <View
              style={[
                customTabBarStyles(theme).blurContainer,
                { backgroundColor: theme.background_color_blur },
              ]}>
              <Text
                style={[
                  customTabBarStyles(theme).sectionBag,
                  {
                    color:
                      typeTheme === 'dark'
                        ? theme.text_color
                        : theme.text_color_secondary,
                  },
                ]}>
                {getTypeOfMovementsName()} ( {numberOfItems} )
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <AnimatedButton isScaled={productAdded}>
            <BlurView
              style={customTabBarStyles(theme).blurContainer}
              blurType="light"
              blurAmount={10}>
              <Text
                style={[
                  customTabBarStyles(theme).sectionBag,
                  {
                    color:
                      typeTheme === 'dark'
                        ? theme.text_color_secondary
                        : theme.text_color,
                  },
                ]}>
                {getTypeOfMovementsName()} ( {numberOfItems} )
              </Text>
            </BlurView>
          </AnimatedButton>
        )}
      </View>
    </SafeAreaView>
  );
};

// Animated Button
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface AnimatedButtonProps {
  isScaled: boolean;
  children: ReactNode;
}

const AnimatedButton = ({
  isScaled,
  children,
}: AnimatedButtonProps): JSX.Element => {
  const scaleAnim = useRef(new Animated.Value(SCALE_DEFAULT)).current;
  const { theme } = useTheme();
  const { navigate } = useNavigation<AppNavigationProp>();
  const { startScanning } = useContext(SettingsContext);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isScaled ? SCALE_ACTIVE : SCALE_DEFAULT,
      useNativeDriver: true,
    }).start();
  }, [isScaled, scaleAnim]);

  const handleOpenBagInventory = (): void => {
    navigate('bagInventoryScreen');
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        customTabBarStyles(theme).navButton,
        styles.noMarginRight,
        { transform: [{ scale: scaleAnim }] },
      ]}
      onPress={handleOpenBagInventory}
      disabled={startScanning}>
      {children}
    </AnimatedTouchableOpacity>
  );
};
