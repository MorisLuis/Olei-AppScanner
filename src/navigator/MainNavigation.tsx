// /navigation/MainNavigator.tsx
import React, { useContext } from 'react';

import { AppNavigation } from './AppNavigation';
import { AuthNavigation } from './AuthNavigation';
import { AuthContext } from '../context/auth/AuthContext';

export const MainNavigator = () : JSX.Element => {
    const { token } = useContext(AuthContext);
    return (
        <>{token ? <AppNavigation /> : <AuthNavigation />}</>
    );
};
