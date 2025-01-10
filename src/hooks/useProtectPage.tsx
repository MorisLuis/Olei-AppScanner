import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { AppNavigationProp } from '../interface/navigation';
import { AppNavigationStackParamList } from '../navigator/AppNavigation';

type NavigatePageType = keyof AppNavigationStackParamList | 'back';

interface UseProtectPageProps {
    protectionCondition?: boolean;

    numberOfItems?: number;
    loading?: boolean;
    navigatePage: NavigatePageType;
}

export const useProtectPage = ({
    numberOfItems,
    protectionCondition,
    loading,
    navigatePage,
}: UseProtectPageProps) => {

    const { navigate, canGoBack } = useNavigation<AppNavigationProp>();

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
};
