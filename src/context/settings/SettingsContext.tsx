import {createContext} from 'react';

import UserInterface from '../../interface/user';

interface ContextProps {
  handleVibrationState: (value: boolean) => void;
  handleCameraAvailable: (value: boolean) => void;
  handleLimitProductsScanned: (value: number) => void;
  handleSetupUser: (value: UserInterface) => void;
  handleCodebarScannedProcces: (value: boolean) => void;
  handleGetCodebarType: (value?: number) => void;
  handleStartScanning: (value: boolean) => void;
  updateCodeBarProvider: (value: string) => void;

  vibration?: boolean;
  cameraAvailable?: boolean;
  limitProductsScanned: number;
  codebarType?: number;
  codeBar?: string;
  codeBarStatus?: boolean;
  startScanning?: boolean;
}

export const SettingsContext = createContext({} as ContextProps);
