import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import Diente from "../../assets/diente.svg";

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

export type OnReadCodeData = {
    nativeEvent: {
        codeStringValue: string;
    };
};

const CameraTest: React.FC = () => {

    const { bag } = useContext(InventoryBagContext);

    const { handleCameraAvailable, limitProductsScanned, cameraAvailable, startScanning } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();

    const { navigate } = useNavigation<any>();
    const isFocused = useIsFocused();
    const onTheLimitProductScanned = limitProductsScanned < bag?.length;

    const [lightOn, setLightOn] = useState(false);
    const [cameraKey, setCameraKey] = useState(0);
    const [productsScanned, setProductsScanned] = useState<ProductInterface[]>();
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);

    // Other functions.
    const handleOpenProductsFoundByCodebar = (response: ProductInterface[]) => {

        if (response.length === 1) {
            navigate('[Modal] - scannerResultScreen', { product: response[0] });
        } else if (response.length > 0) {
            navigate('[Modal] - productsFindByCodeBarModal', { products: response });
        } else {
            navigate('[Modal] - scannerResultScreen', { product: response[0] });
        }

        setProductsScanned(response);
    }

    const handleOpenInputModal = () => {
        handleCameraAvailable(false);
        navigate('[Modal] - findByCodebarInputModal');
    }

    const {
        requestCameraPermission,
        handleRequestPermission,
        codeScanned,
        setCodeDetected
    } = cameraSettings({
        handleOpenProductsFoundByCodebar,
        setProductsScanned,
        productsScanned,
        setCameraPermission
    })

    useEffect(() => {
        requestCameraPermission();
        return () => {
            handleCameraAvailable(false);
        };
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (Platform.OS === 'android') {
                setCameraKey(prevKey => prevKey + 1);
            }
            handleCameraAvailable(true);

            return () => {
                setCodeDetected(false)
                handleCameraAvailable(false);
            };
        }, [])
    );

    useEffect(() => {
        if (!isFocused) {
            handleCameraAvailable(false);
        }
    }, [isFocused]);

    if (cameraPermission === null) {
        return <CameraPermission requestPermissions={handleRequestPermission} message="Cargando..." />
    }

    if (cameraPermission !== 'granted') {
        return (
            <CameraPermission
                requestPermissions={handleRequestPermission}
                message="Permisos de cámara no concedidos."
                availableAuthorization={true}
            />
        )
    }

    return (
        <View style={cameraStyles(theme).cameraScreen}>

            {
                onTheLimitProductScanned &&
                <BlurView
                    style={cameraStyles(theme).blurOverlay}
                    blurType="dark"
                    blurAmount={5}
                />
            }

            <View style={cameraStyles(theme).backgroundBlurTop}></View>
            <View style={cameraStyles(theme).backgroundBlurBottom}></View>

            <Camera
                key={cameraKey}
                scanBarcode={true}
                onReadCode={(event: OnReadCodeData) => {
                    if (!cameraAvailable) return;
                    codeScanned({ codes: event.nativeEvent.codeStringValue })
                }}
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
                    <TouchableOpacity onPress={() => navigate('typeOfMovementScreen')}>
                        {/* <Icon name={"cog-outline"} size={28} color="white" /> */}
                        <Diente width={28} height={28} color={"white"} fill={"white"}/>

                    </TouchableOpacity>
                </View>

                <View style={cameraStyles(theme).cog}>
                    <TouchableOpacity onPress={handleOpenInputModal}>
                        <Icon name={"barcode-outline"} size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>


            

            {
                !startScanning ?
                <View style={cameraStyles(theme).message}>
                    {onTheLimitProductScanned ? (
                        <Text style={cameraStyles(theme, typeTheme).textmessage}>Es necesario subir el inventario para seguir escaneando.</Text>
                    ) : (
                        <Text style={cameraStyles(theme, typeTheme).textmessage}>Escanea un código de barras para agregarlo {getTypeOfMovementsName()}</Text>
                    )}
                </View>
                :
                <View style={cameraStyles(theme).message}>
                    <Text style={cameraStyles(theme, typeTheme).textmessage}>Escaneando...</Text>
                </View>
            }
        </View>
    );
};

export default CameraTest;