import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {Camera} from 'react-native-camera-kit';

import {InventoryBagContext} from '../../context/Inventory/InventoryBagContext';
import {SettingsContext} from '../../context/settings/SettingsContext';
import {useTheme} from '../../context/ThemeContext';
import ProductInterface from '../../interface/product';
import {cameraStyles} from '../../theme/CameraCustumTheme';
import {CameraPermission} from '../../components/screens/CameraPermission';
import {getTypeOfMovementsName, useCameraSettings} from './cameraSettings';
import {AppNavigationProp} from '../../interface/navigation';
import {AuthContext} from '../../context/auth/AuthContext';
import { NUMBER_0 } from '../../utils/globalConstants';

type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked';

export type OnReadCodeData = {
  nativeEvent: {
    codeStringValue: string;
  };
};

// Constantes para evitar números mágicos
const INITIAL_CAMERA_KEY = 0;
const ANDROID_CAMERA_KEY_INCREMENT = 1;
const CAMERA_BLUR_AMOUNT = 5;
const ICON_SIZE = 28;
const EMPTY_PRODUCTS_FOUND = 0;
const MORE_THAN_ONE_PRODUCTS_FOUND = 1;

const CameraScreen: React.FC = () => {
  const {bag} = useContext(InventoryBagContext);
  const {handleCameraAvailable, limitProductsScanned, startScanning} =
    useContext(SettingsContext);
  const {user} = useContext(AuthContext);
  const {theme, typeTheme} = useTheme();
  const {navigate} = useNavigation<AppNavigationProp>();
  const onTheLimitProductScanned = limitProductsScanned < bag?.length;

  const [lightOn, setLightOn] = useState(false);
  const [cameraKey, setCameraKey] = useState(INITIAL_CAMERA_KEY);
  const [productsScanned, setProductsScanned] = useState<ProductInterface[]>();
  const [cameraPermission, setCameraPermission] =
    useState<PermissionStatus | null>(null);

  const cameraAvailableRef = useRef(false);

  useLayoutEffect((): (() => void) => {
    cameraAvailableRef.current = true;
    handleCameraAvailable(true);
    return () => {
      cameraAvailableRef.current = false;
      handleCameraAvailable(false);
    };
  }, [handleCameraAvailable]);

  useFocusEffect(
    useCallback((): (() => void) => {
      cameraAvailableRef.current = true;
      handleCameraAvailable(true);
      if (Platform.OS === 'android') {
        setCameraKey((prevKey) => prevKey + ANDROID_CAMERA_KEY_INCREMENT);
      }
      return () => {
        cameraAvailableRef.current = false;
        handleCameraAvailable(false);
      };
    }, [handleCameraAvailable]),
  );

  const {
    requestCameraPermission,
    handleRequestPermission,
    codeScanned,
  } = useCameraSettings({
    handleOpenProductsFoundByCodebar: (response: ProductInterface[]): void => {
      if (response.length === MORE_THAN_ONE_PRODUCTS_FOUND) {
        navigate('[Modal] - scannerResultScreen', {product: response[NUMBER_0]});
      } else if (response.length > EMPTY_PRODUCTS_FOUND) {
        navigate('[Modal] - productsFindByCodeBarModal', {
          products: response,
        });
      } else {
        navigate('[Modal] - scannerResultScreen', {product: response[NUMBER_0]});
      }
      setProductsScanned(response);
    },
    setProductsScanned,
    productsScanned,
    setCameraPermission,
  });

  useEffect((): void => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  const handleReadCode = useCallback(
    (event: OnReadCodeData): void => {
      if (!cameraAvailableRef.current) return;
      codeScanned({codes: event.nativeEvent.codeStringValue});
    },
    [codeScanned],
  );

  if (cameraPermission === null) {
    return (
      <CameraPermission
        requestPermissions={handleRequestPermission}
        message="Cargando..."
      />
    );
  }

  if (cameraPermission !== 'granted') {
    return (
      <CameraPermission
        requestPermissions={handleRequestPermission}
        message="Permisos de cámara no concedidos."
        availableAuthorization={true}
      />
    );
  }

  return (
    <View style={cameraStyles(theme).cameraScreen}>
      {onTheLimitProductScanned && (
        <BlurView
          style={cameraStyles(theme).blurOverlay}
          blurType="dark"
          blurAmount={CAMERA_BLUR_AMOUNT}
        />
      )}

      <View style={cameraStyles(theme).backgroundBlurTop} />
      <View style={cameraStyles(theme).backgroundBlurBottom} />

      <Camera
        key={cameraKey}
        scanBarcode={true}
        onReadCode={handleReadCode}
        style={cameraStyles(theme).camera}
        torchMode={lightOn ? 'on' : 'off'}
      />

      <View style={cameraStyles(theme).actions}>
        <View style={cameraStyles(theme).flash}>
          <TouchableOpacity onPress={() => setLightOn((prev) => !prev)}>
            <Icon
              name={lightOn ? 'flash' : 'flash-outline'}
              size={ICON_SIZE}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={cameraStyles(theme).cog}>
          <TouchableOpacity
            onPress={() => navigate('typeOfMovementScreen')}
            style={{transform: [{rotate: '90deg'}]}}>
            <Icon name="swap-horizontal-outline" size={ICON_SIZE} color="white" />
          </TouchableOpacity>
        </View>

        <View style={cameraStyles(theme).cog}>
          <TouchableOpacity
            onPress={() => {
              cameraAvailableRef.current = false;
              handleCameraAvailable(false);
              navigate('[Modal] - findByCodebarInputModal');
            }}>
            <Icon name="barcode-outline" size={ICON_SIZE} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={cameraStyles(theme).message}>
        {!startScanning ? (
          <>
            <Text style={cameraStyles(theme, typeTheme).textmessage}>
              {onTheLimitProductScanned
                ? 'Es necesario subir el inventario para seguir escaneando.'
                : `Escanea un código de barras para agregarlo ${getTypeOfMovementsName()}`}
            </Text>
            <Text style={cameraStyles(theme, typeTheme).textmessage}>
              Almacen: {user?.AlmacenNombre}
            </Text>
          </>
        ) : (
          <Text style={cameraStyles(theme, typeTheme).textmessage}>
            Escaneando...
          </Text>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;
