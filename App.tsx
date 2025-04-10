import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/auth/AuthProvider';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { ShowToastMessage } from './src/components/ToastMesage';
import { MainNavigator } from './src/navigator/MainNavigation';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AppState>
        <MainNavigator />
      </AppState>
      <ShowToastMessage />
    </NavigationContainer>
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

export default App;
