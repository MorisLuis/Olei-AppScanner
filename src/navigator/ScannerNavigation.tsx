import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Inventory } from '../screens/Camera/Inventory';
import { CustomTabBar } from '../components/Navigation/CustomTabBar';
import CameraScreen from '../screens/Camera/CameraScreen';
import { RouteProp } from '@react-navigation/native';
import { BottomNavigationStackParamList } from './BottomNavigation';

type ScannerNavigationRouteProp = RouteProp<BottomNavigationStackParamList, 'BottomNavigation - Scanner'>;

interface ScannerNavigationInterface {
    route: ScannerNavigationRouteProp
};

export type ScannerNavigationStackParamList = {
    "[ScannerNavigation] - camera": undefined,
    "[ScannerNavigation] - inventory": undefined;
};

export const ScannerNavigation = ({ route }: ScannerNavigationInterface) => {

    const TopTabs = createMaterialTopTabNavigator<ScannerNavigationStackParamList>();
    //const initialScreen = route?.params?.screen || '[ScannerNavigation] - camera';
    const initialScreen = '[ScannerNavigation] - camera';

    return (
        <View style={{ flex: 1 }} >
            <TopTabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                initialRouteName={initialScreen}
            >
                <TopTabs.Screen
                    name="[ScannerNavigation] - camera"
                    options={{ title: "Camara" }}
                    component={CameraScreen}
                />
                <TopTabs.Screen
                    name="[ScannerNavigation] - inventory"
                    options={{ title: "Inventario" }}
                    component={Inventory}
                />
            </TopTabs.Navigator>
        </View>
    );
};