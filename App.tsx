import React, { ReactNode } from 'react';
import { DbAuthProvider } from './src/context/dbAuth/DbAuthProvider';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigator/AppNavigation';
import { ShowToastMessage } from './src/components/ToastMesage';
import { ThemeProvider } from './src/context/ThemeContext';

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
    <DbAuthProvider>
      <AuthProvider>
        <ThemeProvider>
          <SettingsProvider>
            <InventoryProvider>
              {children}
            </InventoryProvider>
          </SettingsProvider>
        </ThemeProvider>
      </AuthProvider>
    </DbAuthProvider>
  )
}

export default App;
