import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { useNavigation } from '@react-navigation/native';
import { updateCodbar } from '../../services/costos';
import ModalBottom from '../../components/Modals/ModalBottom';
import CameraModal from '../../components/Modals/ModalRenders/CameraModal';
import { Selector } from '../../components/Ui/Selector';
import codebartypes from '../../utils/codebarTypes.json';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { CodebarUpdateScreenStyles } from '../../theme/CodebarUpdateScreenTheme';

type optionSelectedInterface = {
    screen: string,
    title: string
}

export const CodebarUpdateScreen = ({ productDetails }: any) => {


    const navigation = useNavigation<any>();
    const { updateBarCode, handleCodebarScannedProcces, handleGetCodebarType, codebarType, codeBar, codeBarStatus } = useContext(SettingsContext);
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"
    const iconColorActive = typeTheme === 'dark' ? "black" : "black"

    const [selectedOption, setSelectedOption] = useState<optionSelectedInterface>({ screen: "", title: "" });
    const [openModalCamera, setOpenModalCamera] = useState(false)
    const [codebartypeSelected, setCodebartypeSelected] = useState<number>()
    const [changeTypeOfCodebar, setChangeTypeOfCodebar] = useState(false)
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)

    const handleOptionOfUpdateCodeSelect = (option: optionSelectedInterface) => {
        setSelectedOption(option);
    };

    const hanldeCodebarTypeSelected = (value: number) => {
        handleGetCodebarType(value)
    }

    const handleGoToNextStep = () => {
        if (selectedOption.screen === "updateWithCode") {
            hanldeUpdateCodebarWithCodeFound()
        } else if (selectedOption.screen === "updateWithRandomCode") {
            hanldeUpdateCodebarWithCodeRandom()
        } else if (selectedOption.screen === "CameraModal") {
            setOpenModalCamera(true)
        } else {
            navigation.navigate(selectedOption.screen, { title: selectedOption.title, productDetails });
        }
    }

    const hanldeUpdateCodebarWithCodeFound = async () => {
        if (!productDetails) return;

        await updateCodbar({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                CodBar: codeBar
            }
        })
        navigation.goBack()
    }

    const hanldeUpdateCodebarWithCodeRandom = async () => {
        if (!productDetails) return;

        await updateCodbar({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                codeRandom: "true"
            }
        })
        navigation.goBack()
    }


    useEffect(() => {
        const handleGetTypeOfCodebar = async () => {
            setCodebartypeSelected(codebarType || 1)
        }
        handleGetTypeOfCodebar()
    }, [codebarType]);


    return (
        <>
            <View style={CodebarUpdateScreenStyles(theme).CodebarUpdateScreen}>
                <View style={productDetailsStyles(theme).optionsContent}>

                    {
                        !changeTypeOfCodebar ?
                            <View style={CodebarUpdateScreenStyles(theme).actualCodebarType}>
                                <Text style={CodebarUpdateScreenStyles(theme).actualCodebarTypeText}>Actualmente el codigo de barras es tipo {currentType?.type}</Text>
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(true)}
                                >
                                    <Text style={CodebarUpdateScreenStyles(theme).actualCodebarTypeChange}>Cambiar</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={CodebarUpdateScreenStyles(theme).selectorCodebarType}>
                                <Selector
                                    label={"Tipo de codigo de barras: "}
                                    items={codebartypes.barcodes.map((item: any) => {
                                        return { label: item?.type, value: item?.id }
                                    })}
                                    value={codebartypes?.barcodes.find((code) => code?.id === codebartypeSelected)?.type || "Code 128"}

                                    //Methods
                                    onValueChange={(value) => hanldeCodebarTypeSelected(value)}
                                />
                                <TouchableOpacity
                                    onPress={() => setChangeTypeOfCodebar(false)}
                                >
                                    <Text style={[CodebarUpdateScreenStyles(theme).actualCodebarTypeChange, { marginTop: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}>Ocultar</Text>
                                </TouchableOpacity>
                            </View>
                    }

                    {
                        (codeBarStatus) ?
                            <TouchableOpacity
                                style={[productDetailsStyles(theme).optionCodebar, selectedOption.screen === 'updateWithCode' && productDetailsStyles(theme).selectedOption]}
                                onPress={() => handleOptionOfUpdateCodeSelect({ screen: 'updateWithCode', title: 'updateWithCode' })}
                            >
                                <Icon name="barcode-outline" size={24} color={selectedOption.screen === 'updateWithCode' ? iconColorActive : iconColor} style={productDetailsStyles(theme).optionCodebar_icon} />
                                <Text
                                    style={[selectedOption.screen === 'updateWithCode' ? CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarTextActive : CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarText]}
                                >
                                    Actualizar código con: {codeBar}
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={[productDetailsStyles(theme).optionCodebar, selectedOption.screen === 'CameraModal' && productDetailsStyles(theme).selectedOption]}
                                onPress={() => handleOptionOfUpdateCodeSelect({ screen: 'CameraModal', title: 'CameraModal' })}
                            >
                                <Icon name="camera-outline" size={24} color={selectedOption.screen === 'CameraModal' ? iconColorActive : iconColor} style={productDetailsStyles(theme).optionCodebar_icon} />
                                <Text
                                    style={[selectedOption.screen === 'CameraModal' ? CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarTextActive : CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarText]}
                                >
                                    Usar camara para escanear codigo
                                </Text>
                            </TouchableOpacity>
                    }

                    {
                        currentType?.type === 'Libre' &&
                        <TouchableOpacity
                            style={[productDetailsStyles(theme).optionCodebar, selectedOption.screen === 'updateWithRandomCode' && productDetailsStyles(theme).selectedOption]}
                            onPress={() => handleOptionOfUpdateCodeSelect({ screen: 'updateWithRandomCode', title: 'updateWithRandomCode' })}
                        >
                            <Icon name="shuffle-outline" size={24} color={selectedOption.screen === 'updateWithRandomCode' ? iconColorActive : iconColor} style={productDetailsStyles(theme).optionCodebar_icon} />
                            <Text
                                style={[selectedOption.screen === 'updateWithRandomCode' ? CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarTextActive : CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarText]}
                            >
                                Actualizar con código aleatorio
                            </Text>
                        </TouchableOpacity>
                    }


                    <TouchableOpacity
                        style={[productDetailsStyles(theme).optionCodebar, selectedOption.screen === '[CodebarUpdateNavigation] - UpdateCodeBarWithInput' && productDetailsStyles(theme).selectedOption]}
                        onPress={() => handleOptionOfUpdateCodeSelect({ screen: '[CodebarUpdateNavigation] - UpdateCodeBarWithInput', title: 'Actualizar Manualmente' })}
                    >
                        <Icon name="text-outline" size={24} color={selectedOption.screen === '[CodebarUpdateNavigation] - UpdateCodeBarWithInput' ? iconColorActive : iconColor} style={productDetailsStyles(theme).optionCodebar_icon} />
                        <Text
                            style={[selectedOption.screen === '[CodebarUpdateNavigation] - UpdateCodeBarWithInput' ? CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarTextActive : CodebarUpdateScreenStyles(theme, typeTheme).optionCodebarText]}
                        >
                            Escribir manualmente
                        </Text>
                    </TouchableOpacity>
                </View>

                {selectedOption.screen !== "" && (
                    <TouchableOpacity style={buttonStyles(theme).button} onPress={handleGoToNextStep}>
                        <Text style={buttonStyles(theme).buttonText}>Avanzar</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ModalBottom
                visible={openModalCamera}
                onClose={() => {
                    setOpenModalCamera(false);
                    updateBarCode('')
                    handleCodebarScannedProcces(false)
                }}
            >
                <CameraModal productDetails={productDetails} onClose={() => {
                    handleCodebarScannedProcces(false)
                    updateBarCode('')
                    setOpenModalCamera(false)
                }} />
            </ModalBottom>
        </>
    )
}

