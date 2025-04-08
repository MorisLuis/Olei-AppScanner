import React, { useCallback, useReducer } from 'react';

import { SettingsContext } from './SettingsContext';
import { settingsReducer } from './settingsReducer';
import UserInterface from '../../interface/user';
import useErrorHandler from '../../hooks/useErrorHandler';

export interface SettingsInterface {
  vibration?: boolean;
  cameraAvailable?: boolean;
  limitProductsScanned: number;
  user?: UserInterface | null;
  codeBarStatus?: boolean;
  codeBar?: string;
  codebarType?: number;
  startScanning?: boolean;
}

export const SettingsInitialState: SettingsInterface = {
  vibration: true,
  cameraAvailable: true,
  limitProductsScanned: 20,
  codeBarStatus: false,
  codeBar: '',
  codebarType: 1,
  startScanning: false,
};

export const SettingsProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer(settingsReducer, SettingsInitialState);
  const { handleError } = useErrorHandler();

  const handleVibrationState = (value: boolean): void => {
    dispatch({ type: '[Settings] - Vibration state', vibration: value });
  };

  const handleCameraAvailable = useCallback((value: boolean): void => {
    dispatch({
      type: '[Settings] - CameraAvailable state',
      cameraAvailable: value,
    });
  }, []);

  const handleLimitProductsScanned = (value: number): void => {
    dispatch({
      type: '[Settings] - limitProductsScanned state',
      limitProductsScanned: value,
    });
  };

  const handleSetupUser = (user: UserInterface): void => {
    dispatch({ type: '[Settings] - userSetup', user });
  };

  const handleCodebarScannedProcces = (value: boolean): void => {
    dispatch({ type: '[Settings] - codeBarStatus', codeBarStatus: value });
  };

  const handleGetCodebarType = (codebarType?: number): void => {
    if (!codebarType) return;
    dispatch({ type: '[Settings] - codebarType', codebarType: codebarType });
  };

  const updateCodeBarProvider = async (value: string): Promise<void> => {
    try {
      handleCodebarScannedProcces(true);
      dispatch({ type: '[Settings] - codeBar', codeBar: value });
    } catch (error) {
      handleError(error);
    } finally {
      handleCodebarScannedProcces(false);
    }
  };

  const handleStartScanning = (value: boolean): void => {
    dispatch({ type: '[Settings] - startScanning', startScanning: value });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        handleVibrationState,
        handleCameraAvailable,
        handleLimitProductsScanned,
        handleSetupUser,
        handleCodebarScannedProcces,
        handleGetCodebarType,
        handleStartScanning,
        updateCodeBarProvider,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
