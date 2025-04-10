import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ProfileNavigation } from './ProfileNavigation';
import { ScannerNavigation } from './ScannerNavigation';
import { Theme, globalFont } from '../theme/appTheme';
import { useTheme } from '../context/ThemeContext';

import {
  RouteProp,
  NavigationProp,
  ParamListBase,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

export type BottomNavigationStackParamList = {
  'BottomNavigation - Scanner': undefined;
  'BottomNavigation - Profile': { fromLogIn?: boolean };
};

const BottomTab = createBottomTabNavigator<BottomNavigationStackParamList>();

export const BottomNavigation = (): JSX.Element => {

  const { theme } = useTheme();

  const getTabBarVisibility = (
    route: RouteProp<BottomNavigationStackParamList, keyof BottomNavigationStackParamList>
  ): 'flex' | 'none' => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    return routeName.startsWith('[ProfileNavigation]') && routeName !== '[ProfileNavigation] - profile'
      ? 'none'
      : 'flex';
  };

  const renderTabIcon = (
    routeName: keyof BottomNavigationStackParamList,
    focused: boolean
  ): JSX.Element => {
    const icons: Record<keyof BottomNavigationStackParamList, [string, string]> = {
      'BottomNavigation - Scanner': ['scan-outline', 'scan'],
      'BottomNavigation - Profile': ['person-outline', 'person'],
    };

    const [defaultIcon, focusedIcon] = icons[routeName];
    const iconColor = focused ? theme.color_yellow : theme.text_color_light;

    return <Icon name={focused ? focusedIcon : defaultIcon} size={20} color={iconColor} />;
  };

  const screenOptions = ({ route, navigation }: {
    route: RouteProp<BottomNavigationStackParamList, keyof BottomNavigationStackParamList>;
    navigation: NavigationProp<ParamListBase>;
  }): BottomTabNavigationOptions => {

    const state = navigation.getState();
    const currentRouteName =
      'routes' in state && typeof state.index === 'number'
        ? state.routes[state.index]?.name
        : '';
    const isFocused = route.name === currentRouteName;

    return {
      tabBarIcon: ({ focused }) => (
        <View>{renderTabIcon(route.name, focused)}</View>
      ),
      tabBarStyle: {
        display: getTabBarVisibility(route),
        backgroundColor: theme.background_color,
        borderTopColor: theme.color_border_tertiary,
        height: hp('7.5%'),
        paddingBottom: hp('1%'),
      },
      tabBarLabelStyle: {
        color: isFocused ? theme.color_yellow : theme.text_color_light,
        paddingBottom: hp('0.5%'),
        fontSize: globalFont.font_sm,
      },
      tabBarItemStyle: {
        paddingVertical: hp('0.5%'),
      },
      headerShown: false,
    };
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles(theme).safeArea}>
        <BottomTab.Navigator screenOptions={screenOptions}>
          <BottomTab.Screen
            name="BottomNavigation - Scanner"
            component={ScannerNavigation}
            options={{ title: 'Escaner' }}
          />
          <BottomTab.Screen
            name="BottomNavigation - Profile"
            component={ProfileNavigation}
            options={{ title: 'Perfil' }}
          />
        </BottomTab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = (theme: Theme) : ReturnType<typeof StyleSheet.create> => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background_color
  },
});
