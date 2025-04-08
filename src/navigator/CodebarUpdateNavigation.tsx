import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {CodebarUpdateScreen} from '../screens/CodebarUpdate/CodebarUpdateScreen';
import {CodebarUpdateWithInputScreen} from '../screens/CodebarUpdate/CodebarUpdateWithInputScreen';
import {CustomHeader} from '../components/Ui/CustomHeader';
import {globalStyles} from '../theme/appTheme';
import {useTheme} from '../context/ThemeContext';
import {AppNavigationStackParamList} from './AppNavigation';

type CodebarUpdateNavigationRouteProp = RouteProp<
  AppNavigationStackParamList,
  'CodebarUpdateNavigation'
>;

interface CodebarUpdateNavigationInterface {
  route: CodebarUpdateNavigationRouteProp;
}

export type CodebarUpdateNavigationStackParamList = {
  '[CodebarUpdateNavigation] - UpdateCodeBarScreen': {
    Codigo: string;
    Id_Marca: number;
  };
  '[CodebarUpdateNavigation] - UpdateCodeBarWithInput': {
    Codigo: string;
    Id_Marca: number;
  };
};

export const CodebarUpdateNavigation = ({
  route,
}: CodebarUpdateNavigationInterface) : JSX.Element => {
  const Stack = createStackNavigator<CodebarUpdateNavigationStackParamList>();
  const {Codigo, Id_Marca} = route?.params ?? {};
  const {theme} = useTheme();

  return (
    <Stack.Navigator initialRouteName="[CodebarUpdateNavigation] - UpdateCodeBarScreen">
      <Stack.Screen
        name="[CodebarUpdateNavigation] - UpdateCodeBarScreen"
        options={({navigation}) => ({
          header: () => (
            <View
              style={{
                paddingTop: globalStyles().globalPadding.padding,
                backgroundColor: theme.background_color,
              }}>
              <CustomHeader
                title="Crear codigo de barras"
                navigation={navigation}
              />
            </View>
          ),
        })}>
        {(props) => (
          <CodebarUpdateScreen
            {...props}
            Codigo={Codigo}
            Id_Marca={Number(Id_Marca)}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="[CodebarUpdateNavigation] - UpdateCodeBarWithInput"
        options={({navigation}) => ({
          header: () => (
            <View
              style={{
                paddingTop: globalStyles().globalPadding.padding,
                backgroundColor: theme.background_color,
              }}>
              <CustomHeader title="Modificar" navigation={navigation} />
            </View>
          ),
        })}>
        {() => (
          <CodebarUpdateWithInputScreen
            Codigo={Codigo}
            Id_Marca={Number(Id_Marca)}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
