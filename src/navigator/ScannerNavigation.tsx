import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomCamera from '../screens/Camera/Camera';
import { Inventory } from '../screens/Camera/Inventory';
import { CustomTabBar } from '../components/Navigation/CustomTabBar';


export const ScannerNavigation = () => {

    const TopTabs = createMaterialTopTabNavigator();
    return (
        <View style={{ flex: 1 }}>
            <TopTabs.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <TopTabs.Screen
                    name="camera"
                    options={{ title: "Camara" }}
                    component={CustomCamera}
                />
                <TopTabs.Screen
                    name="Inventario"
                    component={Inventory}
                />
            </TopTabs.Navigator>
        </View>
    );
};