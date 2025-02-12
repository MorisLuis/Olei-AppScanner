import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import { AppNavigationProp } from '../interface/navigation';
import { AppNavigationStackParamList } from '../navigator/AppNavigation';
import { AuthContext } from '../context/auth/AuthContext';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';

export type NavigatePageType = keyof AppNavigationStackParamList | 'back';

interface UseProtectPageProps {
    condition: boolean;
    navigatePage: NavigatePageType;
};

export const useProtectPage = ({
    condition,
    navigatePage
}: UseProtectPageProps) => {

    const { navigate, canGoBack } = useNavigation<AppNavigationProp>();
    const { status } = useContext(AuthContext);
    const { status: statusDB } = useContext(DbAuthContext);

    const checkMiddleware = async () => {

        if (navigatePage === 'back') {
            return canGoBack() ? canGoBack?.() : navigate('typeOfMovementScreen')
        }

        if (condition) {
            return navigate(navigatePage);
        };
    };

    useFocusEffect(
        useCallback(() => {
            checkMiddleware();
        }, [navigate, condition, status, statusDB])
    );

};
