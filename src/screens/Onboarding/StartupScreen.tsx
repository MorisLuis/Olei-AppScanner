import React, { useCallback, useContext, useEffect } from 'react'
import { Image, View } from 'react-native'
import { StartupScreenTheme } from '../../theme/UI/StartupScreenTheme';
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { NavigatePageType, useProtectPage } from '../../hooks/useProtectPage';
import { DbAuthContext } from '../../context/dbAuth/DbAuthContext';
import { useFocusEffect } from '@react-navigation/native';

export const StartupScreen = () => {

    console.log("StartupScreen")

    const { theme } = useTheme();
    const { status, user } = useContext(AuthContext);
    const { status: statusDB } = useContext(DbAuthContext);

    const middlewareStartupScreen = () => {
        let condition = false;
        let navigatePage: NavigatePageType = 'LoginPage';
        console.log({ status, statusDB })

        if (status === 'checking' || statusDB === 'dbChecking') {
            condition = true;
            navigatePage = 'StartupScreen';

            return {
                condition,
                navigatePage
            }
        }

        if (status === 'authenticated' && statusDB === 'dbAuthenticated') {
            condition = true;
            navigatePage = user.TodosAlmacenes === 1 ? 'almacenScreen' : 'typeOfMovementScreen'
        } else if (status === 'not-authenticated') {
            condition = true;
            navigatePage = 'LoginPage'
        } else if (statusDB === 'dbNot-authenticated') {
            condition = true;
            navigatePage = 'LoginDatabaseScreen'
        }

        return {
            condition,
            navigatePage
        }
    };

    
    useProtectPage(middlewareStartupScreen());

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