import React, { useContext } from 'react'
import { Image, View } from 'react-native'
import { StartupScreenTheme } from '../../theme/UI/StartupScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { useProtectPage } from '../../hooks/useProtectPage';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { AppNavigationStackParamList } from '../../navigator/AppNavigation';

export const StartupScreen = () => {

    const { theme } = useTheme();
    const { status, user } = useContext(AuthContext);
    const { status: statusDB } = useContext(DbAuthContext);

    // Determine protection condition and navigation target
    const passProtection = status == "checking" || statusDB === "dbChecking"
    const isProtected = !passProtection ? status === 'not-authenticated' || status === 'authenticated' : false;

    const targetPage = () => {

        if (status === 'authenticated' && user.TodosAlmacenes === 1) {
            return 'almacenScreen'
        } else if (status === 'authenticated') {
            return 'typeOfMovementScreen'
        } else {
            return 'LoginPage'
        }

    };

    useProtectPage({
        protectionCondition: isProtected,
        navigatePage: targetPage()
    });

    return (
        <View style={StartupScreenTheme(theme).StartupScreen}>
            <View style={StartupScreenTheme(theme).imageContainer}>
                <Image
                    style={StartupScreenTheme(theme).logo}
                    source={require('../../assets/logoOlei.png')}
                />
            </View>
        </View>
    )
}