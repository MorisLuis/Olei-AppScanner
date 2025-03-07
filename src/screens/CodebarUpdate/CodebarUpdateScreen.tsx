import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { productDetailsStyles } from '../../theme/productDetailsTheme';
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
import { CodebarUpdateOptionCard } from '../../components/Cards/CodebarUpdateOptionCard';
import useErrorHandler from '../../hooks/useErrorHandler';
import { CodebarUpdateNavigationProp } from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';

interface CodebarUpdateScreenInterface {
    Codigo: string;
    Id_Marca: number
}

export const CodebarUpdateScreen = ({ Codigo, Id_Marca }: CodebarUpdateScreenInterface) => {

    const navigation = useNavigation<CodebarUpdateNavigationProp>();
    const { updateBarCode, handleCodebarScannedProcces, handleGetCodebarType, codebarType, codeBar, codeBarStatus } = useContext(SettingsContext);
    const { theme } = useTheme();
    const { handleError, handleErrorCustum } = useErrorHandler()

    const [openModalCamera, setOpenModalCamera] = useState(false)
    const [codebartypeSelected, setCodebartypeSelected] = useState<number>()
    const [changeTypeOfCodebar, setChangeTypeOfCodebar] = useState(false)
    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType)
    const [optionSelected, setOptionSelected] = useState<number>(0)

    const hanldeCodebarTypeSelected = (value: number) => {
        handleGetCodebarType(value)
    }

    const handleGoToNextStep = () => {
        if (optionSelected === 1) {
            hanldeUpdateCodebarWithCodeFound()
        } else if (optionSelected === 2) {
            updateBarCode('')
            setOpenModalCamera(true)
        } else if (optionSelected === 3) {
            hanldeUpdateCodebarWithCodeRandom()
        } else if (optionSelected === 4) {
            navigation.navigate(
                '[CodebarUpdateNavigation] - UpdateCodeBarWithInput',
                {
                    Codigo,
                    Id_Marca
                }
            );
        }
    }


    const hanldeUpdateCodebarWithCodeFound = async () => {
        try {
            if (!Codigo || !Id_Marca) {
                handleErrorCustum({
                    status: 400,
                    Message: "Codigo, Id_Marca  neccesary in hanldeUpdateCodebarWithCodeFound",
                    Metodo: "B-PUT"
                })
                return;
            };

            const response = await updateCodbar({
                codigo: Codigo,
                Id_Marca: Id_Marca,
                body: {
                    CodBar: codeBar
                }
            })

            navigation.goBack();

            if (response.error) return  handleError(response.error);
        } catch (error) {
            handleError(error, true);
        }
    }

    const hanldeUpdateCodebarWithCodeRandom = async () => {

        try {
            if (!Codigo || !Id_Marca) {
                handleErrorCustum({
                    status: 400,
                    Message: "productDetails neccesary in hanldeUpdateCodebarWithCodeRandom",
                    Metodo: "B-PUT"
                })
                return;
            };

            const response = await updateCodbar({
                codigo: Codigo,
                Id_Marca: Id_Marca,
                body: {
                    codeRandom: "true"
                }
            })

            navigation.goBack()
            if (response.error) return handleError(response.error);
        } catch (error) {
            handleError(error, true)
        }
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
                                <TouchableOpacity onPress={() => setChangeTypeOfCodebar(true)}>
                                    <Text style={CodebarUpdateScreenStyles(theme).actualCodebarTypeChange}>Cambiar</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={CodebarUpdateScreenStyles(theme).selectorCodebarType}>
                                <Selector
                                    label={"Tipo de codigo de barras: "}
                                    items={codebartypes.barcodes.map((item) => {
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

                    <CodebarUpdateOptionCard
                        message={`Actualizar código con: ${codeBar}`}
                        icon="barcode-outline"
                        onClick={() => setOptionSelected(1)}
                        active={optionSelected === 1}
                        visible={codeBarStatus}
                    />

                    <CodebarUpdateOptionCard
                        message={`Usar camara para escanear codigo`}
                        icon="camera-outline"
                        onClick={() => setOptionSelected(2)}
                        active={optionSelected === 2}
                    />

                    <CodebarUpdateOptionCard
                        message={`Actualizar con código aleatorio`}
                        icon="shuffle-outline"
                        onClick={() => setOptionSelected(3)}
                        active={optionSelected === 3}
                    />

                    <CodebarUpdateOptionCard
                        message='Escribir manualmente'
                        icon="text-outline"
                        onClick={() => setOptionSelected(4)}
                        active={optionSelected === 4}
                    />

                </View>


                {optionSelected !== 0 && (
                    <ButtonCustum
                        title={'Avanzar'}
                        onPress={handleGoToNextStep}
                        disabled={false}
                        loading={false}
                    />
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
                <CameraModal
                    Codigo={Codigo}
                    Id_Marca={Id_Marca}
                    onClose={() => {
                        handleCodebarScannedProcces(false)
                        updateBarCode('')
                        setOpenModalCamera(false)
                    }}
                />
            </ModalBottom>
        </>
    )
}

