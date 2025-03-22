import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';

import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import ProductInterface from '../../interface/product';
import { cameraStyles } from '../../theme/CameraCustumTheme';
import { CameraPermission } from '../../components/screens/CameraPermission';
import { Camera } from 'react-native-camera-kit';
import { cameraSettings, getTypeOfMovementsName } from './cameraSettings';
import { AppNavigationProp } from '../../interface/navigation';
import { AuthContext } from '../../context/auth/AuthContext';

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

export type OnReadCodeData = {
    nativeEvent: {
        codeStringValue: string;
    };
};

const CameraScreen: React.FC = () => {
    const { bag } = useContext(InventoryBagContext);
    const { handleCameraAvailable, limitProductsScanned, startScanning } = useContext(SettingsContext);
    const { user } = useContext(AuthContext);
    const { theme, typeTheme } = useTheme();
    const { navigate } = useNavigation<AppNavigationProp>();
    const isFocused = useIsFocused();
    const onTheLimitProductScanned = limitProductsScanned < bag?.length;

    const [lightOn, setLightOn] = useState(false);
    const [cameraKey, setCameraKey] = useState(0);
    const [productsScanned, setProductsScanned] = useState<ProductInterface[]>();
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);

    // Usamos un ref local para guardar el valor actual de la cámara disponible.
    const cameraAvailableRef = useRef(false);

    // Actualizamos el ref de forma inmediata cuando se monta el componente.
    useLayoutEffect(() => {
        cameraAvailableRef.current = true; // Actualización inmediata
        handleCameraAvailable(true);
        return () => {
            cameraAvailableRef.current = false;
            handleCameraAvailable(false);
        };
    }, []);

    // Mantenemos el ref actualizado también en useFocusEffect para cuando se reenfoque la pantalla.
    useFocusEffect(
        useCallback(() => {
            cameraAvailableRef.current = true;
            handleCameraAvailable(true);
            if (Platform.OS === 'android') {
                setCameraKey(prevKey => prevKey + 1);
            }
            return () => {
                cameraAvailableRef.current = false;
                handleCameraAvailable(false);
            };
        }, [])
    );

    useEffect(() => {
        requestCameraPermission();
    }, []);

/*     useEffect(() => {
        if (!isFocused) {
            cameraAvailableRef.current = false;
            handleCameraAvailable(false);
        }
    }, [isFocused]); */

    const {
        requestCameraPermission,
        handleRequestPermission,
        codeScanned
    } = cameraSettings({
        handleOpenProductsFoundByCodebar: (response: ProductInterface[]) => {
            if (response.length === 1) {
                navigate('[Modal] - scannerResultScreen', { product: response[0] });
            } else if (response.length > 0) {
                navigate('[Modal] - productsFindByCodeBarModal', { products: response });
            } else {
                navigate('[Modal] - scannerResultScreen', { product: response[0] });
            }
            setProductsScanned(response);
        },
        setProductsScanned,
        productsScanned,
        setCameraPermission
    });

    const handleReadCode = useCallback((event: OnReadCodeData) => {
        if (!cameraAvailableRef.current) {
            console.log("STOP!")
            return
        };
        codeScanned({ codes: event.nativeEvent.codeStringValue });
    }, [codeScanned]);

    if (cameraPermission === null) {
        return <CameraPermission requestPermissions={handleRequestPermission} message="Cargando..." />;
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
                    blurAmount={5}
                />
            )}

            <View style={cameraStyles(theme).backgroundBlurTop} />
            <View style={cameraStyles(theme).backgroundBlurBottom} />

            <Camera
                key={cameraKey}
                scanBarcode={true}
                onReadCode={handleReadCode}
                style={cameraStyles(theme).camera}
                torchMode={lightOn ? "on" : "off"}
            />

            <View style={cameraStyles(theme).actions}>
                <View style={cameraStyles(theme).flash}>
                    <TouchableOpacity onPress={() => setLightOn(!lightOn)}>
                        <Icon name={lightOn ? "flash" : "flash-outline"} size={28} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={cameraStyles(theme).cog}>
                    <TouchableOpacity
                        onPress={() => navigate('typeOfMovementScreen')}
                        style={{ transform: [{ rotate: '90deg' }] }}
                    >
                        <Icon name="swap-horizontal-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={cameraStyles(theme).cog}>
                    <TouchableOpacity
                        onPress={() => {
                            cameraAvailableRef.current = false;
                            handleCameraAvailable(false);
                            navigate('[Modal] - findByCodebarInputModal');
                        }}
                    >
                        <Icon name="barcode-outline" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {!startScanning ? (
                <View style={cameraStyles(theme).message}>
                    {onTheLimitProductScanned ? (
                        <Text style={cameraStyles(theme, typeTheme).textmessage}>
                            Es necesario subir el inventario para seguir escaneando.
                        </Text>
                    ) : (
                        <Text style={cameraStyles(theme, typeTheme).textmessage}>
                            Escanea un código de barras para agregarlo {getTypeOfMovementsName()}
                        </Text>
                    )}
                    <Text style={cameraStyles(theme, typeTheme).textmessage}>
                        Almacen: {user?.AlmacenNombre}
                    </Text>
                </View>
            ) : (
                <View style={cameraStyles(theme).message}>
                    <Text style={cameraStyles(theme, typeTheme).textmessage}>Escaneando...</Text>
                </View>
            )}
        </View>
    );
};

export default CameraScreen;
