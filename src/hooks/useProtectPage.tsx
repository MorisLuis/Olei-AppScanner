import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import { AppNavigationProp } from '../interface/navigation';
import { AppNavigationStackParamList } from '../navigator/AppNavigation';
import { AuthContext } from '../context/auth/AuthContext';
import { DbAuthContext } from '../context/dbAuth/DbAuthContext';

export type NavigatePageType = keyof AppNavigationStackParamList | 'back';

interface UseProtectPageProps {
    protectionCondition?: boolean;
    numberOfItems?: number;
    loading?: boolean;

    condition: boolean;
    navigatePage: NavigatePageType;
}

/* export const useProtectPage = ({
    numberOfItems,
    protectionCondition,
    loading,
    navigatePage,
}: UseProtectPageProps) => {

    const { navigate, canGoBack } = useNavigation<AppNavigationProp>();
    const { status } = useContext(AuthContext);

    const protectThisPage = (numberOfItems && numberOfItems <= 0 && !loading) ? true : false;
    const protectThisPage2 = protectionCondition;

    useFocusEffect(
        useCallback(() => {
            const checkAccess = async () => {
                if (navigatePage === 'back') {
                    return canGoBack() ? canGoBack?.() : navigate('typeOfMovementScreen')
                }

                if (protectThisPage) {
                    return navigate(navigatePage);
                }


                if (protectThisPage || protectThisPage2) {
                    return navigate(navigatePage);
                }
            };
            checkAccess();
        }, [protectThisPage, protectThisPage2, navigate])
    );

    return {
        protectThisPage: protectThisPage ? protectThisPage : protectThisPage2
    }
}; */

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
