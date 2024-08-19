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

interface CameraModalInterface {
    productDetails: ProductInterface;
    onClose: () => void
}

const CameraModal = ({ productDetails, onClose }: CameraModalInterface) => {

    const { vibration, updateBarCode, codebarType, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<any>();
    const { theme, typeTheme } = useTheme();

    const [isScanningAllowed, setIsScanningAllowed] = useState(true);
    const [codeIsScanning, setCodeIsScanning] = useState(false);
    const [productExistent, setProductExistent] = useState(false);
    const [codebarTest, setCodebarTest] = useState(true);

    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);

    const handleVibrate = () => {
        if (vibration) {
            Vibration.vibrate(500);
        }
    };

    const codeScanned = async ({ codes }: any) => {

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
                handleVibrate()
                updateBarCode(codeValue)
                if (response.length > 0) {
                    setProductExistent(true)
                }
            } catch (error) {
                setCodebarTest(true)
                console.error('Error fetching product:', error);
            } finally {
                setTimeout(() => {
                    setIsScanningAllowed(true);
                }, 2000);
            }
        }
        setCodeIsScanning(false);
    }

    const hanldeUpdateCodebar = async () => {
        if (!productDetails) return;

        await updateCodbar({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                CodBar: codeBar
            }
        })
        onClose();
        navigation.goBack();
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
                                            onReadCode={(event: any) => codeScanned({ codes: event.nativeEvent.codeStringValue })}
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

