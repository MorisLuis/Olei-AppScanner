import React from 'react';
import { View } from 'react-native';
import { CodebarUpdateScreen } from '../screens/CodebarUpdate/CodebarUpdateScreen';
import { CodebarUpdateWithInputScreen } from '../screens/CodebarUpdate/CodebarUpdateWithInputScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { globalStyles } from '../theme/appTheme';
import ProductInterface from '../interface/product';
import { useTheme } from '../context/ThemeContext';

type CodebarUpdateNavigationInterface = {
    route?: {
        params: {
            productDetails: ProductInterface;
            selectedProduct: { Codigo: string; Marca: string };
        };
    };
};


export type InventoryNavigationStackParamList = {
    "[CodebarUpdateNavigation] - UpdateCodeBarScreen": { product: ProductInterface };
    "[CodebarUpdateNavigation] - UpdateCodeBarWithInput": undefined
};

export const CodebarUpdateNavigation = ({ route }: CodebarUpdateNavigationInterface) => {

    const Stack = createStackNavigator<InventoryNavigationStackParamList>();
    const { productDetails, selectedProduct } = route?.params ?? {};
    const { theme } = useTheme();

    return (
        <Stack.Navigator initialRouteName="[CodebarUpdateNavigation] - UpdateCodeBarScreen">

            <Stack.Screen
                name="[CodebarUpdateNavigation] - UpdateCodeBarScreen"
                options={({ navigation }) => ({
                    header: props =>
                        <View style={{ paddingTop: globalStyles(theme).globalPadding.padding, backgroundColor: theme.background_color }}>
                            <CustomHeader title="Crear codigo de barras" navigation={navigation} />
                        </View>
                })}
            >
                {props => <CodebarUpdateScreen {...props} productDetails={selectedProduct} /* selectedProduct={selectedProduct} */ />}
            </Stack.Screen>

            <Stack.Screen
                name="[CodebarUpdateNavigation] - UpdateCodeBarWithInput"
                options={({ navigation }) => ({
                    header: (props: any) =>
                        <View style={{ paddingTop: globalStyles(theme).globalPadding.padding, backgroundColor: theme.background_color }}>
                            <CustomHeader {...props} title={props.route.params.title} navigation={navigation} />
                        </View>
                })}
            >
                {props => <CodebarUpdateWithInputScreen {...props} productDetails={productDetails} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
