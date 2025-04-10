// /navigation/MainNavigator.tsx
import React, { useContext } from 'react';

import { AppNavigation } from './AppNavigation';
import { AuthNavigation } from './AuthNavigation';
import { AuthContext } from '../context/auth/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { StartupScreen } from '../screens/Onboarding/StartupScreen';

export const MainNavigator = (): JSX.Element => {
    const { token, isLoading, isRestoringAuth } = useContext(AuthContext);

    if (isRestoringAuth) {
        return (<StartupScreen />)
    }

    if (isLoading) {
        return (<LoadingScreen message='Cargando...' />)
    }

    return (
        <>{token ? <AppNavigation /> : <AuthNavigation />}</>
    );
};
