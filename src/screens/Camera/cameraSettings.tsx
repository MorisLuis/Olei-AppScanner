import {useContext, useState} from 'react';
import {Platform, Vibration, Alert} from 'react-native';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

import {getProductByCodeBar} from '../../services/products';
import {SettingsContext} from '../../context/settings/SettingsContext';
import ProductInterface from '../../interface/product';
import UserInterface from '../../interface/user';
import useErrorHandler from '../../hooks/useErrorHandler';

type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked';

interface cameraSettingsInterface {
  handleOpenProductsFoundByCodebar: (response: ProductInterface[]) => void;
  setProductsScanned: React.Dispatch<
    React.SetStateAction<ProductInterface[] | undefined>
  >;
  productsScanned?: ProductInterface[];
  setCameraPermission: React.Dispatch<
    React.SetStateAction<PermissionStatus | null>
  >;
}

export const cameraSettings = ({
  handleOpenProductsFoundByCodebar,
  setProductsScanned,
  productsScanned,
  setCameraPermission,
}: cameraSettingsInterface) => {
  const {
    handleCameraAvailable,
    vibration,
    updateCodeBarProvider,
    handleStartScanning,
  } = useContext(SettingsContext);
  const [codeDetected, setCodeDetected] = useState(false);
  const {handleError} = useErrorHandler();

  const requestCameraPermission = async () => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    setCameraPermission(result);
  };

  // Solicitar permisos de cámara
  const handleRequestPermission = async () => {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );

    if (result === 'denied') {
      requestCameraPermission();
    } else if (result === 'blocked') {
      Alert.alert(
        'Permiso de Cámara Bloqueado',
        'El permiso de la cámara ha sido bloqueado. Por favor, habilítalo en la configuración de tu dispositivo.',
        [
          {text: 'Cancelar', style: 'cancel'},
          {text: 'Abrir Configuración', onPress: openSettings},
        ],
      );
    } else {
      setCameraPermission(result);
    }
  };

  const handleVibrate = () => {
    if (vibration) Vibration.vibrate(500);
  };

  const codeScanned = async ({codes}: {codes: string}) => {
    handleStartScanning(true);
    handleCameraAvailable(false);
    setProductsScanned(undefined);

    if (!productsScanned && codes?.length > 0) {
      setCodeDetected(true);
      if (codeDetected) return;
      const codeValue = codes;

      try {
        const response = await getProductByCodeBar({codeBar: codeValue.trim()});

        if (response.error) return handleError(response.error);
        handleOpenProductsFoundByCodebar(response);
        handleVibrate();
        updateCodeBarProvider(codeValue);
        handleStartScanning(false);
      } catch (error) {
        handleError(error, true);
        setCodeDetected(false);
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
    setCodeDetected,
  };
};

export const getTypeOfMovementsName = (user?: UserInterface) => {
  if (user) {
    const {Id_TipoMovInv} = user;
    if (Id_TipoMovInv?.Accion === 1 && Id_TipoMovInv?.Id_TipoMovInv === 0) {
      return 'al Inventario';
    } else if (Id_TipoMovInv?.Accion === 1) {
      return 'a la Entrada';
    } else if (Id_TipoMovInv?.Accion === 2) {
      return 'a la Salida';
    } else {
      return 'Traspaso';
    }
  }
  return '';
};
