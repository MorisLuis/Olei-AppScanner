import { useContext, useState } from 'react';
import { Platform, Vibration, Alert } from 'react-native';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

import { getProductByCodeBar } from '../../services/products';
import { SettingsContext } from '../../context/settings/SettingsContext';
import ProductInterface from '../../interface/product';
import UserInterface from '../../interface/user';
import useErrorHandler from '../../hooks/useErrorHandler';

type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked';


interface CameraSettingsInterface {
  handleOpenProductsFoundByCodebar: (_response: ProductInterface[]) => void;
  setProductsScanned: React.Dispatch<
    React.SetStateAction<ProductInterface[] | undefined>
  >;
  productsScanned?: ProductInterface[];
  setCameraPermission: React.Dispatch<
    React.SetStateAction<PermissionStatus | null>
  >;
}

const VIBRATION_DURATION = 500;
const ACCION_ENTRADA = 1;
const ACCION_SALIDA = 2;
const ID_MOV_INVENTARIO = 0;
const CODES_LENGTH_EMPTY = 0;

export const useCameraSettings = ({
  handleOpenProductsFoundByCodebar,
  setProductsScanned,
  productsScanned,
  setCameraPermission,
}: CameraSettingsInterface): {
  requestCameraPermission: () => Promise<void>,
  handleRequestPermission: () => Promise<void>,
  codeScanned: (_info: { codes: string }) => Promise<void>,
  setCodeDetected: React.Dispatch<React.SetStateAction<boolean>>
} => {


  const {
    handleCameraAvailable,
    vibration,
    updateCodeBarProvider,
    handleStartScanning,
  } = useContext(SettingsContext);
  const [codeDetected, setCodeDetected] = useState(false);
  const { handleError } = useErrorHandler();

  const requestCameraPermission = async (): Promise<void> => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    setCameraPermission(result);
  };

  const handleRequestPermission = async (): Promise<void> => {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );

    if (result === 'denied') {
      await requestCameraPermission();
    } else if (result === 'blocked') {
      Alert.alert(
        'Permiso de Cámara Bloqueado',
        'El permiso de la cámara ha sido bloqueado. Por favor, habilítalo en la configuración de tu dispositivo.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Abrir Configuración', onPress: openSettings },
        ],
      );
    } else {
      setCameraPermission(result);
    }
  };

  const handleVibrate = (): void => {
    if (vibration) Vibration.vibrate(VIBRATION_DURATION);
  };

  const codeScanned = async ({ codes }: { codes: string }): Promise<void> => {
    handleStartScanning(true);
    handleCameraAvailable(false);
    setProductsScanned(undefined);

    if (!productsScanned && codes?.length > CODES_LENGTH_EMPTY) {
      if (codeDetected) return;
      setCodeDetected(true);
      const codeValue = codes;

      try {
        const { products } = await getProductByCodeBar({ codeBar: codeValue.trim() });
        handleOpenProductsFoundByCodebar(products);
        handleVibrate();
        updateCodeBarProvider(codeValue);
      } catch (error) {
        handleError(error);
      } finally {
        handleStartScanning(false);
        setCodeDetected(false);
      }
    } else {
      handleStartScanning(false);
      setCodeDetected(false);
    }
  };

  return {
    requestCameraPermission,
    handleRequestPermission,
    codeScanned,
    setCodeDetected
  };
};

export const getTypeOfMovementsName = (user?: UserInterface): string => {
  if (user) {
    const { Id_TipoMovInv } = user;
    if (
      Id_TipoMovInv?.Accion === ACCION_ENTRADA &&
      Id_TipoMovInv?.Id_TipoMovInv === ID_MOV_INVENTARIO
    ) {
      return 'al Inventario';
    } else if (Id_TipoMovInv?.Accion === ACCION_ENTRADA) {
      return 'a la Entrada';
    } else if (Id_TipoMovInv?.Accion === ACCION_SALIDA) {
      return 'a la Salida';
    } else {
      return 'Traspaso';
    }
  }
  return '';
};
