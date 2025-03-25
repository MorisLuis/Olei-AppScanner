import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {ProfileNavigation} from './ProfileNavigation';
import {globalFont} from '../theme/appTheme';

import {View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export type BottomNavigationStackParamList = {
  'BottomNavigation - Scanner': undefined;
  'BottomNavigation - Profile': {fromLogIn?: boolean};
};

import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import {ScannerNavigation} from './ScannerNavigation';
import {useTheme} from '../context/ThemeContext';

export const BottomNavigation = () => {
  const BottomTabIOS =
    createBottomTabNavigator<BottomNavigationStackParamList>();
  const {theme} = useTheme();

  const getTabBarVisibility = (
    route: RouteProp<
      BottomNavigationStackParamList,
      keyof BottomNavigationStackParamList
    >,
  ) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (routeName === '[ProfileNavigation] - profile') {
      return 'flex';
    }
    return routeName.startsWith('[ProfileNavigation]') ? 'none' : 'flex';
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['bottom']}
        style={{flex: 1, backgroundColor: theme.background_color}}>
        <BottomTabIOS.Navigator
          screenOptions={({route, navigation}) => ({
            tabBarIcon: ({focused}) => {
              let iconName: string = '';
              const iconColor: string = focused
                ? theme.color_yellow
                : theme.text_color_light;

              switch (route.name) {
                case 'BottomNavigation - Scanner':
                  iconName = focused ? 'scan' : 'scan-outline';
                  break;
                case 'BottomNavigation - Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
              }

              return (
                <View>
                  <Icon name={iconName} size={20} color={iconColor} />
                </View>
              );
            },
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: theme.background_color,
              borderTopColor: theme.color_border_tertiary,
              height: hp('7.5%'),
              paddingBottom: hp('1%'),
            },
            tabBarLabelStyle: {
              color:
                route.name ===
                navigation.getState().routes[navigation.getState().index].name
                  ? theme.color_yellow
                  : theme.text_color_light,
              paddingBottom: hp('0.5%'),
              fontSize: globalFont.font_sm,
            },
            tabBarItemStyle: {
              paddingVertical: hp('0.5%'),
            },
          })}>
          <BottomTabIOS.Screen
            name="BottomNavigation - Scanner"
            options={{headerShown: false, title: 'Escaner'}}
            component={ScannerNavigation}
          />
          <BottomTabIOS.Screen
            name="BottomNavigation - Profile"
            options={{headerShown: false, title: 'Perfil'}}
            component={ProfileNavigation}
          />
        </BottomTabIOS.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
