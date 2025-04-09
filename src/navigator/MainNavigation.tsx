// /navigation/MainNavigator.tsx
import React, { useContext } from 'react';

import { AppNavigation } from './AppNavigation';
import { AuthNavigation } from './AuthNavigation';
import { AuthContext } from '../context/auth/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';

export const MainNavigator = (): JSX.Element => {
    const { token, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (<LoadingScreen message='Cargando...' />)
    }
    return (
        <>{token ? <AppNavigation /> : <AuthNavigation />}</>
    );
};
