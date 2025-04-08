import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {productDetailsStyles} from '../../theme/productDetailsTheme';
import {globalStyles} from '../../theme/appTheme';
import {updateCodbar} from '../../services/costos';
import ModalBottom from '../../components/Modals/ModalBottom';
import CameraModal from '../../components/Modals/ModalRenders/CameraModal';
import {Selector} from '../../components/Ui/Selector';
import codebartypes from '../../utils/codebarTypes.json';
import {SettingsContext} from '../../context/settings/SettingsContext';
import {useTheme} from '../../context/ThemeContext';
import {CodebarUpdateScreenStyles} from '../../theme/CodebarUpdateScreenTheme';
import {CodebarUpdateOptionCard} from '../../components/Cards/CodebarUpdateOptionCard';
import useErrorHandler from '../../hooks/useErrorHandler';
import {CodebarUpdateNavigationProp} from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';

interface CodebarUpdateScreenInterface {
  Codigo: string;
  Id_Marca: number;
}

const CODEBAR_TYPE_DEFAULT = 1;
const OPTION_UPDATE_CODEBAR = 1;
const OPTION_SCAN_CAMERA = 2;
const OPTION_UPDATE_RANDOM = 3;
const OPTION_MANUAL_INPUT = 4;
const OPTION_UPDATE_DEFAULT = 0;

