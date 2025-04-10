// /navigation/AuthStack.tsx
import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { LoginDatabaseScreen } from '../screens/Onboarding/LoginDatabaseScreen';
import { AuthContext } from '../context/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../interface/navigation';
import { PersonalInformation } from '../screens/Profile/PersonalInformation';
import { CustomHeader } from '../components/Ui/CustomHeader';

export type AuthNavigationStackParamList = {
    LoginPage: undefined;
    LoginDatabaseScreen: undefined;
    'PersonalInformationScreen': { fromLogIn?: boolean };
};

const Stack = createNativeStackNavigator<AuthNavigationStackParamList>();

export const AuthNavigation = (): JSX.Element => {
    const { tokenServer, token } = useContext(AuthContext);
    const navigation = useNavigation<AuthNavigationProp>();

    const handleInitialRouteName = (): keyof AuthNavigationStackParamList => {

        let destination: keyof AuthNavigationStackParamList = 'LoginDatabaseScreen';
        if (tokenServer) {
            destination = 'LoginPage'
        } else {
            destination = 'LoginDatabaseScreen'
        }

        return destination
    }

    useEffect(() => {
        // Si no existe tokenServer, manda a LoginServer
        if (!tokenServer) {
            navigation.navigate('LoginDatabaseScreen');
        }
        // Si ya existe tokenServer pero no el token (del cliente), navega a LoginClient.
        else if (tokenServer && !token) {
            navigation.navigate('LoginPage');
        }
    }, [tokenServer, token, navigation]);

    return (
        <Stack.Navigator initialRouteName={handleInitialRouteName()}>
            <Stack.Screen name="LoginPage" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginDatabaseScreen" component={LoginDatabaseScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="PersonalInformationScreen"
                component={PersonalInformation}
                options={({ navigation }) => ({
                    header: (): JSX.Element => (
                        <CustomHeader
                            title="Información Personal"
                            navigation={navigation}
                            back={() => navigation.goBack()}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};
