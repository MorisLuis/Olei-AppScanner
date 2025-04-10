import React, {useContext, useState} from 'react';
import {KeyboardType, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {globalStyles} from '../../theme/appTheme';
import {inputStyles} from '../../theme/UI/inputs';
import {updateCodbar} from '../../services/costos';
import {SettingsContext} from '../../context/settings/SettingsContext';
import codebartypes from '../../utils/codebarTypes.json';
import {CodebarUpdateWithInputScreenStyles} from '../../theme/CodebarUpdateWithInputScreenTheme';
import {useTheme} from '../../context/ThemeContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import {CodebarUpdateNavigationProp} from '../../interface/navigation';
import ButtonCustum from '../../components/Ui/ButtonCustum';
import { ErrorResponse } from '../../interface/error';

interface CodebarUpdateWithInputScreenInterface {
  Codigo: string;
  Id_Marca: number;
}

export const CodebarUpdateWithInputScreen = ({
  Codigo,
  Id_Marca,
}: CodebarUpdateWithInputScreenInterface) : JSX.Element => {
  const [text, setText] = useState('');
  const navigation = useNavigation<CodebarUpdateNavigationProp>();
  const {codebarType} = useContext(SettingsContext);
  const {theme} = useTheme();
  const {handleError} = useErrorHandler();

  const currentType = codebartypes.barcodes.find(
    (code) => code.id === codebarType,
  );
  const regex = new RegExp(currentType?.regex as string);

  const hanldeUpdateCodebarWithCodeRandom = async () : Promise<void> => {
    try {
      if (!Codigo || !Id_Marca) {
        const error: ErrorResponse = {
          response: {
            status: 400,
            data: {
              message: 'Codigo and Id_Marca neccesary in handleUpdateCodebar'
            }
          },
          message: 'Codigo and Id_Marca neccesary in handleUpdateCodebar'
        }
        handleError(error);
      }

      if (!regex.test(text)) return;

      await updateCodbar({
        codigoProps: Codigo,
        Id_Marca: Id_Marca,
        body: {CodBar: text},
      });

    } catch (error) {
      handleError(error, true);
    } finally {
      navigation.goBack();
      navigation.goBack();
    }
  };

  const handleTextChange = (value: string) : void => {
    setText(value);
  };

  return (
    <View
      style={
        CodebarUpdateWithInputScreenStyles(theme).CodebarUpdateWithInputScreen
      }>
      <Text
        style={CodebarUpdateWithInputScreenStyles(theme).inputLabel}>
        Escribe el codigo que quieras.
      </Text>

      <TextInput
        style={[
          inputStyles(theme).input,
          globalStyles().globalMarginBottomSmall,
        ]}
        placeholder="Ej: 654s1q"
        onChangeText={handleTextChange}
        keyboardType={currentType?.keyboardType as KeyboardType}
        maxLength={currentType?.maxLength}
        placeholderTextColor={'gray'}
      />

      <Text style={CodebarUpdateWithInputScreenStyles(theme).warningMessage}>
        {currentType?.errorMessage}
      </Text>

      <ButtonCustum
        title={'Actualizar'}
        onPress={hanldeUpdateCodebarWithCodeRandom}
        disabled={!regex.test(text)}
        loading={false}
      />
    </View>
  );
};
