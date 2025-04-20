import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/auth/AuthProvider';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { ShowToastMessage } from './src/components/ToastMesage';
import { MainNavigator } from './src/navigator/MainNavigation';
import * as Sentry from '@sentry/react-native';
import { initSentry } from './src/utils/sentryConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

initSentry();

const queryClient = new QueryClient();


const App = (): JSX.Element => {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppState>
          <MainNavigator />
        </AppState>
        <ShowToastMessage />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

interface AppStateProps {
  children: ReactNode;
}

const AppState: React.FC<AppStateProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SettingsProvider>
          <InventoryProvider>{children}</InventoryProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Sentry.wrap(App);
