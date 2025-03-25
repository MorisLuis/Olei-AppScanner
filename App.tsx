import React, { ReactNode, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { AppNavigation } from './src/navigator/AppNavigation';
import { ShowToastMessage } from './src/components/ToastMesage';
import { setUnauthorizedHandler } from './src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef, resetToLogin } from './src/hooks/useResetToLogin';

const App = () => {
  // Configuramos el callback para 401
  useEffect(() => {
    setUnauthorizedHandler(async () => {
      console.log('setUnauthorizedHandler');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      resetToLogin();
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
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
          <InventoryProvider>{children}</InventoryProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