export const CodebarUpdateScreen = ({
  Codigo,
  Id_Marca,
}: CodebarUpdateScreenInterface) : JSX.Element => {
  const navigation = useNavigation<CodebarUpdateNavigationProp>();
  const {
    updateCodeBarProvider,
    handleCodebarScannedProcces,
    handleGetCodebarType,
    codebarType,
    codeBar,
  } = useContext(SettingsContext);
  const {theme} = useTheme();
  const {handleError, handleErrorCustum} = useErrorHandler();

  const [openModalCamera, setOpenModalCamera] = useState(false);
  const [codebartypeSelected, setCodebartypeSelected] = useState<number>();
  const [changeTypeOfCodebar, setChangeTypeOfCodebar] = useState(false);
  const currentType = codebartypes.barcodes.find(
    (code) => code.id === codebarType,
  );
  const [optionSelected, setOptionSelected] = useState<number>(OPTION_UPDATE_DEFAULT);

  const hanldeCodebarTypeSelected = (value: number): void => {
    handleGetCodebarType(value);
  };

  const handleGoToNextStep = (): void => {
    if (optionSelected === OPTION_UPDATE_CODEBAR) {
      hanldeUpdateCodebarWithCodeFound();
    } else if (optionSelected === OPTION_SCAN_CAMERA) {
      updateCodeBarProvider('');
      setOpenModalCamera(true);
    } else if (optionSelected === OPTION_UPDATE_RANDOM) {
      hanldeUpdateCodebarWithCodeRandom();
    } else if (optionSelected === OPTION_MANUAL_INPUT) {
      if (!Codigo || !Id_Marca) {
        return;
      }
      navigation.navigate(
        '[CodebarUpdateNavigation] - UpdateCodeBarWithInput',
        {
          Codigo,
          Id_Marca,
        },
      );
    }
  };

  const hanldeUpdateCodebarWithCodeFound = async (): Promise<void> => {
    try {
      if (!Codigo || !Id_Marca) {
        handleErrorCustum({
          status: 400,
          Message:
            'Codigo, Id_Marca  neccesary in hanldeUpdateCodebarWithCodeFound',
          Metodo: 'B-PUT',
        });
        return;
      }

      handleCodebarScannedProcces(true);

      const { error } = await updateCodbar({
        codigoProps: Codigo,
        Id_Marca: Id_Marca,
        body: {
          CodBar: codeBar,
        },
      });

      navigation.goBack();

      if (error) return handleError(error);
    } catch (error) {
      handleError(error, true);
    } finally {
      handleCodebarScannedProcces(false);
    }
  };

  const hanldeUpdateCodebarWithCodeRandom = async (): Promise<void> => {
    try {
      if (!Codigo || !Id_Marca) {
        handleErrorCustum({
          status: 400,
          Message:
            'productDetails neccesary in hanldeUpdateCodebarWithCodeRandom',
          Metodo: 'B-PUT',
        });
        return;
      }

      handleCodebarScannedProcces(true);
      const response = await updateCodbar({
        codigoProps: Codigo,
        Id_Marca: Id_Marca,
        body: {
          codeRandom: 'true',
        },
      });

      navigation.goBack();
      if (response.error) return handleError(response.error);
    } catch (error) {
      handleError(error, true);
    } finally {
      handleCodebarScannedProcces(false);
    }
  };

  useEffect(() => {
    const handleGetTypeOfCodebar = async (): Promise<void> => {
      setCodebartypeSelected(codebarType || CODEBAR_TYPE_DEFAULT);
    };
    handleGetTypeOfCodebar();
  }, [codebarType]);

  return (
    <>
      <View style={CodebarUpdateScreenStyles(theme).CodebarUpdateScreen}>
        <View style={productDetailsStyles(theme).optionsContent}>
          {!changeTypeOfCodebar ? (
            <View style={CodebarUpdateScreenStyles(theme).actualCodebarType}>
              <Text
                style={CodebarUpdateScreenStyles(theme).actualCodebarTypeText}>
                Actualmente el codigo de barras es tipo {currentType?.type}
              </Text>
              <TouchableOpacity onPress={() => setChangeTypeOfCodebar(true)}>
                <Text
                  style={
                    CodebarUpdateScreenStyles(theme).actualCodebarTypeChange
                  }>
                  Cambiar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={CodebarUpdateScreenStyles(theme).selectorCodebarType}>
              <Selector
                label={'Tipo de codigo de barras: '}
                items={codebartypes.barcodes.map((item) => {
                  return {label: item?.type, value: item?.id};
                })}
                value={
                  codebartypes?.barcodes.find(
                    (code) => code?.id === codebartypeSelected,
                  )?.type || 'Code 128'
                }
                //Methods
                onValueChange={(value) => hanldeCodebarTypeSelected(value)}
              />
              <TouchableOpacity onPress={() => setChangeTypeOfCodebar(false)}>
                <Text
                  style={[
                    CodebarUpdateScreenStyles(theme).actualCodebarTypeChange,
                    {
                      marginTop:
                        globalStyles().globalMarginBottomSmall
                          .marginBottom,
                    },
                  ]}>
                  Ocultar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <CodebarUpdateOptionCard
            message={`Actualizar código con: ${codeBar}`}
            icon="barcode-outline"
            onClick={() => setOptionSelected(OPTION_UPDATE_CODEBAR)}
            active={optionSelected === OPTION_UPDATE_CODEBAR}
            visible={codeBar ? true : false}
          />

          <CodebarUpdateOptionCard
            message={`Usar camara para escanear codigo`}
            icon="camera-outline"
            onClick={() => setOptionSelected(OPTION_SCAN_CAMERA)}
            active={optionSelected === OPTION_SCAN_CAMERA}
          />

          <CodebarUpdateOptionCard
            message={`Actualizar con código aleatorio`}
            icon="shuffle-outline"
            onClick={() => setOptionSelected(OPTION_UPDATE_RANDOM)}
            active={optionSelected === OPTION_UPDATE_RANDOM}
          />

          <CodebarUpdateOptionCard
            message="Escribir manualmente"
            icon="text-outline"
            onClick={() => setOptionSelected(OPTION_MANUAL_INPUT)}
            active={optionSelected === OPTION_MANUAL_INPUT}
          />
        </View>

        {optionSelected !== OPTION_UPDATE_DEFAULT && (
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
          updateCodeBarProvider('');
          handleCodebarScannedProcces(false);
        }}>
        <CameraModal
          Codigo={Codigo}
          Id_Marca={Id_Marca}
          onClose={() => {
            handleCodebarScannedProcces(false);
            updateCodeBarProvider('');
            setOpenModalCamera(false);
          }}
        />
      </ModalBottom>
    </>
  );
};
