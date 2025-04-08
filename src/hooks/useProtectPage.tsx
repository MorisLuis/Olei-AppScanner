import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { AppNavigationProp } from '../interface/navigation';
import { AppNavigationStackParamList } from '../navigator/AppNavigation';

export type NavigatePageType = keyof AppNavigationStackParamList | 'back';

interface UseProtectPageProps {
  condition: boolean;
  navigatePage: NavigatePageType;
}

export const useProtectPage = ({
  condition,
  navigatePage,
}: UseProtectPageProps): void => {
  const { navigate, canGoBack } = useNavigation<AppNavigationProp>();

  const checkMiddleware = useCallback((): void => {
    if (navigatePage === 'back') {
      if (canGoBack()) {
        canGoBack();
      } else {
        //navigate('typeOfMovementScreen');
      }
    } else if (condition) {
      navigate(navigatePage);
    }
  }, [condition, canGoBack, navigate, navigatePage]);

  useFocusEffect(
    useCallback((): void => {
      checkMiddleware();
    }, [checkMiddleware]),
  );
};
