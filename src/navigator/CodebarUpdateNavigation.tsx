import React from 'react';
import { View } from 'react-native';
import { CodebarUpdateScreen } from '../screens/CodebarUpdate/CodebarUpdateScreen';
import { CodebarUpdateWithInputScreen } from '../screens/CodebarUpdate/CodebarUpdateWithInputScreen';
import { StackHeaderProps, createStackNavigator } from '@react-navigation/stack';
import { CustomHeader } from '../components/Ui/CustomHeader';
import { globalStyles } from '../theme/appTheme';
import ProductInterface from '../interface/product';
import { useTheme } from '../context/ThemeContext';
import { RouteProp } from '@react-navigation/native';
import { AppNavigationStackParamList } from './AppNavigation';

type CodebarUpdateNavigationRouteProp = RouteProp<AppNavigationStackParamList, 'CodebarUpdateNavigation'>;

interface CodebarUpdateNavigationInterface {
    route: CodebarUpdateNavigationRouteProp
}

export type CodebarUpdateNavigationStackParamList = {
    "[CodebarUpdateNavigation] - UpdateCodeBarScreen": { Codigo: string; Id_Marca: number };
    "[CodebarUpdateNavigation] - UpdateCodeBarWithInput": { Codigo: string; Id_Marca: number };
};

export const CodebarUpdateNavigation = ({ route }: CodebarUpdateNavigationInterface) => {

    const Stack = createStackNavigator<CodebarUpdateNavigationStackParamList>();
    const { Codigo, Id_Marca } = route?.params ?? {};
    const { theme } = useTheme();

    return (
        <Stack.Navigator initialRouteName="[CodebarUpdateNavigation] - UpdateCodeBarScreen">

            <Stack.Screen
                name="[CodebarUpdateNavigation] - UpdateCodeBarScreen"
                options={({ navigation }) => ({
                    header: () =>
                        <View style={{ paddingTop: globalStyles(theme).globalPadding.padding, backgroundColor: theme.background_color }}>
                            <CustomHeader title="Crear codigo de barras" navigation={navigation} />
                        </View>
                })}
            >
                {props => <CodebarUpdateScreen {...props} Codigo={Codigo} Id_Marca={Number(Id_Marca)} />}
            </Stack.Screen>

            <Stack.Screen
                name="[CodebarUpdateNavigation] - UpdateCodeBarWithInput"
                options={({ navigation }) => ({
                    header: (props: StackHeaderProps) =>
                        <View style={{ paddingTop: globalStyles(theme).globalPadding.padding, backgroundColor: theme.background_color }}>
                            <CustomHeader
                                //{...props}
                                //title={props.route.params?.title || 'Actualizar código de barras'}
                                title='Modificar'
                                navigation={navigation}
                            />
                        </View>
                })}
            >
                {() => <CodebarUpdateWithInputScreen Codigo={Codigo} Id_Marca={Number(Id_Marca)} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
