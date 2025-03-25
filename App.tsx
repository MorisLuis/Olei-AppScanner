import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { AppNavigation } from './src/navigator/AppNavigation';
import { ShowToastMessage } from './src/components/ToastMesage';

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <AppNavigation />
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
          <InventoryProvider>
            {children}
          </InventoryProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
