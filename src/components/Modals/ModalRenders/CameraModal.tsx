import React, { useContext, useState } from 'react';

import { View, Vibration, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../../theme/appTheme';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { buttonStyles } from '../../../theme/UI/buttons';
import { updateCodbar } from '../../../services/costos';
import { useNavigation } from '@react-navigation/native';
import ProductInterface from '../../../interface/product';
import { Camera } from 'react-native-camera-kit';
import { getProductByCodeBar } from '../../../services/products';
import codebartypes from '../../../utils/codebarTypes.json';
import { CameraModalStyles } from '../../../theme/ModalRenders/CameraModalTheme';
import { useTheme } from '../../../context/ThemeContext';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { AppNavigationProp } from '../../../interface/navigation';
import { OnReadCodeData } from '../../../screens/Camera/CameraScreen';

interface CameraModalInterface {
    Codigo: string, 
    Id_Marca: number;    
    onClose: () => void
}

const CameraModal = ({ Codigo, Id_Marca, onClose }: CameraModalInterface) => {

    const { vibration, updateBarCode, codebarType, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<AppNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const { handleError } = useErrorHandler()

    const [isScanningAllowed, setIsScanningAllowed] = useState(true);
    const [codeIsScanning, setCodeIsScanning] = useState(false);
    const [productExistent, setProductExistent] = useState(false);
    const [codebarTest, setCodebarTest] = useState(true);

    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanned = async ({ codes }: { codes: string }) => {

        if (!regex.test(codes)) {
            setCodebarTest(false)
        }

        setCodeIsScanning(true)
        if (codes.length > 0 && isScanningAllowed) {
            setIsScanningAllowed(false);
            const codeValue = codes;
            if (!codeValue) return;
            try {
                const response = await getProductByCodeBar({ codeBar: codeValue });
                if (response.error) {
                    handleError(response.error);
                    return;
                }
                handleVibrate()
                updateBarCode(codeValue)
                if (response.length > 0) {
                    setProductExistent(true)
                }
            } catch (error) {
                handleError(error);
            } finally {
                setCodebarTest(true);
                setTimeout(() => {
                    setIsScanningAllowed(true);
                }, 2000);
            }
        }
        setCodeIsScanning(false);
    }

    const hanldeUpdateCodebar = async () => {

        if (!Codigo || !Id_Marca ) {
            handleError({
                status: 400,
                Message: "productDetails neccesary in hanldeUpdateCodebar",
                Metodo: "B-PUT"
            })
            return;
        };

        try {
            const response = await updateCodbar({
                codigo: Codigo,
                Id_Marca: Id_Marca,
                body: {
                    CodBar: codeBar
                }
            })

            if (response.error) {
                handleError(response.error);
                return;
            }
        } catch (error) {
            handleError(error);
        } finally {
            onClose();
            navigation.goBack();
        }
    }

    const handleTryAgain = () => {
        updateBarCode("")
        setProductExistent(false)
    }

    return (
        <View style={CameraModalStyles(theme).cameraScreen}>
            {
                !productExistent ?
                    <>

                        <View style={CameraModalStyles(theme).header}>
                            <Text style={CameraModalStyles(theme).header_title}>Escanea el codigo</Text>
                            {
                                (codeBar && !codebarTest) ?
                                    <Text style={CameraModalStyles(theme).header_message}>
                                        Revisa el tipo de codigo de barras requerido, cambiar si asi lo deseas.
                                    </Text>
                                    : (codeBar && !codeIsScanning) ?
                                        <Text style={CameraModalStyles(theme).header_message}>
                                            Asegurate que es el codigo que deseas asignarle a este producto.
                                        </Text>
                                        :
                                        <View >
                                            <Text style={{ color: theme.text_color }}>Escanea el codigo que le pondras a este producto.</Text>
                                            <Text style={CameraModalStyles(theme).header_message_scanner}>Actualmente el codigo de barras es tipo: {currentType?.type}.</Text>
                                        </View>
                            }
                        </View>

                        {
                            (!codeBar && codeIsScanning) ?
                                <ActivityIndicator
                                    size={50}
                                    color={iconColor}
                                />
                                :
                                (!codeBar && !codeIsScanning) ?
                                    <View style={CameraModalStyles(theme).content}>
                                        <Camera
                                            scanBarcode={true}
                                            onReadCode={(event: OnReadCodeData) => codeScanned({ codes: event.nativeEvent.codeStringValue })}
                                            style={CameraModalStyles(theme).camera}
                                        />
                                    </View>
                                    :
                                    (codeBar && !codeIsScanning && !codebarTest) ?
                                        <View>
                                            <Text style={CameraModalStyles(theme).warningMessage}>{currentType?.errorMessage}</Text>
                                            <TouchableOpacity
                                                style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                                                onPress={handleTryAgain}
                                            >
                                                <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Intentar de nuevo</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <>
                                            <View style={CameraModalStyles(theme).codebarFound}>
                                                <Text style={CameraModalStyles(theme).textcodebarFound}>{codeBar}</Text>
                                            </View>

                                            {
                                                codeBar && codeBar?.length < 20 ?
                                                    <TouchableOpacity
                                                        style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                                                        onPress={hanldeUpdateCodebar}
                                                    >
                                                        <Text style={buttonStyles(theme).buttonTextTertiary}>Asignar codigo de barras</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <View>
                                                        <Text>El codigo de barras es maximo de 20 caracteres</Text>
                                                    </View>
                                            }
                                        </>
                        }
                    </>
                    :
                    <>
                        <View style={CameraModalStyles(theme).header}>
                            <Text style={CameraModalStyles(theme).header_title}>Producto encontrado</Text>
                            <Text style={CameraModalStyles(theme).header_message}>
                                Se encontro un producto con el codigo de barras: {codeBar}
                            </Text>
                        </View>

                        <TouchableOpacity style={[buttonStyles(theme).button_small, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]} onPress={handleTryAgain}>
                            <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Intentar de nuevo</Text>
                        </TouchableOpacity>
                    </>
            }

        </View>
    );
};

export default CameraModal;

