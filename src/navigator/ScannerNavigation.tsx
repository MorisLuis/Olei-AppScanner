import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Inventory} from '../screens/Camera/Inventory';
import {CustomTabBar} from '../components/Navigation/CustomTabBar';
import CameraScreen from '../screens/Camera/CameraScreen';
import { globalStyles } from '../theme/appTheme';

export type ScannerNavigationStackParamList = {
  '[ScannerNavigation] - camera': undefined;
  '[ScannerNavigation] - inventory': undefined;
};

export const ScannerNavigation = () : JSX.Element => {
  const TopTabs = createMaterialTopTabNavigator<ScannerNavigationStackParamList>();
  const initialScreen = '[ScannerNavigation] - camera';

  return (
    <View style={globalStyles().flex}>
      <TopTabs.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName={initialScreen}>
        <TopTabs.Screen
          name="[ScannerNavigation] - camera"
          options={{title: 'Camara'}}
          component={CameraScreen}
        />
        <TopTabs.Screen
          name="[ScannerNavigation] - inventory"
          options={{title: 'Inventario'}}
          component={Inventory}
        />
      </TopTabs.Navigator>
    </View>
  );
};
