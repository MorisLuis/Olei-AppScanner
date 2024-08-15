import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

interface UseProtectPageProps {
    numberOfItems?: number;
    protectionCondition?: any;
    loading?: boolean;
    navigatePage: string;
    passProtection?: boolean;
}

export const useProtectPage = ({
    numberOfItems,
    protectionCondition,
    loading,
    navigatePage,
    passProtection
}: UseProtectPageProps) => {

    const { navigate } = useNavigation<any>();
    const navigation = useNavigation<any>();

    const protectThisPage = (numberOfItems && numberOfItems <= 0 && !loading) ? true : false;
    const protectThisPage2 = protectionCondition;

    useFocusEffect(
        useCallback(() => {
            const checkAccess = async () => {
                if( navigatePage === 'back' ) {
                    return navigation.canGoBack() ? navigation.canGoBack?.() : navigation.navigate('typeOfMovementScreen')
                }

                if (protectThisPage) {
                    return navigate(navigatePage);
                }

                if (protectThisPage2) {
                    return navigate(navigatePage);
                }
            };
            checkAccess();
        }, [protectThisPage, protectThisPage2,navigate])
    );

    return {
        protectThisPage: protectThisPage ? protectThisPage : protectThisPage2
    }
};
